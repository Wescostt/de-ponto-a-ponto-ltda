-- =========================================
-- MODIFY ENUM TYPE public.app_role
-- =========================================
ALTER TYPE public.app_role RENAME TO app_role_old;
CREATE TYPE public.app_role AS ENUM ('admin', 'gestor', 'funcionario', 'gestor_master');
ALTER TABLE public.user_roles ALTER COLUMN role TYPE public.app_role USING role::text::public.app_role;
DROP TYPE public.app_role_old;

-- =========================================
-- MASTER ALLOWED EMAILS
-- =========================================
CREATE TABLE public.master_allowed_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.master_allowed_emails ENABLE ROW LEVEL SECURITY;

-- Insert default master email
INSERT INTO public.master_allowed_emails (email, active)
VALUES ('depontoapontocomercial@gmail.com', true)
ON CONFLICT (email) DO UPDATE SET active = true;

-- =========================================
-- HELPER: CHECK IF GESTOR MASTER
-- =========================================
CREATE OR REPLACE FUNCTION public.is_gestor_master(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  u_email TEXT;
BEGIN
  -- Get user email from auth.users
  SELECT email INTO u_email FROM auth.users WHERE id = _user_id;
  
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = 'gestor_master'
  ) OR EXISTS (
    SELECT 1 FROM public.master_allowed_emails WHERE email = u_email AND active = true
  );
END;
$$;

-- =========================================
-- CLIENTS
-- =========================================
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  razao_social TEXT NOT NULL,
  nome_fantasia TEXT,
  cnpj TEXT UNIQUE NOT NULL,
  inscricao_estadual TEXT,
  inscricao_municipal TEXT,
  cep TEXT NOT NULL,
  endereco TEXT NOT NULL,
  numero TEXT NOT NULL,
  complemento TEXT,
  bairro TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado VARCHAR(2) NOT NULL,
  telefone TEXT NOT NULL,
  whatsapp TEXT,
  email_principal TEXT NOT NULL,
  email_financeiro TEXT,
  email_tecnico TEXT,
  representante_nome TEXT,
  representante_cpf TEXT,
  status TEXT NOT NULL DEFAULT 'ativo',
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER clients_touch BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================
-- CLIENT USERS
-- =========================================
CREATE TABLE public.client_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'aluno_cliente',
  status TEXT NOT NULL DEFAULT 'ativo',
  invited_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.client_users ENABLE ROW LEVEL SECURITY;

-- =========================================
-- CLIENT COMMERCIAL PROFILE
-- =========================================
CREATE TABLE public.client_commercial_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID UNIQUE REFERENCES public.clients(id) ON DELETE CASCADE,
  plano_contratado TEXT,
  qtd_funcionarios INTEGER,
  qtd_cnpjs_atendidos INTEGER,
  qtd_unidades INTEGER,
  possui_reconhecimento_facial BOOLEAN DEFAULT false,
  possui_rep BOOLEAN DEFAULT false,
  possui_app BOOLEAN DEFAULT false,
  modulos_adicionais TEXT,
  valor_anual DECIMAL(12,2),
  forma_pagamento TEXT,
  observacoes_comerciais TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.client_commercial_profile ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER client_commercial_profile_touch BEFORE UPDATE ON public.client_commercial_profile
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================
-- CONTRACTS
-- =========================================
CREATE TABLE public.contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_number TEXT UNIQUE NOT NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  version INTEGER DEFAULT 1 NOT NULL,
  status TEXT NOT NULL DEFAULT 'rascunho',
  plano_contratado TEXT NOT NULL,
  qtd_funcionarios INTEGER NOT NULL,
  qtd_cnpjs_atendidos INTEGER NOT NULL,
  valor_anual DECIMAL(12,2) NOT NULL,
  valor_mensal_referencia DECIMAL(12,2) NOT NULL,
  forma_pagamento TEXT NOT NULL,
  condicao_pagamento_resumo TEXT,
  condicao_pagamento_completa TEXT,
  vigencia_inicio DATE NOT NULL,
  vigencia_fim DATE NOT NULL,
  data_assinatura DATE,
  pdf_url TEXT,
  docx_url TEXT,
  html_snapshot TEXT,
  created_by UUID,
  generated_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER contracts_touch BEFORE UPDATE ON public.contracts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- =========================================
-- CONTRACT VERSIONS
-- =========================================
CREATE TABLE public.contract_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID REFERENCES public.contracts(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  html_snapshot TEXT,
  pdf_url TEXT,
  docx_url TEXT,
  generated_by UUID,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  change_reason TEXT
);
ALTER TABLE public.contract_versions ENABLE ROW LEVEL SECURITY;

-- =========================================
-- AUDIT LOGS
-- =========================================
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID,
  actor_email TEXT,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id UUID,
  before_json JSONB DEFAULT '{}'::jsonb,
  after_json JSONB DEFAULT '{}'::jsonb,
  ip TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- =========================================
-- INVITATIONS
-- =========================================
CREATE TABLE public.invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token_hash TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL DEFAULT 'client_gestor',
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  invited_by UUID,
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- =========================================
-- RLS POLICIES FOR NEW TABLES
-- =========================================

-- Allowed Master Emails: Only masters can view/edit
CREATE POLICY "masters view allowed emails" ON public.master_allowed_emails FOR SELECT
  TO authenticated USING (public.is_gestor_master(auth.uid()));
CREATE POLICY "masters manage allowed emails" ON public.master_allowed_emails FOR ALL
  TO authenticated USING (public.is_gestor_master(auth.uid())) WITH CHECK (public.is_gestor_master(auth.uid()));

-- Clients: Masters manage, clients view own data
CREATE POLICY "clients view own client record" ON public.clients FOR SELECT
  TO authenticated USING (
    public.is_gestor_master(auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.client_users cu WHERE cu.client_id = id AND cu.user_id = auth.uid()
    )
  );
CREATE POLICY "masters manage clients" ON public.clients FOR ALL
  TO authenticated USING (public.is_gestor_master(auth.uid())) WITH CHECK (public.is_gestor_master(auth.uid()));

-- Client Users: Masters manage, clients view own company users
CREATE POLICY "client users view own company users" ON public.client_users FOR SELECT
  TO authenticated USING (
    public.is_gestor_master(auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.client_users cu WHERE cu.client_id = client_id AND cu.user_id = auth.uid()
    )
  );
CREATE POLICY "masters manage client users" ON public.client_users FOR ALL
  TO authenticated USING (public.is_gestor_master(auth.uid())) WITH CHECK (public.is_gestor_master(auth.uid()));

-- Commercial Profile: Masters manage, clients view own profile
CREATE POLICY "clients view own commercial profile" ON public.client_commercial_profile FOR SELECT
  TO authenticated USING (
    public.is_gestor_master(auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.client_users cu WHERE cu.client_id = client_id AND cu.user_id = auth.uid()
    )
  );
CREATE POLICY "masters manage commercial profile" ON public.client_commercial_profile FOR ALL
  TO authenticated USING (public.is_gestor_master(auth.uid())) WITH CHECK (public.is_gestor_master(auth.uid()));

-- Contracts: Masters manage, clients view own contracts
CREATE POLICY "clients view own contracts" ON public.contracts FOR SELECT
  TO authenticated USING (
    public.is_gestor_master(auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.client_users cu WHERE cu.client_id = client_id AND cu.user_id = auth.uid()
    )
  );
CREATE POLICY "masters manage contracts" ON public.contracts FOR ALL
  TO authenticated USING (public.is_gestor_master(auth.uid())) WITH CHECK (public.is_gestor_master(auth.uid()));

-- Contract Versions: Masters manage, clients view own contract versions
CREATE POLICY "clients view own contract versions" ON public.contract_versions FOR SELECT
  TO authenticated USING (
    public.is_gestor_master(auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.contracts c
      JOIN public.client_users cu ON cu.client_id = c.client_id
      WHERE c.id = contract_id AND cu.user_id = auth.uid()
    )
  );
CREATE POLICY "masters manage contract versions" ON public.contract_versions FOR ALL
  TO authenticated USING (public.is_gestor_master(auth.uid())) WITH CHECK (public.is_gestor_master(auth.uid()));

-- Audit Logs: Only masters view
CREATE POLICY "masters view audit logs" ON public.audit_logs FOR SELECT
  TO authenticated USING (public.is_gestor_master(auth.uid()));
CREATE POLICY "masters insert audit logs" ON public.audit_logs FOR INSERT
  TO authenticated WITH CHECK (public.is_gestor_master(auth.uid()));

-- Invitations: Masters manage
CREATE POLICY "masters view invitations" ON public.invitations FOR SELECT
  TO authenticated USING (public.is_gestor_master(auth.uid()));
CREATE POLICY "masters manage invitations" ON public.invitations FOR ALL
  TO authenticated USING (public.is_gestor_master(auth.uid())) WITH CHECK (public.is_gestor_master(auth.uid()));

-- =========================================
-- CREATE STORAGE BUCKETS FOR CONTRACTS
-- =========================================
INSERT INTO storage.buckets (id, name, public) VALUES
  ('contracts', 'contracts', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "contracts approved read" ON storage.objects FOR SELECT
  TO authenticated USING (
    bucket_id = 'contracts' AND (
      public.is_gestor_master(auth.uid())
      -- or if user's company is associated with folder name
      OR EXISTS (
        SELECT 1 FROM public.client_users cu
        JOIN public.clients c ON c.id = cu.client_id
        WHERE cu.user_id = auth.uid() AND (storage.foldername(name))[1] = c.id::text
      )
    )
  );

CREATE POLICY "contracts masters write" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'contracts' AND public.is_gestor_master(auth.uid()));
