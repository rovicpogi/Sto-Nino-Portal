-- SQL script to change attendance_records.student_id from UUID to TEXT
-- This handles RLS policies that depend on the column

-- Step 1: Drop ALL existing policies that depend on student_id
-- Get all policies first, then drop them
DROP POLICY IF EXISTS "Students view own attendance" ON attendance_records;
DROP POLICY IF EXISTS "Students can view own attendance" ON attendance_records;
DROP POLICY IF EXISTS "Parents view children attendance" ON attendance_records;
DROP POLICY IF EXISTS "Parents can view children attendance" ON attendance_records;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON attendance_records;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON attendance_records;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON attendance_records;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON attendance_records;

-- Alternative: Drop ALL policies on attendance_records (safer approach)
-- Uncomment the line below if you want to drop all policies at once
-- DO $$ DECLARE r RECORD; BEGIN FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'attendance_records') LOOP EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON attendance_records'; END LOOP; END $$;

-- Step 2: Change student_id column type from UUID to TEXT
-- This allows storing both UUID and student numbers
ALTER TABLE attendance_records 
ALTER COLUMN student_id TYPE TEXT USING student_id::TEXT;

-- Step 3: Recreate policies (adjust these based on your actual RLS requirements)
-- Example policies - modify as needed for your security requirements

-- Allow students to read their own attendance records
CREATE POLICY "Students view own attendance" ON attendance_records
  FOR SELECT
  USING (
    auth.uid()::text = student_id 
    OR student_id IN (
      SELECT student_id::text FROM students WHERE id = auth.uid()
    )
    OR student_id IN (
      SELECT student_number FROM students WHERE id = auth.uid()
    )
  );

-- Allow parents to view their children's attendance
CREATE POLICY "Parents view children attendance" ON attendance_records
  FOR SELECT
  USING (
    student_id IN (
      SELECT student_id::text FROM students 
      WHERE parent_email IN (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
    )
    OR student_id IN (
      SELECT student_number FROM students 
      WHERE parent_email IN (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
    )
  );

-- Allow authenticated users to insert attendance records (for RFID system)
CREATE POLICY "Enable insert for authenticated users" ON attendance_records
  FOR INSERT
  WITH CHECK (true);  -- Adjust based on your security needs

-- Allow authenticated users to read all attendance records (for admin)
-- Uncomment if admins should see all records
-- CREATE POLICY "Admins can view all attendance" ON attendance_records
--   FOR SELECT
--   USING (
--     EXISTS (
--       SELECT 1 FROM auth.users 
--       WHERE auth.users.id = auth.uid() 
--       AND auth.users.raw_user_meta_data->>'role' = 'admin'
--     )
--   );

-- Verify the column type was changed
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'attendance_records' 
AND column_name = 'student_id';

