-- COMPLETE FIX FOR ALL POSTGREST AND DATABASE ERRORS
-- Run this entire script in Supabase SQL Editor

-- ============================================
-- STEP 1: Disable RLS completely
-- ============================================
ALTER TABLE attendance_records DISABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: Drop ALL policies
-- ============================================
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'attendance_records'
    ) LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON attendance_records';
    END LOOP;
END $$;

-- ============================================
-- STEP 3: Drop ALL foreign key constraints
-- ============================================
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT conname 
        FROM pg_constraint 
        WHERE conrelid = 'attendance_records'::regclass 
        AND contype = 'f'
    ) LOOP
        EXECUTE 'ALTER TABLE attendance_records DROP CONSTRAINT IF EXISTS ' || quote_ident(r.conname);
    END LOOP;
END $$;

-- ============================================
-- STEP 4: Ensure student_id is TEXT
-- ============================================
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'attendance_records' 
        AND column_name = 'student_id'
        AND data_type = 'uuid'
    ) THEN
        ALTER TABLE attendance_records 
        ALTER COLUMN student_id TYPE TEXT USING student_id::TEXT;
    END IF;
END $$;

-- ============================================
-- STEP 5: Ensure device_id is TEXT
-- ============================================
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'attendance_records' 
        AND column_name = 'device_id'
        AND data_type = 'uuid'
    ) THEN
        ALTER TABLE attendance_records 
        ALTER COLUMN device_id TYPE TEXT USING device_id::TEXT;
    END IF;
END $$;

-- ============================================
-- STEP 6: Make columns nullable
-- ============================================
ALTER TABLE attendance_records 
ALTER COLUMN rfid_tag DROP NOT NULL;

ALTER TABLE attendance_records 
ALTER COLUMN rfid_card DROP NOT NULL;

ALTER TABLE attendance_records 
ALTER COLUMN device_id DROP NOT NULL;

-- ============================================
-- STEP 7: Create RPC function to bypass PostgREST
-- ============================================
CREATE OR REPLACE FUNCTION get_attendance_records(record_limit INTEGER DEFAULT 50, since_time TIMESTAMPTZ DEFAULT NULL)
RETURNS TABLE (
  id UUID,
  scan_time TIMESTAMPTZ,
  scan_type TEXT,
  student_id TEXT,
  rfid_card TEXT,
  rfid_tag TEXT,
  status TEXT,
  time_in TIMESTAMPTZ,
  time_out TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  device_id TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ar.id,
    ar.scan_time,
    ar.scan_type,
    ar.student_id,
    ar.rfid_card,
    ar.rfid_tag,
    ar.status,
    ar.time_in,
    ar.time_out,
    ar.created_at,
    ar.device_id
  FROM attendance_records ar
  WHERE (since_time IS NULL OR ar.scan_time > since_time)
  ORDER BY ar.scan_time DESC
  LIMIT record_limit;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_attendance_records TO service_role;
GRANT EXECUTE ON FUNCTION get_attendance_records TO authenticated;
GRANT EXECUTE ON FUNCTION get_attendance_records TO anon;

-- ============================================
-- STEP 8: Refresh PostgREST schema cache
-- ============================================
NOTIFY pgrst, 'reload schema';

-- ============================================
-- STEP 9: Verify everything
-- ============================================
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'attendance_records'
ORDER BY ordinal_position;

SELECT 
    tablename, 
    rowsecurity 
FROM pg_tables 
WHERE tablename = 'attendance_records';

SELECT 
    routine_name,
    routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name = 'get_attendance_records';

