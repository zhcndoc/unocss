FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git \
  && cd /app \
  && git clone https://github.com/zhcndoc/unocss.git . \
  && corepack enable \
  && pnpm install \
  && pnpm -w run deploy

FROM caddy:2-alpine

COPY --from=builder /app/docs/dist /usr/share/caddy

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
