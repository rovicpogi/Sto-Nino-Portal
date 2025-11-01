# Supabase Setup

This project uses Supabase for Postgres, Auth, and optional Storage.

## 1. Environment Variables

Create `.env.local` at the project root:

```
NEXT_PUBLIC_SUPABASE_URL=https://ulntyefamkxkbynrugop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbnR5ZWZhbWt4a2J5bnJ1Z29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjgwNDEsImV4cCI6MjA3NjIwNDA0MX0.TnL8jfBVJD8Z0N5rFl_KFhAku8zxiy2fFvztBDYHaWk
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbnR5ZWZhbWt4a2J5bnJ1Z29wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDYyODA0MSwiZXhwIjoyMDc2MjA0MDQxfQ.tfffewwmTzFzUE5rvchjfVzzI6OPInrpZ4WlIHG_4sw
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
