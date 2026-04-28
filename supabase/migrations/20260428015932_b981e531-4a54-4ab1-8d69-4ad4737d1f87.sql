
-- CNPJ validator (digits + check digits)
CREATE OR REPLACE FUNCTION public.is_valid_cnpj(_cnpj text)
RETURNS boolean
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  c text;
  n int[];
  s1 int := 0;
  s2 int := 0;
  d1 int;
  d2 int;
  w1 int[] := ARRAY[5,4,3,2,9,8,7,6,5,4,3,2];
  w2 int[] := ARRAY[6,5,4,3,2,9,8,7,6,5,4,3,2];
  i int;
BEGIN
  IF _cnpj IS NULL THEN RETURN false; END IF;
  c := regexp_replace(_cnpj, '\D', '', 'g');
  IF length(c) <> 14 THEN RETURN false; END IF;
  IF c ~ '^(\d)\1{13}$' THEN RETURN false; END IF;

  n := ARRAY[]::int[];
  FOR i IN 1..14 LOOP
    n := n || substring(c FROM i FOR 1)::int;
  END LOOP;

  FOR i IN 1..12 LOOP s1 := s1 + n[i] * w1[i]; END LOOP;
  d1 := CASE WHEN s1 % 11 < 2 THEN 0 ELSE 11 - (s1 % 11) END;
  IF d1 <> n[13] THEN RETURN false; END IF;

  FOR i IN 1..13 LOOP s2 := s2 + n[i] * w2[i]; END LOOP;
  d2 := CASE WHEN s2 % 11 < 2 THEN 0 ELSE 11 - (s2 % 11) END;
  IF d2 <> n[14] THEN RETURN false; END IF;

  RETURN true;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.is_valid_cnpj(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_valid_cnpj(text) TO authenticated, service_role;

-- Trigger function for onboarding_requests
CREATE OR REPLACE FUNCTION public.validate_onboarding_cnpj()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  v text;
BEGIN
  v := NEW.data_json->>'cnpj';
  IF v IS NOT NULL AND length(regexp_replace(v, '\D', '', 'g')) > 0 THEN
    IF NOT public.is_valid_cnpj(v) THEN
      RAISE EXCEPTION 'CNPJ inválido informado no onboarding'
        USING ERRCODE = 'check_violation';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_onboarding_cnpj ON public.onboarding_requests;
CREATE TRIGGER trg_validate_onboarding_cnpj
BEFORE INSERT OR UPDATE ON public.onboarding_requests
FOR EACH ROW EXECUTE FUNCTION public.validate_onboarding_cnpj();

-- Trigger function for companies
CREATE OR REPLACE FUNCTION public.validate_company_cnpj()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.cnpj IS NOT NULL AND length(regexp_replace(NEW.cnpj, '\D', '', 'g')) > 0 THEN
    IF NOT public.is_valid_cnpj(NEW.cnpj) THEN
      RAISE EXCEPTION 'CNPJ inválido para empresa'
        USING ERRCODE = 'check_violation';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_company_cnpj ON public.companies;
CREATE TRIGGER trg_validate_company_cnpj
BEFORE INSERT OR UPDATE ON public.companies
FOR EACH ROW EXECUTE FUNCTION public.validate_company_cnpj();
