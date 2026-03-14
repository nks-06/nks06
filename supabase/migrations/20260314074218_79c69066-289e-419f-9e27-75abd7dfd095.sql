
-- 1. Revoke direct access to admin_settings from anon and authenticated roles
REVOKE ALL ON public.admin_settings FROM anon, authenticated;

-- 2. Revoke direct access to password_reset_tokens from anon and authenticated roles
REVOKE ALL ON public.password_reset_tokens FROM anon, authenticated;

-- 3. Add explicit RLS policy for contact_messages: allow public INSERT for contact form
CREATE POLICY "Allow public to submit contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Add explicit RLS SELECT policy for contact_messages: block all direct reads
-- (admin reads go through edge functions with service role key)
CREATE POLICY "Block direct read of contact messages"
ON public.contact_messages
FOR SELECT
TO anon, authenticated
USING (false);

-- 5. Block direct UPDATE/DELETE on contact_messages
CREATE POLICY "Block direct update of contact messages"
ON public.contact_messages
FOR UPDATE
TO anon, authenticated
USING (false);

CREATE POLICY "Block direct delete of contact messages"
ON public.contact_messages
FOR DELETE
TO anon, authenticated
USING (false);
