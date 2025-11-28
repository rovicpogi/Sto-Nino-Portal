-- SQL script to refresh PostgREST schema cache
-- This fixes the "Could not find a relationship" error

-- Option 1: Refresh the schema cache by touching the schema
-- This forces PostgREST to reload the schema
NOTIFY pgrst, 'reload schema';

-- Option 2: If that doesn't work, you can also try:
-- 1. Go to Supabase Dashboard → Settings → API
-- 2. Click "Reload Schema" or "Refresh Schema Cache"

-- Option 3: Create a dummy foreign key relationship (if needed)
-- But we don't want this because it causes UUID/TEXT issues
-- So we'll avoid this option

-- Option 4: Verify there are no foreign keys
SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
LEFT JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name = 'attendance_records';

-- If the above query returns any rows, drop those foreign keys:
-- ALTER TABLE attendance_records DROP CONSTRAINT <constraint_name>;

