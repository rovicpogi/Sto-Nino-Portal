-- SQL script to fix check constraints in attendance_records
-- This fixes both scan_type and status constraints

-- Step 1: Drop the existing check constraints
ALTER TABLE attendance_records 
DROP CONSTRAINT IF EXISTS attendance_records_scan_type_check;

ALTER TABLE attendance_records 
DROP CONSTRAINT IF EXISTS attendance_records_status_check;

-- Step 2: Create a new, more flexible scan_type check constraint
-- This allows both formats: 'timein'/'timeout' and 'time_in'/'time_out'
ALTER TABLE attendance_records 
ADD CONSTRAINT attendance_records_scan_type_check 
CHECK (
  scan_type IS NULL 
  OR scan_type IN ('timein', 'timeout', 'time_in', 'time_out', 'Time In', 'Time Out', 'TIME IN', 'TIME OUT')
);

-- Step 3: Create a flexible status check constraint
-- This allows common status values like 'Present', 'Absent', 'Late', etc.
ALTER TABLE attendance_records 
ADD CONSTRAINT attendance_records_status_check 
CHECK (
  status IS NULL 
  OR status IN ('Present', 'Absent', 'Late', 'Early Departure', 'Excused', 'Unexcused', 'present', 'absent', 'late')
);

-- Alternative: If you want to allow any text value, you can skip recreating the constraints
-- Just run the DROP CONSTRAINT commands above and don't recreate them

-- Verify the constraints were updated
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'attendance_records'::regclass
AND (conname LIKE '%scan_type%' OR conname LIKE '%status%')
ORDER BY conname;

