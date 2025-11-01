# Sto Niño Portal

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/) [![Supabase](https://img.shields.io/badge/Supabase-DB%2FAuth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/) [![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A school portal with Admin, Teacher, Student, and Parent views. Frontend is implemented with Next.js App Router and shadcn/ui; backend integrates Supabase for database and auth.

## Quick Start

1) Install dependencies

```bash
pnpm install
```

2) Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3) Run the dev server

```bash
pnpm dev
```

4) Verify Supabase connectivity

Open `/api/health/supabase` in your browser. You should see `{"ok":true}` if keys are valid.

## Scripts

- `pnpm dev` — start Next.js in development
- `pnpm build` — build for production
- `pnpm start` — run production build
- `pnpm lint` — run Next/TypeScript linting

## Project Structure

```
app/                  # Next.js App Router routes
  admin/              # Admin portal UI
  teacher/            # Teacher portal UI
  student/            # Student portal UI
  parent/             # Parent portal UI
  api/                # API routes (server only)
components/           # Reusable UI components (shadcn/ui)
lib/                  # Utilities and clients (e.g., supabaseClient)
public/               # Static assets
styles/               # Global styles
docs/                 # Additional documentation
```

Key files:

- `lib/supabaseClient.ts` — creates and validates the Supabase client
- `app/api/health/supabase/route.ts` — simple health endpoint for DB/Auth

## Using Supabase in Code

```ts
import { supabase } from '@/lib/supabaseClient'

export async function loadStudents() {
  const { data, error } = await supabase.from('students').select('*')
  if (error) throw error
  return data
}
```

## Documentation

- See `docs/ARCHITECTURE.md` for a high-level overview
- See `docs/SUPABASE.md` to configure DB/Auth and test connectivity
- See `docs/BACKEND.md` for API route patterns and examples
- See `docs/FRONTEND.md` for UI conventions and file paths

## Notes for Students

- Keep your `.env.local` private; never commit credentials
- When stuck, check the health route and console logs first
- Small, incremental changes are easier to test and review
