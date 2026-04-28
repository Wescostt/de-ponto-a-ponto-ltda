import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LifeBuoy, FileText, FileCheck2, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { profile, isAdmin, user } = useAuth();
  const [stats, setStats] = useState({ tickets: 0, docs: 0, audits: 0, media: 0 });
  const [onb, setOnb] = useState<{ progress: number; status: string; loaded: boolean }>({ progress: 0, status: "rascunho", loaded: false });

  useEffect(() => {
    (async () => {
      const [t, d, a, m] = await Promise.all([
        supabase.from("tickets").select("id", { count: "exact", head: true }),
        supabase.from("documents").select("id", { count: "exact", head: true }),
        supabase.from("audits").select("id", { count: "exact", head: true }),
        supabase.from("media").select("id", { count: "exact", head: true }),
      ]);
      setStats({ tickets: t.count ?? 0, docs: d.count ?? 0, audits: a.count ?? 0, media: m.count ?? 0 });
    })();
  }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: req }, { data: docsRows }] = await Promise.all([
        supabase.from("onboarding_requests").select("data_json,status").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("onboarding_documents").select("category").eq("user_id", user.id),
      ]);
      const data: any = req?.data_json || {};
      const requiredDocs = ["contrato_social", "cnpj_card", "folha_modelo"];
      const docCats = new Set((docsRows ?? []).map((r: any) => r.category));
      const checks = [
        !!(data.company_name && data.cnpj && data.contact_name),
        !!data.employees_count,
        !!data.control_type,
        !!data.needs,
        requiredDocs.every((c) => docCats.has(c)),
        req?.status === "enviado",
      ];
      const done = checks.filter(Boolean).length;
      setOnb({ progress: (done / checks.length) * 100, status: req?.status ?? "rascunho", loaded: true });
    })();
  }, [user]);

  const cards = [
    { label: "Tickets", value: stats.tickets, icon: LifeBuoy, to: "/portal/tickets" },
    { label: "Documentos", value: stats.docs, icon: FileText, to: "/portal/biblioteca" },
    { label: "Auditorias", value: stats.audits, icon: FileCheck2, to: "/portal/auditorias" },
    { label: "Mídia", value: stats.media, icon: Sparkles, to: "/portal/galeria" },
  ];

  const showOnboardingCta = onb.loaded && !isAdmin && onb.status !== "enviado";
  const showOnboardingDone = onb.loaded && !isAdmin && onb.status === "enviado";

  return (
    <div>
      <PageHeader
        title={`Olá, ${profile?.full_name?.split(" ")[0] || "bem-vindo"}.`}
        subtitle={isAdmin ? "Você está logado como administrador." : "Bem-vindo ao seu portal."}
      />

      {showOnboardingCta && (
        <Card className="glass p-6 mb-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-widest text-primary font-medium">Comece por aqui</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Complete seu onboarding</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Preencha os dados da empresa e envie os documentos para configurarmos sua conta.
              </p>
              <div className="flex items-center gap-3 max-w-md">
                <Progress value={onb.progress} className="h-2 flex-1" />
                <span className="text-xs text-muted-foreground">{Math.round(onb.progress)}%</span>
              </div>
            </div>
            <Link to="/portal/onboarding">
              <Button>Continuar <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
        </Card>
      )}

      {showOnboardingDone && (
        <Card className="glass p-5 mb-6 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium">Onboarding concluído</p>
            <p className="text-xs text-muted-foreground">Nossa equipe está revisando suas informações.</p>
          </div>
          <Link to="/portal/onboarding"><Button variant="ghost" size="sm">Ver</Button></Link>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link to={c.to} key={c.label}>
            <Card className="glass p-5 hover:glow-navy-sm transition">
              <c.icon className="w-5 h-5 text-primary mb-3" />
              <div className="text-3xl font-semibold">{c.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
