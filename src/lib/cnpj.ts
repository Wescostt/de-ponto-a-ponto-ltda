// CNPJ utilities: mask, validation, and lookup via BrasilAPI

export const onlyDigits = (v: string) => (v ?? "").replace(/\D/g, "");

export const formatCnpj = (v: string): string => {
  const d = onlyDigits(v).slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
};

export const isValidCnpj = (input: string): boolean => {
  const c = onlyDigits(input);
  if (c.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(c)) return false;

  const calc = (slice: string, weights: number[]) => {
    const sum = slice.split("").reduce((acc, n, i) => acc + parseInt(n, 10) * weights[i], 0);
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const d1 = calc(c.slice(0, 12), w1);
  const d2 = calc(c.slice(0, 12) + d1, w2);
  return d1 === parseInt(c[12], 10) && d2 === parseInt(c[13], 10);
};

export interface CnpjLookup {
  razao_social?: string;
  nome_fantasia?: string;
  email?: string;
  ddd_telefone_1?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
}

export type LookupOutcome =
  | { ok: true; data: CnpjLookup }
  | { ok: false; reason: "invalid" | "notfound" | "network"; message: string };

export const lookupCnpj = async (cnpj: string): Promise<LookupOutcome> => {
  const c = onlyDigits(cnpj);
  if (!isValidCnpj(c)) {
    return { ok: false, reason: "invalid", message: "CNPJ com dígitos verificadores inválidos." };
  }
  try {
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${c}`);
    if (res.status === 404) {
      return { ok: false, reason: "notfound", message: "CNPJ não encontrado na base da Receita." };
    }
    if (!res.ok) {
      return { ok: false, reason: "network", message: `Falha na consulta (HTTP ${res.status}).` };
    }
    return { ok: true, data: (await res.json()) as CnpjLookup };
  } catch (e: any) {
    return { ok: false, reason: "network", message: e?.message || "Sem conexão com o serviço de consulta." };
  }
};
