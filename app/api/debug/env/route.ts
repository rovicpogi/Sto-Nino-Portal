import { NextResponse } from 'next/server'

// Debug endpoint to check environment variables
export async function GET() {
  const envCheck = {
    NEXT_PUBLIC_SUPABASE_URL: {
      exists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      value: process.env.NEXT_PUBLIC_SUPABASE_URL || 'MISSING',
      preview: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...' || 'MISSING',
    },
    NEXT_PUBLIC_SUPABASE_ANON_KEY: {
      exists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET (hidden)' : 'MISSING',
      preview: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 30) + '...' || 'MISSING',
    },
    SUPABASE_SERVICE_ROLE_KEY: {
      exists: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      value: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET (hidden)' : 'MISSING',
      preview: process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 30) + '...' || 'MISSING',
    },
  }

  // Also log to console
  console.log("=== ENVIRONMENT VARIABLES DEBUG ===")
  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("ANON:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) || "MISSING")
  console.log("SERVICE:", process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) || "MISSING")
  console.log("===================================")

  return NextResponse.json({
    success: true,
    environment: process.env.NODE_ENV,
    variables: envCheck,
    allSet: envCheck.NEXT_PUBLIC_SUPABASE_URL.exists && 
            envCheck.NEXT_PUBLIC_SUPABASE_ANON_KEY.exists && 
            envCheck.SUPABASE_SERVICE_ROLE_KEY.exists,
  }, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

