-- AGGRESSIVE SQL SCRIPT TO FORCE FIX ALL UUID/TEXT ERRORS
-- This script will check and fix everything that could cause UUID/TEXT errors

-- ============================================
-- STEP 1: Check current column types
-- ============================================
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'attendance_records'
AND column_name IN ('student_id', 'device_id')
ORDER BY column_name;

-- ============================================
-- STEP 2: Disable RLS completely
-- ============================================
ALTER TABLE attendance_records DISABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 3: Drop ALL policies (force drop)
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
-- STEP 4: Drop ALL foreign key constraints
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
-- STEP 5: Drop ALL triggers that might cause issues
-- ============================================
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT trigger_name 
        FROM information_schema.triggers 
        WHERE event_object_table = 'attendance_records'
    ) LOOP
        EXECUTE 'DROP TRIGGER IF EXISTS ' || quote_ident(r.trigger_name) || ' ON attendance_records';
    END LOOP;
END $$;

-- ============================================
-- STEP 6: FORCE convert student_id to TEXT
-- ============================================
-- First, drop any indexes on student_id
DROP INDEX IF EXISTS idx_attendance_student_id;
DROP INDEX IF EXISTS idx_attendance_student_id_text;

-- Convert to TEXT (this will work even if already TEXT)
DO $$ 
BEGIN
    -- Check if column exists and is UUID type
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'attendance_records' 
        AND column_name = 'student_id'
    ) THEN
        -- Force convert to TEXT
        ALTER TABLE attendance_records 
        ALTER COLUMN student_id TYPE TEXT USING 
            CASE 
                WHEN student_id IS NULL THEN NULL::TEXT
                ELSE student_id::TEXT
            END;
        
        -- Make nullable
        ALTER TABLE attendance_records 
        ALTER COLUMN student_id DROP NOT NULL;
    END IF;
END $$;

-- ============================================
-- STEP 7: FORCE convert device_id to TEXT
-- ============================================
-- First, drop any indexes on device_id
DROP INDEX IF EXISTS idx_attendance_device_id;
DROP INDEX IF EXISTS idx_attendance_device_id_text;

-- Convert to TEXT
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'attendance_records' 
        AND column_name = 'device_id'
    ) THEN
        -- Force convert to TEXT
        ALTER TABLE attendance_records 
        ALTER COLUMN device_id TYPE TEXT USING 
            CASE 
                WHEN device_id IS NULL THEN NULL::TEXT
                ELSE device_id::TEXT
            END;
        
        -- Make nullable
        ALTER TABLE attendance_records 
        ALTER COLUMN device_id DROP NOT NULL;
    END IF;
END $$;

-- ============================================
-- STEP 8: Make all RFID columns nullable
-- ============================================
ALTER TABLE attendance_records 
ALTER COLUMN rfid_card DROP NOT NULL;

ALTER TABLE attendance_records 
ALTER COLUMN rfid_tag DROP NOT NULL;

-- ============================================
-- STEP 9: Verify final state
-- ============================================
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'attendance_records'
ORDER BY ordinal_position;

-- Check RLS status
SELECT 
    tablename, 
    rowsecurity 
FROM pg_tables 
WHERE tablename = 'attendance_records';

-- Check remaining constraints
SELECT 
    conname AS constraint_name,
    contype AS constraint_type
FROM pg_constraint
WHERE conrelid = 'attendance_records'::regclass;

