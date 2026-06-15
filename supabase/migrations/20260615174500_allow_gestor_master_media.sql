-- =========================================
-- ADD NEW VALUE TO public.media_category
-- =========================================
ALTER TYPE public.media_category ADD VALUE IF NOT EXISTS 'operacoes';

-- =========================================
-- UPDATE RLS POLICIES FOR public.media
-- =========================================
DROP POLICY IF EXISTS "admins manage media" ON public.media;

CREATE POLICY "admins and masters manage media" ON public.media FOR ALL
  TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.is_gestor_master(auth.uid()))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.is_gestor_master(auth.uid()));

-- =========================================
-- UPDATE STORAGE POLICIES FOR media BUCKET
-- =========================================
DROP POLICY IF EXISTS "media admin write" ON storage.objects;
DROP POLICY IF EXISTS "media admin update" ON storage.objects;
DROP POLICY IF EXISTS "media admin delete" ON storage.objects;

CREATE POLICY "media admin and master write" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'media' AND (public.has_role(auth.uid(), 'admin') OR public.is_gestor_master(auth.uid())));

CREATE POLICY "media admin and master update" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'media' AND (public.has_role(auth.uid(), 'admin') OR public.is_gestor_master(auth.uid())));

CREATE POLICY "media admin and master delete" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'media' AND (public.has_role(auth.uid(), 'admin') OR public.is_gestor_master(auth.uid())));
