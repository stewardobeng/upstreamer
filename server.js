const fs = require("fs");
const path = require("path");
const http = require("http");
const { spawn } = require("child_process");
const express = require("express");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { WebSocketServer } = require("ws");
const crypto = require("crypto");
const puppeteer = require("puppeteer-core");

loadEnvFile(path.join(__dirname, ".env"));

const PORT = Number(process.env.PORT || 8088);
const JWT_SECRET = process.env.JWT_SECRET || "dev-change-this-secret";
const FFMPEG_PATH = process.env.FFMPEG_PATH || "ffmpeg";
const LIVEKIT_URL = process.env.LIVEKIT_URL || "";
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || "";
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || "";
const CHROME_PATH = process.env.CHROME_PATH || findChromePath();
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const UPLOAD_DIR = path.join(ROOT, "uploads");
const RECORDING_DIR = path.join(ROOT, "recordings");
const DB_PATH = path.join(DATA_DIR, "db.json");
const LOG_PATH = path.join(DATA_DIR, "app.log");

for (const dir of [DATA_DIR, UPLOAD_DIR, RECORDING_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

const upload = multer({ dest: UPLOAD_DIR });
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });
const sourceWss = new WebSocketServer({ noServer: true });
const activeBroadcasts = new Map();
const SOURCE_STALL_MS = 10000;
let browserRenderer = null;
const browserPages = new Map();
const browserPagePromises = new Map();


function nanoid(size = 21) {
  return crypto.randomBytes(Math.ceil(size * 0.75)).toString("base64url").slice(0, size);
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...valueParts] = trimmed.split("=");
    if (!process.env[key]) {
      process.env[key] = valueParts.join("=").replace(/^["']|["']$/g, "");
    }
  }
}

function findChromePath() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) || "";
}

app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(UPLOAD_DIR));
app.use("/recordings", express.static(RECORDING_DIR));
app.use(express.static(ROOT));

function defaultDb() {
  return {
    users: [],
    workspaces: [],
    shows: [],
    scenes: [],
    overlays: [],
    destinations: [],
    assets: [],
    recordings: [],
    comments: []
  };
}

function readDb() {
  if (!fs.existsSync(DB_PATH)) {
    writeDb(defaultDb());
  }
  return { ...defaultDb(), ...JSON.parse(fs.readFileSync(DB_PATH, "utf8")) };
}

function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function now() {
  return new Date().toISOString();
}

function logEvent(event, details = {}) {
  const entry = { at: now(), event, ...details };
  const line = JSON.stringify(entry);
  console.log(line);
  try {
    fs.appendFileSync(LOG_PATH, `${line}\n`);
  } catch {
    // Logging must never interrupt a live stream.
  }
}

async function getBrowserRenderer() {
  if (browserRenderer) return browserRenderer;
  browserRenderer = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--no-sandbox",
      "--autoplay-policy=no-user-gesture-required"
    ]
  });
  browserRenderer.on("disconnected", () => {
    browserRenderer = null;
  });
  return browserRenderer;
}

async function getOrCreatePage(targetUrl, width, height) {
  const cacheKey = `${targetUrl}_${width}_${height}`;
  const cached = browserPages.get(cacheKey);
  if (cached) {
    cached.lastAccess = Date.now();
    return cached;
  }
  if (browserPagePromises.has(cacheKey)) return browserPagePromises.get(cacheKey);

  const createPage = (async () => {
  const browser = await getBrowserRenderer();
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.setBypassCSP(true);
  await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 20000 });
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Use a continuous screenshot loop with omitBackground: true.
  // CDP Page.startScreencast does NOT preserve alpha transparency in PNG frames
  // (confirmed: 0 transparent pixels vs 838K+ with page.screenshot omitBackground).
  // page.screenshot({omitBackground: true}) is the only reliable way to get transparent PNGs.
  const browserSourceFps = 12;
  const browserSourceInterval = Math.round(1000 / browserSourceFps);
  const entry = {
    page,
    latestFrame: null,
    lastAccess: Date.now(),
    captureTimer: null,
    capturing: false,
    frameCount: 0,
    servedCount: 0
  };

  // Start a continuous capture loop — captures a fresh screenshot every ~80ms (~12fps).
  // The latest frame is cached and served instantly on each /api/browser-snapshot request.
  async function captureLoop() {
    if (entry.capturing) return; // skip if previous capture is still running
    entry.capturing = true;
    try {
      const frame = await entry.page.screenshot({ type: "png", fullPage: false, omitBackground: true });
      entry.latestFrame = frame;
      entry.frameCount += 1;
    } catch (err) {
      // Page may have been closed or navigated; don't crash the loop
      logEvent("browser.capture.error", { url: targetUrl, error: err.message });
    }
    entry.capturing = false;
  }

  // Take the first screenshot immediately so it's available right away
  await captureLoop();
  entry.captureTimer = setInterval(captureLoop, browserSourceInterval);
  logEvent("browser.capture.started", { url: targetUrl, width, height, fps: browserSourceFps, intervalMs: browserSourceInterval });

  browserPages.set(cacheKey, entry);
  return entry;
  })();

  browserPagePromises.set(cacheKey, createPage);
  try {
    return await createPage;
  } finally {
    browserPagePromises.delete(cacheKey);
  }
}

setInterval(async () => {
  const now = Date.now();
  for (const [key, cached] of browserPages.entries()) {
    if (now - cached.lastAccess > 30000) {
      browserPages.delete(key);
      try {
        if (cached.captureTimer) clearInterval(cached.captureTimer);
        await cached.page.close();
      } catch (e) {
        // Ignore error closing inactive page
      }
      logEvent("browser.page.expired", { key });
    }
  }
}, 10000);


function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

function signUser(user) {
  return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
}

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const db = readDb();
    const user = db.users.find((item) => item.id === payload.sub);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

function optionalAuth(req, _res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      const db = readDb();
      req.user = db.users.find((item) => item.id === payload.sub);
    } catch {
      req.user = null;
    }
  }
  next();
}

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  const db = readDb();
  if (db.users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: "An account already exists for this email." });
  }

  const user = {
    id: nanoid(),
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
    createdAt: now()
  };
  const workspace = {
    id: nanoid(),
    name: `${name}'s Studio`,
    ownerId: user.id,
    members: [{ userId: user.id, role: "owner" }],
    createdAt: now()
  };
  db.users.push(user);
  db.workspaces.push(workspace);
  writeDb(db);
  res.json({ token: signUser(user), user: publicUser(user), workspace });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const user = db.users.find((item) => item.email.toLowerCase() === String(email || "").toLowerCase());
  if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
    return res.status(401).json({ error: "Invalid email or password." });
  }
  const workspace = db.workspaces.find((item) => item.ownerId === user.id);
  res.json({ token: signUser(user), user: publicUser(user), workspace });
});

app.post("/api/auth/logout", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/me", auth, (req, res) => {
  const db = readDb();
  const workspace = db.workspaces.find((item) => item.ownerId === req.user.id);
  res.json({ user: publicUser(req.user), workspace });
});

app.get("/api/dev/latest-destination", (_req, res) => {
  const db = readDb();
  const latest = [...db.destinations].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];
  if (!latest) return res.status(404).json({ error: "No local destination found." });
  res.json(latest);
});

app.get("/api/shows", auth, (req, res) => {
  const db = readDb();
  res.json(db.shows.filter((show) => show.ownerId === req.user.id));
});

app.post("/api/shows", auth, (req, res) => {
  const db = readDb();
  const show = {
    id: nanoid(),
    ownerId: req.user.id,
    title: req.body.title || "Untitled broadcast",
    description: req.body.description || "",
    scheduledFor: req.body.scheduledFor || null,
    status: "draft",
    inviteToken: nanoid(16),
    livekitRoom: `show-${nanoid(12)}`,
    createdAt: now(),
    updatedAt: now()
  };
  db.shows.push(show);
  writeDb(db);
  res.json(show);
});

app.get("/api/scenes", auth, (req, res) => {
  const db = readDb();
  res.json(db.scenes.filter((scene) => scene.ownerId === req.user.id));
});

app.post("/api/scenes", auth, (req, res) => {
  const db = readDb();
  const scene = {
    id: nanoid(),
    ownerId: req.user.id,
    name: req.body.name || "New scene",
    layout: req.body.layout || "grid",
    logoText: req.body.logoText || "LIVE",
    accentColor: req.body.accentColor || "#00b894",
    lowerName: req.body.lowerName || "",
    lowerTitle: req.body.lowerTitle || "",
    lowerVisible: Boolean(req.body.lowerVisible),
    tickerText: req.body.tickerText || "",
    tickerVisible: Boolean(req.body.tickerVisible),
    sourceIds: Array.isArray(req.body.sourceIds) ? req.body.sourceIds : [],
    overlayIds: Array.isArray(req.body.overlayIds) ? req.body.overlayIds : [],
    createdAt: now(),
    updatedAt: now()
  };
  db.scenes.push(scene);
  writeDb(db);
  res.json(scene);
});

app.patch("/api/scenes/:id", auth, (req, res) => {
  const db = readDb();
  const scene = db.scenes.find((item) => item.id === req.params.id && item.ownerId === req.user.id);
  if (!scene) return res.status(404).json({ error: "Scene not found." });
  Object.assign(scene, {
    name: req.body.name ?? scene.name,
    layout: req.body.layout ?? scene.layout,
    logoText: req.body.logoText ?? scene.logoText,
    accentColor: req.body.accentColor ?? scene.accentColor,
    lowerName: req.body.lowerName ?? scene.lowerName,
    lowerTitle: req.body.lowerTitle ?? scene.lowerTitle,
    lowerVisible: req.body.lowerVisible ?? scene.lowerVisible,
    tickerText: req.body.tickerText ?? scene.tickerText,
    tickerVisible: req.body.tickerVisible ?? scene.tickerVisible,
    sourceIds: Array.isArray(req.body.sourceIds) ? req.body.sourceIds : scene.sourceIds,
    overlayIds: Array.isArray(req.body.overlayIds) ? req.body.overlayIds : scene.overlayIds,
    updatedAt: now()
  });
  writeDb(db);
  res.json(scene);
});

app.delete("/api/scenes/:id", auth, (req, res) => {
  const db = readDb();
  db.scenes = db.scenes.filter((scene) => !(scene.id === req.params.id && scene.ownerId === req.user.id));
  writeDb(db);
  res.json({ ok: true });
});

app.get("/api/overlays", auth, (req, res) => {
  const db = readDb();
  res.json(db.overlays.filter((overlay) => overlay.ownerId === req.user.id));
});

app.post("/api/overlays", auth, (req, res) => {
  const db = readDb();
  const overlay = {
    id: nanoid(),
    ownerId: req.user.id,
    type: req.body.type || "template",
    name: req.body.name || "Overlay",
    enabled: Boolean(req.body.enabled),
    config: req.body.config || {},
    createdAt: now(),
    updatedAt: now()
  };
  db.overlays.push(overlay);
  writeDb(db);
  res.json(overlay);
});

app.patch("/api/overlays/:id", auth, (req, res) => {
  const db = readDb();
  const overlay = db.overlays.find((item) => item.id === req.params.id && item.ownerId === req.user.id);
  if (!overlay) return res.status(404).json({ error: "Overlay not found." });
  Object.assign(overlay, {
    type: req.body.type ?? overlay.type,
    name: req.body.name ?? overlay.name,
    enabled: req.body.enabled ?? overlay.enabled,
    config: req.body.config ?? overlay.config,
    updatedAt: now()
  });
  writeDb(db);
  res.json(overlay);
});

app.delete("/api/overlays/:id", auth, (req, res) => {
  const db = readDb();
  db.overlays = db.overlays.filter((overlay) => !(overlay.id === req.params.id && overlay.ownerId === req.user.id));
  writeDb(db);
  res.json({ ok: true });
});

app.get("/api/destinations", auth, (req, res) => {
  const db = readDb();
  res.json(db.destinations.filter((destination) => destination.ownerId === req.user.id));
});

app.post("/api/destinations", auth, (req, res) => {
  const { name, platform, rtmpUrl, streamKey, enabled = true } = req.body;
  if (!name || !rtmpUrl || !streamKey) {
    return res.status(400).json({ error: "Name, RTMP URL, and stream key are required." });
  }
  const db = readDb();
  const destination = {
    id: nanoid(),
    ownerId: req.user.id,
    name,
    platform: platform || "custom",
    rtmpUrl,
    streamKey,
    enabled,
    health: "idle",
    createdAt: now(),
    updatedAt: now()
  };
  db.destinations.push(destination);
  writeDb(db);
  res.json(redactDestination(destination));
});

app.patch("/api/destinations/:id", auth, (req, res) => {
  const db = readDb();
  const destination = db.destinations.find((item) => item.id === req.params.id && item.ownerId === req.user.id);
  if (!destination) return res.status(404).json({ error: "Destination not found." });
  Object.assign(destination, {
    name: req.body.name ?? destination.name,
    platform: req.body.platform ?? destination.platform,
    rtmpUrl: req.body.rtmpUrl ?? destination.rtmpUrl,
    streamKey: req.body.streamKey ?? destination.streamKey,
    enabled: req.body.enabled ?? destination.enabled,
    updatedAt: now()
  });
  writeDb(db);
  res.json(redactDestination(destination));
});

app.delete("/api/destinations/:id", auth, (req, res) => {
  const db = readDb();
  db.destinations = db.destinations.filter((item) => !(item.id === req.params.id && item.ownerId === req.user.id));
  writeDb(db);
  res.json({ ok: true });
});

app.get("/api/recordings", auth, (req, res) => {
  const db = readDb();
  res.json(db.recordings.filter((recording) => recording.ownerId === req.user.id));
});

app.get("/api/comments", auth, (req, res) => {
  const db = readDb();
  const since = req.query.since ? new Date(String(req.query.since)).getTime() : 0;
  const comments = db.comments
    .filter((comment) => comment.ownerId === req.user.id)
    .filter((comment) => !since || new Date(comment.createdAt).getTime() > since)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 100);
  res.json(comments);
});

app.post("/api/comments", auth, (req, res) => {
  const db = readDb();
  const comment = {
    id: nanoid(),
    ownerId: req.user.id,
    showId: req.body.showId || null,
    provider: req.body.provider || "manual",
    author: req.body.author || "Viewer",
    message: req.body.message || "",
    avatarUrl: req.body.avatarUrl || "",
    externalId: req.body.externalId || nanoid(10),
    status: "new",
    createdAt: now()
  };
  db.comments.unshift(comment);
  db.comments = db.comments.slice(0, 500);
  writeDb(db);
  res.json(comment);
});

app.post("/api/comments/simulate", auth, (req, res) => {
  const samples = [
    ["YouTube", "Nadia", "This layout looks clean. Can you show the guest full screen?"],
    ["Facebook", "Kwame", "Audio is clear here."],
    ["Twitch", "StreamFan21", "Drop the ticker topic again please."],
    ["LinkedIn", "Amelia Brooks", "Great session. Any replay after the live?"]
  ];
  const sample = samples[Math.floor(Math.random() * samples.length)];
  const db = readDb();
  const comment = {
    id: nanoid(),
    ownerId: req.user.id,
    showId: req.body.showId || null,
    provider: sample[0].toLowerCase(),
    author: sample[1],
    message: sample[2],
    avatarUrl: "",
    externalId: nanoid(10),
    status: "new",
    createdAt: now()
  };
  db.comments.unshift(comment);
  db.comments = db.comments.slice(0, 500);
  writeDb(db);
  res.json(comment);
});

app.post("/api/assets", auth, upload.single("asset"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded." });
  const db = readDb();
  const asset = {
    id: nanoid(),
    ownerId: req.user.id,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    url: `/uploads/${req.file.filename}`,
    createdAt: now()
  };
  db.assets.push(asset);
  writeDb(db);
  res.json(asset);
});

app.get("/api/invites/:token", optionalAuth, (req, res) => {
  const db = readDb();
  const show = db.shows.find((item) => item.inviteToken === req.params.token);
  if (!show) return res.status(404).json({ error: "Invite not found." });
  res.json({ showId: show.id, title: show.title, livekitConfigured: isLiveKitConfigured(), guestUrl: `/?guest=${show.inviteToken}` });
});

app.get("/api/livekit/config", (_req, res) => {
  res.json({
    configured: isLiveKitConfigured(),
    url: LIVEKIT_URL || null
  });
});

app.get("/api/health", (_req, res) => {
  const ffmpeg = spawn(FFMPEG_PATH, ["-version"], { stdio: ["ignore", "pipe", "pipe"] });
  let settled = false;

  const done = (status, payload) => {
    if (settled) return;
    settled = true;
    res.status(status).json({
      ok: status < 500,
      port: PORT,
      ffmpegPath: FFMPEG_PATH,
      livekitConfigured: isLiveKitConfigured(),
      activeBroadcasts: activeBroadcasts.size,
      ...payload
    });
  };

  ffmpeg.once("error", (error) => done(500, { ffmpeg: false, error: error.message }));
  ffmpeg.stdout.once("data", (data) => {
    const version = data.toString().split(/\r?\n/)[0];
    done(200, { ffmpeg: true, version });
    ffmpeg.kill();
  });
  setTimeout(() => done(500, { ffmpeg: false, error: "FFmpeg health check timed out." }), 2500);
});

app.get("/api/logs", (_req, res) => {
  if (!fs.existsSync(LOG_PATH)) return res.json({ lines: [] });
  const lines = fs.readFileSync(LOG_PATH, "utf8").trim().split(/\r?\n/).filter(Boolean).slice(-200);
  res.json({ lines });
});

app.post("/api/client-log", (req, res) => {
  logEvent("client", req.body || {});
  res.json({ ok: true });
});

app.get("/api/browser-snapshot", async (req, res) => {
  const targetUrl = String(req.query.url || "").trim();
  const width = Math.min(Math.max(Number(req.query.width) || 1280, 320), 1920);
  const height = Math.min(Math.max(Number(req.query.height) || 720, 180), 1080);

  if (!/^https?:\/\//i.test(targetUrl)) {
    return res.status(400).json({ error: "Browser source URL must start with http:// or https://." });
  }
  if (!CHROME_PATH) {
    return res.status(500).json({ error: "Chrome or Edge was not found. Set CHROME_PATH in .env." });
  }

  try {
    const entry = await getOrCreatePage(targetUrl, width, height);
    // Serve the latest cached screenshot frame (captured with omitBackground: true)
    let image = entry.latestFrame;
    if (!image) {
      // Fallback: capture loop hasn't produced a frame yet, take one on-demand
      image = await entry.page.screenshot({ type: "png", fullPage: false, omitBackground: true });
    }
    entry.servedCount += 1;
    if (entry.servedCount <= 3 || entry.servedCount % 120 === 0) {
      logEvent("browser.snapshot.ok", { url: targetUrl, width, height, bytes: image.length, servedCount: entry.servedCount, frameCount: entry.frameCount });
    }
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "image/png");
    res.end(image);
  } catch (error) {
    logEvent("browser.snapshot.error", { url: targetUrl, error: error.message });
    const cacheKey = `${targetUrl}_${width}_${height}`;
    const cached = browserPages.get(cacheKey);
    if (cached) {
      browserPages.delete(cacheKey);
      try {
        if (cached.captureTimer) clearInterval(cached.captureTimer);
        await cached.page.close();
      } catch (e) {}
    }
    res.status(502).json({ error: `Browser source could not render: ${error.message}` });
  }
});

app.post("/api/livekit/token", auth, (req, res) => {
  if (!isLiveKitConfigured()) {
    return res.status(503).json({ error: "LiveKit is not configured yet. Add LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET to .env." });
  }

  const db = readDb();
  const show = db.shows.find((item) => item.id === req.body.showId && item.ownerId === req.user.id);
  if (!show) return res.status(404).json({ error: "Show not found." });
  ensureLiveKitRoom(show);
  writeDb(db);

  res.json({
    url: LIVEKIT_URL,
    room: show.livekitRoom,
    identity: `host-${req.user.id}`,
    token: createLiveKitToken({
      identity: `host-${req.user.id}`,
      name: req.user.name,
      room: show.livekitRoom,
      role: "host",
      roomAdmin: true
    })
  });
});

app.post("/api/livekit/guest-token", (req, res) => {
  if (!isLiveKitConfigured()) {
    return res.status(503).json({ error: "LiveKit is not configured yet." });
  }

  const db = readDb();
  const show = db.shows.find((item) => item.inviteToken === req.body.inviteToken);
  if (!show) return res.status(404).json({ error: "Invite not found." });
  ensureLiveKitRoom(show);
  writeDb(db);

  const guestName = String(req.body.name || "Guest").slice(0, 60);
  const identity = `guest-${show.id}-${nanoid(8)}`;
  res.json({
    url: LIVEKIT_URL,
    room: show.livekitRoom,
    identity,
    token: createLiveKitToken({
      identity,
      name: guestName,
      room: show.livekitRoom,
      role: "guest",
      roomAdmin: false
    })
  });
});

app.post("/api/broadcasts/:showId/start", auth, (req, res) => {
  const db = readDb();
  const show = db.shows.find((item) => item.id === req.params.showId && item.ownerId === req.user.id);
  if (!show) return res.status(404).json({ error: "Show not found." });
  stopBroadcast(show.id);
  show.status = "starting";
  show.relayReconnect = req.body.relayReconnect !== false;
  show.updatedAt = now();
  writeDb(db);
  logEvent("broadcast.start.requested", { showId: show.id, ownerId: req.user.id });
  if (req.body.mode === "backend-compositor") {
    const destinations = db.destinations.filter((item) => item.ownerId === req.user.id && item.enabled);
    const fps = Math.min(Math.max(Number(req.body.fps) || 30, 5), 30);
    const videoBitrate = Math.min(Math.max(Number(req.body.videoBitrate) || 3500, 1500), 6000);
    const audioBitrate = Math.min(Math.max(Number(req.body.audioBitrate) || 128, 64), 256);
    const broadcast = startBackendCompositorBroadcast({
      show,
      ownerId: req.user.id,
      destinations,
      fps,
      videoBitrate,
      audioBitrate
    });
    activeBroadcasts.set(show.id, broadcast);
    return res.json({
      mode: "backend-compositor",
      sourceIngestUrl: `/source-ingest?token=${jwt.sign({ sub: req.user.id, showId: show.id }, JWT_SECRET, { expiresIn: "6h" })}`,
      show
    });
  }
  res.json({
    ingestUrl: `/ingest?token=${jwt.sign({ sub: req.user.id, showId: show.id }, JWT_SECRET, { expiresIn: "6h" })}`,
    show
  });
});

app.post("/api/broadcasts/:showId/stop", auth, (req, res) => {
  stopBroadcast(req.params.showId);
  const db = readDb();
  const show = db.shows.find((item) => item.id === req.params.showId && item.ownerId === req.user.id);
  if (show) {
    show.status = "ended";
    show.updatedAt = now();
  }
  writeDb(db);
  res.json({ ok: true });
});

app.get("/api/broadcasts/:showId/status", auth, (req, res) => {
  const active = activeBroadcasts.get(req.params.showId);
  if (active) return res.json(summarizeBroadcast(active));

  const db = readDb();
  const show = db.shows.find((item) => item.id === req.params.showId && item.ownerId === req.user.id);
  if (show && ["live", "starting"].includes(show.status)) {
    show.status = "interrupted";
    show.updatedAt = now();
    writeDb(db);
    return res.json({ status: "interrupted", reason: "No active ingest connection." });
  }

  res.json({ status: "idle" });
});

app.get("/backend-program/:showId", (req, res) => {
  const broadcast = activeBroadcasts.get(req.params.showId);
  if (!broadcast || broadcast.mode !== "backend-compositor" || req.query.token !== broadcast.renderToken) {
    return res.status(404).send("Program renderer is not available.");
  }
  res.type("html").send(`<!doctype html>
<html><head><meta charset="utf-8"><style>
html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#050708}
canvas{display:block;width:100vw;height:100vh;background:#050708}
</style></head><body><canvas id="program" width="1280" height="720"></canvas>
<script>
const canvas=document.getElementById('program');
const ctx=canvas.getContext('2d');
let state={layout:'grid',sources:[],overlays:[],ticker:{enabled:false,text:''},brand:{logo:'LIVE',accent:'#bbc3ff'},lowerThird:null,comment:null};
const images=new Map();
function roundRect(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function rects(count){if(state.layout==='spotlight')return Array.from({length:count},(_,i)=>i===0?{x:0,y:0,w:1280,h:720}:{x:1040,y:24+(i-1)*130,w:210,h:118});if(state.layout==='pip')return Array.from({length:count},(_,i)=>i===0?{x:0,y:0,w:1280,h:720}:{x:912,y:494-(i-1)*176,w:320,h:180});const c=Math.ceil(Math.sqrt(count||1)),r=Math.ceil((count||1)/c),g=14,cw=(1280-g*(c+1))/c,ch=(720-g*(r+1))/r;return Array.from({length:count},(_,i)=>({x:g+(i%c)*(cw+g),y:g+Math.floor(i/c)*(ch+g),w:cw,h:ch}));}
function loadImage(src,id){if(!src)return images.get(id)?.ready||null;const current=images.get(id);if(current?.src===src)return current.ready||null;const img=new Image();const entry={src,img,ready:current?.ready||null};img.onload=()=>{entry.ready=img;};img.onerror=()=>{entry.ready=current?.ready||null;};img.src=src;images.set(id,entry);return entry.ready;}
async function pull(){try{const r=await fetch('/api/backend-program/${req.params.showId}/state?token=${encodeURIComponent(broadcast.renderToken)}&t='+Date.now(),{cache:'no-store'});if(r.ok)state=await r.json();}catch{}setTimeout(pull,83);}
function drawMedia(src,rect){ctx.save();roundRect(rect.x,rect.y,rect.w,rect.h,12);ctx.clip();ctx.fillStyle='#0e1418';ctx.fillRect(rect.x,rect.y,rect.w,rect.h);const img=loadImage(src.frame,src.id);if(img&&img.naturalWidth){const scale=Math.max(rect.w/img.naturalWidth,rect.h/img.naturalHeight);const w=img.naturalWidth*scale,h=img.naturalHeight*scale;ctx.drawImage(img,rect.x+(rect.w-w)/2,rect.y+(rect.h-h)/2,w,h);}else{ctx.fillStyle='#2d8bb8';ctx.fillRect(rect.x,rect.y,rect.w,rect.h);ctx.fillStyle='#fff';ctx.font='800 64px Arial';ctx.textAlign='center';ctx.fillText((src.label||'SRC').slice(0,2).toUpperCase(),rect.x+rect.w/2,rect.y+rect.h/2);}ctx.restore();}
function draw(){ctx.fillStyle='#050708';ctx.fillRect(0,0,1280,720);const visible=(state.sources||[]).filter(s=>s.visible!==false);const rs=rects(visible.length);visible.forEach((s,i)=>drawMedia(s,rs[i]));for(const overlay of state.overlays||[]){if(!overlay.enabled)continue;if(overlay.type==='browser'&&overlay.frame){const img=loadImage(overlay.frame,'overlay-'+overlay.id);if(img&&img.naturalWidth)ctx.drawImage(img,0,0,1280,720);}if(overlay.type==='template'){ctx.fillStyle='rgba(5,7,8,.86)';roundRect(420,610,440,58,12);ctx.fill();ctx.fillStyle=state.brand?.accent||'#bbc3ff';roundRect(436,622,112,34,8);ctx.fill();ctx.fillStyle='#06110e';ctx.font='800 17px Arial';ctx.fillText('LIVE',448,645);ctx.fillStyle='#fff';ctx.font='700 20px Arial';ctx.fillText(overlay.text||overlay.name||'',568,645,260);}}if(state.brand?.logo){ctx.fillStyle=state.brand.accent||'#bbc3ff';roundRect(32,28,88,46,8);ctx.fill();ctx.fillStyle='#06110e';ctx.font='800 24px Arial';ctx.fillText(String(state.brand.logo).toUpperCase(),50,58);}if(state.lowerThird?.enabled){ctx.fillStyle='rgba(5,7,8,.84)';roundRect(32,562,470,92,10);ctx.fill();ctx.fillStyle='#fff';ctx.font='800 34px Arial';ctx.fillText(state.lowerThird.name||'',64,606);ctx.fillStyle='rgba(255,255,255,.78)';ctx.font='500 20px Arial';ctx.fillText(state.lowerThird.title||'',64,636);}if(state.ticker?.enabled&&state.ticker.text){ctx.fillStyle='#bbc3ff';ctx.fillRect(0,668,1280,52);ctx.fillStyle='#06110e';ctx.font='800 24px Arial';const x=1280-((Date.now()/20)% (ctx.measureText(state.ticker.text).width+1400));ctx.fillText(state.ticker.text,x,702);}requestAnimationFrame(draw);}
pull();draw();
</script></body></html>`);
});

app.get("/api/backend-program/:showId/state", (req, res) => {
  const broadcast = activeBroadcasts.get(req.params.showId);
  if (!broadcast || broadcast.mode !== "backend-compositor" || req.query.token !== broadcast.renderToken) {
    return res.status(404).json({ error: "Program state not available." });
  }
  res.json(broadcast.programState);
});

function redactDestination(destination) {
  return {
    ...destination,
    streamKey: destination.streamKey ? "********" : ""
  };
}

function isLiveKitConfigured() {
  return Boolean(LIVEKIT_URL && LIVEKIT_API_KEY && LIVEKIT_API_SECRET);
}

function ensureLiveKitRoom(show) {
  if (!show.livekitRoom) show.livekitRoom = `show-${show.id}`;
  return show.livekitRoom;
}

function createLiveKitToken({ identity, name, room, role, roomAdmin }) {
  const payload = {
    iss: LIVEKIT_API_KEY,
    sub: identity,
    name,
    metadata: JSON.stringify({ role }),
    video: {
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
      roomAdmin: Boolean(roomAdmin)
    }
  };
  return jwt.sign(payload, LIVEKIT_API_SECRET, {
    algorithm: "HS256",
    expiresIn: "6h",
    notBefore: 0
  });
}

server.on("upgrade", (request, socket, head) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (!["/ingest", "/source-ingest"].includes(url.pathname)) {
    socket.destroy();
    return;
  }

  try {
    const payload = jwt.verify(url.searchParams.get("token") || "", JWT_SECRET);
    const target = url.pathname === "/source-ingest" ? sourceWss : wss;
    target.handleUpgrade(request, socket, head, (ws) => {
      target.emit("connection", ws, request, payload);
    });
  } catch {
    socket.destroy();
  }
});

sourceWss.on("connection", (ws, _request, payload) => {
  const broadcast = activeBroadcasts.get(payload.showId);
  if (!broadcast || broadcast.ownerId !== payload.sub || broadcast.mode !== "backend-compositor") {
    ws.close(1008, "Backend compositor broadcast not found");
    return;
  }
  broadcast.sourceSocket = ws;
  broadcast.lastChunkAt = Date.now();
  logEvent("source-ingest.connected", { showId: payload.showId, ownerId: payload.sub });

  ws.on("message", (chunk) => {
    let message;
    try {
      message = JSON.parse(Buffer.isBuffer(chunk) ? chunk.toString("utf8") : String(chunk));
    } catch {
      return;
    }
    broadcast.bytesIn += Buffer.byteLength(JSON.stringify(message));
    broadcast.lastChunkAt = Date.now();
    applyBackendProgramMessage(broadcast, message);
  });

  ws.on("close", () => {
    logEvent("source-ingest.closed", { showId: payload.showId, bytesIn: broadcast.bytesIn });
    if (broadcast.sourceSocket === ws) broadcast.sourceSocket = null;
    markBroadcastInterrupted(broadcast, "Source feed disconnected.");
  });
});

wss.on("connection", (ws, _request, payload) => {
  const db = readDb();
  const show = db.shows.find((item) => item.id === payload.showId && item.ownerId === payload.sub);
  if (!show) {
    ws.close(1008, "Show not found");
    return;
  }

  const destinations = db.destinations.filter((item) => item.ownerId === payload.sub && item.enabled);
  show.status = "live";
  show.updatedAt = now();
  writeDb(db);
  const url = new URL(_request.url, `http://${_request.headers.host}`);
  const ingestFormat = url.searchParams.get("format") === "mjpeg" ? "mjpeg" : "webm";
  const audioFormat = url.searchParams.get("audio") === "webm" ? "webm" : "silent";
  const fps = Math.min(Math.max(Number(url.searchParams.get("fps")) || 30, 5), 60);
  const videoBitrate = Math.min(Math.max(Number(url.searchParams.get("vbitrate")) || 3500, 1500), 6000);
  const audioBitrate = Math.min(Math.max(Number(url.searchParams.get("abitrate")) || 128, 64), 256);
  const broadcast = startBroadcast({ show, ownerId: payload.sub, destinations, ingestFormat, audioFormat, fps, videoBitrate, audioBitrate });
  activeBroadcasts.set(show.id, broadcast);
  logEvent("ingest.connected", { showId: show.id, ownerId: payload.sub, destinations: destinations.length, ingestFormat, audioFormat, fps, videoBitrate, audioBitrate });

  ws.on("message", (chunk) => {
    const packet = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    const isTypedPacket = broadcast.ingestFormat === "mjpeg" && (packet[0] === 1 || packet[0] === 2);
    const packetType = isTypedPacket ? packet[0] : 1;
    const payloadBuffer = isTypedPacket ? packet.subarray(1) : packet;
    broadcast.bytesIn += payloadBuffer.length;
    broadcast.lastChunkAt = Date.now();
    broadcast.recording.write(payloadBuffer);
    if (broadcast.ingestFormat === "mjpeg" && packetType === 1) {
      broadcast.latestFrame = Buffer.from(payloadBuffer);
    }
    if (broadcast.bytesIn - broadcast.lastLoggedBytes >= 1024 * 1024) {
      broadcast.lastLoggedBytes = broadcast.bytesIn;
      logEvent("ingest.bytes", { showId: show.id, bytesIn: broadcast.bytesIn });
    }
    for (const relay of broadcast.relays) {
      ensureRelayProcess(relay);
      if (relay.process.stdin.destroyed || relay.process.killed) continue;
      if (broadcast.ingestFormat === "mjpeg") {
        if (packetType === 1) {
          relay.latestFrame = broadcast.latestFrame;
          ensureFramePump(relay);
        } else if (packetType === 2 && relay.audioInput && !relay.audioInput.destroyed) {
          relay.audioInput.write(payloadBuffer);
        }
        continue;
      }
      try {
        relay.process.stdin.write(payloadBuffer);
      } catch (error) {
        relay.status = "failed";
        relay.errors.push(error.message);
        relay.errors = relay.errors.slice(-5);
      }
    }
  });

  ws.on("close", () => {
    logEvent("ingest.closed", { showId: show.id, bytesIn: broadcast.bytesIn });
    finishBroadcast(show.id);
  });

  ws.on("error", () => {
    logEvent("ingest.error", { showId: show.id, bytesIn: broadcast.bytesIn });
    finishBroadcast(show.id);
  });

  ws.send(JSON.stringify({ type: "started", broadcast: summarizeBroadcast(broadcast) }));
});

function startBroadcast({ show, ownerId, destinations, ingestFormat = "webm", audioFormat = "silent", fps = 30, videoBitrate = 3500, audioBitrate = 128 }) {
  const startedAt = now();
  const extension = ingestFormat === "mjpeg" ? "mjpeg" : "webm";
  const filename = `${show.id}-${Date.now()}.${extension}`;
  const recordingPath = path.join(RECORDING_DIR, filename);
  const recording = fs.createWriteStream(recordingPath);
  const relays = destinations.map((destination) => startRelay(destination, { reconnect: show.relayReconnect !== false, ingestFormat, audioFormat, fps, videoBitrate, audioBitrate }));
  return {
    showId: show.id,
    ownerId,
    startedAt,
    recording,
    recordingPath,
    recordingUrl: `/recordings/${filename}`,
    relays,
    ingestFormat,
    audioFormat,
    fps,
    videoBitrate,
    audioBitrate,
    latestFrame: null,
    bytesIn: 0,
    lastChunkAt: Date.now(),
    lastLoggedBytes: 0,
    status: "live"
  };
}

function startBackendCompositorBroadcast({ show, ownerId, destinations, fps = 30, videoBitrate = 3500, audioBitrate = 128 }) {
  const startedAt = now();
  const renderToken = nanoid(32);
  const relays = destinations.map((destination) => startBackendRelay(destination, { fps, videoBitrate, audioBitrate }));
  const broadcast = {
    mode: "backend-compositor",
    showId: show.id,
    ownerId,
    startedAt,
    relays,
    fps,
    videoBitrate,
    audioBitrate,
    bytesIn: 0,
    lastChunkAt: Date.now(),
    status: "starting",
    renderToken,
    captureTimer: null,
    rendererPage: null,
    sourceSocket: null,
    programState: {
      layout: "grid",
      sources: [],
      overlays: [],
      ticker: { enabled: false, text: "" },
      brand: { logo: "LIVE", accent: "#bbc3ff" },
      lowerThird: null,
      comment: null
    }
  };
  launchBackendRenderer(broadcast).catch((error) => {
    broadcast.status = "failed";
    broadcast.relays.forEach((relay) => relay.errors.push(error.message));
    logEvent("backend-compositor.error", { showId: show.id, error: error.message });
  });
  logEvent("backend-compositor.starting", { showId: show.id, ownerId, destinations: destinations.length, fps, videoBitrate, audioBitrate });
  return broadcast;
}

function startBackendRelay(destination, options) {
  const target = buildRtmpTarget(destination);
  const effectiveFps = Math.min(Math.max(Number(options.fps) || 30, 5), 12);
  const relay = {
    destination,
    destinationId: destination.id,
    name: destination.name,
    target: redactRtmpTarget(target),
    rawTarget: target,
    status: "starting",
    errors: [],
    process: null,
    stopping: false
  };
  const args = [
    "-hide_banner",
    "-loglevel",
    "warning",
    "-fflags",
    "+genpts",
    "-f",
    "image2pipe",
    "-vcodec",
    "mjpeg",
    "-framerate",
    String(effectiveFps),
    "-i",
    "pipe:0",
    "-f",
    "lavfi",
    "-i",
    "anullsrc=channel_layout=stereo:sample_rate=48000",
    "-map",
    "0:v:0",
    "-map",
    "1:a:0",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "zerolatency",
    "-b:v",
    `${options.videoBitrate}k`,
    "-maxrate",
    `${Math.round(options.videoBitrate * 1.15)}k`,
    "-bufsize",
    `${Math.round(options.videoBitrate * 2)}k`,
    "-g",
    String(effectiveFps * 2),
    "-keyint_min",
    String(effectiveFps),
    "-force_key_frames",
    "expr:gte(t,n_forced*2)",
    "-sc_threshold",
    "0",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    `${options.audioBitrate}k`,
    "-shortest",
    "-flvflags",
    "no_duration_filesize",
    "-f",
    "flv",
    target
  ];
  const process = spawn(FFMPEG_PATH, args, { stdio: ["pipe", "ignore", "pipe"] });
  relay.process = process;
  relay.status = "live";
  process.stdin.on("error", (error) => {
    relay.status = "failed";
    relay.errors.push(error.message);
    relay.errors = relay.errors.slice(-5);
    logEvent("backend-relay.stdin.error", { destinationId: relay.destinationId, name: relay.name, error: error.message });
  });
  process.stderr.on("data", (data) => {
    relay.status = "warning";
    const message = data.toString().trim();
    relay.errors.push(message);
    relay.errors = relay.errors.slice(-5);
    logEvent("backend-relay.stderr", { destinationId: relay.destinationId, name: relay.name, message });
  });
  process.on("exit", (code) => {
    relay.status = relay.stopping ? "ended" : "failed";
    relay.errors.push(`Backend relay exited with code ${code}.`);
    relay.errors = relay.errors.slice(-5);
    logEvent("backend-relay.exited", { destinationId: relay.destinationId, name: relay.name, code, stopping: relay.stopping });
  });
  logEvent("backend-relay.spawned", { destinationId: relay.destinationId, name: relay.name, target: relay.target, requestedFps: options.fps, fps: effectiveFps, videoBitrate: options.videoBitrate });
  return relay;
}

async function launchBackendRenderer(broadcast) {
  const browser = await getBrowserRenderer();
  const page = await browser.newPage();
  broadcast.rendererPage = page;
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${PORT}/backend-program/${broadcast.showId}?token=${encodeURIComponent(broadcast.renderToken)}`, {
    waitUntil: "domcontentloaded"
  });
  broadcast.status = "live";
  const captureFps = Math.min(Math.max(Number(broadcast.fps) || 30, 5), 12);
  const interval = Math.max(83, Math.round(1000 / captureFps));
  broadcast.captureTimer = setInterval(async () => {
    if (broadcast.status !== "live") return;
    const msSinceLastChunk = Date.now() - (broadcast.lastChunkAt || Date.now());
    if (!broadcast.sourceSocket || msSinceLastChunk > SOURCE_STALL_MS) {
      markBroadcastInterrupted(broadcast, !broadcast.sourceSocket ? "Source feed disconnected." : "Source feed timed out.");
      return;
    }
    if (broadcast.captureBusy) return;
    broadcast.captureBusy = true;
    try {
      const dataUrl = await page.evaluate(() => document.getElementById("program")?.toDataURL("image/jpeg", 0.82) || "");
      const frame = Buffer.from(dataUrl.replace(/^data:image\/jpeg;base64,/, ""), "base64");
      if (!frame.length) return;
      for (const relay of broadcast.relays) {
        if (relay.stopping || !relay.process || relay.process.stdin.destroyed || relay.process.killed) continue;
        if (relay.process.stdin.writableLength > 12 * 1024 * 1024) continue;
        relay.process.stdin.write(frame);
      }
    } catch (error) {
      logEvent("backend-compositor.capture.error", { showId: broadcast.showId, error: error.message });
    } finally {
      broadcast.captureBusy = false;
    }
  }, interval);
  logEvent("backend-compositor.live", { showId: broadcast.showId, requestedFps: broadcast.fps, fps: captureFps });
}

function applyBackendProgramMessage(broadcast, message) {
  if (message.type === "program-state") {
    broadcast.programState = {
      ...broadcast.programState,
      ...message.state,
      sources: broadcast.programState.sources
    };
    return;
  }
  if (message.type === "source-frame") {
    const source = {
      id: String(message.id || ""),
      label: String(message.label || "Source"),
      kind: String(message.kind || "source"),
      visible: message.visible !== false,
      frame: String(message.frame || "")
    };
    if (!source.id || !source.frame.startsWith("data:image/")) return;
    const existingIndex = broadcast.programState.sources.findIndex((item) => item.id === source.id);
    if (existingIndex >= 0) {
      broadcast.programState.sources[existingIndex] = { ...broadcast.programState.sources[existingIndex], ...source };
    } else {
      broadcast.programState.sources.push(source);
    }
    broadcast.programState.sources = broadcast.programState.sources.slice(-12);
  }
}

function startRelay(destination, options = {}) {
  const target = buildRtmpTarget(destination);
  const relay = {
    destination,
    destinationId: destination.id,
    name: destination.name,
    target: redactRtmpTarget(target),
    rawTarget: target,
    status: "starting",
    process: null,
    errors: [],
    restartCount: 0,
    reconnect: options.reconnect !== false,
    ingestFormat: options.ingestFormat || "webm",
    audioFormat: options.audioFormat || "silent",
    fps: options.fps || 30,
    videoBitrate: options.videoBitrate || 3500,
    audioBitrate: options.audioBitrate || 128,
    latestFrame: null,
    frameTimer: null,
    audioInput: null,
    stopping: false
  };
  launchRelayProcess(relay);
  return relay;
}

function launchRelayProcess(relay) {
  const inputArgs = relay.ingestFormat === "mjpeg"
    ? relay.audioFormat === "webm"
      ? [
        "-fflags",
        "+genpts",
        "-f",
        "mjpeg",
        "-framerate",
        String(relay.fps),
        "-i",
        "pipe:0",
        "-f",
        "webm",
        "-i",
        "pipe:3"
      ]
      : [
        "-fflags",
        "+genpts",
        "-f",
        "mjpeg",
        "-framerate",
        String(relay.fps),
        "-i",
        "pipe:0",
        "-f",
        "lavfi",
        "-i",
        "anullsrc=channel_layout=stereo:sample_rate=48000"
      ]
    : [
        "-fflags",
        "+genpts",
        "-analyzeduration",
        "1000000",
        "-probesize",
        "1000000",
        "-i",
        "pipe:0"
      ];
  const videoBitrate = `${relay.videoBitrate}k`;
  const maxrate = `${Math.round(relay.videoBitrate * 1.15)}k`;
  const bufsize = `${Math.round(relay.videoBitrate * 2)}k`;
  const audioBitrate = `${relay.audioBitrate}k`;
  const args = [
    "-hide_banner",
    "-loglevel",
    "warning",
    ...inputArgs,
    "-map",
    "0:v:0",
    "-map",
    relay.ingestFormat === "mjpeg" ? "1:a:0" : "0:a:0?",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "zerolatency",
    "-b:v",
    videoBitrate,
    "-maxrate",
    maxrate,
    "-bufsize",
    bufsize,
    "-g",
    String(relay.fps * 2),
    "-sc_threshold",
    "0",
    "-r",
    String(relay.fps),
    "-fps_mode",
    "cfr",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    audioBitrate,
    "-flvflags",
    "no_duration_filesize",
    "-f",
    "flv",
    relay.rawTarget
  ];
  const process = spawn(FFMPEG_PATH, args, { stdio: relay.ingestFormat === "mjpeg" && relay.audioFormat === "webm" ? ["pipe", "ignore", "pipe", "pipe"] : ["pipe", "ignore", "pipe"] });
  relay.process = process;
  relay.audioInput = relay.ingestFormat === "mjpeg" && relay.audioFormat === "webm" ? process.stdio[3] : null;
  relay.status = "live";
  if (relay.ingestFormat === "mjpeg") ensureFramePump(relay);
  logEvent("relay.spawned", {
    destinationId: relay.destinationId,
    name: relay.name,
    target: relay.target,
    restartCount: relay.restartCount,
    ingestFormat: relay.ingestFormat,
    fps: relay.fps,
    videoBitrate: relay.videoBitrate,
    audioBitrate: relay.audioBitrate
  });
  process.stdin.on("error", (error) => {
    relay.status = "failed";
    relay.errors.push(error.message);
    relay.errors = relay.errors.slice(-5);
    logEvent("relay.stdin.error", { destinationId: relay.destinationId, name: relay.name, error: error.message });
  });
  relay.audioInput?.on("error", (error) => {
    relay.status = "warning";
    relay.errors.push(`Audio pipe: ${error.message}`);
    relay.errors = relay.errors.slice(-5);
    logEvent("relay.audio.error", { destinationId: relay.destinationId, name: relay.name, error: error.message });
  });
  process.stderr.on("data", (data) => {
    relay.status = "warning";
    const message = data.toString().trim();
    relay.errors.push(message);
    relay.errors = relay.errors.slice(-5);
    logEvent("relay.stderr", { destinationId: relay.destinationId, name: relay.name, message });
  });
  process.on("error", (error) => {
    relay.status = "failed";
    relay.errors.push(error.message);
    relay.errors = relay.errors.slice(-5);
    logEvent("relay.process.error", { destinationId: relay.destinationId, name: relay.name, error: error.message });
  });
  process.on("exit", (code) => {
    if (relay.stopping) {
      relay.status = code === 0 ? "ended" : "failed";
      relay.exitCode = code;
      logEvent("relay.exited", { destinationId: relay.destinationId, name: relay.name, code, stopping: true });
      return;
    }
    relay.status = "reconnecting";
    relay.exitCode = code;
    if (relay.ingestFormat === "webm") {
      relay.status = "failed";
      relay.errors.push("Relay exited; WebM ingest cannot reconnect mid-stream. Stop and start Go Live to begin a fresh encoder session.");
      relay.errors = relay.errors.slice(-5);
      logEvent("relay.restart.skipped", {
        destinationId: relay.destinationId,
        name: relay.name,
        ingestFormat: relay.ingestFormat,
        reason: "webm_midstream_restart_unsupported"
      });
      return;
    }
    relay.errors.push(`Relay exited with code ${code}; reconnecting.`);
    relay.errors = relay.errors.slice(-5);
    logEvent("relay.exited", { destinationId: relay.destinationId, name: relay.name, code, stopping: false });
    scheduleRelayRestart(relay);
  });
}

function ensureFramePump(relay) {
  if (relay.ingestFormat !== "mjpeg" || relay.frameTimer || relay.stopping) return;
  const interval = 1000 / relay.fps;
  relay.frameTimer = setInterval(() => {
    if (relay.stopping || !relay.process || relay.process.stdin.destroyed || relay.process.killed) return;
    if (!relay.latestFrame) return;
    if (relay.process.stdin.writableLength > 8 * 1024 * 1024) return;
    try {
      relay.process.stdin.write(relay.latestFrame);
    } catch (error) {
      relay.status = "failed";
      relay.errors.push(error.message);
      relay.errors = relay.errors.slice(-5);
    }
  }, interval);
}

function scheduleRelayRestart(relay) {
  if (relay.stopping || relay.restartTimer) return;
  if (!relay.reconnect) {
    relay.status = "failed";
    relay.errors.push("Relay exited and automatic reconnect is disabled.");
    relay.errors = relay.errors.slice(-5);
    return;
  }
  if (relay.restartCount >= 8) {
    relay.status = "failed";
    relay.errors.push("Relay restart limit reached.");
    relay.errors = relay.errors.slice(-5);
    return;
  }
  relay.restartCount += 1;
  logEvent("relay.restart.scheduled", { destinationId: relay.destinationId, name: relay.name, restartCount: relay.restartCount });
  relay.restartTimer = setTimeout(() => {
    relay.restartTimer = null;
    if (!relay.stopping) {
      if (relay.frameTimer) clearInterval(relay.frameTimer);
      relay.frameTimer = null;
      launchRelayProcess(relay);
    }
  }, Math.min(1000 * relay.restartCount, 5000));
}

function ensureRelayProcess(relay) {
  if (relay.stopping) return;
  if (!relay.process || relay.process.killed || relay.process.exitCode !== null || relay.process.stdin.destroyed) {
    scheduleRelayRestart(relay);
  }
}

function buildRtmpTarget(destination) {
  const base = String(destination.rtmpUrl || "").trim().replace(/\/$/, "");
  const key = String(destination.streamKey || "").trim().replace(/^\//, "");
  if (!key) return base;
  if (base.includes("{streamKey}")) return base.replaceAll("{streamKey}", encodeURIComponent(key));
  if (base.includes("{key}")) return base.replaceAll("{key}", encodeURIComponent(key));
  if (/[?&]token=/.test(base)) return base;
  if (base.includes("?")) return `${base}&token=${encodeURIComponent(key)}`;
  if (/\.stream$/i.test(base)) return `${base}?token=${encodeURIComponent(key)}`;
  if (base.endsWith(`/${key}`) || base.endsWith(key)) return base;
  return `${base}/${key}`;
}

function redactRtmpTarget(target) {
  const text = String(target);
  const withRedactedParams = text.replace(/([?&](?:token|key)=)([^&]+)/gi, "$1********");
  if (withRedactedParams !== text) return withRedactedParams;
  return text.replace(/([^/]{4})[^/]*$/, "$1********");
}

function finishBroadcast(showId) {
  const broadcast = activeBroadcasts.get(showId);
  if (!broadcast) return;
  broadcast.status = "ended";
  if (broadcast.captureTimer) clearInterval(broadcast.captureTimer);
  broadcast.captureTimer = null;
  if (broadcast.sourceSocket && broadcast.sourceSocket.readyState === broadcast.sourceSocket.OPEN) {
    broadcast.sourceSocket.close();
  }
  if (broadcast.rendererPage) {
    broadcast.rendererPage.close().catch(() => {});
  }
  if (broadcast.recording) broadcast.recording.end();
  for (const relay of broadcast.relays) {
    relay.stopping = true;
    if (relay.restartTimer) clearTimeout(relay.restartTimer);
    if (relay.frameTimer) clearInterval(relay.frameTimer);
    if (relay.audioInput && !relay.audioInput.destroyed) relay.audioInput.end();
    if (relay.process && !relay.process.stdin.destroyed) relay.process.stdin.end();
  }

  const db = readDb();
  if (broadcast.recordingUrl) {
    db.recordings.unshift({
      id: nanoid(),
      ownerId: broadcast.ownerId,
      showId,
      url: broadcast.recordingUrl,
      path: broadcast.recordingPath,
      bytesIn: broadcast.bytesIn,
      createdAt: now()
    });
  }
  const show = db.shows.find((item) => item.id === showId);
  if (show && show.status === "live") {
    show.status = "ended";
    show.updatedAt = now();
  }
  writeDb(db);
  activeBroadcasts.delete(showId);
}

function stopBroadcast(showId) {
  finishBroadcast(showId);
}

function markBroadcastInterrupted(broadcast, reason) {
  if (!broadcast || ["ended", "interrupted", "failed"].includes(broadcast.status)) return;
  broadcast.status = "interrupted";
  broadcast.interruptReason = reason;
  if (broadcast.captureTimer) clearInterval(broadcast.captureTimer);
  broadcast.captureTimer = null;
  if (broadcast.sourceSocket && broadcast.sourceSocket.readyState === broadcast.sourceSocket.OPEN) {
    broadcast.sourceSocket.close();
  }
  broadcast.sourceSocket = null;
  if (broadcast.rendererPage) {
    broadcast.rendererPage.close().catch(() => {});
    broadcast.rendererPage = null;
  }
  for (const relay of broadcast.relays) {
    relay.stopping = true;
    relay.status = relay.status === "failed" ? "failed" : "interrupted";
    relay.errors.push(reason);
    relay.errors = relay.errors.slice(-5);
    if (relay.process && !relay.process.stdin.destroyed) relay.process.stdin.end();
  }
  const db = readDb();
  const show = db.shows.find((item) => item.id === broadcast.showId);
  if (show && ["live", "starting"].includes(show.status)) {
    show.status = "interrupted";
    show.updatedAt = now();
    writeDb(db);
  }
  logEvent("broadcast.interrupted", { showId: broadcast.showId, reason, bytesIn: broadcast.bytesIn });
}

function summarizeBroadcast(broadcast) {
  const msSinceLastChunk = Date.now() - (broadcast.lastChunkAt || Date.now());
  const stalled = broadcast.status === "live" && msSinceLastChunk > SOURCE_STALL_MS;
  return {
    status: stalled ? "stalled" : broadcast.status,
    reason: broadcast.interruptReason,
    mode: broadcast.mode || "browser-ingest",
    showId: broadcast.showId,
    startedAt: broadcast.startedAt,
    bytesIn: broadcast.bytesIn,
    msSinceLastChunk,
    recordingUrl: broadcast.recordingUrl,
    relays: broadcast.relays.map((relay) => ({
      destinationId: relay.destinationId,
      name: relay.name,
      target: relay.target,
      status: relay.status,
      errors: relay.errors
    }))
  };
}

server.listen(PORT, () => {
  markInterruptedBroadcasts();
  logEvent("server.started", { url: `http://127.0.0.1:${PORT}` });
});

function markInterruptedBroadcasts() {
  const db = readDb();
  let changed = false;
  for (const show of db.shows) {
    if (show.status === "live") {
      show.status = "interrupted";
      show.updatedAt = now();
      changed = true;
    }
  }
  if (changed) writeDb(db);
}
