-- Enable RLS for partner_applications table
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

-- 1. Select Policy: Users can only view their own application
-- DROP POLICY IF EXISTS "Users can view their own application" ON partner_applications;
CREATE POLICY "Users can view their own application"
ON partner_applications
FOR SELECT
USING (auth.uid() = uid);

-- 2. Insert Policy: Users can only insert their own application
-- DROP POLICY IF EXISTS "Authenticated users can insert their application" ON partner_applications;
CREATE POLICY "Authenticated users can insert their application"
ON partner_applications
FOR INSERT
WITH CHECK (auth.uid() = uid);

-- 3. Update Policy: Users can only update their own application
-- DROP POLICY IF EXISTS "Users can update their own application" ON partner_applications;
CREATE POLICY "Users can update their own application"
ON partner_applications
FOR UPDATE
USING (auth.uid() = uid);

-- Note: Admin access might need a separate policy or be handled via service role key in backend functions.
-- If admins need to view all via client-side, an admin policy would be needed, e.g.:
-- CREATE POLICY "Admins can view all applications" ON partner_applications FOR SELECT USING (is_admin());
