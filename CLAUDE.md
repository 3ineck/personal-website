# CLAUDE.md

Guidance for Claude Code sessions working on this repository.

## Project overview

Personal portfolio site for Raphael Thiago Eineck (Software Developer). Single-page application in English, dark theme, scroll-anchored sections. Production deployment is fully Docker-driven and auto-deployed from `main` via a GitHub Actions SSH workflow.

## Stack

- **Frontend** (`frontend/`): React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion. Icons via `lucide-react`. Cloudflare Turnstile widget via `@marsidev/react-turnstile`.
- **Backend** (`backend/`): Node + Express + TypeScript. Endpoints: `GET /api/health`, `GET /api/cv` (PDF download), `POST /api/contact` (Turnstile-verified, sends mail via `nodemailer` over SMTP). In production also serves the built frontend.
- **No database.**

## Repo layout

```
frontend/
  src/
    components/        # Navbar, Hero, About, Skills, Experience, Projects, Contact, ContactForm, Footer, Section, ui/*
    config/site.ts     # Centralized site config — edit content here
    config/*.ts        # titles, skills, experience, projects
    hooks/             # Custom hooks (e.g., useSmoothScroll, useTypewriter)
    lib/               # Small helpers
    types/             # Shared TS types
    vite-env.d.ts      # Vite/import.meta.env types
  .env.example         # VITE_TURNSTILE_SITE_KEY
backend/
  src/
    routes/            # cv.routes.ts, health.routes.ts, contact.routes.ts
    middleware/        # errorHandler
    config/env.ts      # Loads dotenv, exposes all env vars (port, smtp, turnstile, contactTo)
  assets/cv.pdf        # The CV file served by /api/cv
  .env.example         # Backend runtime env (SMTP_*, TURNSTILE_SECRET_KEY, CONTACT_TO)
Dockerfile             # Multi-stage build: frontend builder → backend builder → alpine runtime
docker-compose.yml     # Maps host 5000 → container 4000; passes build args + runtime env
.env.example           # Root: docker-compose reads from `.env` next to it
.github/workflows/
  main.yml             # On push to main: SSH to server, git pull, docker compose up --build -d
```

## Dev commands (run from repo root)

- `npm run install:all` — install all workspaces
- `npm run dev` — start backend (4000) + frontend (5173) concurrently
- `npm run build` — build frontend then backend
- `npm start` — run backend in production (serves built frontend)

## Docker

A single multi-stage `Dockerfile` at the repo root produces an Alpine-based image that runs the backend (which also serves the built frontend) on container port `4000`. `docker-compose.yml` maps that to host port **`5000`**.

- `docker compose up --build -d` — preferred way; reads `.env` next to compose.
- `docker build --build-arg VITE_TURNSTILE_SITE_KEY=... -t eineck-dev:latest .` then `docker run --rm -p 4000:4000 --env-file .env eineck-dev:latest` — equivalent without compose.

`VITE_TURNSTILE_SITE_KEY` must be passed as a **build arg** because Vite bakes it into the frontend bundle at build time. The other SMTP/Turnstile/contact env vars are runtime-only.

Image layout inside the container: `/app/backend/{dist,assets,node_modules}` and `/app/frontend/dist`. The backend's production-mode static-serving path (`../../frontend/dist` relative to `backend/dist/app.js`) matches this layout — keep it that way when changing the Dockerfile.

When adding new runtime assets (e.g., a real CV PDF), drop them in `backend/assets/` — the Dockerfile already copies that whole directory.

**Always rebuild the container after frontend or backend source changes** (see `docker compose up --build -d`). For runtime-only env changes, plain `docker compose up -d` is enough.

## Environment variables

All secrets live in `.env` files (gitignored). Three example files document the required keys:

- `.env.example` (repo root) — consumed by `docker-compose.yml` (build args + runtime env).
- `frontend/.env.example` — `VITE_TURNSTILE_SITE_KEY` (public, baked into bundle).
- `backend/.env.example` — server-only: `TURNSTILE_SECRET_KEY`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_TO`.

Never add defaults for sensitive values in source. `backend/src/config/env.ts` reads everything from `process.env` with empty-string fallbacks; the `/api/contact` handler returns a 500 with a clear "not configured" message if any required key is missing — do not paper over that with hardcoded fallbacks.

Cloudflare's "always passes" test keys (`1x00000000000000000000AA` site / `1x0000000000000000000000000000000AA` secret) are useful for local development before signing up.

## Deployment

`.github/workflows/main.yml` watches `main`. On push it SSHes into the production server using repo secrets (`SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`, `WORK_DIR`, `MAIN_BRANCH`) and runs `git pull && docker compose up --build -d`. The server must have its own `.env` next to `docker-compose.yml` — the workflow does not provision env vars.

## Conventions

- **All site content is English.** No Portuguese strings in user-facing copy.
- **Single source of truth for content** lives in `frontend/src/config/site.ts` (name, social URLs, sections, recipient email shown publicly). Other content lives next to it: `titles.ts`, `skills.ts`, `experience.ts`, `projects.ts`.
- **Components are small and split per file.** Avoid kitchen-sink files.
- **Tailwind utility classes inline.** Theme tokens live in `frontend/tailwind.config.js`.
- **Dark mode only** for now (no toggle yet). Background `bg-zinc-950`, surfaces `bg-zinc-900`, text `text-zinc-100`, accent `text-emerald-400` (or whatever is configured in `tailwind.config.js`).
- **Smooth scroll** is handled both via CSS (`html { scroll-behavior: smooth }`) and `useSmoothScroll` hook for programmatic navigation from the navbar.
- **API base** in dev: relative `/api/*` (Vite proxies to backend). Do not hardcode `http://localhost:4000` in frontend code.
- **CV download**: frontend links to `/api/cv`. To update the CV, replace `backend/assets/cv.pdf`.
- **Contact form**: posts to `/api/contact`. Honeypot + Turnstile + field validation on both ends. Token is verified server-side against `challenges.cloudflare.com/turnstile/v0/siteverify` before SMTP send.
- **Experience carousel**: card height is `min-h-*` (not fixed) so long entries grow on mobile; Framer Motion `drag="x"` enables horizontal swipe with a 60px / 500px-per-second threshold.
- **Responsive**: mobile-first. Navbar collapses to hamburger below `md`. Typography uses `text-* md:text-*` patterns.

## Where to make common changes

| Task | File |
| --- | --- |
| Edit hero description, name, location, public email | `frontend/src/config/site.ts` |
| Add/edit rotating titles under the name | `frontend/src/config/titles.ts` |
| Add/edit/reorder experience cards | `frontend/src/config/experience.ts` |
| Add/edit/reorder skill cards | `frontend/src/config/skills.ts` |
| Add/edit/reorder project cards | `frontend/src/config/projects.ts` |
| Replace profile photo | `frontend/public/profile.jpg` (path configured in `site.profileImage`) |
| Add a new social link | `frontend/src/config/site.ts` + `frontend/src/components/Hero.tsx` |
| Add a new section | Add entry to `site.sections`, create the component under `frontend/src/components/`, mount in `App.tsx` |
| Edit the contact form fields / validation | `frontend/src/components/ContactForm.tsx` |
| Change recipient or SMTP for contact mail | `.env` (do **not** hardcode in source) |
| Change theme colors | `frontend/tailwind.config.js` |
| Replace CV | `backend/assets/cv.pdf` |
| Add a new API endpoint | Create `backend/src/routes/<name>.routes.ts`, mount in `backend/src/app.ts` |
| Tweak Docker build / runtime env | `Dockerfile` (build args), `docker-compose.yml` (runtime env) |

## Out of scope (for now)

- No database, no auth, no analytics.
- No light theme / theme toggle yet.
- No rate limiting on `/api/contact` — relies on honeypot + Turnstile for now.
