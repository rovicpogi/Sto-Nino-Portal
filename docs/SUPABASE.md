# Supabase Setup

This project uses Supabase for Postgres, Auth, and optional Storage.

## 1. Environment Variables

Create `.env.local` at the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Restart the dev server after changes.

## 2. Client Usage

Use the shared client from `lib/supabaseClient.ts`:

```ts
import { supabase } from '@/lib/supabaseClient'

const { data, error } = await supabase.from('students').select('*')
```

## 3. Health Check

Visit `/api/health/supabase` to verify keys and basic connectivity.

Expected response:

```json
{"ok": true, "hasSession": false}
```

## 4. Recommended Next Steps

- Design tables and enable RLS for each table
- Create roles and policies (admin, teacher, student, parent)
- Add server routes for CRUD, attendance, grades
- Use Zod for validating request payloads
