-- Migração opcional — Auditoria simples de login
-- Portal De Ponto a Ponto / Supabase
--

CREATE TABLE IF NOT EXISTS public.auth_login_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type text NOT NULL CHECK (event_type IN ('login_success', 'login_failed', 'logout')),
  remember_me boolean,
  user_agent text,
  ip_address inet,
  metadata jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.auth_login_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuário insere próprio evento de login" ON public.auth_login_events;
CREATE POLICY "Usuário insere próprio evento de login"
  ON public.auth_login_events
  FOR INSERT
  WITH CHECK (
    user_id = auth.uid()
    OR user_id IS NULL
  );

DROP POLICY IF EXISTS "Admin vê eventos de login" ON public.auth_login_events;
CREATE POLICY "Admin vê eventos de login"
  ON public.auth_login_events
  FOR SELECT
  USING (
    public.has_role('admin', auth.uid())
    OR public.is_gestor_master(auth.uid())
  );

CREATE INDEX IF NOT EXISTS idx_auth_login_events_user_id
  ON public.auth_login_events(user_id);

CREATE INDEX IF NOT EXISTS idx_auth_login_events_created_at
  ON public.auth_login_events(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_auth_login_events_event_type
  ON public.auth_login_events(event_type);
