# CLAUDE.md

Guidance for Claude Code sessions working on this repository.

## Project overview

Personal portfolio site for Raphael Thiago Eineck (Software Developer). Single-page application in English, dark theme, scroll-anchored sections.

## Stack

- **Frontend** (`frontend/`): React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion. Icons via `lucide-react`.
- **Backend** (`backend/`): Node + Express + TypeScript. Serves `GET /api/cv` (PDF download) and `GET /api/health`. In production also serves the built frontend.
- **No database.**

## Repo layout

```
frontend/
  src/
    components/        # Navbar, Hero, About, Experience, Footer, Section, ui/*
    config/site.ts     # Centralized site config — edit content here
    hooks/             # Custom hooks (e.g., useSmoothScroll)
    lib/               # Small helpers
    types/             # Shared TS types
backend/
  src/
    routes/            # cv.routes.ts, health.routes.ts
    middleware/
    config/env.ts
  assets/cv.pdf        # The CV file served by /api/cv
```

## Dev commands (run from repo root)

- `npm run install:all` — install all workspaces
- `npm run dev` — start backend (4000) + frontend (5173) concurrently
- `npm run build` — build frontend then backend
- `npm start` — run backend in production (serves built frontend)

## Docker

A single multi-stage `Dockerfile` at the repo root produces a small Alpine-based image that runs the backend (which serves the built frontend) on port 4000.

- `docker build -t eineck-dev:latest .` — build
- `docker run --rm -p 4000:4000 eineck-dev:latest` — run
- `docker compose up --build` — build + run via compose

Image layout inside the container: `/app/backend/{dist,assets,node_modules}` and `/app/frontend/dist`. The backend's production-mode static-serving path (`../../frontend/dist` relative to `backend/dist/app.js`) matches this layout — keep it that way when changing the Dockerfile.

When adding new runtime assets (e.g., a real CV PDF), drop them in `backend/assets/` — the Dockerfile already copies that whole directory.

## Conventions

- **All site content is English.** No Portuguese strings in user-facing copy.
- **Single source of truth for content** lives in `frontend/src/config/site.ts` (name, social URLs, sections). The rotating titles below the name live in `frontend/src/config/titles.ts` (consumed by `Typewriter` via `useTypewriter`).
- **Components are small and split per file.** Avoid kitchen-sink files.
- **Tailwind utility classes inline.** Theme tokens live in `frontend/tailwind.config.js`.
- **Dark mode only** for now (no toggle yet). Background `bg-zinc-950`, surfaces `bg-zinc-900`, text `text-zinc-100`, accent `text-emerald-400` (or whatever is configured in `tailwind.config.js`).
- **Smooth scroll** is handled both via CSS (`html { scroll-behavior: smooth }`) and `useSmoothScroll` hook for programmatic navigation from the navbar.
- **API base** in dev: relative `/api/*` (Vite proxies to backend). Do not hardcode `http://localhost:4000` in frontend code.
- **CV download**: frontend links to `/api/cv`. To update the CV, replace `backend/assets/cv.pdf`.
- **Responsive**: mobile-first. Navbar collapses to hamburger below `md`. Typography uses `text-* md:text-*` patterns.

## Where to make common changes

| Task | File |
| --- | --- |
| Edit hero description, name, location | `frontend/src/config/site.ts` |
| Add/edit rotating titles under the name | `frontend/src/config/titles.ts` |
| Add/edit/reorder experience cards | `frontend/src/config/experience.ts` |
| Add/edit/reorder skill cards | `frontend/src/config/skills.ts` |
| Replace profile photo | `frontend/public/profile.jpg` (path configured in `site.profileImage`) |
| Add a new social link | `frontend/src/config/site.ts` + `frontend/src/components/Hero.tsx` |
| Add a new section (e.g., Projects) | Add entry to `site.sections`, create `frontend/src/components/Projects.tsx`, mount in `App.tsx` |
| Change theme colors | `frontend/tailwind.config.js` |
| Replace CV | `backend/assets/cv.pdf` |
| Add a new API endpoint | Create `backend/src/routes/<name>.routes.ts`, mount in `backend/src/app.ts` |

## Out of scope (for now)

- No database, no auth, no analytics.
- Contact form endpoint is planned but not implemented yet.
- No light theme / theme toggle yet.
