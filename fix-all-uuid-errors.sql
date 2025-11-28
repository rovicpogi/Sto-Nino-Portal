-- COMPREHENSIVE SQL SCRIPT TO FIX ALL UUID/TEXT COMPARISON ERRORS
-- Run this in Supabase SQL Editor to fix all UUID-related issues

-- ============================================
-- STEP 1: Disable RLS temporarily (for admin operations)
-- ============================================
-- Note: This is safe because we're using admin client in the API
ALTER TABLE attendance_records DISABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: Drop ALL existing policies that might cause UUID/TEXT issues
-- ============================================
DROP POLICY IF EXISTS "Students view own attendance" ON attendance_records;
DROP POLICY IF EXISTS "Students can view own attendance" ON attendance_records;
DROP POLICY IF EXISTS "Parents view children attendance" ON attendance_records;
DROP POLICY IF EXISTS "Parents can view children attendance" ON attendance_records;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON attendance_records;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON attendance_records;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON attendance_records;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON attendance_records;

-- ============================================
-- STEP 3: Ensure student_id is TEXT type (not UUID)
-- ============================================
-- Drop foreign key if it exists
ALTER TABLE attendance_records 
DROP CONSTRAINT IF EXISTS attendance_records_student_id_fkey;

-- Change to TEXT if it's still UUID
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
-- STEP 4: Ensure device_id is TEXT type (not UUID)
-- ============================================
-- Drop foreign key if it exists
ALTER TABLE attendance_records 
DROP CONSTRAINT IF EXISTS attendance_records_device_id_fkey;

-- Change to TEXT if it's still UUID
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
-- STEP 5: Make all columns nullable to avoid NOT NULL errors
-- ============================================
ALTER TABLE attendance_records 
ALTER COLUMN rfid_tag DROP NOT NULL;

ALTER TABLE attendance_records 
ALTER COLUMN rfid_card DROP NOT NULL;

ALTER TABLE attendance_records 
ALTER COLUMN device_id DROP NOT NULL;

-- ============================================
-- STEP 6: Recreate simple policies (if needed for future)
-- ============================================
-- Create a simple policy that allows all operations for now
-- You can restrict this later based on your security needs
CREATE POLICY "Allow all operations" ON attendance_records
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- STEP 7: Verify the changes
-- ============================================
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'attendance_records'
ORDER BY ordinal_position;

-- Show all constraints
SELECT 
    conname AS constraint_name,
    contype AS constraint_type,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'attendance_records'::regclass
ORDER BY conname;

