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

    // Query the teachers table for a matching email (case-insensitive)
    // Try lowercase email for case-insensitive matching
    const emailLower = email.toLowerCase().trim()
    
    const { data: teachers, error } = await supabase
      .from('teachers')
      .select('*')
      .limit(10) // Get multiple to check case sensitivity

    if (error) {
      console.error('Database error:', error)
      
      // Provide more specific error messages
      const errorMsg = error.message || String(error) || ''
      if (error.code === '42P01' || (errorMsg && errorMsg.includes('does not exist'))) {
        return NextResponse.json({
          success: false,
          error: 'Teachers table does not exist in the database. Please create the teachers table first.',
        }, { status: 500 })
      }
      
      if (error.code === 'PGRST116' || (errorMsg && errorMsg.includes('relation'))) {
        return NextResponse.json({
          success: false,
          error: 'Database connection error. Please check your Supabase configuration.',
        }, { status: 500 })
      }

      // In development, provide more detailed error
      if (process.env.NODE_ENV === 'development') {
        console.warn('Database error (development mode):', errorMsg, error.code)
        return NextResponse.json({
          success: false,
          error: `Database error: ${errorMsg}. Please check if the teachers table exists and has 'email' and 'Password' columns.`,
        }, { status: 500 })
      }
      
      return NextResponse.json(
        { success: false, error: 'Database connection error. Please try again later.' },
        { status: 500 }
      )
    }

    // Debug: Log all teachers and their emails (in development only)
    if (process.env.NODE_ENV === 'development' && teachers) {
      console.log('Found teachers:', teachers.length)
      console.log('Looking for email:', emailLower)
      teachers.forEach((t: any, idx: number) => {
        console.log(`Teacher ${idx}:`, {
          email: t.email,
          emailLower: t.email?.toLowerCase(),
          hasPassword: t.Password !== undefined || t.password !== undefined,
          passwordField: t.Password !== undefined ? 'Password' : t.password !== undefined ? 'password' : 'none',
          allKeys: Object.keys(t)
        })
      })
    }

    // Find teacher by email (case-insensitive)
    const teacher = teachers?.find((t: any) => 
      t.email && t.email.toLowerCase().trim() === emailLower
    )

    // Check if teacher exists
    if (!teacher) {
      console.error('Teacher not found for email:', email)
      return NextResponse.json(
        { success: false, error: `No teacher found with email: ${email}. Please check your email address.` },
        { status: 401 }
      )
    }

    // Check if Password field exists (case-sensitive column name)
    // Try both 'password' and 'Password' to handle different naming conventions
    const passwordField = teacher.Password !== undefined ? 'Password' : 
                          teacher.password !== undefined ? 'password' : null
    
    if (!passwordField) {
      console.error('Password field not found in teacher record. Available fields:', Object.keys(teacher))
      return NextResponse.json(
        { success: false, error: 'Database configuration error: Password field not found in teacher record.' },
        { status: 500 }
      )
    }

    // Compare passwords
    // Note: In production, passwords should be hashed using bcrypt or similar
    // For now, this assumes plain text comparison. You should hash passwords when storing them.
    const teacherPassword = passwordField === 'Password' ? teacher.Password : teacher.password
    
    // Debug logging (development only)
    if (process.env.NODE_ENV === 'development') {
      console.log('Password comparison:', {
        provided: password,
        stored: teacherPassword ? '***' : 'null/undefined',
        match: teacherPassword === password,
        fieldName: passwordField
      })
    }
    
    if (!teacherPassword || teacherPassword !== password) {
      console.error('Password mismatch for email:', email)
      return NextResponse.json(
        { success: false, error: 'Invalid password. Please check your password and try again.' },
        { status: 401 }
      )
    }

    // Remove password from response for security
    const teacherWithoutPassword = { ...teacher }
    if (teacherWithoutPassword.Password !== undefined) {
      delete teacherWithoutPassword.Password
    }
    if (teacherWithoutPassword.password !== undefined) {
      delete teacherWithoutPassword.password
    }

    return NextResponse.json({
      success: true,
      teacher: teacherWithoutPassword,
    })
  } catch (error: any) {
    console.error('Teacher login API error:', error)
    
    // Handle network errors
    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      return NextResponse.json(
        { success: false, error: 'Network error. Please check your internet connection.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}

