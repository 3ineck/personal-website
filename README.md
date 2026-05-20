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

**Backend**
- Node.js + Express + TypeScript
- Serves the CV PDF and (later) a contact form
- In production, also serves the built frontend

## Page sections

- **About** — bio, profile photo, full name, and location.
- **Skills** — a responsive grid of six category cards (Frontend, Backend, Databases, Cloud/DevOps, Tools, Testing/Quality), each listing badge chips for the relevant skills.
- **Experience** — a carousel of professional experiences (current role first). Each card shows the role, company, date range with computed duration, key responsibilities, and the tools used. Navigate with the side arrows, pagination dots, or the keyboard arrow keys when the carousel has focus.

## Editing content

Site content is centralized under `frontend/src/config/`:

| What | File |
| --- | --- |
| Name, bio, location, social links, sections | `site.ts` |
| Rotating titles under the name | `titles.ts` |
| Skill cards | `skills.ts` |
| Experience cards | `experience.ts` |

Replace the CV at `backend/assets/cv.pdf` and the profile photo at `frontend/public/profile.jpg`.

## Project structure

```
.
├── frontend/        # React + Vite app
├── backend/         # Express API (serves /api/cv, /api/health)
├── package.json     # root orchestration scripts
├── LICENSE
└── README.md
```

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
docker build -t eineck-dev:latest .
docker run --rm -p 4000:4000 eineck-dev:latest
```

### Build & run with Docker Compose
```bash
docker compose up --build
```

Then open <http://localhost:4000>.

To replace the CV without rebuilding the whole image, rebuild only the runtime layers after replacing `backend/assets/cv.pdf`.

## CV file

The CV PDF lives at `backend/assets/cv.pdf` and is exposed via `GET /api/cv`. Replace that file with the up-to-date CV when needed — no code change required.

## License

[MIT](./LICENSE)
