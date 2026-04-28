
-- =========================================
-- ENUMS
-- =========================================
CREATE TYPE public.app_role AS ENUM ('admin', 'gestor', 'funcionario');
CREATE TYPE public.account_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.media_type AS ENUM ('image', 'video');
CREATE TYPE public.media_category AS ENUM ('instalacoes', 'treinamentos', 'projetos', 'bastidores');
CREATE TYPE public.doc_category AS ENUM ('rh', 'sistema', 'legislacao');
CREATE TYPE public.ticket_type AS ENUM ('suporte', 'manutencao', 'troca', 'treinamento', 'onboarding');
CREATE TYPE public.ticket_status AS ENUM ('aberto', 'em_andamento', 'aguardando', 'resolvido', 'fechado');
CREATE TYPE public.onboarding_status AS ENUM ('rascunho', 'enviado', 'em_analise', 'concluido');

-- =========================================
-- COMPANIES
-- =========================================
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  cnpj TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- =========================================
-- PROFILES
-- =========================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  job_title TEXT,
  avatar_url TEXT,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  status public.account_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =========================================
-- USER ROLES
-- =========================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- =========================================
-- SECURITY DEFINER HELPERS
-- =========================================
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.get_user_company(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT company_id FROM public.profiles WHERE id = _user_id
$$;

CREATE OR REPLACE FUNCTION public.is_approved(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = _user_id AND status = 'approved'
  )
$$;

-- =========================================
-- TRIGGER: create profile on signup
-- =========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  -- default role: funcionario (least privilege)
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'funcionario');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================
-- updated_at trigger helper
-- =========================================
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================
-- MEDIA (gallery)
-- =========================================
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type public.media_type NOT NULL,
  category public.media_category NOT NULL,
  title TEXT,
  description TEXT,
  storage_path TEXT NOT NULL,
  thumbnail_path TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- =========================================
-- DOCUMENTS (library)
-- =========================================
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category public.doc_category NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- =========================================
-- ONBOARDING REQUESTS
-- =========================================
CREATE TABLE public.onboarding_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  status public.onboarding_status NOT NULL DEFAULT 'rascunho',
  data_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  current_step INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.onboarding_requests ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER onboarding_touch BEFORE UPDATE ON public.onboarding_requests
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================
-- AUDITS (monthly)
-- =========================================
CREATE TABLE public.audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  reference_month DATE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  report_path TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;

-- =========================================
-- TICKETS
-- =========================================
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type public.ticket_type NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  status public.ticket_status NOT NULL DEFAULT 'aberto',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER tickets_touch BEFORE UPDATE ON public.tickets
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  attachment_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;

-- =========================================
-- FORUM
-- =========================================
CREATE TABLE public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;

-- =========================================
-- RLS POLICIES
-- =========================================

-- COMPANIES
CREATE POLICY "approved users see own company" ON public.companies FOR SELECT
  TO authenticated USING (
    public.has_role(auth.uid(), 'admin')
    OR id = public.get_user_company(auth.uid())
  );
CREATE POLICY "admins manage companies" ON public.companies FOR ALL
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- PROFILES
CREATE POLICY "users view own profile" ON public.profiles FOR SELECT
  TO authenticated USING (id = auth.uid() OR public.has_role(auth.uid(), 'admin')
    OR (public.has_role(auth.uid(), 'gestor') AND company_id = public.get_user_company(auth.uid())));
CREATE POLICY "users update own profile" ON public.profiles FOR UPDATE
  TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid() AND status = (SELECT status FROM public.profiles WHERE id = auth.uid()));
CREATE POLICY "admins manage all profiles" ON public.profiles FOR ALL
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- USER_ROLES
CREATE POLICY "users see own roles" ON public.user_roles FOR SELECT
  TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- MEDIA: visível para todos os aprovados; admin gerencia
CREATE POLICY "approved users view media" ON public.media FOR SELECT
  TO authenticated USING (public.is_approved(auth.uid()));
CREATE POLICY "admins manage media" ON public.media FOR ALL
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- DOCUMENTS: idem
CREATE POLICY "approved users view documents" ON public.documents FOR SELECT
  TO authenticated USING (public.is_approved(auth.uid()));
CREATE POLICY "admins manage documents" ON public.documents FOR ALL
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ONBOARDING
CREATE POLICY "users view own onboarding" ON public.onboarding_requests FOR SELECT
  TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "users insert own onboarding" ON public.onboarding_requests FOR INSERT
  TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "users update own onboarding" ON public.onboarding_requests FOR UPDATE
  TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete onboarding" ON public.onboarding_requests FOR DELETE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- AUDITS
CREATE POLICY "company members view audits" ON public.audits FOR SELECT
  TO authenticated USING (
    public.has_role(auth.uid(), 'admin')
    OR company_id = public.get_user_company(auth.uid())
  );
CREATE POLICY "admins manage audits" ON public.audits FOR ALL
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- TICKETS
CREATE POLICY "view tickets" ON public.tickets FOR SELECT
  TO authenticated USING (
    created_by = auth.uid()
    OR public.has_role(auth.uid(), 'admin')
    OR (public.has_role(auth.uid(), 'gestor') AND company_id = public.get_user_company(auth.uid()))
  );
CREATE POLICY "create tickets" ON public.tickets FOR INSERT
  TO authenticated WITH CHECK (created_by = auth.uid() AND public.is_approved(auth.uid()));
CREATE POLICY "update tickets" ON public.tickets FOR UPDATE
  TO authenticated USING (
    created_by = auth.uid() OR public.has_role(auth.uid(), 'admin')
  ) WITH CHECK (
    created_by = auth.uid() OR public.has_role(auth.uid(), 'admin')
  );

-- TICKET_MESSAGES
CREATE POLICY "view ticket messages" ON public.ticket_messages FOR SELECT
  TO authenticated USING (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (SELECT 1 FROM public.tickets t WHERE t.id = ticket_id AND (
      t.created_by = auth.uid()
      OR (public.has_role(auth.uid(), 'gestor') AND t.company_id = public.get_user_company(auth.uid()))
    ))
  );
CREATE POLICY "create ticket messages" ON public.ticket_messages FOR INSERT
  TO authenticated WITH CHECK (
    author_id = auth.uid() AND (
      public.has_role(auth.uid(), 'admin')
      OR EXISTS (SELECT 1 FROM public.tickets t WHERE t.id = ticket_id AND t.created_by = auth.uid())
    )
  );

-- FORUM
CREATE POLICY "approved view posts" ON public.forum_posts FOR SELECT
  TO authenticated USING (public.is_approved(auth.uid()));
CREATE POLICY "approved create posts" ON public.forum_posts FOR INSERT
  TO authenticated WITH CHECK (author_id = auth.uid() AND public.is_approved(auth.uid()));
CREATE POLICY "author or admin update posts" ON public.forum_posts FOR UPDATE
  TO authenticated USING (author_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "author or admin delete posts" ON public.forum_posts FOR DELETE
  TO authenticated USING (author_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "approved view replies" ON public.forum_replies FOR SELECT
  TO authenticated USING (public.is_approved(auth.uid()));
CREATE POLICY "approved create replies" ON public.forum_replies FOR INSERT
  TO authenticated WITH CHECK (author_id = auth.uid() AND public.is_approved(auth.uid()));
CREATE POLICY "author or admin update replies" ON public.forum_replies FOR UPDATE
  TO authenticated USING (author_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "author or admin delete replies" ON public.forum_replies FOR DELETE
  TO authenticated USING (author_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- =========================================
-- STORAGE BUCKETS
-- =========================================
INSERT INTO storage.buckets (id, name, public) VALUES
  ('media', 'media', true),
  ('documents', 'documents', false),
  ('audits', 'audits', false),
  ('ticket-attachments', 'ticket-attachments', false),
  ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
-- avatars: users upload own
CREATE POLICY "avatar public read" ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');
CREATE POLICY "avatar self write" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "avatar self update" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- media: public read, admin write
CREATE POLICY "media public read" ON storage.objects FOR SELECT
  USING (bucket_id = 'media');
CREATE POLICY "media admin write" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "media admin update" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "media admin delete" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

-- documents: approved read, admin write
CREATE POLICY "documents approved read" ON storage.objects FOR SELECT
  TO authenticated USING (bucket_id = 'documents' AND public.is_approved(auth.uid()));
CREATE POLICY "documents admin write" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));

-- audits: company read, admin write
CREATE POLICY "audits company read" ON storage.objects FOR SELECT
  TO authenticated USING (
    bucket_id = 'audits' AND (
      public.has_role(auth.uid(), 'admin')
      OR (storage.foldername(name))[1] = public.get_user_company(auth.uid())::text
    )
  );
CREATE POLICY "audits admin write" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'audits' AND public.has_role(auth.uid(), 'admin'));

-- ticket attachments: ticket participants
CREATE POLICY "ticket-attachments read" ON storage.objects FOR SELECT
  TO authenticated USING (
    bucket_id = 'ticket-attachments' AND (
      public.has_role(auth.uid(), 'admin')
      OR (storage.foldername(name))[1] = auth.uid()::text
    )
  );
CREATE POLICY "ticket-attachments self write" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (
    bucket_id = 'ticket-attachments' AND (storage.foldername(name))[1] = auth.uid()::text
  );
