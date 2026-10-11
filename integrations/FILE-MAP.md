# Integration file map

## Target root

The active application root is this `nexuscraft/` folder. Open this folder in VS Code to work with one application root. The App Router stays in root `app/` because Next.js requires the route directory at the project root (or `src/app`); moving it into an arbitrary `frontend/app` would break routing.

## Primary NexusCraft

| Source | Target | Notes |
| --- | --- | --- |
| `app/` routes and layout | `app/` | Kept in place to preserve the existing App Router URLs and server-rendering behavior. Added thin API routes under `app/api/`. |
| `components/` | `frontend/components/` | Existing workspace shell, landing/dashboard UI, and reusable components. |
| `lib/` | `frontend/lib/` | Existing demo data and browser-state helpers. |
| `src/` | `frontend/src/` | Existing feature app and feature screens, including Prompt Mastery, community, quizzes, messages, settings, profiles, portfolio, productivity, calendar, search, and project discovery. |
| `assets/`, `types/` | `frontend/assets/`, `frontend/types/` | Existing frontend assets and CSS module types. |
| `app/globals.css` | `frontend/styles/globals.css` | Global styles are imported by the root layout. |
| root `server.ts`, `vite.config.ts`, `index.html`, `metadata.json`, `bun.lock` | `integrations/legacy-vite-entry/` | Preserved but removed from the active Next.js build. The primary scripts already use Next.js. |

## Remix Grab

The complete 38-file first-party Remix Grab project is preserved at `integrations/source-projects/remix-pagegrab/`. Its reusable feature screens are active under `frontend/src/` and load through `/features`; the archived Vite entry files are retained for reference but are not part of the Next.js runtime. Project discovery is composed into `/projects` and backed by `/api/projects`; old `/features?tab=projects` links redirect there. Learning tools are indexed in the shared global search. The legacy `/features?tab=search` link now opens that global search instead of returning a 404.

## NexusCraft-main

The complete 271-file first-party NexusCraft-main project is preserved at `integrations/source-projects/nexuscraft-main/`. Its reusable project-card presentation was adapted as `frontend/components/project-card.tsx` and is used by the integrated Projects screen. The source Vite entry point and Supabase/Deno services remain archived and are not launched by the active Next.js app; shared browser/server API data shapes are defined in `shared/types.ts`.

NexusCraft-main's Supabase SQL migrations and Deno edge functions target a separate Supabase/Postgres deployment and require external credentials and edge-function configuration, so they remain inactive. The unified app instead uses the local server-only SQLite adapter in `backend/` and migration/seed files in `database/`. Its source `.env` file remains only in the archived project folder, is covered by the root `.gitignore`, and is not loaded by the active app; its contents were not inspected.

The original sibling source directories were not present at the expected parent path during this move. The complete source snapshots already under `tests/` were relocated to `integrations/source-projects/` and verified file-by-file with SHA-256 hashes. There are now no nested application snapshots in `tests/`.

## Backend and database

| Responsibility | Target |
| --- | --- |
| Profile/project input validation and HTTP methods | `app/api/profile/route.ts`, `app/api/projects/route.ts` |
| SQLite data access | `backend/database.ts`, `backend/profiles.ts`, `backend/projects.ts` |
| Anonymous session and same-origin checks | `backend/session.ts` |
| Schema and demo records | `database/migrations/001-initial.sql`, `database/seeds/001-sample-projects.sql` |
| Frontend API contract and requests | `shared/types.ts`, `frontend/api-client.ts` |
| Endpoint regression checks | `tests/api-smoke.test.mjs` |
