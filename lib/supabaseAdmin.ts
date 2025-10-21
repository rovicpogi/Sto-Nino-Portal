import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

function assertAdminEnv(): asserts supabaseUrl is string & { length: number } {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase admin env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server-only).')
  }
}

export function getSupabaseAdmin(): SupabaseClient {
  assertAdminEnv()
  return createClient(supabaseUrl as string, serviceRoleKey as string, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}


