import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if Supabase is configured
    if (!supabase) {
      console.error('Supabase client not initialized')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database service not configured. Please check your environment variables.' 
        },
        { status: 500 }
      )
    }

    // Query the Admin table for a matching email (case-insensitive)
    const emailLower = email.toLowerCase().trim()
    
    const { data: admins, error } = await supabase
      .from('Admin')
      .select('*')
      .limit(10) // Get multiple to check case sensitivity

    if (error) {
      console.error('Database error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database error: Unable to connect to admin database.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      )
    }

    // Debug logging (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('Admin query results:', admins?.map((a: any, idx: number) => {
        return {
          index: idx,
          email: a.email || a.Email,
          hasPassword: !!(a.Password || a.password),
          fields: Object.keys(a)
        }
      })
    )
    }

    // Find admin by email (case-insensitive)
    const admin = admins?.find((a: any) => 
      (a.email || a.Email) && (a.email || a.Email).toLowerCase().trim() === emailLower
    )

    // Check if admin exists
    if (!admin) {
      console.error('Admin not found for email:', email)
      return NextResponse.json(
        { success: false, error: `No admin found with email: ${email}. Please check your email address.` },
        { status: 401 }
      )
    }

    // Check if Password field exists (case-sensitive column name)
    // Try both 'password' and 'Password' to handle different naming conventions
    const passwordField = admin.Password !== undefined ? 'Password' : 
                          admin.password !== undefined ? 'password' : null
    
    if (!passwordField) {
      console.error('Password field not found in admin record. Available fields:', Object.keys(admin))
      return NextResponse.json(
        { success: false, error: 'Database configuration error: Password field not found in admin record.' },
        { status: 500 }
      )
    }

    // Compare passwords
    // Note: In production, passwords should be hashed using bcrypt or similar
    // For now, this assumes plain text comparison. You should hash passwords when storing them.
    const adminPassword = passwordField === 'Password' ? admin.Password : admin.password
    
    // Debug logging (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('Password comparison:', {
        provided: password,
        stored: adminPassword ? '***' : 'null/undefined',
        match: adminPassword === password,
        fieldName: passwordField
      })
    }
    
    if (!adminPassword || adminPassword !== password) {
      console.error('Password mismatch for email:', email)
      return NextResponse.json(
        { success: false, error: 'Invalid password. Please check your password and try again.' },
        { status: 401 }
      )
    }

    // Remove password from response for security
    const { Password, password: pwd, ...adminDataWithoutPassword } = admin

    return NextResponse.json({
      success: true,
      admin: adminDataWithoutPassword,
      userType: 'admin'
    })
  } catch (error: any) {
    console.error('Admin login API error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

