# Sri Thangam Housing frontend

Independent React + TypeScript + Tailwind CSS + Vite application. Targets Node.js 20 (20.19 or newer). A `.nvmrc` is included; use `nvm install 20` and `nvm use 20` with nvm-windows, or `nvm install` and `nvm use` with nvm on macOS/Linux.

Run all commands from this folder:

```sh
npm install
npm run dev
```

Website: http://localhost:5173.

```sh
npm run build
npm run preview
```

Build output: `dist/`. Preview defaults to http://localhost:4173.

Copy `.env.example` to `.env` to customize `VITE_API_BASE_URL`, which defaults to http://localhost:3000/api. Frontend environment variables are public; do not store secrets in them. Axios in `src/api/http.ts` connects to the NestJS catalogue endpoint. TanStack Query caches and refreshes it; a labelled sample fallback is shown if the API is unavailable.

Navigation labels and the logo reference https://srithangamhousing.com/. The design is original; properties and photographs are illustrative. Replace sample listings and leadership content before launch. Fonts and photos currently require external network access.

The visit planner saves only in browser localStorage with consent. It does not send enquiries to the backend. The backend is installed and run separately from `../backend`.

Commit package-lock.json. Do not commit node_modules, dist, or private environment files.

## Frontend stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- TanStack Query v5 for the property catalogue
- Zustand v5 for property filters
- React Hook Form v7 + Zod v4 for accessible enquiry validation
- React Router v7 for the home page, property detail URLs, and not-found pages
- Axios for HTTP requests
- Socket.IO client v4 for optional catalogue refresh events

Routes: /, /about, /leaders, /contact, /portfolio/:category, and /plots/:slug. Configure production hosting to serve index.html for application routes so direct links and refresh work.

Realtime is opt-in: configure VITE_SOCKET_URL only when a Socket.IO server is available. The client invalidates the catalogue query on properties:updated and on connection/reconnection. No Socket.IO server is implemented yet; the client stays disconnected by default.

## Source structure

```text
src/
  api/                  Axios client and validated API requests
  assets/               Brand logo and illustrative catalogue data
  components/
    layout/             Header, footer, and navigation
    ui/                 Shared brand and accessible dialog
    home/               Homepage sections
    properties/         Property cards and visit dialog
    forms/              Visit enquiry form
    ErrorBoundary.tsx
  hooks/                Queries, realtime updates, and dialog lifecycle
  lib/                  Query client, helpers, and validation schemas
  pages/                Home and not-found route components
  stores/               Zustand property filters
  test/                 Form and API contract tests
  types/                Shared frontend domain types
  App.tsx               Providers and route definitions
  main.tsx              React entry point
```

Run `npm test` for validation and API-boundary checks. Add pages and feature components as the website grows. Role dashboards and authentication screens are not part of the current public website.
