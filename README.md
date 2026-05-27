# eineck.dev

Personal portfolio website of **Raphael Thiago Eineck**, Software Developer.

A single-page application with smooth-scroll sections, built as a small monorepo with a React frontend and an Express backend.

## Stack

**Frontend**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- lucide-react (icons)
- `@marsidev/react-turnstile` (Cloudflare Turnstile widget)

**Backend**
- Node.js + Express + TypeScript
- `nodemailer` for SMTP delivery
- Endpoints: `/api/health`, `/api/cv`, `/api/contact`
- In production, also serves the built frontend

## Page sections

- **About** — bio, profile photo, full name, and location.
- **Skills** — a responsive grid of six category cards (Frontend, Backend, Databases, Cloud/DevOps, Tools, Testing/Quality), each listing badge chips for the relevant skills.
- **Experience** — a carousel of professional experiences (current role first). Each card shows the role, company, date range with computed duration, key responsibilities, and the tools used. Navigate with the side arrows, pagination dots, keyboard arrow keys, or by swiping horizontally on touch devices.
- **Projects** — selected personal/freelance projects.
- **Contact** — links to email, LinkedIn, and GitHub, plus a modal contact form (Turnstile-protected, sends via SMTP).

## Editing content

Site content is centralized under `frontend/src/config/`:

| What | File |
| --- | --- |
| Name, bio, location, social links, sections | `site.ts` |
| Rotating titles under the name | `titles.ts` |
| Skill cards | `skills.ts` |
| Experience cards | `experience.ts` |
| Project cards | `projects.ts` |

Replace the CV at `backend/assets/cv.pdf` and the profile photo at `frontend/public/profile.jpg`.

## Project structure

```
.
├── frontend/                # React + Vite app
├── backend/                 # Express API (/api/health, /api/cv, /api/contact)
├── .github/workflows/       # CI: auto-deploy on push to main
├── Dockerfile               # multi-stage build (frontend + backend → runtime)
├── docker-compose.yml
├── package.json             # root orchestration scripts
├── LICENSE
└── README.md
```

## Environment variables

The contact form requires Cloudflare Turnstile keys and SMTP credentials. Copy the example files and fill in your values — none of the real `.env` files are committed.

| File | Used by |
| --- | --- |
| `.env.example` (repo root) | `docker-compose.yml` (build args + runtime env) |
| `frontend/.env.example` | `vite` dev/build (`VITE_TURNSTILE_SITE_KEY`) |
| `backend/.env.example` | `backend` runtime (`TURNSTILE_SECRET_KEY`, `SMTP_*`, `CONTACT_TO`) |

Required keys:

- `VITE_TURNSTILE_SITE_KEY` — public Turnstile site key (baked into the frontend bundle at build time).
- `TURNSTILE_SECRET_KEY` — server-side Turnstile secret.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` — outgoing-mail credentials.
- `CONTACT_TO` — recipient address for contact-form messages.

Cloudflare's "always passes" test keys (`1x00000000000000000000AA` / `1x0000000000000000000000000000000AA`) are useful for local development before signing up.

## Getting started

### Prerequisites
- Node.js 20+
- npm 10+

### Install
From the repo root:

```bash
npm run install:all
```

This installs root, `frontend/`, and `backend/` dependencies.

### Develop
```bash
npm run dev
```

- Frontend: <http://localhost:5173>
- Backend: <http://localhost:4000>

The Vite dev server proxies `/api/*` to the backend.

### Build & run in production
```bash
npm run build
npm start
```

The backend serves the built frontend at <http://localhost:4000>.

## Docker

A single multi-stage `Dockerfile` builds both the frontend and the backend, and the resulting image serves the whole site on port `4000`.

### Build & run with Docker
```bash
docker build --build-arg VITE_TURNSTILE_SITE_KEY=... -t eineck-dev:latest .
docker run --rm -p 4000:4000 --env-file .env eineck-dev:latest
```

Then open <http://localhost:4000>.

### Build & run with Docker Compose

`docker-compose.yml` reads a `.env` file next to it and maps the container's port `4000` to host port `5000`.

```bash
docker compose up --build -d
```

Then open <http://localhost:5000>.

To replace the CV without rebuilding the whole image, rebuild only the runtime layers after replacing `backend/assets/cv.pdf`.

## CV file

The CV PDF lives at `backend/assets/cv.pdf` and is exposed via `GET /api/cv`. Replace that file with the up-to-date CV when needed — no code change required.

## Deployment

`.github/workflows/main.yml` watches the `main` branch. On every push it SSHes into the production host using repository secrets (`SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`, `WORK_DIR`, `MAIN_BRANCH`) and runs `git pull && docker compose up --build -d`. The production server must have its own `.env` file alongside `docker-compose.yml` with the Turnstile + SMTP values.

## License

[MIT](./LICENSE)
