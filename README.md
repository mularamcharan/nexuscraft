# NexusCraft

NexusCraft is a single Next.js application that combines the original learning workspace with Remix Grab's learning tools and project discovery. The application keeps Next.js App Router files in the root `app/` directory, where Next.js requires them; its UI source is organized under `frontend/`.

## Requirements

- Node.js 22.5 or newer (`node:sqlite` is used by the server-side data layer)
- npm

## Run locally

```powershell
npm install
npm run dev
```

Open <http://localhost:3000>. The SQLite database is initialized from `database/migrations/` and seeded from `database/seeds/` the first time an API route runs. Its private database file is created at `database/nexuscraft.sqlite` and is excluded from source control.

To enable AI coaching in Prompt Mastery, set `OPENROUTER_API_KEY` in a root `.env.local` file (see `.env.example`) and restart the server. The key is read only by the backend; without it, the coach reports that it is not configured. The coach is designed to provide learning hints and reflection prompts, not completed answers.

Validate changes with:

```powershell
npm run lint
npm test
npm run build
```

`npm test` runs the API smoke tests against a running app. Start `npm run dev` in one terminal, then run `npm test` in another. Set `NEXUSCRAFT_TEST_URL` to use a different local URL.

## Project layout

- `app/` — Next.js route definitions, layouts, and thin API route handlers. The location is required by the App Router.
- `frontend/` — UI components, imported learning-tool screens, page styling, client state, and the typed API client.
- `backend/` — server-only API data access, request/session validation, and business logic.
- `database/` — SQLite migrations, seed SQL, and the ignored local database file.
- `shared/` — contracts shared between the browser UI and server routes.
- `integrations/` — the inspected source-project snapshots, preserved inactive Vite entry files, and source-to-target map. The source Vite/Supabase services are archived and are not loaded into the active Next.js runtime.
- `tests/` — local API integration smoke tests.

## Data and security

Profile and project API requests are same-origin only. The server issues a random, HttpOnly, SameSite session cookie, stores only its hash in SQLite, and scopes newly created project records to that browser session. Database code runs only in Node.js route handlers; database files and credentials are not sent to the browser.

This is still a local demo, not an account system: anonymous browser sessions are not synchronized across devices, and the original sample learning progress remains browser-local. OpenRouter credentials are optional, server-only, and must be supplied by the operator; no private API key is bundled. NexusCraft-main's Supabase migrations and Deno edge functions are not applied to this SQLite runtime.

Learning/workspace preferences, notification choices, and privacy choices are saved in the current browser's local storage from the unified Settings screen.

## Source project mapping

See [integrations/FILE-MAP.md](./integrations/FILE-MAP.md) for the inspected source projects, file mapping, and compatibility decisions. The original source folders remain outside this application root and were not overwritten.
