const icons = {
  sources: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  brand: '<svg viewBox="0 0 24 24"><path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8z"/></svg>',
  destinations: '<svg viewBox="0 0 24 24"><path d="M4 12h12"/><path d="M12 6l6 6-6 6"/><path d="M20 4v16"/></svg>',
  recordings: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="12" cy="12" r="3"/></svg>',
  scenes: '<svg viewBox="0 0 24 24"><path d="M4 5h16"/><path d="M6 9h12v10H6z"/><path d="M9 12h6"/><path d="M9 15h4"/></svg>',
  comments: '<svg viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>',
  overlays: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10"/><path d="M7 12h6"/><path d="M15 14h4v3h-4z"/></svg>',
  browser: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><circle cx="7" cy="6.5" r=".5"/><circle cx="10" cy="6.5" r=".5"/></svg>',
  caption: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 13h4"/><path d="M13 13h4"/><path d="M7 16h7"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
  camera: '<svg viewBox="0 0 24 24"><path d="M14.5 4l1.5 3H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4l1.5-3z"/><circle cx="12" cy="13" r="3"/></svg>',
  screen: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/></svg>',
  image: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
  video: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="14" height="14" rx="2"/><path d="M17 9l4-2v10l-4-2z"/></svg>',
  "user-plus": '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/></svg>',
  eye: '<svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/></svg>',
  grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/><rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/></svg>',
  spotlight: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M9 9h6v6H9z"/></svg>',
  sidebar: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="12" height="14"/><path d="M18 6h3"/><path d="M18 12h3"/><path d="M18 18h3"/></svg>',
  pip: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><rect x="13" y="12" width="6" height="4"/></svg>',
  mic: '<svg viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/></svg>',
  record: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="currentColor" stroke="none"/></svg>',
  broadcast: '<svg viewBox="0 0 24 24"><path d="M5 16a9 9 0 1 1 14 0"/><path d="M8.5 13a5 5 0 1 1 7 0"/><circle cx="12" cy="12" r="2"/><path d="M12 14v7"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1"/></svg>'
};

const state = {
  sources: [],
  layout: "grid",
  primaryId: null,
  selectedSourceId: null,
  editingSceneId: null,
  activeComment: null,
  scenes: [],
  comments: [],
  overlays: [],
  browserOverlayImages: new Map(),
  overlayTemplates: [
    { id: "subscribe", name: "Subscribe Lower", config: { template: "subscribe", text: "Subscribe for more live sessions", position: "lower" } },
    { id: "breaking", name: "Breaking Strap", config: { template: "breaking", text: "Breaking update", position: "top" } },
    { id: "sponsor", name: "Sponsor Bug", config: { template: "sponsor", text: "Presented by Your Brand", position: "corner" } },
    { id: "agenda", name: "Agenda Card", config: { template: "agenda", text: "Today: Opening - Interview - Q&A", position: "right" } },
    { id: "countdown", name: "Countdown", config: { template: "countdown", text: "Starting soon", position: "center" } }
  ],
  commentsSince: null,
  live: false,
  recording: false,
  muted: false,
  tickerOffset: 1280,
  startedAt: null,
  recorder: null,
  liveRecorder: null,
  ingestSocket: null,
  liveFrameTimer: null,
  currentShow: null,
  livekitRoom: null,
  livekitConnected: false,
  statusPollTimer: null,
  liveChunkWatchTimer: null,
  liveCanvasFrameTimer: null,
  programVideoTrack: null,
  lastLiveChunkAt: null,
  liveBytesSent: 0,
  audioKeepAlives: [],
  audioContext: null,
  audioAnalyserTimer: null,
  programAudioLevel: 0,
  liveFrameEncoding: false,
  liveLastFrameAt: 0,
  mediaPlayAttempts: new WeakMap(),
  settings: {
    cameraDeviceId: "",
    microphoneDeviceId: "",
    audioOutputDeviceId: "",
    resolution: "1280x720",
    fps: 30,
    videoBitrate: 3500,
    audioBitrate: 128,
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    autoRecord: false,
    relayReconnect: true,
    deviceSetupComplete: false,
    settingsVersion: 4
  },
  auth: null,
  chunks: [],
  recordings: []
};
let authMode = "login";
let authResolver = null;
let authPromptPromise = null;
let deviceSetupPromise = null;
let hostCameraStartPromise = null;
let backendSessionPromise = null;

const canvas = document.querySelector("#programCanvas");
const ctx = canvas.getContext("2d");
const sourceList = document.querySelector("#sourceList");
const guestGrid = document.querySelector("#guestGrid");
const sourceTemplate = document.querySelector("#sourceTemplate");
const programEmpty = document.querySelector("#programEmpty");
const BROWSER_SOURCE_FPS = 12;
const BROWSER_SOURCE_INTERVAL = Math.round(1000 / BROWSER_SOURCE_FPS);

hydrateIcons(document);

function hydrateIcons(root) {
  root.querySelectorAll("[data-icon]").forEach((node) => {
    node.innerHTML = icons[node.dataset.icon] || "";
  });
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#${button.dataset.panel}-panel`).classList.add("active");
  });
});

document.querySelector("#cameraBtn").addEventListener("click", addCamera);
document.querySelector("#screenBtn").addEventListener("click", addScreen);
document.querySelector("#mediaBtn").addEventListener("click", () => document.querySelector("#mediaInput").click());
document.querySelector("#livekitJoinBtn").addEventListener("click", connectLiveKitRoom);
document.querySelector("#mediaInput").addEventListener("change", addMediaFile);
document.querySelector("#addGuestBtn").addEventListener("click", addGuestPlaceholder);
document.querySelector("#copyInviteBtn").addEventListener("click", copyInvite);
document.querySelector("#muteBtn").addEventListener("click", toggleMute);
document.querySelector("#recordBtn").addEventListener("click", toggleRecord);
document.querySelector("#liveBtn").addEventListener("click", toggleLive);
document.querySelector("#profileMenuBtn").addEventListener("click", logout);
document.querySelector("#authForm").addEventListener("submit", submitAuthForm);
document.querySelector("#authModeToggle").addEventListener("click", toggleAuthMode);
document.querySelector("#deviceSetupForm").addEventListener("submit", submitDeviceSetupForm);
document.querySelector("#studioSettingsBtn").addEventListener("click", openSettingsDrawer);
document.querySelector("#closeSettingsBtn").addEventListener("click", closeSettingsDrawer);
document.querySelector("#refreshDevicesBtn").addEventListener("click", populateDeviceSettings);
document.querySelector("#saveSettingsBtn").addEventListener("click", saveStudioSettings);
document.querySelector("#resetSettingsBtn").addEventListener("click", resetStudioSettings);
document.querySelector("#rtmpUrl").addEventListener("change", saveDestinationFromForm);
document.querySelector("#streamKey").addEventListener("change", saveDestinationFromForm);
document.querySelector("#saveSceneBtn").addEventListener("click", saveCurrentScene);
document.querySelector("#updateSceneBtn").addEventListener("click", updateEditedScene);
document.querySelector("#closeSceneEditorBtn").addEventListener("click", closeSceneEditor);
document.querySelector("#addBrowserSourceBtn").addEventListener("click", saveBrowserSource);
document.querySelector("#saveTickerPresetBtn").addEventListener("click", saveTickerPreset);
document.querySelector("#simulateCommentBtn").addEventListener("click", simulateComment);
document.querySelector("#addManualCommentBtn").addEventListener("click", addManualComment);
document.querySelector("#clearCommentBtn").addEventListener("click", () => {
  state.activeComment = null;
  renderComments();
});
document.querySelector("#sourceNameInput").addEventListener("input", updateSelectedSourceIdentity);
document.querySelector("#sourceTitleInput").addEventListener("input", updateSelectedSourceIdentity);
document.querySelector("#showGuestLowerBtn").addEventListener("click", showSelectedSourceLowerThird);
document.querySelector("#accentColor").addEventListener("input", (event) => {
  document.documentElement.style.setProperty("--accent", event.target.value);
});

document.querySelectorAll(".layout-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".layout-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.layout = button.dataset.layout;
  });
});

async function addCamera() {
  await addCameraSource({
    label: `Camera ${countKind("camera") + 1}`,
    title: "Host"
  });
}

async function startHostCameraSource() {
  const existing = state.sources.find((source) => source.kind === "camera" && source.isHostCamera);
  if (existing) return existing.id;
  if (hostCameraStartPromise) return hostCameraStartPromise;
  hostCameraStartPromise = addCameraSource({
    label: "Host",
    title: "Main presenter",
    detail: "Local camera and mic",
    isHostCamera: true
  }).finally(() => {
    hostCameraStartPromise = null;
  });
  return hostCameraStartPromise;
}

async function addCameraSource(options = {}) {
  try {
    const { width, height } = getSelectedResolution();
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: width },
        height: { ideal: height },
        frameRate: { ideal: state.settings.fps },
        ...(state.settings.cameraDeviceId ? { deviceId: { exact: state.settings.cameraDeviceId } } : {})
      },
      audio: getAudioConstraints()
    });
    const video = document.createElement("video");
    video.srcObject = stream;
    video.muted = true;
    video.playsInline = true;
    await video.play();
    if (state.settings.audioOutputDeviceId) await applyAudioOutputDevice(video);
    return addSource({
      kind: "camera",
      label: options.label || `Camera ${countKind("camera") + 1}`,
      title: options.title || "Host",
      detail: options.detail || "Local camera and mic",
      element: video,
      stream,
      audioEnabled: true,
      volume: 1,
      audioLevel: 0,
      isHostCamera: Boolean(options.isHostCamera)
    });
  } catch (error) {
    notify(`Camera could not start: ${error.message}`);
    return null;
  }
}

async function addScreen() {
  try {
    const { width, height } = getSelectedResolution();
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { width: { ideal: width }, height: { ideal: height }, frameRate: { ideal: state.settings.fps } },
      audio: true
    });
    const video = document.createElement("video");
    video.srcObject = stream;
    video.muted = true;
    video.playsInline = true;
    await video.play();
    addSource({
      kind: "screen",
      label: `Screen ${countKind("screen") + 1}`,
      title: "Screen share",
      detail: "Shared display",
      element: video,
      stream,
      audioEnabled: true,
      volume: 1,
      audioLevel: 0
    });
  } catch (error) {
    notify(`Screen share could not start: ${error.message}`);
  }
}

function addMediaFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  const isVideo = file.type.startsWith("video/");
  const element = document.createElement(isVideo ? "video" : "img");
  element.src = url;

  if (isVideo) {
    element.loop = true;
    element.muted = false;
    element.volume = 1;
    element.playsInline = true;
    element.preload = "auto";
    element.play().catch(() => {
      notify("Video was added, but the browser paused autoplay. Click the video source before going live if it does not move.");
    });
  }

  const source = {
    kind: isVideo ? "video" : "image",
    label: file.name,
    title: isVideo ? "Video asset" : "Image asset",
    detail: isVideo ? "Uploaded video" : "Uploaded image",
    element,
    objectUrl: url
  };
  if (isVideo) {
    source.audioEnabled = true;
    source.volume = 1;
    source.audioLevel = 0;
  }
  addSource(source);

  event.target.value = "";
}

function addGuestPlaceholder(options = {}) {
  const colors = ["#2d9cdb", "#f2994a", "#eb5757", "#9b51e0", "#27ae60"];
  const index = countKind("guest") + 1;
  const guest = document.createElement("canvas");
  guest.width = 640;
  guest.height = 360;
  const guestCtx = guest.getContext("2d");
  const color = colors[(index - 1) % colors.length];
  guestCtx.fillStyle = color;
  guestCtx.fillRect(0, 0, guest.width, guest.height);
  guestCtx.fillStyle = "rgba(0,0,0,.18)";
  guestCtx.fillRect(0, 0, guest.width, guest.height);
  guestCtx.fillStyle = "#fff";
  guestCtx.font = "800 92px Inter, sans-serif";
  guestCtx.textAlign = "center";
  guestCtx.textBaseline = "middle";
  const label = options.label || `Guest ${index}`;
  const initials = options.initials || `G${index}`;
  guestCtx.fillText(initials, guest.width / 2, guest.height / 2);

  addSource({
    kind: "guest",
    label,
    title: options.title || "Guest speaker",
    detail: options.detail || "Backstage guest placeholder",
    element: guest
  });
}

function addSource(source) {
  source.id = crypto.randomUUID();
  source.visible = true;
  source.title = source.title || "";
  source.audioEnabled = source.audioEnabled ?? hasAudioSource(source);
  source.volume = source.volume ?? 1;
  source.audioLevel = source.audioLevel || 0;
  state.sources.push(source);
  if (!state.primaryId) state.primaryId = source.id;
  state.selectedSourceId = source.id;
  renderSources();
  return source.id;
}

function countKind(kind) {
  return state.sources.filter((source) => source.kind === kind).length;
}

function hasAudioSource(source) {
  if (source.stream?.getAudioTracks().length) return true;
  if (source.element instanceof HTMLMediaElement && source.element.tagName === "VIDEO") return true;
  return false;
}

function getSelectedResolution() {
  const [width, height] = String(state.settings.resolution || "1280x720").split("x").map((value) => Number(value));
  return { width: width || 1280, height: height || 720 };
}

function getAudioConstraints() {
  return {
    echoCancellation: state.settings.echoCancellation,
    noiseSuppression: state.settings.noiseSuppression,
    autoGainControl: state.settings.autoGainControl,
    ...(state.settings.microphoneDeviceId ? { deviceId: { exact: state.settings.microphoneDeviceId } } : {})
  };
}

async function applyAudioOutputDevice(mediaElement) {
  if (!state.settings.audioOutputDeviceId || typeof mediaElement.setSinkId !== "function") return;
  try {
    await mediaElement.setSinkId(state.settings.audioOutputDeviceId);
  } catch (error) {
    notify(`Audio output could not be applied: ${error.message}`);
  }
}

function persistStudioSettings() {
  localStorage.setItem("streammaster.settings", JSON.stringify(state.settings));
}

function loadStudioSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem("streammaster.settings") || "{}");
    state.settings = { ...state.settings, ...saved };
    if (!saved.settingsVersion || saved.settingsVersion < 4) {
      state.settings.resolution = "1280x720";
      state.settings.fps = Math.min(Number(state.settings.fps) || 30, 30);
      state.settings.videoBitrate = Math.max(Number(state.settings.videoBitrate) || 3500, 3500);
      state.settings.audioBitrate = Math.max(Number(state.settings.audioBitrate) || 128, 128);
      state.settings.audioOutputDeviceId ||= "";
      state.settings.deviceSetupComplete = Boolean(saved.deviceSetupComplete);
      state.settings.settingsVersion = 4;
      persistStudioSettings();
    }
  } catch {
    // Keep defaults if local storage is unavailable.
  }
  syncSettingsForm();
  applyStudioSettings();
}

function syncSettingsForm() {
  const setValue = (id, value) => {
    const node = document.querySelector(id);
    if (node) node.value = value;
  };
  const setChecked = (id, value) => {
    const node = document.querySelector(id);
    if (node) node.checked = Boolean(value);
  };
  setValue("#cameraDeviceSelect", state.settings.cameraDeviceId);
  setValue("#microphoneDeviceSelect", state.settings.microphoneDeviceId);
  setValue("#audioOutputDeviceSelect", state.settings.audioOutputDeviceId);
  setValue("#setupCameraSelect", state.settings.cameraDeviceId);
  setValue("#setupMicrophoneSelect", state.settings.microphoneDeviceId);
  setValue("#setupAudioOutputSelect", state.settings.audioOutputDeviceId);
  setValue("#streamResolutionSelect", state.settings.resolution);
  setValue("#streamFpsSelect", state.settings.fps);
  setValue("#videoBitrateSelect", state.settings.videoBitrate);
  setValue("#audioBitrateSelect", state.settings.audioBitrate);
  setChecked("#echoCancellationToggle", state.settings.echoCancellation);
  setChecked("#noiseSuppressionToggle", state.settings.noiseSuppression);
  setChecked("#autoGainToggle", state.settings.autoGainControl);
  setChecked("#autoRecordToggle", state.settings.autoRecord);
  setChecked("#relayReconnectToggle", state.settings.relayReconnect);
}

function readSettingsForm() {
  state.settings = {
    ...state.settings,
    cameraDeviceId: document.querySelector("#cameraDeviceSelect").value,
    microphoneDeviceId: document.querySelector("#microphoneDeviceSelect").value,
    audioOutputDeviceId: document.querySelector("#audioOutputDeviceSelect").value,
    resolution: document.querySelector("#streamResolutionSelect").value,
    fps: Number(document.querySelector("#streamFpsSelect").value || 30),
    videoBitrate: Number(document.querySelector("#videoBitrateSelect").value || 3500),
    audioBitrate: Number(document.querySelector("#audioBitrateSelect").value || 128),
    echoCancellation: document.querySelector("#echoCancellationToggle").checked,
    noiseSuppression: document.querySelector("#noiseSuppressionToggle").checked,
    autoGainControl: document.querySelector("#autoGainToggle").checked,
    autoRecord: document.querySelector("#autoRecordToggle").checked,
    relayReconnect: document.querySelector("#relayReconnectToggle").checked,
    settingsVersion: 4
  };
}

function applyStudioSettings() {
  const { width, height } = getSelectedResolution();
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    state.tickerOffset = width;
  }
}

async function populateDeviceSettings() {
  if (!navigator.mediaDevices?.enumerateDevices) {
    notify("Media device selection is not supported in this browser.");
    return;
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    renderDeviceOptions("#cameraDeviceSelect", devices.filter((device) => device.kind === "videoinput"), "Default camera", "Camera");
    renderDeviceOptions("#microphoneDeviceSelect", devices.filter((device) => device.kind === "audioinput"), "Default microphone", "Microphone");
    renderDeviceOptions("#audioOutputDeviceSelect", devices.filter((device) => device.kind === "audiooutput"), "Default speakers", "Speakers");
    syncSettingsForm();
  } catch (error) {
    notify(`Could not list devices: ${error.message}`);
  }
}

async function populateDeviceSetupOptions() {
  if (!navigator.mediaDevices?.enumerateDevices) {
    notify("Media device selection is not supported in this browser.");
    return;
  }

  try {
    await navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      stream.getTracks().forEach((track) => track.stop());
    });
  } catch (error) {
    notify(`Device permission is needed to continue: ${error.message}`);
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    renderDeviceOptions("#setupCameraSelect", devices.filter((device) => device.kind === "videoinput"), "Default camera", "Camera");
    renderDeviceOptions("#setupMicrophoneSelect", devices.filter((device) => device.kind === "audioinput"), "Default microphone", "Microphone");
    renderDeviceOptions("#setupAudioOutputSelect", devices.filter((device) => device.kind === "audiooutput"), "Default speakers", "Speakers");
    syncSettingsForm();
  } catch (error) {
    notify(`Could not list devices: ${error.message}`);
  }
}

async function ensureHostDeviceSetup() {
  if (!navigator.mediaDevices?.getUserMedia) {
    notify("Camera and microphone access is not supported in this browser.");
    return;
  }
  if (state.settings.deviceSetupComplete) {
    const sourceId = await startHostCameraSource();
    if (sourceId) return;
    state.settings.deviceSetupComplete = false;
    persistStudioSettings();
  }
  if (deviceSetupPromise) return deviceSetupPromise;
  deviceSetupPromise = showDeviceSetupModal().finally(() => {
    deviceSetupPromise = null;
  });
  return deviceSetupPromise;
}

async function showDeviceSetupModal() {
  const modal = document.querySelector("#deviceSetupModal");
  const submit = document.querySelector("#deviceSetupSubmitBtn");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  submit.disabled = true;
  submit.textContent = "Finding devices...";
  await populateDeviceSetupOptions();
  submit.disabled = false;
  submit.textContent = "Continue to studio";

  return new Promise((resolve) => {
    modal.dataset.pending = "true";
    modal._resolveDeviceSetup = resolve;
  });
}

async function submitDeviceSetupForm(event) {
  event.preventDefault();
  const submit = document.querySelector("#deviceSetupSubmitBtn");
  submit.disabled = true;
  submit.textContent = "Starting camera...";
  state.settings = {
    ...state.settings,
    cameraDeviceId: document.querySelector("#setupCameraSelect").value,
    microphoneDeviceId: document.querySelector("#setupMicrophoneSelect").value,
    audioOutputDeviceId: document.querySelector("#setupAudioOutputSelect").value,
    deviceSetupComplete: false,
    settingsVersion: 4
  };
  syncSettingsForm();
  persistStudioSettings();
  const sourceId = await startHostCameraSource();
  submit.disabled = false;
  submit.textContent = "Continue to studio";
  if (!sourceId) return;
  state.settings.deviceSetupComplete = true;
  persistStudioSettings();
  const modal = document.querySelector("#deviceSetupModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  const resolve = modal._resolveDeviceSetup;
  modal._resolveDeviceSetup = null;
  delete modal.dataset.pending;
  resolve?.();
}

function renderDeviceOptions(selector, devices, defaultLabel, fallbackLabel) {
  const select = document.querySelector(selector);
  if (!select) return;
  const current = select.value;
  select.innerHTML = `<option value="">${defaultLabel}</option>`;
  devices.forEach((device, index) => {
    const option = document.createElement("option");
    option.value = device.deviceId;
    option.textContent = device.label || `${fallbackLabel} ${index + 1}`;
    select.append(option);
  });
  select.value = devices.some((device) => device.deviceId === current) ? current : "";
}

async function openSettingsDrawer() {
  document.querySelector("#settingsDrawer").classList.add("active");
  document.querySelector("#settingsDrawer").setAttribute("aria-hidden", "false");
  await populateDeviceSettings();
}

function closeSettingsDrawer() {
  document.querySelector("#settingsDrawer").classList.remove("active");
  document.querySelector("#settingsDrawer").setAttribute("aria-hidden", "true");
}

async function saveStudioSettings() {
  const previousCameraDeviceId = state.settings.cameraDeviceId;
  const previousMicrophoneDeviceId = state.settings.microphoneDeviceId;
  readSettingsForm();
  applyStudioSettings();
  state.settings.deviceSetupComplete = true;
  persistStudioSettings();
  const hostSource = state.sources.find((source) => source.kind === "camera" && source.isHostCamera);
  const hostDeviceChanged = hostSource && (
    previousCameraDeviceId !== state.settings.cameraDeviceId ||
    previousMicrophoneDeviceId !== state.settings.microphoneDeviceId
  );
  if (hostDeviceChanged) {
    removeSource(hostSource.id);
    await startHostCameraSource();
  }
  state.sources.forEach((source) => {
    if (source.element instanceof HTMLMediaElement) applyAudioOutputDevice(source.element);
  });
  notify("Studio settings saved");
}

function resetStudioSettings() {
  localStorage.removeItem("streammaster.settings");
  state.settings = {
    ...state.settings,
    cameraDeviceId: "",
    microphoneDeviceId: "",
    resolution: "1280x720",
    fps: 30,
    videoBitrate: 3500,
    audioBitrate: 128,
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    autoRecord: false,
    relayReconnect: true,
    audioOutputDeviceId: "",
    deviceSetupComplete: false,
    settingsVersion: 4
  };
  syncSettingsForm();
  applyStudioSettings();
  notify("Studio settings reset");
}

function renderSources() {
  sourceList.innerHTML = "";
  guestGrid.innerHTML = "";

  state.sources.forEach((source) => {
    const card = sourceTemplate.content.firstElementChild.cloneNode(true);
    hydrateIcons(card);
    card.classList.toggle("hidden-source", !source.visible);
    card.classList.toggle("selected-source", source.id === state.selectedSourceId);
    card.querySelector(".source-meta strong").textContent = source.label;
    card.querySelector(".source-meta span").textContent = source.id === state.primaryId ? `${source.detail} • Primary` : source.detail;

    const thumb = card.querySelector(".thumb");
    const preview = clonePreview(source);
    if (preview) thumb.append(preview);

    card.querySelector(".toggle-source").addEventListener("click", () => {
      source.visible = !source.visible;
      renderSources();
    });
    card.querySelector(".solo-source").addEventListener("click", () => {
      state.primaryId = source.id;
      renderSources();
    });
    card.querySelector(".remove-source").addEventListener("click", () => removeSource(source.id));
    card.addEventListener("click", () => selectSource(source.id));
    sourceList.append(card);

    const tile = document.createElement("article");
    tile.className = "guest-tile";
    const tilePreview = clonePreview(source);
    if (tilePreview) tile.append(tilePreview);
    const label = document.createElement("span");
    label.className = "guest-label";
    label.textContent = source.title ? `${source.label} - ${source.title}` : source.label;
    tile.append(label);
    if (hasAudioSource(source)) {
      const badge = document.createElement("span");
      badge.className = "speaking-badge";
      badge.innerHTML = icons.mic;
      badge.style.opacity = source.audioLevel > 0.08 ? "1" : "0.35";
      tile.append(badge);
    }
    guestGrid.append(tile);
  });

  programEmpty.classList.toggle("hidden", getVisibleSources().length > 0);
  renderAudioMixer();
  renderSourceInspector();
  if (state.editingSceneId) {
    const scene = state.scenes.find((item) => item.id === state.editingSceneId);
    if (scene) renderScenePickers(scene);
  }
}

function selectSource(id) {
  state.selectedSourceId = id;
  renderSources();
}

function renderSourceInspector() {
  const source = state.sources.find((item) => item.id === state.selectedSourceId);
  document.querySelector("#sourceNameInput").value = source?.label || "";
  document.querySelector("#sourceTitleInput").value = source?.title || "";
}

function updateSelectedSourceIdentity() {
  const source = state.sources.find((item) => item.id === state.selectedSourceId);
  if (!source) return;
  source.label = document.querySelector("#sourceNameInput").value || source.label;
  source.title = document.querySelector("#sourceTitleInput").value;
  renderSources();
}

function showSelectedSourceLowerThird() {
  const source = state.sources.find((item) => item.id === state.selectedSourceId);
  if (!source) return;
  document.querySelector("#lowerName").value = source.label;
  document.querySelector("#lowerTitle").value = source.title || source.detail;
  document.querySelector("#lowerToggle").checked = true;
}

function renderAudioMixer() {
  const list = document.querySelector("#audioMixerList");
  if (!list) return;
  const audioSources = state.sources.filter(hasAudioSource);
  if (!audioSources.length) {
    list.innerHTML = '<p class="empty">No audio sources yet. Add a camera, microphone, screen audio, or video file.</p>';
    return;
  }
  list.innerHTML = "";
  audioSources.forEach((source) => {
    const row = document.createElement("div");
    row.className = "audio-row";
    row.innerHTML = `
      <label class="audio-row-main">
        <input type="checkbox" ${source.audioEnabled ? "checked" : ""}>
        <span>${escapeHtml(source.label)}</span>
      </label>
      <div class="audio-mini-meter"><div style="width:${Math.min(100, Math.round((source.audioLevel || 0) * 140))}%"></div></div>
      <input type="range" min="0" max="1" step="0.05" value="${source.volume ?? 1}" title="Volume">`;
    row.querySelector('input[type="checkbox"]').addEventListener("change", (event) => {
      source.audioEnabled = event.target.checked;
    });
    row.querySelector('input[type="range"]').addEventListener("input", (event) => {
      source.volume = Number(event.target.value);
      if (source.element instanceof HTMLMediaElement) source.element.volume = source.volume;
    });
    list.append(row);
  });
}

function clonePreview(source) {
  if (source.element instanceof HTMLVideoElement) {
    const video = document.createElement("video");
    video.srcObject = source.element.srcObject;
    video.src = source.element.src || "";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.play().catch(() => {});
    return video;
  }

  if (source.element instanceof HTMLImageElement) {
    const img = document.createElement("img");
    img.src = source.element.src;
    return img;
  }

  if (source.element instanceof HTMLCanvasElement) {
    const img = document.createElement("img");
    img.src = source.element.toDataURL("image/png");
    return img;
  }

  return null;
}

function removeSource(id) {
  const source = state.sources.find((item) => item.id === id);
  if (!source) return;
  if (source.stream) source.stream.getTracks().forEach((track) => track.stop());
  if (source.objectUrl) URL.revokeObjectURL(source.objectUrl);
  state.sources = state.sources.filter((item) => item.id !== id);
  if (state.primaryId === id) state.primaryId = state.sources[0]?.id || null;
  if (state.selectedSourceId === id) state.selectedSourceId = state.sources[0]?.id || null;
  renderSources();
}

function getVisibleSources() {
  return state.sources.filter((source) => source.visible);
}

function getOrderedVisibleSources() {
  const visible = getVisibleSources();
  const primary = visible.find((source) => source.id === state.primaryId);
  return primary ? [primary, ...visible.filter((source) => source.id !== primary.id)] : visible;
}

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  const designWidth = 1280;
  const designHeight = 720;
  const visible = getVisibleSources();

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.scale(width / designWidth, height / designHeight);
  ctx.fillStyle = "#050708";
  ctx.fillRect(0, 0, designWidth, designHeight);

  if (visible.length) {
    const ordered = getOrderedVisibleSources();
    const rects = getLayoutRects(ordered.length, designWidth, designHeight);
    ordered.forEach((source, index) => drawMedia(source.element, rects[index]));
  } else {
    drawEmptyPattern(designWidth, designHeight);
  }

  drawBrowserSourceOverlays();
  drawLogo();
  drawTemplateOverlays();
  drawLowerThird();
  drawCommentOverlay();
  drawTicker();
  ctx.restore();
  if (state.live || state.recording) {
    state.programVideoTrack?.requestFrame?.();
  }

  requestAnimationFrame(draw);
}

function getLayoutRects(count, width, height) {
  if (state.layout === "spotlight") {
    return Array.from({ length: count }, (_, index) => index === 0
      ? { x: 0, y: 0, w: width, h: height }
      : { x: width - 220, y: 24 + (index - 1) * 130, w: 196, h: 110 });
  }

  if (state.layout === "sidebar") {
    const sideW = Math.min(300, width * 0.26);
    return Array.from({ length: count }, (_, index) => index === 0
      ? { x: 0, y: 0, w: width - sideW, h: height }
      : { x: width - sideW + 14, y: 14 + (index - 1) * 122, w: sideW - 28, h: 104 });
  }

  if (state.layout === "pip") {
    return Array.from({ length: count }, (_, index) => index === 0
      ? { x: 0, y: 0, w: width, h: height }
      : { x: width - 368, y: height - 226 - (index - 1) * 176, w: 320, h: 180 });
  }

  const columns = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / columns);
  const gap = 14;
  const cellW = (width - gap * (columns + 1)) / columns;
  const cellH = (height - gap * (rows + 1)) / rows;
  return Array.from({ length: count }, (_, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    return { x: gap + col * (cellW + gap), y: gap + row * (cellH + gap), w: cellW, h: cellH };
  });
}

function drawMedia(element, rect) {
  ensureMediaElementIsPlaying(element);
  ctx.save();
  roundRect(rect.x, rect.y, rect.w, rect.h, 12);
  ctx.clip();
  ctx.fillStyle = "#0e1418";
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);

  const sourceW = element.videoWidth || element.naturalWidth || element.width || 16;
  const sourceH = element.videoHeight || element.naturalHeight || element.height || 9;
  const scale = Math.max(rect.w / sourceW, rect.h / sourceH);
  const drawW = sourceW * scale;
  const drawH = sourceH * scale;
  const drawX = rect.x + (rect.w - drawW) / 2;
  const drawY = rect.y + (rect.h - drawH) / 2;

  try {
    ctx.drawImage(element, drawX, drawY, drawW, drawH);
  } catch {
    ctx.fillStyle = "#1c252b";
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  }

  ctx.restore();
}

function ensureMediaElementIsPlaying(element) {
  if (!(element instanceof HTMLVideoElement)) return;
  if (element.ended) {
    element.currentTime = 0;
  }
  if (!element.paused && element.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) return;

  const lastAttempt = state.mediaPlayAttempts.get(element) || 0;
  if (Date.now() - lastAttempt < 1200) return;
  state.mediaPlayAttempts.set(element, Date.now());
  element.play().catch(() => {});
}

function drawEmptyPattern(width, height) {
  ctx.strokeStyle = "rgba(255,255,255,.06)";
  for (let x = -height; x < width; x += 34) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height, height);
    ctx.stroke();
  }
}

function drawLogo() {
  const label = document.querySelector("#logoText").value.trim();
  if (!label) return;
  ctx.save();
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  roundRect(32, 28, Math.max(88, label.length * 18 + 34), 46, 8);
  ctx.fill();
  ctx.fillStyle = "#06110e";
  ctx.font = "800 24px Inter, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(label.toUpperCase(), 50, 52);
  ctx.restore();
}

function drawTemplateOverlays() {
  state.overlays
    .filter((overlay) => overlay.enabled && overlay.type === "template")
    .forEach((overlay) => {
      const template = overlay.config?.template || "subscribe";
      const text = overlay.config?.text || overlay.name;
      ctx.save();
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();

      if (template === "breaking") {
        ctx.fillStyle = "#e5334f";
        ctx.fillRect(0, 0, canvas.width, 58);
        ctx.fillStyle = "#fff";
        ctx.font = "800 24px Inter, sans-serif";
        ctx.fillText("LIVE UPDATE", 34, 38);
        ctx.font = "700 22px Inter, sans-serif";
        ctx.fillText(text, 220, 38, 900);
      }

      if (template === "subscribe") {
        ctx.fillStyle = "rgba(5, 7, 8, 0.88)";
        roundRect(420, 610, 440, 58, 12);
        ctx.fill();
        ctx.fillStyle = accent;
        roundRect(436, 622, 112, 34, 8);
        ctx.fill();
        ctx.fillStyle = "#06110e";
        ctx.font = "800 17px Inter, sans-serif";
        ctx.fillText("SUBSCRIBE", 448, 645);
        ctx.fillStyle = "#fff";
        ctx.font = "700 20px Inter, sans-serif";
        ctx.fillText(text, 568, 645, 260);
      }

      if (template === "sponsor") {
        ctx.fillStyle = "rgba(5, 7, 8, 0.78)";
        roundRect(930, 34, 288, 64, 10);
        ctx.fill();
        ctx.fillStyle = accent;
        ctx.font = "800 15px Inter, sans-serif";
        ctx.fillText("SPONSOR", 952, 60);
        ctx.fillStyle = "#fff";
        ctx.font = "800 20px Inter, sans-serif";
        ctx.fillText(text, 952, 84, 236);
      }

      if (template === "agenda") {
        ctx.fillStyle = "rgba(5, 7, 8, 0.88)";
        roundRect(850, 160, 340, 240, 14);
        ctx.fill();
        ctx.fillStyle = accent;
        ctx.font = "800 22px Inter, sans-serif";
        ctx.fillText("AGENDA", 884, 204);
        ctx.fillStyle = "#fff";
        wrapText(text, 884, 250, 260, 32, 4);
      }

      if (template === "countdown") {
        const remaining = Math.max(0, 300 - Math.floor((Date.now() / 1000) % 300));
        const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
        const ss = String(remaining % 60).padStart(2, "0");
        ctx.fillStyle = "rgba(5, 7, 8, 0.72)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = accent;
        ctx.font = "800 32px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(text.toUpperCase(), canvas.width / 2, 280);
        ctx.fillStyle = "#fff";
        ctx.font = "800 110px Inter, sans-serif";
        ctx.fillText(`${mm}:${ss}`, canvas.width / 2, 400);
        ctx.textAlign = "left";
      }

      ctx.restore();
    });
}

function drawBrowserSourceOverlays() {
  state.overlays
    .filter((overlay) => overlay.enabled && overlay.type === "browser" && overlay.config?.url)
    .forEach((overlay) => {
      const imageState = state.browserOverlayImages.get(overlay.id);
      if (!imageState?.image || !imageState.loaded) return;
      const x = Number(overlay.config?.x ?? 0);
      const y = Number(overlay.config?.y ?? 0);
      const width = Number(overlay.config?.width ?? 1280);
      const height = Number(overlay.config?.height ?? 720);
      ctx.save();
      try {
        ctx.drawImage(imageState.image, x, y, width, height);
      } catch {
        // ImageBitmap may be closed or invalid
      }
      ctx.restore();
    });
}

function drawLowerThird() {
  if (!document.querySelector("#lowerToggle").checked) return;
  const name = document.querySelector("#lowerName").value.trim();
  const title = document.querySelector("#lowerTitle").value.trim();
  if (!name && !title) return;

  ctx.save();
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  ctx.fillStyle = "rgba(5, 7, 8, 0.84)";
  roundRect(32, 562, 470, 92, 10);
  ctx.fill();
  ctx.fillStyle = accent;
  roundRect(32, 562, 12, 92, 10);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "800 34px Inter, sans-serif";
  ctx.fillText(name || "Guest", 64, 606);
  ctx.fillStyle = "rgba(255,255,255,.78)";
  ctx.font = "500 20px Inter, sans-serif";
  ctx.fillText(title, 64, 636);
  ctx.restore();
}

function drawCommentOverlay() {
  if (!state.activeComment) return;
  const comment = state.activeComment;
  ctx.save();
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  ctx.fillStyle = "rgba(5, 7, 8, 0.9)";
  roundRect(650, 500, 560, 140, 12);
  ctx.fill();
  ctx.fillStyle = accent;
  roundRect(650, 500, 10, 140, 12);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,.68)";
  ctx.font = "800 18px Inter, sans-serif";
  ctx.fillText(`${comment.provider.toUpperCase()} - ${comment.author}`, 680, 532);
  ctx.fillStyle = "#fff";
  wrapText(comment.message, 680, 570, 500, 30, 2);
  ctx.restore();
}

function wrapText(text, x, y, maxWidth, lineHeight, maxLines) {
  const words = String(text).split(" ");
  let line = "";
  let lineCount = 0;
  ctx.font = "700 24px Inter, sans-serif";
  for (const word of words) {
    const testLine = `${line}${word} `;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line.trim(), x, y);
      line = `${word} `;
      y += lineHeight;
      lineCount++;
      if (lineCount >= maxLines) return;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
}

function drawTicker() {
  if (!document.querySelector("#tickerToggle").checked) return;
  const text = document.querySelector("#tickerText").value.trim();
  if (!text) return;

  ctx.save();
  ctx.fillStyle = "rgba(0, 0, 0, 0.78)";
  ctx.fillRect(0, 674, canvas.width, 46);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  ctx.fillRect(0, 674, 118, 46);
  ctx.fillStyle = "#06110e";
  ctx.font = "800 20px Inter, sans-serif";
  ctx.fillText("UPDATE", 20, 704);
  ctx.fillStyle = "#fff";
  ctx.font = "700 21px Inter, sans-serif";
  state.tickerOffset -= 1.8;
  const textWidth = ctx.measureText(text).width;
  if (state.tickerOffset < -textWidth - 160) state.tickerOffset = canvas.width;
  ctx.fillText(text, state.tickerOffset, 704);
  ctx.restore();
}

function roundRect(x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function toggleMute() {
  state.muted = !state.muted;
  state.sources.forEach((source) => {
    source.stream?.getAudioTracks().forEach((track) => {
      track.enabled = !state.muted;
    });
  });
  document.querySelector("#muteBtn").style.background = state.muted ? "var(--danger)" : "var(--panel-2)";
}

function toggleRecord() {
  if (state.recording) {
    state.recorder.stop();
    return;
  }

  applyStudioSettings();
  const stream = canvas.captureStream(0);
  state.programVideoTrack = stream.getVideoTracks()[0] || null;
  const audioTracksToMix = [];
  state.sources.forEach((source) => {
    if (!source.stream) return;
    const audioTracks = source.stream.getAudioTracks();
    if (!audioTracks.length) return;
    audioTracksToMix.push(...audioTracks);
  });
  addAudioToProgramStream(stream, audioTracksToMix);

  state.chunks = [];
  const mimeType = pickMimeType();
  state.recorder = new MediaRecorder(stream, getRecorderOptions(mimeType));
  state.recorder.ondataavailable = (event) => {
    if (event.data.size) state.chunks.push(event.data);
  };
  state.recorder.onstop = () => saveRecording();
  state.recorder.start(1000);
  state.recording = true;
  startBrowserSnapshotLoop();
  document.querySelector("#recordBtn").classList.add("recording");
  document.querySelector("#recordBtn").innerHTML = `${icons.record}Stop`;
}

async function ensureBackendSession() {
  if (backendSessionPromise) return backendSessionPromise;
  backendSessionPromise = ensureBackendSessionOnce().finally(() => {
    backendSessionPromise = null;
  });
  return backendSessionPromise;
}

async function ensureBackendSessionOnce() {
  if (state.auth?.token) {
    await ensureHostDeviceSetup();
    return state.auth;
  }
  const saved = localStorage.getItem("streamdeck-auth");
  if (saved) {
    try {
      state.auth = JSON.parse(saved);
      await validateSession();
      await ensureHostDeviceSetup();
      return state.auth;
    } catch {
      localStorage.removeItem("streamdeck-auth");
      state.auth = null;
    }
  }

  state.auth = await showAuthModal();
  localStorage.setItem("streamdeck-auth", JSON.stringify(state.auth));
  updateProfileChip();
  await ensureHostDeviceSetup();
  return state.auth;
}

async function api(path, options = {}) {
  const auth = await ensureBackendSession();
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.token}`,
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  if (response.status === 401) {
    localStorage.removeItem("streamdeck-auth");
    state.auth = null;
    updateProfileChip();
    if (!options.__retriedAuth) {
      const nextAuth = await ensureBackendSession();
      return api(path, { ...options, __retriedAuth: true, headers: { ...(options.headers || {}), Authorization: `Bearer ${nextAuth.token}` } });
    }
  }
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}

async function validateSession() {
  const response = await fetch("/api/me", {
    headers: { Authorization: `Bearer ${state.auth.token}` }
  });
  if (!response.ok) throw new Error("Session expired");
  const data = await response.json();
  state.auth = { ...state.auth, ...data };
  updateProfileChip();
}

function showAuthModal() {
  if (authPromptPromise) return authPromptPromise;
  document.querySelector("#authModal").classList.add("active");
  document.querySelector("#authModal").setAttribute("aria-hidden", "false");
  setAuthMode("login");
  authPromptPromise = new Promise((resolve) => {
    authResolver = resolve;
  });
  return authPromptPromise;
}

function hideAuthModal() {
  document.querySelector("#authModal").classList.remove("active");
  document.querySelector("#authModal").setAttribute("aria-hidden", "true");
  authPromptPromise = null;
  authResolver = null;
}

function setAuthMode(mode) {
  authMode = mode;
  const isRegister = mode === "register";
  document.querySelector("#authTitle").textContent = isRegister ? "Create account" : "Sign in";
  document.querySelector("#authSubmitBtn").textContent = isRegister ? "Create account" : "Sign in";
  document.querySelector("#authModeToggle").textContent = isRegister ? "I already have an account" : "Create an account";
  document.querySelector("#authNameField").hidden = !isRegister;
}

function toggleAuthMode() {
  setAuthMode(authMode === "login" ? "register" : "login");
}

async function submitAuthForm(event) {
  event.preventDefault();
  const email = document.querySelector("#authEmail").value.trim();
  const password = document.querySelector("#authPassword").value;
  const name = document.querySelector("#authName").value.trim() || "Studio Producer";
  const path = authMode === "register" ? "/api/auth/register" : "/api/auth/login";
  const payload = authMode === "register" ? { name, email, password } : { email, password };
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Authentication failed.");
    state.auth = data;
    localStorage.setItem("streamdeck-auth", JSON.stringify(data));
    updateProfileChip();
    authResolver?.(data);
    hideAuthModal();
    notify(authMode === "register" ? "Account created" : "Signed in");
  } catch (error) {
    notify(error.message);
  }
}

async function logout() {
  if (!state.auth) {
    showAuthModal();
    return;
  }
  await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
  localStorage.removeItem("streamdeck-auth");
  state.auth = null;
  state.currentShow = null;
  updateProfileChip();
  showAuthModal();
  notify("Signed out");
}

function updateProfileChip() {
  const chip = document.querySelector("#profileMenuBtn");
  const name = state.auth?.user?.name || state.auth?.user?.email || "SP";
  chip.textContent = name.split(/\s|@/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "SP";
  chip.title = state.auth ? "Sign out" : "Sign in";
}

async function ensureShow() {
  if (state.currentShow) return state.currentShow;
  const shows = await api("/api/shows");
  state.currentShow = shows[0] || await api("/api/shows", {
    method: "POST",
    body: JSON.stringify({ title: "Browser live broadcast" })
  });
  return state.currentShow;
}

function captureScenePayload(name = "Scene") {
  return {
    name,
    layout: state.layout,
    logoText: document.querySelector("#logoText").value,
    accentColor: document.querySelector("#accentColor").value,
    lowerName: document.querySelector("#lowerName").value,
    lowerTitle: document.querySelector("#lowerTitle").value,
    lowerVisible: document.querySelector("#lowerToggle").checked,
    tickerText: document.querySelector("#tickerText").value,
    tickerVisible: document.querySelector("#tickerToggle").checked,
    sourceIds: state.sources.filter((source) => source.visible).map((source) => source.id),
    overlayIds: state.overlays.filter((overlay) => overlay.enabled).map((overlay) => overlay.id)
  };
}

async function loadScenes() {
  try {
    state.scenes = await api("/api/scenes");
    if (!state.scenes.length) {
      const presets = [
        { name: "Opening", layout: "spotlight", lowerVisible: false, tickerVisible: false },
        { name: "Interview", layout: "sidebar", lowerVisible: false, tickerVisible: false },
        { name: "Q&A", layout: "grid", lowerVisible: false, tickerVisible: false }
      ];
      for (const preset of presets) {
        await api("/api/scenes", { method: "POST", body: JSON.stringify({ ...captureScenePayload(preset.name), ...preset }) });
      }
      state.scenes = await api("/api/scenes");
    }
    renderScenes();
  } catch (error) {
    notify(error.message);
  }
}

async function saveCurrentScene() {
  const name = prompt("Scene name", `Scene ${state.scenes.length + 1}`);
  if (!name) return;
  const scene = await api("/api/scenes", { method: "POST", body: JSON.stringify(captureScenePayload(name)) });
  state.scenes.unshift(scene);
  renderScenes();
}

function renderScenes() {
  const list = document.querySelector("#sceneList");
  list.innerHTML = "";
  state.scenes.forEach((scene) => {
    const item = document.createElement("article");
    item.className = "scene-card";
    const sourceCount = scene.sourceIds?.length || 0;
    const overlayCount = scene.overlayIds?.length || 0;
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(scene.name)}</strong>
        <span>${escapeHtml(scene.layout)} layout - ${sourceCount} sources - ${overlayCount} overlays</span>
      </div>
      <div class="scene-card-actions">
        <button data-action="take">Take</button>
        <button data-action="edit">Edit</button>
        <button data-action="delete">Delete</button>
      </div>`;
    item.querySelector('[data-action="take"]').addEventListener("click", () => applyScene(scene));
    item.querySelector('[data-action="edit"]').addEventListener("click", () => openSceneEditor(scene));
    item.querySelector('[data-action="delete"]').addEventListener("click", () => deleteScene(scene));
    list.append(item);
  });
}

function applyScene(scene) {
  state.layout = scene.layout || "grid";
  document.querySelectorAll(".layout-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.layout === state.layout);
  });
  document.querySelector("#logoText").value = scene.logoText || "";
  document.querySelector("#accentColor").value = scene.accentColor || "#00b894";
  document.documentElement.style.setProperty("--accent", scene.accentColor || "#00b894");
  document.querySelector("#lowerName").value = scene.lowerName || "";
  document.querySelector("#lowerTitle").value = scene.lowerTitle || "";
  document.querySelector("#lowerToggle").checked = Boolean(scene.lowerVisible);
  document.querySelector("#tickerText").value = scene.tickerText || "";
  document.querySelector("#tickerToggle").checked = Boolean(scene.tickerVisible);
  if (Array.isArray(scene.sourceIds) && scene.sourceIds.length) {
    state.sources.forEach((source) => {
      source.visible = scene.sourceIds.includes(source.id);
    });
    state.primaryId = state.sources.find((source) => source.visible)?.id || state.sources[0]?.id || null;
    renderSources();
  }
  if (Array.isArray(scene.overlayIds)) {
    state.overlays = state.overlays.map((overlay) => ({ ...overlay, enabled: scene.overlayIds.includes(overlay.id) }));
    renderOverlays();
  }
  notify(`Scene taken: ${scene.name}`);
}

function openSceneEditor(scene) {
  state.editingSceneId = scene.id;
  document.querySelector("#sceneEditor").hidden = false;
  document.querySelector("#sceneEditName").value = scene.name || "";
  document.querySelector("#sceneEditLayout").value = scene.layout || "grid";
  renderScenePickers(scene);
}

function closeSceneEditor() {
  state.editingSceneId = null;
  document.querySelector("#sceneEditor").hidden = true;
}

function renderScenePickers(scene) {
  const sourcePicker = document.querySelector("#sceneSourcePicker");
  const overlayPicker = document.querySelector("#sceneOverlayPicker");
  sourcePicker.innerHTML = state.sources.map((source) => `
    <label class="picker-row">
      <input type="checkbox" value="${source.id}" ${scene.sourceIds?.includes(source.id) || source.visible ? "checked" : ""}>
      <span>${escapeHtml(source.label)} <small>${escapeHtml(source.title || source.detail)}</small></span>
    </label>`).join("") || '<p class="empty">No sources available yet.</p>';
  overlayPicker.innerHTML = state.overlays.map((overlay) => `
    <label class="picker-row">
      <input type="checkbox" value="${overlay.id}" ${scene.overlayIds?.includes(overlay.id) || overlay.enabled ? "checked" : ""}>
      <span>${escapeHtml(overlay.name)} <small>${escapeHtml(overlay.type)}</small></span>
    </label>`).join("") || '<p class="empty">No overlays saved yet.</p>';
}

async function updateEditedScene() {
  const scene = state.scenes.find((item) => item.id === state.editingSceneId);
  if (!scene) return;
  const sourceIds = [...document.querySelectorAll("#sceneSourcePicker input:checked")].map((input) => input.value);
  const overlayIds = [...document.querySelectorAll("#sceneOverlayPicker input:checked")].map((input) => input.value);
  const updated = await api(`/api/scenes/${scene.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...scene,
      name: document.querySelector("#sceneEditName").value.trim() || scene.name,
      layout: document.querySelector("#sceneEditLayout").value,
      sourceIds,
      overlayIds
    })
  });
  state.scenes = state.scenes.map((item) => item.id === updated.id ? updated : item);
  renderScenes();
  openSceneEditor(updated);
  notify("Scene updated");
}

async function deleteScene(scene) {
  if (!confirm(`Delete scene "${scene.name}"?`)) return;
  await api(`/api/scenes/${scene.id}`, { method: "DELETE" });
  state.scenes = state.scenes.filter((item) => item.id !== scene.id);
  if (state.editingSceneId === scene.id) closeSceneEditor();
  renderScenes();
}

async function loadOverlays() {
  try {
    state.overlays = await api("/api/overlays");
    if (!state.overlays.length) {
      for (const template of state.overlayTemplates.slice(0, 3)) {
        await api("/api/overlays", {
          method: "POST",
          body: JSON.stringify({ type: "template", name: template.name, enabled: false, config: template.config })
        });
      }
      state.overlays = await api("/api/overlays");
    }
    renderOverlayTemplates();
    renderOverlays();
  } catch (error) {
    notify(error.message);
  }
}

function renderOverlayTemplates() {
  const list = document.querySelector("#overlayTemplateList");
  list.innerHTML = "";
  state.overlayTemplates.forEach((template) => {
    const button = document.createElement("button");
    button.className = "template-chip";
    button.textContent = template.name;
    button.addEventListener("click", async () => {
      const overlay = await api("/api/overlays", {
        method: "POST",
        body: JSON.stringify({ type: "template", name: template.name, enabled: true, config: template.config })
      });
      state.overlays.unshift(overlay);
      renderOverlays();
    });
    list.append(button);
  });
}

async function saveBrowserSource() {
  const url = document.querySelector("#browserSourceUrl").value.trim();
  if (!url) return notify("Enter a browser source URL.");
  const overlay = await api("/api/overlays", {
    method: "POST",
    body: JSON.stringify({
      type: "browser",
      name: document.querySelector("#browserSourceName").value.trim() || "Browser source",
      enabled: true,
      config: {
        url,
        x: 0,
        y: 0,
        width: 1280,
        height: 720
      }
    })
  });
  state.overlays.unshift(overlay);
  renderOverlays();
}

async function saveTickerPreset() {
  const text = document.querySelector("#tickerText").value.trim();
  if (!text) return notify("Add ticker text first.");
  const name = prompt("Ticker preset name", `Ticker ${state.overlays.filter((item) => item.type === "ticker").length + 1}`);
  if (!name) return;
  const overlay = await api("/api/overlays", {
    method: "POST",
    body: JSON.stringify({ type: "ticker", name, enabled: false, config: { text } })
  });
  state.overlays.unshift(overlay);
  renderOverlays();
}

function renderOverlays() {
  const list = document.querySelector("#overlayList");
  list.innerHTML = "";
  state.overlays.forEach((overlay) => {
    const item = document.createElement("article");
    item.className = "overlay-card";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(overlay.name)}</strong>
        <span>${escapeHtml(overlay.type)}${overlay.enabled ? " - on air" : ""}</span>
      </div>
      <div class="overlay-card-actions">
        <button data-action="toggle">${overlay.enabled ? "Hide" : "Show"}</button>
        <button data-action="take">Take</button>
        <button data-action="delete">Delete</button>
      </div>`;
    item.querySelector('[data-action="toggle"]').addEventListener("click", () => toggleOverlay(overlay));
    item.querySelector('[data-action="take"]').addEventListener("click", () => takeOverlay(overlay));
    item.querySelector('[data-action="delete"]').addEventListener("click", () => deleteOverlay(overlay));
    list.append(item);
  });
  renderBrowserOverlayLayer();
  if (state.editingSceneId) {
    const scene = state.scenes.find((item) => item.id === state.editingSceneId);
    if (scene) renderScenePickers(scene);
  }
}

async function toggleOverlay(overlay) {
  const updated = await api(`/api/overlays/${overlay.id}`, {
    method: "PATCH",
    body: JSON.stringify({ enabled: !overlay.enabled })
  });
  state.overlays = state.overlays.map((item) => item.id === updated.id ? updated : item);
  renderOverlays();
}

async function takeOverlay(overlay) {
  if (overlay.type === "ticker") {
    document.querySelector("#tickerText").value = overlay.config?.text || "";
    document.querySelector("#tickerToggle").checked = true;
    notify(`Ticker taken: ${overlay.name}`);
    return;
  }
  if (!overlay.enabled) await toggleOverlay(overlay);
}

async function deleteOverlay(overlay) {
  await api(`/api/overlays/${overlay.id}`, { method: "DELETE" });
  state.overlays = state.overlays.filter((item) => item.id !== overlay.id);
  renderOverlays();
}

function renderBrowserOverlayLayer() {
  const layer = document.querySelector("#browserOverlayLayer");
  layer.innerHTML = "";
  refreshBrowserSourceSnapshots(true);
}

function refreshBrowserSourceSnapshots(force = false) {
  const activeBrowserOverlays = state.overlays.filter((overlay) => overlay.enabled && overlay.type === "browser" && overlay.config?.url);
  const activeIds = new Set(activeBrowserOverlays.map((overlay) => overlay.id));
  for (const id of state.browserOverlayImages.keys()) {
    if (!activeIds.has(id)) state.browserOverlayImages.delete(id);
  }

  activeBrowserOverlays.forEach((overlay) => {
    const current = state.browserOverlayImages.get(overlay.id);
    const now = Date.now();
    
    // Prevent parallel overlapping requests if one is currently loading
    if (current && current.loading) return;
    
    // 50ms when live (20fps — smooth enough for tickers), 1500ms when idle
    const interval = BROWSER_SOURCE_INTERVAL;
    if (!force && current && now - current.updatedAt < interval) return;

    const width = Number(overlay.config?.width ?? 1280);
    const height = Number(overlay.config?.height ?? 720);
    const url = `/api/browser-snapshot?url=${encodeURIComponent(overlay.config.url)}&width=${encodeURIComponent(width)}&height=${encodeURIComponent(height)}&t=${now}`;

    const nextState = { 
      image: current?.image || null, 
      loaded: current?.loaded || false, 
      loading: true, 
      updatedAt: now 
    };
    state.browserOverlayImages.set(overlay.id, nextState);
    
    // Use fetch + createImageBitmap for fast, off-main-thread decode
    // No per-pixel processing — the server screencast provides ready-to-draw frames
    fetch(url).then((resp) => {
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return resp.blob();
    }).then((blob) => {
      return createImageBitmap(blob);
    }).then((bitmap) => {
      // Close the previous bitmap if it was an ImageBitmap to free memory
      const prev = state.browserOverlayImages.get(overlay.id);
      if (prev?.image?.close) prev.image.close();
      state.browserOverlayImages.set(overlay.id, { image: bitmap, loaded: true, loading: false, updatedAt: Date.now() });
    }).catch(() => {
      // On error, keep the previous loaded image if available
      if (current?.loaded) {
        state.browserOverlayImages.set(overlay.id, { ...current, loading: false, updatedAt: Date.now() });
      } else {
        state.browserOverlayImages.set(overlay.id, { image: null, loaded: false, loading: false, updatedAt: Date.now() });
      }
    });
  });
}

function hasVisibleBrowserSnapshot(image) {
  const sample = document.createElement("canvas");
  sample.width = 160;
  sample.height = 90;
  const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
  if (!sampleCtx) return true;
  try {
    sampleCtx.clearRect(0, 0, sample.width, sample.height);
    sampleCtx.drawImage(image, 0, 0, sample.width, sample.height);
    const pixels = sampleCtx.getImageData(0, 0, sample.width, sample.height).data;
    let visiblePixels = 0;
    for (let index = 3; index < pixels.length; index += 4) {
      if (pixels[index] > 12) visiblePixels += 1;
      if (visiblePixels > 12) return true;
    }
    return false;
  } catch {
    return true;
  }
}

function prepareBrowserOverlayImage(image) {
  const canvasImage = document.createElement("canvas");
  canvasImage.width = image.width || 1280;
  canvasImage.height = image.height || 720;
  const imageCtx = canvasImage.getContext("2d", { willReadFrequently: true });
  if (!imageCtx) return image;
  imageCtx.clearRect(0, 0, canvasImage.width, canvasImage.height);
  imageCtx.drawImage(image, 0, 0, canvasImage.width, canvasImage.height);

  try {
    const frame = imageCtx.getImageData(0, 0, canvasImage.width, canvasImage.height);
    const data = frame.data;
    const edgeColor = sampleEdgeBackground(data, canvasImage.width, canvasImage.height);
    if (!edgeColor) return canvasImage;

    const threshold = edgeColor.isWhite ? 42 : 34;
    let transparentPixels = 0;
    for (let index = 0; index < data.length; index += 4) {
      const dr = data[index] - edgeColor.r;
      const dg = data[index + 1] - edgeColor.g;
      const db = data[index + 2] - edgeColor.b;
      const distance = Math.sqrt(dr * dr + dg * dg + db * db);
      if (distance < threshold) {
        data[index + 3] = 0;
        transparentPixels += 1;
      }
    }

    if (transparentPixels > data.length / 16) {
      imageCtx.putImageData(frame, 0, 0);
    }
  } catch {
    return canvasImage;
  }
  return canvasImage;
}

function sampleEdgeBackground(data, width, height) {
  const samples = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
    [Math.floor(width / 2), 0],
    [Math.floor(width / 2), height - 1],
    [0, Math.floor(height / 2)],
    [width - 1, Math.floor(height / 2)]
  ].map(([x, y]) => {
    const index = (y * width + x) * 4;
    return { r: data[index], g: data[index + 1], b: data[index + 2], a: data[index + 3] };
  }).filter((sample) => sample.a > 180);

  if (!samples.length) return null;
  const average = samples.reduce((acc, sample) => ({
    r: acc.r + sample.r,
    g: acc.g + sample.g,
    b: acc.b + sample.b
  }), { r: 0, g: 0, b: 0 });
  average.r = Math.round(average.r / samples.length);
  average.g = Math.round(average.g / samples.length);
  average.b = Math.round(average.b / samples.length);
  const brightness = (average.r + average.g + average.b) / 3;
  const spread = Math.max(average.r, average.g, average.b) - Math.min(average.r, average.g, average.b);
  if (spread > 18 || (brightness > 24 && brightness < 230)) return null;
  return { ...average, isWhite: brightness > 200 };
}

function startBrowserSnapshotLoop() {
  if (state.browserSnapshotTimer) clearTimeout(state.browserSnapshotTimer);
  
  const getInterval = () => {
    return BROWSER_SOURCE_INTERVAL;
  };
  
  const runLoop = () => {
    refreshBrowserSourceSnapshots(false);
    state.browserSnapshotTimer = setTimeout(runLoop, getInterval());
  };
  
  state.browserSnapshotTimer = setTimeout(runLoop, getInterval());
}

startBrowserSnapshotLoop();

async function loadComments() {
  try {
    state.comments = await api("/api/comments");
    state.commentsSince = state.comments[0]?.createdAt || state.commentsSince;
    renderComments();
  } catch (error) {
    notify(error.message);
  }
}

async function pollComments() {
  try {
    const path = state.commentsSince ? `/api/comments?since=${encodeURIComponent(state.commentsSince)}` : "/api/comments";
    const incoming = await api(path);
    if (incoming.length) {
      const existing = new Set(state.comments.map((comment) => comment.id));
      state.comments = [...incoming.filter((comment) => !existing.has(comment.id)), ...state.comments].slice(0, 100);
      state.commentsSince = state.comments[0]?.createdAt || state.commentsSince;
      renderComments();
    }
  } catch {
    // Polling resumes on the next tick.
  }
  setTimeout(pollComments, state.live ? 2500 : 5000);
}

async function simulateComment() {
  const show = await ensureShow();
  const comment = await api("/api/comments/simulate", { method: "POST", body: JSON.stringify({ showId: show.id }) });
  state.comments.unshift(comment);
  renderComments();
}

async function addManualComment() {
  const author = document.querySelector("#manualCommentAuthor").value.trim() || "Viewer";
  const message = document.querySelector("#manualCommentText").value.trim();
  if (!message) return;
  const show = await ensureShow();
  const comment = await api("/api/comments", {
    method: "POST",
    body: JSON.stringify({ showId: show.id, provider: "manual", author, message })
  });
  document.querySelector("#manualCommentText").value = "";
  state.comments.unshift(comment);
  renderComments();
}

function renderComments() {
  const list = document.querySelector("#commentList");
  list.innerHTML = "";
  state.comments.forEach((comment) => {
    const item = document.createElement("article");
    item.className = "comment-card";
    item.classList.toggle("active-comment", state.activeComment?.id === comment.id);
    item.innerHTML = `<div><strong>${escapeHtml(comment.author)}</strong><span>${escapeHtml(comment.provider)}</span><p>${escapeHtml(comment.message)}</p></div><button>Show</button>`;
    item.querySelector("button").addEventListener("click", () => {
      state.activeComment = comment;
      renderComments();
    });
    list.append(item);
  });
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

async function initLiveKitStatus() {
  const status = document.querySelector("#livekitStatus");
  const button = document.querySelector("#livekitJoinBtn");
  try {
    const config = await fetch("/api/livekit/config").then((response) => response.json());
    if (config.configured) {
      status.textContent = "LiveKit configured. Join the room to add real guests.";
      button.disabled = false;
    } else {
      status.textContent = "LiveKit credentials are not configured yet. Add them to .env when ready.";
      button.disabled = false;
    }
  } catch {
    status.textContent = "LiveKit status is unavailable.";
  }
}

async function connectLiveKitRoom() {
  if (state.livekitConnected && state.livekitRoom) {
    state.livekitRoom.disconnect();
    return;
  }

  const config = await fetch("/api/livekit/config").then((response) => response.json());
  if (!config.configured) {
    notify("Add LiveKit credentials to .env first.");
    document.querySelector("#livekitStatus").textContent = "Waiting for LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET.";
    return;
  }

  try {
    await loadLiveKitClient();
    const connection = await getLiveKitConnection();
    const LK = window.LivekitClient;
    const room = new LK.Room({ adaptiveStream: true, dynacast: true });
    state.livekitRoom = room;
    bindLiveKitRoom(room, LK);

    await room.connect(connection.url, connection.token);
    await room.localParticipant.setCameraEnabled(true);
    await room.localParticipant.setMicrophoneEnabled(true);

    state.livekitConnected = true;
    document.querySelector("#livekitJoinBtn").innerHTML = `${icons.video}Leave room`;
    document.querySelector("#livekitStatus").textContent = `Connected to ${connection.room}.`;
  } catch (error) {
    notify(error.message);
    document.querySelector("#livekitStatus").textContent = "LiveKit connection failed.";
  }
}

async function getLiveKitConnection() {
  const guestToken = new URLSearchParams(location.search).get("guest");
  if (guestToken) {
    const name = prompt("Guest display name", "Guest") || "Guest";
    const response = await fetch("/api/livekit/guest-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteToken: guestToken, name })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Could not create guest room token.");
    return data;
  }

  const show = await ensureShow();
  return api("/api/livekit/token", {
    method: "POST",
    body: JSON.stringify({ showId: show.id })
  });
}

async function loadLiveKitClient() {
  if (window.LivekitClient) return;
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/livekit-client@2.19.0/dist/livekit-client.umd.min.js";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Could not load the LiveKit browser client."));
    document.head.append(script);
  });
  if (!window.LivekitClient) throw new Error("LiveKit browser client did not initialize.");
}

function bindLiveKitRoom(room, LK) {
  room.on(LK.RoomEvent.TrackSubscribed, (track, _publication, participant) => {
    const element = track.attach();
    element.autoplay = true;
    element.playsInline = true;
    element.dataset.livekitTrack = track.sid;

    if (track.kind === "video") {
      addSource({
        kind: "livekit",
        label: participant.name || participant.identity,
        title: "Remote guest",
        detail: "LiveKit guest video",
        element,
        livekitTrackSid: track.sid
      });
    } else {
      element.style.display = "none";
      document.body.append(element);
    }
  });

  room.on(LK.RoomEvent.TrackUnsubscribed, (track) => {
    const source = state.sources.find((item) => item.livekitTrackSid === track.sid);
    if (source) removeSource(source.id);
    document.querySelectorAll(`[data-livekit-track="${track.sid}"]`).forEach((node) => node.remove());
  });

  room.on(LK.RoomEvent.Disconnected, () => {
    state.livekitConnected = false;
    state.livekitRoom = null;
    state.sources
      .filter((source) => source.kind === "livekit")
      .map((source) => source.id)
      .forEach(removeSource);
    document.querySelector("#livekitJoinBtn").innerHTML = `${icons.video}LiveKit room`;
    document.querySelector("#livekitStatus").textContent = "LiveKit room disconnected.";
  });
}

async function saveDestinationFromForm() {
  let rtmpUrl = document.querySelector("#rtmpUrl").value.trim();
  const streamKey = document.querySelector("#streamKey").value.trim();
  if (!rtmpUrl || !streamKey) return;
  if (streamKey && rtmpUrl.endsWith(`/${streamKey}`)) {
    rtmpUrl = rtmpUrl.slice(0, -streamKey.length - 1);
    document.querySelector("#rtmpUrl").value = rtmpUrl;
    notify("RTMP URL normalized. Keep the key only in Stream key.");
  }

  try {
    const destinations = await api("/api/destinations");
    const existing = destinations.find((item) => item.name === "Primary RTMP");
    const payload = {
      name: "Primary RTMP",
      platform: "custom",
      rtmpUrl,
      streamKey,
      enabled: true
    };
    if (existing) {
      await api(`/api/destinations/${existing.id}`, { method: "PATCH", body: JSON.stringify(payload) });
    } else {
      await api("/api/destinations", { method: "POST", body: JSON.stringify(payload) });
    }
    notify("Streaming destination saved");
  } catch (error) {
    notify(error.message);
  }
}

async function loadDestinations() {
  try {
    const destinations = await api("/api/destinations");
    let primary = destinations.find((item) => item.name === "Primary RTMP") || destinations[0];
    if (!primary) {
      primary = await fetch("/api/dev/latest-destination").then((response) => response.ok ? response.json() : null);
    }
    if (!primary) return;
    document.querySelector("#rtmpUrl").value = primary.rtmpUrl || "";
    document.querySelector("#streamKey").value = primary.streamKey && primary.streamKey !== "********" ? primary.streamKey : "";
  } catch {
    // The app can still run without saved destinations.
  }
}

function getProgramStream() {
  if (!canvas.captureStream) {
    throw new Error("This browser does not support canvas.captureStream, which is required for browser-based RTMP output.");
  }
  applyStudioSettings();
  const stream = canvas.captureStream(0);
  const audioTracksToMix = [];
  state.sources.forEach((source) => {
    if (!source.stream || state.muted) return;
    const audioTracks = source.stream.getAudioTracks();
    if (!audioTracks.length) return;
    audioTracksToMix.push(...audioTracks);
  });
  addAudioToProgramStream(stream, audioTracksToMix);
  return stream;
}

function addAudioToProgramStream(stream, audioTracksToMix) {
  const audioContext = new AudioContext();
  const destination = audioContext.createMediaStreamDestination();

  if (audioTracksToMix.length) {
    const sourceNode = audioContext.createMediaStreamSource(new MediaStream(audioTracksToMix));
    sourceNode.connect(destination);
    state.audioKeepAlives.push({ audioContext, sourceNode, destination });
  } else {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    gain.gain.value = 0.00001;
    oscillator.frequency.value = 440;
    oscillator.connect(gain);
    gain.connect(destination);
    oscillator.start();
    state.audioKeepAlives.push({ audioContext, oscillator, gain, destination });
  }

  destination.stream.getAudioTracks().forEach((track) => stream.addTrack(track));
  state.audioKeepAlives = state.audioKeepAlives.slice(-6);
}

function getOrCreateAudioContext() {
  state.audioContext ||= new AudioContext();
  return state.audioContext;
}

function createMixedAudioStream() {
  const audioContext = getOrCreateAudioContext();
  const destination = audioContext.createMediaStreamDestination();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 512;
  const meterInput = audioContext.createGain();
  meterInput.connect(analyser);
  meterInput.connect(destination);
  const keepAlive = { audioContext, destination, analyser, meterInput, nodes: [] };
  let connected = 0;

  state.sources.filter((source) => source.audioEnabled && hasAudioSource(source) && !state.muted).forEach((source) => {
    try {
      let node;
      if (source.stream?.getAudioTracks().length) {
        node = audioContext.createMediaStreamSource(new MediaStream(source.stream.getAudioTracks()));
      } else if (source.element instanceof HTMLMediaElement) {
        source.mediaElementSource ||= audioContext.createMediaElementSource(source.element);
        node = source.mediaElementSource;
        source.element.muted = false;
        source.element.volume = source.volume ?? 1;
      }
      if (!node) return;
      const gain = audioContext.createGain();
      gain.gain.value = source.volume ?? 1;
      node.connect(gain);
      gain.connect(meterInput);
      keepAlive.nodes.push({ source, node, gain });
      connected += 1;
    } catch (error) {
      logClientEvent("audio.source.error", { source: source.label, error: error.message });
    }
  });

  if (!connected) {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    gain.gain.value = 0.00001;
    oscillator.connect(gain);
    gain.connect(meterInput);
    oscillator.start();
    keepAlive.nodes.push({ oscillator, gain });
  }

  keepAlive.meterData = new Uint8Array(analyser.fftSize);
  state.audioKeepAlives.push(keepAlive);
  state.audioKeepAlives = state.audioKeepAlives.slice(-6);
  startAudioMeters();
  return destination.stream;
}

function startAudioMeters() {
  if (state.audioAnalyserTimer) return;
  state.audioAnalyserTimer = setInterval(() => {
    let programLevel = 0;
    for (const item of state.audioKeepAlives) {
      if (!item.analyser || !item.meterData) continue;
      item.analyser.getByteTimeDomainData(item.meterData);
      let sum = 0;
      for (const value of item.meterData) {
        const normalized = (value - 128) / 128;
        sum += normalized * normalized;
      }
      programLevel = Math.max(programLevel, Math.sqrt(sum / item.meterData.length));
    }
    state.programAudioLevel = programLevel;
    document.querySelector("#programAudioMeter")?.style.setProperty("width", `${Math.min(100, Math.round(programLevel * 160))}%`);

    state.sources.filter(hasAudioSource).forEach((source) => {
      source.audioLevel = source.audioEnabled ? Math.max(source.audioLevel || 0, programLevel * 0.8) : 0;
      source.audioLevel *= 0.78;
    });
  }, 120);
}

async function startLiveBroadcast() {
  await saveDestinationFromForm();
  const show = await ensureShow();
  const { ingestUrl } = await api(`/api/broadcasts/${show.id}/start`, {
    method: "POST",
    body: JSON.stringify({ relayReconnect: state.settings.relayReconnect })
  });
  applyStudioSettings();
  const targetFps = Math.min(Math.max(Number(state.settings.fps) || 30, 24), 30);
  const videoBitrate = Math.min(Math.max(Number(state.settings.videoBitrate) || 3500, 3500), 4500);
  const audioBitrate = Math.min(Math.max(Number(state.settings.audioBitrate) || 128, 96), 192);
  const wsUrl = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}${ingestUrl}&format=webm&fps=${targetFps}&vbitrate=${videoBitrate}&abitrate=${audioBitrate}`;
  const socket = new WebSocket(wsUrl);
  socket.binaryType = "blob";

  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Live ingest connection timed out.")), 8000);
    socket.onopen = () => {
      clearTimeout(timer);
      resolve();
    };
    socket.onerror = () => {
      clearTimeout(timer);
      reject(new Error("Could not connect to live ingest server."));
    };
  });

  let chunksSent = 0;
  state.liveBytesSent = 0;
  state.lastLiveChunkAt = Date.now();
  state.live = true;
  startBrowserSnapshotLoop();
  state.liveFrameEncoding = false;
  state.liveLastFrameAt = 0;
  state.liveFrameDrops = 0;
  logClientEvent("live.webmIngest.started", { settings: state.settings, targetFps, videoBitrate, audioBitrate });

  const programStream = canvas.captureStream(targetFps);
  state.programVideoTrack = programStream.getVideoTracks()[0] || null;
  const audioStream = createMixedAudioStream();
  audioStream.getAudioTracks().forEach((track) => programStream.addTrack(track));

  const mimeType = pickMimeType();
  const recorder = new MediaRecorder(programStream, {
    ...getRecorderOptions(mimeType),
    videoBitsPerSecond: videoBitrate * 1000,
    audioBitsPerSecond: audioBitrate * 1000
  });
  recorder.ondataavailable = (event) => {
    if (event.data.size && socket.readyState === WebSocket.OPEN) {
      chunksSent += 1;
      state.liveBytesSent += event.data.size;
      state.lastLiveChunkAt = Date.now();
      socket.send(event.data);
      if (chunksSent <= 5 || chunksSent % 20 === 0) {
        logClientEvent("live.webm.chunk", { chunksSent, size: event.data.size, total: state.liveBytesSent });
      }
    }
  };
  recorder.onerror = (event) => logClientEvent("live.webmRecorder.error", { message: event.error?.message || "unknown error" });
  recorder.onstart = () => logClientEvent("live.webmRecorder.started", { mimeType: recorder.mimeType });
  recorder.onstop = () => logClientEvent("live.webmRecorder.stopped");
  recorder.start(250);
  state.liveChunkWatchTimer = setInterval(() => {
    if (!state.live) return;
    const elapsed = Date.now() - (state.lastLiveChunkAt || Date.now());
    if (elapsed > 20000) {
      logClientEvent("live.chunk.delayed", {
        msSinceLastChunk: elapsed,
        total: state.liveBytesSent,
        frameDrops: state.liveFrameDrops
      });
      notify("Live media chunks are delayed. Keeping the relay open while the browser catches up.");
    }
  }, 5000);
  setTimeout(() => {
    if (state.live && chunksSent === 0) {
      notify("No frames are leaving the browser. Check whether the program canvas is available.");
    }
  }, 3500);
  state.ingestSocket = socket;
  state.liveRecorder = recorder;
  state.startedAt = Date.now();
  if (state.settings.autoRecord && !state.recording) toggleRecord();
  pollBroadcastStatus();
  socket.onclose = () => {
    logClientEvent("live.socket.closed", { framesSent: chunksSent, total: state.liveBytesSent, drops: state.liveFrameDrops });
    if (state.live) stopLiveBroadcast(false);
  };
  updateLiveUi();
}

async function stopLiveBroadcast(callServer = true) {
  const showId = state.currentShow?.id;
  state.live = false;
  startBrowserSnapshotLoop();
  state.startedAt = null;
  if (state.liveRecorder && state.liveRecorder.state !== "inactive") {
    state.liveRecorder.requestData?.();
    await new Promise((resolve) => setTimeout(resolve, 700));
    state.liveRecorder.stop();
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  if (state.ingestSocket && state.ingestSocket.readyState === WebSocket.OPEN) {
    state.ingestSocket.close();
  }
  state.liveRecorder = null;
  state.ingestSocket = null;
  if (state.liveFrameTimer) cancelAnimationFrame(state.liveFrameTimer);
  state.liveFrameTimer = null;
  state.liveFrameEncoding = false;
  state.liveLastFrameAt = 0;
  if (state.statusPollTimer) clearTimeout(state.statusPollTimer);
  state.statusPollTimer = null;
  if (state.liveChunkWatchTimer) clearInterval(state.liveChunkWatchTimer);
  state.liveChunkWatchTimer = null;
  if (state.liveCanvasFrameTimer) clearInterval(state.liveCanvasFrameTimer);
  state.liveCanvasFrameTimer = null;
  state.programVideoTrack = null;
  state.lastLiveChunkAt = null;
  if (callServer && showId) {
    await api(`/api/broadcasts/${showId}/stop`, { method: "POST" }).catch(() => {});
  }
  updateLiveUi();
}

async function pollBroadcastStatus() {
  if (!state.live || !state.currentShow) return;
  try {
    const status = await api(`/api/broadcasts/${state.currentShow.id}/status`);
    renderRelayStatus(status);
    if (status.status === "interrupted") {
      notify(status.reason || "Live ingest was interrupted.");
      await stopLiveBroadcast(false);
      return;
    }
  } catch (error) {
    renderRelayStatus({ status: "error", error: error.message });
  }
  state.statusPollTimer = setTimeout(pollBroadcastStatus, 2000);
}

function renderRelayStatus(status) {
  const list = document.querySelector("#relayStatusList");
  if (!list) return;
  if (!status || status.status === "idle") {
    list.innerHTML = '<p class="empty">Relay is idle.</p>';
    return;
  }
  if (status.status === "interrupted") {
    list.innerHTML = `<article class="relay-card"><strong>Ingest interrupted</strong><span>${escapeHtml(status.reason || "No active ingest connection.")}</span></article>`;
    return;
  }
  if (status.status === "stalled") {
    list.innerHTML = `<article class="relay-card"><strong>Ingest stalled</strong><span>No media chunks received for ${Math.round((status.msSinceLastChunk || 0) / 1000)} seconds.</span></article>`;
    return;
  }
  const relays = status.relays || [];
  const relayHtml = relays.length
    ? relays.map((relay) => `
      <article class="relay-card">
        <strong>${escapeHtml(relay.name)} - ${escapeHtml(relay.status)}</strong>
        <span>${escapeHtml(relay.target || "")}</span>
        ${relay.errors?.length ? `<p>${escapeHtml(relay.errors[relay.errors.length - 1])}</p>` : ""}
      </article>`).join("")
    : '<p class="empty">Live ingest is active, but no enabled RTMP destinations were found.</p>';
  const bytes = Math.max(status.bytesIn || 0, state.liveBytesSent || 0);
  list.innerHTML = `<article class="relay-card"><strong>Ingest: ${escapeHtml(status.status)}</strong><span>${formatBytes(bytes)} sent from browser</span></article>${relayHtml}`;
}

function pickMimeType() {
  const types = ["video/webm;codecs=vp8,opus", "video/webm"];
  return types.find((type) => MediaRecorder.isTypeSupported(type)) || "";
}

function getRecorderOptions(mimeType) {
  const options = {
    videoBitsPerSecond: Math.min(state.settings.videoBitrate || 3500, 4500) * 1000,
    audioBitsPerSecond: (state.settings.audioBitrate || 128) * 1000
  };
  if (mimeType) options.mimeType = mimeType;
  return options;
}

function logClientEvent(event, details = {}) {
  fetch("/api/client-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, ...details })
  }).catch(() => {});
}

function sendTypedBlob(socket, type, blob) {
  blob.arrayBuffer().then((buffer) => {
    if (socket.readyState !== WebSocket.OPEN) return;
    const payload = new Uint8Array(buffer);
    const packet = new Uint8Array(payload.length + 1);
    packet[0] = type;
    packet.set(payload, 1);
    socket.send(packet);
  }).catch(() => {});
}

function saveRecording() {
  const blob = new Blob(state.chunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  state.recordings.unshift({
    url,
    name: `Broadcast-${new Date().toISOString().replace(/[:.]/g, "-")}.webm`,
    size: blob.size
  });
  state.recording = false;
  startBrowserSnapshotLoop();
  document.querySelector("#recordBtn").classList.remove("recording");
  document.querySelector("#recordBtn").innerHTML = `${icons.record}Record`;
  renderRecordings();
}

function renderRecordings() {
  const list = document.querySelector("#recordingList");
  list.innerHTML = "";
  state.recordings.forEach((recording) => {
    const item = document.createElement("div");
    item.className = "recording-item";
    item.innerHTML = `<span>${recording.name}<br><small>${formatBytes(recording.size)}</small></span><a href="${recording.url}" download="${recording.name}">Download</a>`;
    list.append(item);
  });
}

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

async function toggleLive() {
  try {
    if (state.live) {
      await stopLiveBroadcast();
    } else {
      await startLiveBroadcast();
    }
  } catch (error) {
    notify(error.message);
    state.live = false;
    if (state.currentShow?.id) {
      await api(`/api/broadcasts/${state.currentShow.id}/stop`, { method: "POST" }).catch(() => {});
    }
    updateLiveUi();
  }
}

function updateLiveUi() {
  const liveBtn = document.querySelector("#liveBtn");
  const statusDot = document.querySelector("#statusDot");
  const statusText = document.querySelector("#statusText");

  liveBtn.classList.toggle("live", state.live);
  liveBtn.innerHTML = state.live ? `${icons.broadcast}End live` : `${icons.broadcast}Go live`;
  statusDot.classList.toggle("live", state.live);
  statusText.textContent = state.live ? "Live via backend" : "Ready";
}

function updateTimer() {
  const timer = document.querySelector("#liveTimer");
  if (!state.startedAt) {
    timer.textContent = "00:00:00";
  } else {
    const seconds = Math.floor((Date.now() - state.startedAt) / 1000);
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    timer.textContent = `${h}:${m}:${s}`;
  }
  setTimeout(updateTimer, 500);
}

async function copyInvite() {
  const show = await ensureShow();
  const url = `${location.origin}${location.pathname}?guest=${show.inviteToken}`;
  try {
    await navigator.clipboard.writeText(url);
    notify("Invite link copied");
  } catch {
    prompt("Copy invite link", url);
  }
}

function notify(message) {
  const old = document.querySelector(".toast");
  if (old) old.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = "position:fixed;right:18px;bottom:18px;z-index:9;padding:12px 14px;border-radius:8px;background:#fff;color:#101418;font-weight:800;box-shadow:0 16px 40px rgba(0,0,0,.3)";
  document.body.append(toast);
  setTimeout(() => toast.remove(), 2600);
}

if (new URLSearchParams(location.search).has("guest")) {
  notify("Guest mode is ready. Join LiveKit once credentials are configured.");
}

draw();
updateTimer();
loadStudioSettings();
populateDeviceSettings();
initLiveKitStatus();
loadDestinations();
loadScenes();
loadOverlays();
loadComments();
pollComments();
