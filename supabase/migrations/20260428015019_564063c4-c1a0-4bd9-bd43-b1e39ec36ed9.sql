
-- Table for uploaded onboarding documents
CREATE TABLE public.onboarding_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  category text NOT NULL,
  file_name text NOT NULL,
  storage_path text NOT NULL,
  file_size bigint,
  mime_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.onboarding_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users view own onboarding docs"
ON public.onboarding_documents FOR SELECT TO authenticated
USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'));

CREATE POLICY "users insert own onboarding docs"
ON public.onboarding_documents FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users delete own onboarding docs"
ON public.onboarding_documents FOR DELETE TO authenticated
USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'));

-- Private storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('onboarding-docs', 'onboarding-docs', false);

CREATE POLICY "onboarding read own"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'onboarding-docs' AND (auth.uid()::text = (storage.foldername(name))[1] OR has_role(auth.uid(), 'admin')));

CREATE POLICY "onboarding upload own"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'onboarding-docs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "onboarding delete own"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'onboarding-docs' AND (auth.uid()::text = (storage.foldername(name))[1] OR has_role(auth.uid(), 'admin')));
