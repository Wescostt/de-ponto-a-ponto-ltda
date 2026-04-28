import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Check, Circle, Loader2, Save, Send, Upload, FileText, Trash2, Building2, Users, Clock, Target, FolderUp, PartyPopper, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCnpj, isValidCnpj, lookupCnpj, onlyDigits } from "@/lib/cnpj";

type Data = {
  company_name?: string;
  trade_name?: string;
  cnpj?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  cep?: string;
  address?: string;
  number?: string;
  district?: string;
  city?: string;
  state?: string;
  employees_count?: string;
  control_type?: string;
  needs?: string;
  notes?: string;
  cnpj_lookup?: {
    queried_at: string;
    cnpj: string;
    status: "found" | "notfound" | "network" | "invalid";
    razao_social?: string | null;
    message?: string;
  };
};

type DocCategory = "contrato_social" | "cnpj_card" | "folha_modelo" | "outros";

const docCategories: { id: DocCategory; label: string; description: string; required: boolean }[] = [
  { id: "contrato_social", label: "Contrato Social", description: "Última alteração consolidada", required: true },
  { id: "cnpj_card", label: "Cartão CNPJ", description: "Comprovante atualizado da Receita", required: true },
  { id: "folha_modelo", label: "Folha de pagamento (modelo)", description: "Exemplo de holerite ou planilha de folha", required: true },
  { id: "outros", label: "Outros documentos", description: "Convenção coletiva, escala, etc. (opcional)", required: false },
];

const steps = [
  { key: "empresa", title: "Dados da empresa", icon: Building2, description: "Identificação básica do CNPJ contratante." },
  { key: "estrutura", title: "Estrutura", icon: Users, description: "Tamanho da operação e perfil dos colaboradores." },
  { key: "controle", title: "Controle de ponto", icon: Clock, description: "Como o ponto é registrado hoje." },
  { key: "necessidades", title: "Necessidades", icon: Target, description: "Objetivos e dores que devemos resolver." },
  { key: "documentos", title: "Documentos", icon: FolderUp, description: "Envie os arquivos para configurarmos sua conta." },
  { key: "revisao", title: "Revisão & envio", icon: PartyPopper, description: "Confira tudo e envie para a nossa equipe." },
] as const;

type DocRow = { id: string; category: string; file_name: string; storage_path: string; file_size: number | null };

const Onboarding = () => {
  const { user, profile } = useAuth();
  const [recordId, setRecordId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({});
  const [status, setStatus] = useState<string>("rascunho");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [docs, setDocs] = useState<DocRow[]>([]);
  const [uploadingCat, setUploadingCat] = useState<DocCategory | null>(null);
  const [cnpjLookup, setCnpjLookup] = useState<"idle" | "loading" | "found" | "notfound" | "network">("idle");
  const [cnpjLookupError, setCnpjLookupError] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const cnpjDigits = onlyDigits(data.cnpj ?? "");
  const cnpjValid = cnpjDigits.length === 14 && isValidCnpj(cnpjDigits);
  const cnpjPartial = cnpjDigits.length > 0 && cnpjDigits.length < 14;
  const cnpjInvalid = cnpjDigits.length === 14 && !cnpjValid;

  const handleCnpjChange = (v: string) => {
    setData((d) => ({ ...d, cnpj: formatCnpj(v) }));
    setCnpjLookup("idle");
    setCnpjLookupError(null);
  };

  const handleCnpjLookup = async () => {
    if (!cnpjValid) return;
    setCnpjLookup("loading");
    setCnpjLookupError(null);
    const result = await lookupCnpj(cnpjDigits);
    const nowIso = new Date().toISOString();

    if (!result.ok) {
      const reason = result.reason;
      const message = result.message;
      setCnpjLookup(reason === "notfound" ? "notfound" : "network");
      setCnpjLookupError(message);
      setData((d) => ({
        ...d,
        cnpj_lookup: { queried_at: nowIso, cnpj: data.cnpj ?? "", status: reason, message },
      }));
      toast.error(message);
      return;
    }

    const info = result.data;
    setCnpjLookup("found");
    setCnpjLookupError(null);
    setData((d) => ({
      ...d,
      company_name: d.company_name || info.razao_social || info.nome_fantasia || "",
      trade_name: d.trade_name || info.nome_fantasia || "",
      email: d.email || info.email || "",
      phone: d.phone || info.ddd_telefone_1 || "",
      cep: d.cep || info.cep || "",
      address: d.address || info.logradouro || "",
      number: d.number || info.numero || "",
      district: d.district || info.bairro || "",
      city: d.city || info.municipio || "",
      state: d.state || info.uf || "",
      cnpj_lookup: {
        queried_at: nowIso,
        cnpj: data.cnpj ?? "",
        status: "found",
        razao_social: info.razao_social ?? info.nome_fantasia ?? null,
      },
    }));
    toast.success(`Empresa encontrada: ${info.razao_social ?? info.nome_fantasia}`);
  };


  const loadDocs = async () => {
    if (!user) return;
    const { data: rows } = await supabase
      .from("onboarding_documents")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setDocs((rows ?? []) as DocRow[]);
  };

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: row } = await supabase
        .from("onboarding_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (row) {
        setRecordId(row.id);
        setData((row.data_json as Data) || {});
        setStep(row.current_step || 0);
        setStatus(row.status);
      }
      await loadDocs();
      setLoaded(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const save = async (newStatus?: "rascunho" | "enviado") => {
    if (!user) return;
    setBusy(true);
    try {
      const payload: any = { user_id: user.id, data_json: data, current_step: step, status: newStatus ?? status };
      if (recordId) {
        const { error } = await supabase.from("onboarding_requests").update(payload).eq("id", recordId);
        if (error) throw error;
      } else {
        const { data: ins, error } = await supabase.from("onboarding_requests").insert(payload).select().single();
        if (error) throw error;
        setRecordId(ins.id);
      }
      if (newStatus) setStatus(newStatus);
      if (newStatus === "enviado") toast.success("Onboarding enviado para nossa equipe.");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  // autosave debounced
  useEffect(() => {
    if (!loaded || !user) return;
    const t = setTimeout(() => save(), 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, step]);

  const set = (k: keyof Data, v: string) => setData((d) => ({ ...d, [k]: v }));

  // ---------- Step completion ----------
  const completion = useMemo(() => {
    const checks: Record<string, boolean> = {
      empresa: !!(data.company_name && cnpjValid && data.contact_name),
      estrutura: !!data.employees_count,
      controle: !!data.control_type,
      necessidades: !!data.needs,
      documentos: docCategories.filter((c) => c.required).every((c) => docs.some((d) => d.category === c.id)),
      revisao: status === "enviado",
    };
    return checks;
  }, [data, docs, status, cnpjValid]);

  const completedCount = Object.values(completion).filter(Boolean).length;
  const progress = (completedCount / steps.length) * 100;

  // ---------- Upload ----------
  const onUpload = async (cat: DocCategory, file: File) => {
    if (!user) return;
    setUploadingCat(cat);
    try {
      const safe = file.name.replace(/[^\w.\-]+/g, "_");
      const path = `${user.id}/${cat}/${Date.now()}_${safe}`;
      const { error: upErr } = await supabase.storage.from("onboarding-docs").upload(path, file, { upsert: false });
      if (upErr) throw upErr;
      const { error: insErr } = await supabase.from("onboarding_documents").insert({
        user_id: user.id,
        category: cat,
        file_name: file.name,
        storage_path: path,
        file_size: file.size,
        mime_type: file.type,
      });
      if (insErr) throw insErr;
      toast.success("Arquivo enviado.");
      await loadDocs();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setUploadingCat(null);
    }
  };

  const removeDoc = async (d: DocRow) => {
    try {
      await supabase.storage.from("onboarding-docs").remove([d.storage_path]);
      await supabase.from("onboarding_documents").delete().eq("id", d.id);
      toast.success("Removido");
      loadDocs();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const downloadDoc = async (d: DocRow) => {
    const { data: signed } = await supabase.storage.from("onboarding-docs").createSignedUrl(d.storage_path, 60);
    if (signed?.signedUrl) window.open(signed.signedUrl, "_blank");
  };

  const requiredDocsMissing = docCategories.filter((c) => c.required && !docs.some((d) => d.category === c.id));
  const allRequiredFilled = ["empresa", "estrutura", "controle", "necessidades", "documentos"].every((k) => completion[k]);

  const current = steps[step];

  // Already submitted screen
  if (status === "enviado") {
    return (
      <div className="max-w-2xl mx-auto">
        <PageHeader title="Onboarding concluído" subtitle="Recebemos suas informações. Entraremos em contato em breve." />
        <Card className="glass p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
            <PartyPopper className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Tudo certo, {profile?.full_name?.split(" ")[0] || "tudo bem"}!</h2>
          <p className="text-muted-foreground mb-6">
            Seu onboarding foi enviado com sucesso. Nosso time analisará as informações e os documentos enviados e
            retornará em até 2 dias úteis.
          </p>
          <Button variant="outline" onClick={() => { setStatus("rascunho"); setStep(0); }}>Editar respostas</Button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Onboarding guiado" subtitle="Vamos configurar sua conta em poucos passos. Salvamos automaticamente." />

      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Sidebar checklist */}
        <aside className="space-y-3">
          <Card className="glass p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Progresso</span>
              <span className="text-xs font-medium">{completedCount}/{steps.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </Card>

          <Card className="glass p-2">
            <ul className="space-y-1">
              {steps.map((s, i) => {
                const done = completion[s.key];
                const active = i === step;
                const Icon = s.icon;
                return (
                  <li key={s.key}>
                    <button
                      onClick={() => setStep(i)}
                      className={cn(
                        "w-full flex items-start gap-3 px-3 py-3 rounded-lg text-left transition group",
                        active ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50 border border-transparent"
                      )}
                    >
                      <div className={cn(
                        "mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition",
                        done ? "bg-primary text-primary-foreground" : active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      )}>
                        {done ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-sm font-medium", active ? "text-foreground" : "text-foreground/80")}>
                          {s.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{s.description}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>

          <p className="text-xs text-muted-foreground flex items-center gap-1 px-2">
            <Save className="w-3 h-3" /> Salvamento automático ativo
          </p>
        </aside>

        {/* Main content */}
        <Card className="glass p-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <current.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-primary">Etapa {step + 1} de {steps.length}</p>
              <h2 className="text-xl font-semibold">{current.title}</h2>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-6">{current.description}</p>

          {/* Step content */}
          {current.key === "empresa" && (
            <div className="space-y-4">
              <div>
                <Label>CNPJ</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      value={data.cnpj ?? ""}
                      onChange={(e) => handleCnpjChange(e.target.value)}
                      onBlur={() => { if (cnpjValid && cnpjLookup === "idle") handleCnpjLookup(); }}
                      placeholder="00.000.000/0000-00"
                      inputMode="numeric"
                      maxLength={18}
                      className={cn(
                        "pr-9",
                        cnpjInvalid && "border-destructive focus-visible:ring-destructive",
                        cnpjValid && "border-primary/50"
                      )}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {cnpjLookup === "loading" && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                      {cnpjLookup !== "loading" && cnpjValid && <CheckCircle2 className="w-4 h-4 text-primary" />}
                      {cnpjInvalid && <AlertCircle className="w-4 h-4 text-destructive" />}
                    </div>
                  </div>
                  <Button type="button" variant="outline" onClick={handleCnpjLookup} disabled={!cnpjValid || cnpjLookup === "loading"}>
                    <Search className="w-4 h-4 mr-2" /> Buscar
                  </Button>
                </div>
                {cnpjInvalid && <p className="text-xs text-destructive mt-1">CNPJ inválido — verifique os dígitos.</p>}
                {cnpjPartial && <p className="text-xs text-muted-foreground mt-1">Continue digitando…</p>}
                {cnpjValid && cnpjLookup === "idle" && <p className="text-xs text-muted-foreground mt-1">Clique em Buscar para preencher os dados automaticamente.</p>}
                {cnpjLookup === "found" && <p className="text-xs text-primary mt-1">Dados preenchidos a partir da Receita.</p>}
                {cnpjLookup === "notfound" && <p className="text-xs text-destructive mt-1">CNPJ não encontrado — preencha manualmente.</p>}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Razão social</Label>
                  <Input value={data.company_name ?? ""} onChange={(e) => set("company_name", e.target.value)} placeholder="Nome empresarial registrado" />
                </div>
                <div>
                  <Label>Nome fantasia</Label>
                  <Input value={data.trade_name ?? ""} onChange={(e) => set("trade_name", e.target.value)} placeholder="Marca / nome comercial" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Email da empresa</Label>
                  <Input type="email" value={data.email ?? ""} onChange={(e) => set("email", e.target.value)} placeholder="contato@empresa.com.br" />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input value={data.phone ?? ""} onChange={(e) => set("phone", e.target.value)} placeholder="(00) 00000-0000" />
                </div>
              </div>

              {(cnpjLookup === "found" || data.cep || data.address) && (
                <div className="rounded-xl border border-border/50 bg-card/40 p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Endereço</p>
                    {cnpjLookup === "found" && (
                      <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded">preenchido pela Receita</span>
                    )}
                  </div>
                  <div className="grid md:grid-cols-[140px_1fr_120px] gap-3">
                    <div>
                      <Label>CEP</Label>
                      <Input value={data.cep ?? ""} onChange={(e) => set("cep", e.target.value)} placeholder="00000-000" />
                    </div>
                    <div>
                      <Label>Logradouro</Label>
                      <Input value={data.address ?? ""} onChange={(e) => set("address", e.target.value)} placeholder="Rua / Av." />
                    </div>
                    <div>
                      <Label>Número</Label>
                      <Input value={data.number ?? ""} onChange={(e) => set("number", e.target.value)} placeholder="123" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-[1fr_1fr_100px] gap-3">
                    <div>
                      <Label>Bairro</Label>
                      <Input value={data.district ?? ""} onChange={(e) => set("district", e.target.value)} placeholder="Bairro" />
                    </div>
                    <div>
                      <Label>Cidade</Label>
                      <Input value={data.city ?? ""} onChange={(e) => set("city", e.target.value)} placeholder="Município" />
                    </div>
                    <div>
                      <Label>UF</Label>
                      <Input value={data.state ?? ""} onChange={(e) => set("state", (e.target.value || "").toUpperCase().slice(0, 2))} placeholder="UF" maxLength={2} />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label>Responsável (RH/DP)</Label>
                <Input value={data.contact_name ?? ""} onChange={(e) => set("contact_name", e.target.value)} placeholder="Nome do contato principal" />
              </div>
            </div>
          )}


          {current.key === "estrutura" && (
            <div className="space-y-4">
              <div><Label>Número de funcionários</Label><Input type="number" min={1} value={data.employees_count ?? ""} onChange={(e) => set("employees_count", e.target.value)} placeholder="ex: 45" /></div>
            </div>
          )}

          {current.key === "controle" && (
            <div className="space-y-4">
              <div>
                <Label>Tipo de controle de ponto atual</Label>
                <Input value={data.control_type ?? ""} onChange={(e) => set("control_type", e.target.value)} placeholder="ex: papel, cartão, REP-P, app móvel" />
              </div>
            </div>
          )}

          {current.key === "necessidades" && (
            <div className="space-y-4">
              <div><Label>Necessidades específicas</Label><Textarea rows={4} value={data.needs ?? ""} onChange={(e) => set("needs", e.target.value)} placeholder="Quais problemas você quer resolver com a gente?" /></div>
              <div><Label>Observações adicionais</Label><Textarea rows={3} value={data.notes ?? ""} onChange={(e) => set("notes", e.target.value)} placeholder="Algo que devemos saber antes de começar?" /></div>
            </div>
          )}

          {current.key === "documentos" && (
            <div className="space-y-3">
              {docCategories.map((cat) => {
                const sent = docs.filter((d) => d.category === cat.id);
                const isUploading = uploadingCat === cat.id;
                return (
                  <div key={cat.id} className="border border-border/50 rounded-xl p-4 bg-card/40">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                          sent.length ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                          {sent.length ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm flex items-center gap-2">
                            {cat.label}
                            {cat.required && <span className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">obrigatório</span>}
                          </p>
                          <p className="text-xs text-muted-foreground">{cat.description}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => fileInputs.current[cat.id]?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                        Enviar
                      </Button>
                      <input
                        ref={(el) => (fileInputs.current[cat.id] = el)}
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) onUpload(cat.id, f);
                          e.target.value = "";
                        }}
                      />
                    </div>
                    {sent.length > 0 && (
                      <ul className="space-y-1.5 pl-11">
                        {sent.map((d) => (
                          <li key={d.id} className="flex items-center justify-between text-xs bg-background/40 rounded-md px-3 py-2">
                            <button onClick={() => downloadDoc(d)} className="flex items-center gap-2 text-left hover:text-primary truncate">
                              <FileText className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{d.file_name}</span>
                            </button>
                            <button onClick={() => removeDoc(d)} className="text-muted-foreground hover:text-destructive ml-2">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {current.key === "revisao" && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {[
                  ["Empresa", data.company_name],
                  ["CNPJ", data.cnpj],
                  ["Responsável", data.contact_name],
                  ["Funcionários", data.employees_count],
                  ["Controle atual", data.control_type],
                ].map(([k, v]) => (
                  <div key={k} className="bg-background/40 rounded-lg px-4 py-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</p>
                    <p className="text-sm">{v || <span className="text-muted-foreground italic">—</span>}</p>
                  </div>
                ))}
              </div>
              <div className="bg-background/40 rounded-lg px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Necessidades</p>
                <p className="text-sm whitespace-pre-wrap">{data.needs || <span className="text-muted-foreground italic">—</span>}</p>
              </div>
              <div className="bg-background/40 rounded-lg px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Documentos</p>
                <p className="text-sm">{docs.length} arquivo(s) enviado(s)</p>
                {requiredDocsMissing.length > 0 && (
                  <p className="text-xs text-destructive mt-1">
                    Faltando: {requiredDocsMissing.map((c) => c.label).join(", ")}
                  </p>
                )}
              </div>
              {!allRequiredFilled && (
                <p className="text-xs text-destructive">Complete todas as etapas obrigatórias antes de enviar.</p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Voltar</Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep(step + 1)}>Avançar</Button>
            ) : (
              <Button onClick={() => save("enviado")} disabled={busy || !allRequiredFilled}>
                {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                Enviar onboarding
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
