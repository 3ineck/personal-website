# syntax=docker/dockerfile:1.6

# ---------- Stage 1: build frontend ----------
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

ARG VITE_TURNSTILE_SITE_KEY=""
ENV VITE_TURNSTILE_SITE_KEY=$VITE_TURNSTILE_SITE_KEY

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# ---------- Stage 2: build backend ----------
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend

COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend/tsconfig.json ./
COPY backend/src ./src
RUN npm run build

# ---------- Stage 3: production runtime ----------
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    PORT=4000

# Install only production deps for the backend
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm ci --omit=dev && npm cache clean --force

# Compiled backend + static assets
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY backend/assets ./backend/assets

# Built frontend served by Express in production
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Run as non-root for safety
RUN addgroup -S app && adduser -S app -G app \
    && chown -R app:app /app
USER app

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:4000/api/health || exit 1

CMD ["node", "backend/dist/index.js"]
