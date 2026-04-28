
-- 1. Fix mutable search_path on touch_updated_at
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- 2. Restrict SECURITY DEFINER function execution (revoke from anon/public)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_user_company(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_approved(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_user_company(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_approved(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

-- 3. Make public buckets private to stop anonymous listing/browsing
UPDATE storage.buckets SET public = false WHERE id IN ('media', 'avatars');

-- Add authenticated-only read policies for these buckets (use signed URLs for sharing)
DROP POLICY IF EXISTS "media authenticated read" ON storage.objects;
CREATE POLICY "media authenticated read"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'media');

DROP POLICY IF EXISTS "avatars authenticated read" ON storage.objects;
CREATE POLICY "avatars authenticated read"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'avatars');
