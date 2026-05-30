# StreamDeck Studio Architecture

## Recommended Stack

This project should grow as a Node.js media platform with a dedicated WebRTC media layer.

Current implementation:

- Frontend: plain HTML, CSS, and browser media APIs.
- Backend API: Node.js, Express.
- Realtime ingest: WebSocket source/control feed.
- Backend compositing: headless Chromium renders the program canvas.
- LiveKit readiness: token endpoints and frontend room connection hooks.
- RTMP relay: FFmpeg.
- Local persistence: JSON file database in `data/db.json`.
- Local assets and recordings: `uploads/` and `recordings/`.
- Docker deployment: Node.js, Chromium, FFmpeg, and optional PostgreSQL service.

Professional production target:

- App/API: Node.js with NestJS or Fastify.
- Database: PostgreSQL.
- Queue: Redis + BullMQ.
- Object storage: S3-compatible storage.
- Guest rooms: LiveKit first choice, or mediasoup for deeper custom control.
- Stream ingest/egress: LiveKit Egress, FFmpeg workers, or a media server such as SRS.
- Protocols: WebRTC/WHIP ingest, RTMP/SRT egress.
- Auth: JWT sessions plus OAuth for YouTube, Facebook, Twitch, and LinkedIn.
- Billing: Stripe.
- Observability: Prometheus/Grafana or OpenTelemetry.

## What Exists Now

- User registration and login endpoints.
- Workspace creation.
- Show creation and invite token generation.
- Destination CRUD for RTMP targets.
- Asset upload endpoint.
- Recording list endpoint.
- Scene preset endpoints at `/api/scenes`.
- Comment moderation endpoints at `/api/comments`.
- WebSocket ingest endpoint at `/ingest`.
- Backend compositor ingest endpoint at `/source-ingest`.
- Backend program renderer at `/backend-program/:showId`.
- LiveKit config endpoint at `/api/livekit/config`.
- Host LiveKit token endpoint at `/api/livekit/token`.
- Guest LiveKit token endpoint at `/api/livekit/guest-token`.
- FFmpeg relay process per enabled destination.
- Backend recording of incoming WebSocket media chunks.
- Frontend Go Live integration with backend show creation and ingest.

## LiveKit Setup

Create a `.env` file from `.env.example` and fill:

```text
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...
```

After restarting `npm start`, the studio can request host and guest room tokens. The browser client uses those tokens to join the matching LiveKit room and adds subscribed guest video tracks to the studio source list.

## Comments

The studio now has a comments moderation model. Today it supports manual/test comments and a simulated provider feed. The UI already supports the professional workflow: comments arrive in the producer panel, the host clicks `Show`, and the selected comment is rendered on the program output.

Real YouTube/Facebook comments require OAuth setup for each destination account. Add provider workers later that write normalized comments into the same `/api/comments` resource:

```json
{
  "provider": "youtube",
  "author": "Viewer name",
  "message": "Live comment text",
  "externalId": "platform-comment-id"
}
```

## Why A Relay Is Required

Browsers cannot directly publish RTMP streams to YouTube, Twitch, Facebook, or LinkedIn. The browser must send the final program output to your server first. The server then converts and pushes the stream to each destination.

```text
Browser studio
  -> source/control WebSocket feed
  -> backend Chromium compositor
  -> FFmpeg or media server
  -> RTMP/SRT destinations
```

The current backend compositor is designed for VPS deployment. Once Go Live starts, the server keeps a headless Chromium renderer and FFmpeg relay alive. This reduces dependence on the visible browser tab and avoids RTMP publishing directly from the user's machine.

## Docker Deployment Target

The included Docker setup installs Node.js, Chromium, and FFmpeg in one app container, plus PostgreSQL for the migration path:

```text
docker compose up -d --build
```

Production VPS requirements:

- HTTPS reverse proxy such as Nginx or Caddy.
- Persistent volumes for `data/`, `uploads/`, and `recordings/`.
- Strong `JWT_SECRET`.
- Correct RTMP destination URLs and stream keys.
- CPU headroom for Chromium compositing and FFmpeg encoding.
- Monitoring for FFmpeg exits, bitrate drops, and source feed timeouts.

## Remaining Work For A Professional Platform

- Replace WebSocket chunk ingest with WebRTC/WHIP ingest for lower latency and better reliability.
- Add LiveKit or mediasoup for real multi-guest rooms.
- Add guest permissions, backstage approval, host mute/kick controls, and private chat.
- Move from JSON persistence to PostgreSQL.
- Encrypt stream keys instead of storing them as plain text.
- Add OAuth integrations for each destination platform.
- Add cloud recordings, separate tracks, and MP4 post-processing.
- Add comments/chat aggregation from YouTube, Twitch, Facebook, and LinkedIn.
- Add health monitoring for bitrate, FPS, dropped frames, reconnects, and FFmpeg failures.
- Add team roles, billing, subscriptions, usage limits, and admin tooling.
