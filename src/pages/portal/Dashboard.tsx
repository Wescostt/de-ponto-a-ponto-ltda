import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { LifeBuoy, FileText, FileCheck2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { profile, isAdmin } = useAuth();
  const [stats, setStats] = useState({ tickets: 0, docs: 0, audits: 0, media: 0 });

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

  const cards = [
    { label: "Tickets", value: stats.tickets, icon: LifeBuoy, to: "/portal/tickets" },
    { label: "Documentos", value: stats.docs, icon: FileText, to: "/portal/biblioteca" },
    { label: "Auditorias", value: stats.audits, icon: FileCheck2, to: "/portal/auditorias" },
    { label: "Mídia", value: stats.media, icon: Sparkles, to: "/portal/galeria" },
  ];

  return (
    <div>
      <PageHeader
        title={`Olá, ${profile?.full_name?.split(" ")[0] || "bem-vindo"}.`}
        subtitle={isAdmin ? "Você está logado como administrador." : "Bem-vindo ao seu portal."}
      />
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
