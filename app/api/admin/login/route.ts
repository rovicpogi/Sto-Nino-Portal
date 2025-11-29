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
    const emailLower = email.toLowerCase().trim()
    const { data: admins, error } = await admin
      .from('Admin')
      .select('*')
      .limit(10)

    if (error) {
      console.error('Database error:', error)
      // Return 200 with error message instead of 500
      return NextResponse.json(
        { ok: false, error: 'Database connection error. Please try again.' },
        { status: 200 } // Return 200 to prevent Internal Server Error page
      )
    }

    // Find admin by email (case-insensitive)
    const adminUser = admins?.find((a: any) => 
      (a.Email || a.email) && (a.Email || a.email).toString().toLowerCase().trim() === emailLower
    )

    if (!adminUser) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check for Password field (both lowercase and capitalized)
    const adminPassword = adminUser.Password !== undefined ? adminUser.Password : 
                         adminUser.password !== undefined ? adminUser.password : null

    if (!adminPassword || adminPassword !== password) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Return admin data (excluding password)
    const adminWithoutPassword = { ...adminUser }
    if (adminWithoutPassword.Password !== undefined) delete adminWithoutPassword.Password
    if (adminWithoutPassword.password !== undefined) delete adminWithoutPassword.password

    return NextResponse.json({
      ok: true,
      user: adminWithoutPassword,
      userType: 'admin',
    })
  } catch (e: any) {
    // Return 200 with error message instead of 500 to prevent Internal Server Error
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'Unknown error' },
      { status: 200 } // Always return 200, never 500
    )
  }
}

