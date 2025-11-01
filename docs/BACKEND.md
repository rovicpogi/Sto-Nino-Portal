# Backend (API) Guide

API routes live under `app/api/*` and run on the server. Use them for DB reads/writes and integrations (e.g., RFID).

## Route Basics

Create a route file like `app/api/example/route.ts`:

```ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  const { data, error } = await supabase.from('students').select('*').limit(10)
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, data })
}
```

## Input Validation (zod)

```ts
import { z } from 'zod'

const BodySchema = z.object({
  studentId: z.string().min(1),
  subjectId: z.string().min(1),
  grade: z.number().min(0).max(100),
})

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = BodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 })
  }
  // use parsed.data
}
```

## Error Shape

Always return a consistent JSON structure:

- success: `{ ok: true, data }`
- failure: `{ ok: false, error: string, details?: any }`

## Auth Context

- Use Supabase auth in the client or middleware to get user context
- For server-only reads, scope queries by the current user when RLS is enabled

## Tips

- Keep handlers small; extract shared helpers into `lib/`
- Add indexes for frequent filters (e.g., by user_id, class_id, date)
- Log errors with enough context to debug (no secrets)
