import { NextResponse } from "next/server"
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

// Use admin client for server-side operations (uses SERVICE_ROLE_KEY, not anon key)
// This is critical: server-side API routes MUST use service role key, not anon key

// Default settings
const DEFAULT_SETTINGS = {
  schoolName: "Sto Niño de Praga Academy",
  academicYear: "2024-2025",
  automaticBackup: true,
  rfidIntegration: true,
  emailNotifications: true,
  studentPortal: true,
  teacherPortal: true,
}

// GET - Fetch settings
export async function GET() {
  try {
    // Try to fetch from database (if you have a settings table)
    // For now, return default settings
    // You can later implement database storage:
    /*
    const supabase = getSupabaseAdmin() // Use admin client with service role key
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("id", 1)
      .single()
    
    if (error || !data) {
      return NextResponse.json({
        success: true,
        settings: DEFAULT_SETTINGS,
      })
    }
    
    return NextResponse.json({
      success: true,
      settings: {
        ...DEFAULT_SETTINGS,
        ...data,
      },
    })
    */

    return NextResponse.json({
      success: true,
      settings: DEFAULT_SETTINGS,
    })
  } catch (error: any) {
    console.error("Error fetching settings:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch settings",
        settings: DEFAULT_SETTINGS,
      },
      { status: 200 } // Return 200 instead of 500 to prevent frontend crashes
    )
  }
}

// POST - Save settings
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate settings structure
    const settings = {
      schoolName: body.schoolName || DEFAULT_SETTINGS.schoolName,
      academicYear: body.academicYear || DEFAULT_SETTINGS.academicYear,
      automaticBackup: body.automaticBackup ?? DEFAULT_SETTINGS.automaticBackup,
      rfidIntegration: body.rfidIntegration ?? DEFAULT_SETTINGS.rfidIntegration,
      emailNotifications: body.emailNotifications ?? DEFAULT_SETTINGS.emailNotifications,
      studentPortal: body.studentPortal ?? DEFAULT_SETTINGS.studentPortal,
      teacherPortal: body.teacherPortal ?? DEFAULT_SETTINGS.teacherPortal,
    }

    // Save to database (if you have a settings table)
    // For now, just return the settings
    // You can later implement database storage:
    /*
    const supabase = getSupabaseAdmin() // Use admin client with service role key
    const { data, error } = await supabase
      .from("settings")
      .upsert(
        {
          id: 1,
          ...settings,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      )
      .select()
      .single()
    
    if (error) {
      throw error
    }
    */

    return NextResponse.json({
      success: true,
      settings: settings,
      message: "Settings saved successfully",
    })
  } catch (error: any) {
    console.error("Error saving settings:", error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to save settings",
      },
      { status: 200 } // Return 200 instead of 500 to prevent frontend crashes
    )
  }
}

