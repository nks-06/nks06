
-- Add explicit deny-all RLS policies for admin_settings
CREATE POLICY "Deny all direct access to admin_settings"
ON public.admin_settings
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- Add explicit deny-all RLS policies for password_reset_tokens
CREATE POLICY "Deny all direct access to password_reset_tokens"
ON public.password_reset_tokens
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);
