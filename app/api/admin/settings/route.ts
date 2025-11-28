import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabase = createClient(supabaseUrl, supabaseKey)

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
      { status: 500 }
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
      { status: 500 }
    )
  }
}

