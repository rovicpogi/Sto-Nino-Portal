import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const admin = getSupabaseAdmin()

    // Query the Admin table (note: case-sensitive table name)
    const { data: adminUser, error } = await admin
      .from('Admin')
      .select('*')
      .eq('Email', email)
      .single()

    if (error || !adminUser) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Compare password (assuming plain text for now - in production, use bcrypt or similar)
    if (adminUser.Password !== password) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Return admin data (excluding password)
    const { Password: _, ...adminData } = adminUser

    return NextResponse.json({
      ok: true,
      user: adminData,
      userType: 'admin',
    })
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'Unknown error' },
      { status: 500 }
    )
  }
}

