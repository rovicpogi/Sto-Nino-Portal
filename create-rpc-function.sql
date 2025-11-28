-- SQL script to create an RPC function for executing raw SQL queries
-- This bypasses PostgREST relationship validation

-- Create a function to execute SQL queries (for admin use only)
CREATE OR REPLACE FUNCTION exec_sql(query_text TEXT, params JSONB DEFAULT '[]'::JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Execute the query and return results as JSON
  -- Note: This is a simplified version - you may need to adjust based on your needs
  EXECUTE format('SELECT json_agg(row_to_json(t)) FROM (%s) t', query_text) INTO result;
  RETURN result;
END;
$$;

-- Grant execute permission to authenticated users (or service role)
-- GRANT EXECUTE ON FUNCTION exec_sql TO authenticated;
-- GRANT EXECUTE ON FUNCTION exec_sql TO service_role;

-- Alternative: Create a simpler function that just returns attendance records
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
-- GRANT EXECUTE ON FUNCTION get_attendance_records TO authenticated;
-- GRANT EXECUTE ON FUNCTION get_attendance_records TO service_role;

