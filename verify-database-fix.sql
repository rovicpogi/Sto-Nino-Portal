-- VERIFICATION SCRIPT
-- Run this AFTER running complete-fix-all-errors.sql
-- This will verify that all fixes were applied correctly

-- ============================================
-- VERIFY 1: Check attendance_records table structure
-- ============================================
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'attendance_records'
ORDER BY ordinal_position;

-- ============================================
-- VERIFY 2: Check that student_id is TEXT (not UUID)
-- ============================================
SELECT 
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'attendance_records' 
AND column_name = 'student_id';

-- Expected: data_type should be 'text' or 'character varying'

-- ============================================
-- VERIFY 3: Check that device_id is TEXT (not UUID)
-- ============================================
SELECT 
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'attendance_records' 
AND column_name = 'device_id';

-- Expected: data_type should be 'text' or 'character varying'

-- ============================================
-- VERIFY 4: Check RLS status
-- ============================================
SELECT 
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename = 'attendance_records';

-- Expected: rowsecurity should be 'f' (false) - RLS disabled

-- ============================================
-- VERIFY 5: Check that no policies exist
-- ============================================
SELECT 
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename = 'attendance_records';

-- Expected: Should return 0 rows (no policies)

-- ============================================
-- VERIFY 6: Check that no foreign key constraints exist
-- ============================================
SELECT 
    conname AS constraint_name,
    contype AS constraint_type
FROM pg_constraint
WHERE conrelid = 'attendance_records'::regclass
AND contype = 'f';

-- Expected: Should return 0 rows (no foreign keys)

-- ============================================
-- VERIFY 7: Check that RPC function exists
-- ============================================
SELECT 
    routine_name,
    routine_type,
    data_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name = 'get_attendance_records';

-- Expected: Should return 1 row

-- ============================================
-- VERIFY 8: Test RPC function (if records exist)
-- ============================================
-- Uncomment to test:
-- SELECT * FROM get_attendance_records(10, NOW() - INTERVAL '1 day');

-- ============================================
-- VERIFY 9: Check nullable columns
-- ============================================
SELECT 
    column_name,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'attendance_records'
AND column_name IN ('rfid_card', 'rfid_tag', 'device_id', 'scan_time', 'scan_type', 'time_in', 'time_out', 'status');

-- Expected: is_nullable should be 'YES' for all these columns

-- ============================================
-- VERIFY 10: Check check constraints
-- ============================================
SELECT 
    conname,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'attendance_records'::regclass
AND contype = 'c';

-- Expected: Should show flexible check constraints for scan_type and status

-- ============================================
-- SUMMARY
-- ============================================
-- If all verifications pass:
-- ✅ student_id is TEXT
-- ✅ device_id is TEXT
-- ✅ RLS is disabled
-- ✅ No policies exist
-- ✅ No foreign key constraints
-- ✅ RPC function exists
-- ✅ Columns are nullable
-- ✅ Check constraints are flexible

