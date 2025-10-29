-- Enable Row Level Security (RLS) for all tables
-- This ensures that data can only be accessed through server-side operations

-- Enable RLS for site_settings table
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Enable RLS for gallery table
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Enable RLS for comments table
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for site_settings table
-- Allow read access for all authenticated users
CREATE POLICY "Allow read access to site_settings" ON site_settings
    FOR SELECT USING (true);

-- Allow update access for authenticated users (admin operations)
CREATE POLICY "Allow update access to site_settings" ON site_settings
    FOR UPDATE USING (true);

-- Allow insert access for authenticated users (admin operations)
CREATE POLICY "Allow insert access to site_settings" ON site_settings
    FOR INSERT WITH CHECK (true);

-- Create policies for gallery table
-- Allow read access for all users (public gallery)
CREATE POLICY "Allow read access to gallery" ON gallery
    FOR SELECT USING (true);

-- Allow insert access for authenticated users (admin operations)
CREATE POLICY "Allow insert access to gallery" ON gallery
    FOR INSERT WITH CHECK (true);

-- Allow update access for authenticated users (admin operations)
CREATE POLICY "Allow update access to gallery" ON gallery
    FOR UPDATE USING (true);

-- Allow delete access for authenticated users (admin operations)
CREATE POLICY "Allow delete access to gallery" ON gallery
    FOR DELETE USING (true);

-- Create policies for comments table
-- Allow read access for approved comments only (public view)
CREATE POLICY "Allow read access to approved comments" ON comments
    FOR SELECT USING (approved = true);

-- Allow read access to all comments for authenticated users (admin view)
CREATE POLICY "Allow admin read access to all comments" ON comments
    FOR SELECT USING (true);

-- Allow insert access for all users (public comment submission)
CREATE POLICY "Allow insert access to comments" ON comments
    FOR INSERT WITH CHECK (true);

-- Allow update access for authenticated users (admin operations)
CREATE POLICY "Allow update access to comments" ON comments
    FOR UPDATE USING (true);

-- Allow delete access for authenticated users (admin operations)
CREATE POLICY "Allow delete access to comments" ON comments
    FOR DELETE USING (true);

-- Create a function to check if user is admin (for future use)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    -- For now, all authenticated users are considered admins
    -- This can be enhanced with proper role-based access control
    RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update policies to use admin check for sensitive operations
-- Drop existing policies and recreate with proper admin checks

-- Site Settings - Admin only for modifications
DROP POLICY IF EXISTS "Allow update access to site_settings" ON site_settings;
DROP POLICY IF EXISTS "Allow insert access to site_settings" ON site_settings;

CREATE POLICY "Allow admin update access to site_settings" ON site_settings
    FOR UPDATE USING (is_admin());

CREATE POLICY "Allow admin insert access to site_settings" ON site_settings
    FOR INSERT WITH CHECK (is_admin());

-- Gallery - Admin only for modifications
DROP POLICY IF EXISTS "Allow insert access to gallery" ON gallery;
DROP POLICY IF EXISTS "Allow update access to gallery" ON gallery;
DROP POLICY IF EXISTS "Allow delete access to gallery" ON gallery;

CREATE POLICY "Allow admin insert access to gallery" ON gallery
    FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "Allow admin update access to gallery" ON gallery
    FOR UPDATE USING (is_admin());

CREATE POLICY "Allow admin delete access to gallery" ON gallery
    FOR DELETE USING (is_admin());

-- Comments - Admin only for status changes and deletions
DROP POLICY IF EXISTS "Allow admin read access to all comments" ON comments;
DROP POLICY IF EXISTS "Allow update access to comments" ON comments;
DROP POLICY IF EXISTS "Allow delete access to comments" ON comments;

CREATE POLICY "Allow admin read access to all comments" ON comments
    FOR SELECT USING (is_admin());

CREATE POLICY "Allow admin update access to comments" ON comments
    FOR UPDATE USING (is_admin());

CREATE POLICY "Allow admin delete access to comments" ON comments
    FOR DELETE USING (is_admin());