import { useEffect, useState } from "react";
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
import { Loader2, Save, Send } from "lucide-react";

type Data = {
  company_name?: string;
  cnpj?: string;
  contact_name?: string;
  employees_count?: string;
  control_type?: string;
  needs?: string;
  notes?: string;
};

const steps = [
  { title: "Dados da empresa", fields: ["company_name", "cnpj", "contact_name"] as const },
  { title: "Estrutura", fields: ["employees_count"] as const },
  { title: "Controle de ponto", fields: ["control_type"] as const },
  { title: "Necessidades", fields: ["needs", "notes"] as const },
];

const Onboarding = () => {
  const { user } = useAuth();
  const [recordId, setRecordId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({});
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
      }
      setLoaded(true);
    })();
  }, [user]);

  const save = async (status: "rascunho" | "enviado" = "rascunho") => {
    if (!user) return;
    setBusy(true);
    try {
      const payload = { user_id: user.id, data_json: data, current_step: step, status };
      if (recordId) {
        const { error } = await supabase.from("onboarding_requests").update(payload).eq("id", recordId);
        if (error) throw error;
      } else {
        const { data: ins, error } = await supabase.from("onboarding_requests").insert(payload).select().single();
        if (error) throw error;
        setRecordId(ins.id);
      }
      toast.success(status === "enviado" ? "Onboarding enviado." : "Salvo.");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  // autosave debounced
  useEffect(() => {
    if (!loaded || !user) return;
    const t = setTimeout(() => save("rascunho"), 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, step]);

  const set = (k: keyof Data, v: string) => setData((d) => ({ ...d, [k]: v }));
  const progress = ((step + 1) / steps.length) * 100;
  const current = steps[step];

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Onboarding interativo" subtitle="Preencha as informações iniciais. Salvamos automaticamente." />
      <Progress value={progress} className="mb-6" />
      <Card className="glass p-8">
        <p className="text-xs uppercase tracking-widest text-primary mb-2">Etapa {step + 1} de {steps.length}</p>
        <h2 className="text-xl font-semibold mb-6">{current.title}</h2>

        <div className="space-y-4">
          {current.fields.includes("company_name" as never) && (
            <div><Label>Nome da empresa</Label><Input value={data.company_name ?? ""} onChange={(e) => set("company_name", e.target.value)} /></div>
          )}
          {current.fields.includes("cnpj" as never) && (
            <div><Label>CNPJ</Label><Input value={data.cnpj ?? ""} onChange={(e) => set("cnpj", e.target.value)} /></div>
          )}
          {current.fields.includes("contact_name" as never) && (
            <div><Label>Nome do responsável</Label><Input value={data.contact_name ?? ""} onChange={(e) => set("contact_name", e.target.value)} /></div>
          )}
          {current.fields.includes("employees_count" as never) && (
            <div><Label>Número de funcionários</Label><Input type="number" value={data.employees_count ?? ""} onChange={(e) => set("employees_count", e.target.value)} /></div>
          )}
          {current.fields.includes("control_type" as never) && (
            <div><Label>Tipo de controle de ponto atual</Label><Input placeholder="ex: papel, cartão, REP-P, app" value={data.control_type ?? ""} onChange={(e) => set("control_type", e.target.value)} /></div>
          )}
          {current.fields.includes("needs" as never) && (
            <div><Label>Necessidades específicas</Label><Textarea value={data.needs ?? ""} onChange={(e) => set("needs", e.target.value)} /></div>
          )}
          {current.fields.includes("notes" as never) && (
            <div><Label>Observações</Label><Textarea value={data.notes ?? ""} onChange={(e) => set("notes", e.target.value)} /></div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Voltar</Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)}>Avançar</Button>
          ) : (
            <Button onClick={() => save("enviado")} disabled={busy}>
              {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              Enviar onboarding
            </Button>
          )}
        </div>
      </Card>
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1"><Save className="w-3 h-3" /> Salvamento automático ativo</p>
    </div>
  );
};

export default Onboarding;
