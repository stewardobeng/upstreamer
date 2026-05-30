# StreamDeck Studio

Browser-based live streaming studio with host camera setup, browser overlays, backend compositing, and RTMP relay through FFmpeg.

## Current Features

- Host login and persisted camera, microphone, and speaker selection.
- Program canvas with layouts, overlays, lower thirds, ticker, comments, and browser sources.
- Backend compositor mode for live output so the browser can be minimized while the server keeps rendering and relaying.
- RTMP destination management for services such as Restreamer, YouTube, Twitch, and Facebook.
- FFmpeg relay with stable backend frame pacing for RTMP ingest.
- Optional LiveKit configuration hooks for future guest rooms.
- Local JSON persistence for development, with PostgreSQL schema prepared for production migration.

## Local Development

1. Install Node.js 20 or newer.
2. Install FFmpeg and Chrome or Edge.
3. Copy `.env.example` to `.env` and update values.
4. Install dependencies:

```powershell
npm install
```

5. Start the app:

```powershell
npm start
```

6. Open:

```text
http://127.0.0.1:8088
```

## Important Environment Variables

```env
PORT=8088
JWT_SECRET=change-this-long-random-secret
FFMPEG_PATH=ffmpeg
CHROME_PATH=/usr/bin/chromium
DATABASE_URL=postgres://streammaster:streammaster@localhost:5432/streammaster
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your-livekit-api-key
LIVEKIT_API_SECRET=your-livekit-api-secret
```

On Windows, `CHROME_PATH` should point to the installed Chrome or Edge executable. In Docker, the included image installs Chromium at `/usr/bin/chromium`, and `docker-compose.yml` points `DATABASE_URL` at the internal `postgres` service.

## Docker VPS Deployment

The repository includes a production-oriented Docker setup for a VPS.

1. Copy `.env.example` to `.env` on the server.
2. Set a strong `JWT_SECRET`.
3. Set `POSTGRES_PASSWORD` if you want to override the default database password.
4. Set LiveKit values if guest rooms are enabled.
5. Build and start:

```bash
docker compose up -d --build
```

6. Check logs:

```bash
docker compose logs -f app
```

The app container exposes port `8088`. Put Nginx, Caddy, or your VPS firewall in front of it for HTTPS. Camera access in browsers requires HTTPS in production.

## Persistent Data

The compose file mounts these directories:

- `./data` for the current JSON database and app logs.
- `./uploads` for uploaded assets.
- `./recordings` for local recordings.

PostgreSQL is included in `docker-compose.yml` for the production migration path. The current app still uses the JSON store until the database adapter is fully switched over.

## Streaming Notes

Browsers cannot publish RTMP directly. The app sends live program/source state to the backend, the backend compositor renders a hidden canvas with Chromium, and FFmpeg relays the result to the enabled RTMP destinations.

For the smoothest Restreamer test:

- Start Go Live fresh after each server restart.
- Use a stable wired or VPS network path.
- Keep output bitrate conservative until the VPS CPU is confirmed stable.
- Watch `docker compose logs -f app` for FFmpeg warnings or source timeouts.

## Documentation

- `ARCHITECTURE.md` explains the current media pipeline and production roadmap.
- `POSTGRESQL.md` explains the planned PostgreSQL setup and schema.
