FROM node:22-bookworm-slim

ENV NODE_ENV=production
ENV CHROME_PATH=/usr/bin/chromium
ENV FFMPEG_PATH=ffmpeg

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    chromium \
    ffmpeg \
    ca-certificates \
    fonts-liberation \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN mkdir -p data uploads recordings

EXPOSE 8088

CMD ["npm", "start"]
