# Architecture Overview

This project uses Next.js App Router for UI and API routes, with Supabase for database and authentication.

## Layers

- UI (app/*): Server and client components render the portals for Admin, Teacher, Student, Parent
- API (app/api/*): Route handlers for server-only logic and integrations
- Data (Supabase): Postgres, Auth, Storage managed by Supabase
- Lib (lib/*): Clients and helpers, e.g. `lib/supabaseClient.ts`

## Routing

- `app/admin`, `app/teacher`, `app/student`, `app/parent`: feature areas
- `app/api/*`: server endpoints (only run on the server)

## State & Data Fetching

- Prefer server-side data fetching in route handlers or server components
- Use the shared `supabase` client in `lib/supabaseClient.ts`

## Security

- Keep environment variables in `.env.local`
- Enable RLS in Supabase and author policies per role when tables are added

## Observability

- Add structured logs in API routes when implementing backend features

