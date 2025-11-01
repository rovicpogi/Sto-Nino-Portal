import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET() {
  try {
    const admin = getSupabaseAdmin()

    // Check connectivity via a lightweight RPC: current timestamp
    const { data: pingData, error: pingError } = await admin.rpc('now')
    // Fall back to a trivial query if `now()` function is not exposed
    let ping = pingData ?? null
    if (pingError) {
      const { data: one, error: oneError } = await admin.from('pg_catalog.pg_type').select('oid').limit(1)
      if (oneError) throw oneError
      ping = one?.[0]?.oid ?? 'ok'
    }

    // Probe for a few expected tables (non-fatal if missing)
    const expectedTables = ['students', 'teachers', 'parents', 'attendance_records']
    const tableStatus: Record<string, boolean> = {}
    for (const t of expectedTables) {
      const { error } = await admin.from(t).select('*', { count: 'exact', head: true })
      tableStatus[t] = !error
    }

    return NextResponse.json({ ok: true, ping, tables: tableStatus })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Unknown error' }, { status: 500 })
  }
}


