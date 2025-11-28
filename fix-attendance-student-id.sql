-- SQL script to change attendance_records.student_id from UUID to TEXT
-- This handles RLS policies that depend on the column

-- Step 1: Drop foreign key constraint first (if it exists)
ALTER TABLE attendance_records 
DROP CONSTRAINT IF EXISTS attendance_records_student_id_fkey;

ALTER TABLE attendance_records 
DROP CONSTRAINT IF EXISTS attendance_records_student_id_students_id_fkey;

-- Step 2: Drop ALL existing policies that depend on student_id
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

-- Step 3: Change student_id column type from UUID to TEXT
-- This allows storing both UUID and student numbers
ALTER TABLE attendance_records 
ALTER COLUMN student_id TYPE TEXT USING student_id::TEXT;

-- Step 4: Recreate policies (adjust these based on your actual RLS requirements)
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
-- NOTE: Adjust this policy based on your actual parent-student relationship schema
-- Common options:
-- 1. If you have a parent_id or parent_user_id column in students table
-- 2. If you have a separate parent_students junction table
-- 3. If parents are linked via email matching

-- Option 1: If students table has parent_id or parent_user_id
CREATE POLICY "Parents view children attendance" ON attendance_records
  FOR SELECT
  USING (
    student_id IN (
      SELECT student_id::text FROM students 
      WHERE parent_id = auth.uid()::text
         OR parent_user_id = auth.uid()::text
    )
    OR student_id IN (
      SELECT student_number FROM students 
      WHERE parent_id = auth.uid()::text
         OR parent_user_id = auth.uid()::text
    )
  );

-- If the above doesn't work, comment it out and use one of these alternatives:

-- Option 2: If you have a parent_students junction table
-- CREATE POLICY "Parents view children attendance" ON attendance_records
--   FOR SELECT
--   USING (
--     student_id IN (
--       SELECT student_id::text FROM parent_students 
--       WHERE parent_id = auth.uid()::text
--     )
--   );

-- Option 3: If parents can see all records (less secure)
-- CREATE POLICY "Parents view children attendance" ON attendance_records
--   FOR SELECT
--   USING (true);

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

-- Step 5: (Optional) Create a check constraint or index for better performance
-- Since we're using TEXT now, we can't have a foreign key to UUID
-- But we can create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_attendance_student_id_text ON attendance_records(student_id);

-- Verify the column type was changed
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'attendance_records' 
AND column_name = 'student_id';

-- Show that foreign key was dropped
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
LEFT JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'attendance_records' 
  AND tc.constraint_type = 'FOREIGN KEY'
  AND kcu.column_name = 'student_id';

