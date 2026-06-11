/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  FileText,
  AlertCircle,
  GraduationCap,
  Plus,
  History,
  Building2,
  Shield,
  ArrowRight
} from "lucide-react";

type ClientCount = { count: number };
type ContractRow = {
  id: string;
  contract_number: string;
  plano_contratado: string;
  valor_anual: number;
  vigencia_fim: string;
  status: string;
  clients: { razao_social: string } | null;
};

type AuditRow = {
  id: string;
  actor_email: string;
  action: string;
  target_type: string;
  created_at: string;
};

const DashboardMaster = () => {
  const { isGestorMaster } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    clients: 0,
    contracts: 0,
    renewals: 0,
    trainings: 0,
  });
  const [recentContracts, setRecentContracts] = useState<ContractRow[]>([]);
  const [recentAudits, setRecentAudits] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isGestorMaster) {
      navigate("/portal");
      return;
    }

    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // Date 60 days from now
        const sixtyDaysLater = new Date();
        sixtyDaysLater.setDate(sixtyDaysLater.getDate() + 60);
        const sixtyDaysStr = sixtyDaysLater.toISOString().split("T")[0];

        // 1. Fetch counts
        const [clientsRes, contractsRes, renewalsRes] = await Promise.all([
          supabase.from("clients").select("id", { count: "exact", head: true }),
          supabase.from("contracts").select("id", { count: "exact", head: true }),
          supabase.from("contracts").select("id", { count: "exact", head: true })
            .lte("vigencia_fim", sixtyDaysStr)
            .neq("status", "cancelado")
            .neq("status", "vencido"),
        ]);

        // count clients with active commercial profile
        const { data: profileCount } = await supabase
          .from("client_commercial_profile")
          .select("id");

        setStats({
          clients: clientsRes.count ?? 0,
          contracts: contractsRes.count ?? 0,
          renewals: renewalsRes.count ?? 0,
          trainings: profileCount?.length ?? 0,
        });

        // 2. Fetch recent contracts
        const { data: contractsData } = await supabase
          .from("contracts")
          .select("id, contract_number, plano_contratado, valor_anual, vigencia_fim, status, clients(razao_social)")
          .order("created_at", { ascending: false })
          .limit(5);

        if (contractsData) {
          setRecentContracts(contractsData as any);
        }

        // 3. Fetch recent audit logs
        const { data: auditsData } = await supabase
          .from("audit_logs")
          .select("id, actor_email, action, target_type, created_at")
          .order("created_at", { ascending: false })
          .limit(5);

        if (auditsData) {
          setRecentAudits(auditsData as any);
        }
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard master:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [isGestorMaster, navigate]);

  const cards = [
    {
      label: "Clientes Cadastrados",
      value: stats.clients,
      icon: Users,
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      label: "Contratos Emitidos",
      value: stats.contracts,
      icon: FileText,
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      label: "Vencendo em 60 dias",
      value: stats.renewals,
      icon: AlertCircle,
      color: stats.renewals > 0 ? "text-amber-500 bg-amber-500/10 animate-pulse" : "text-amber-500 bg-amber-500/10",
    },
    {
      label: "Treinamentos Ativos",
      value: stats.trainings,
      icon: GraduationCap,
      color: "text-indigo-500 bg-indigo-500/10",
    },
  ];

  if (!isGestorMaster) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Painel Master Administrativo"
        subtitle="Gerenciamento comercial, controle de acessos de clientes e emissão de contratos."
      />

      {/* Action shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/portal/master/clientes">
          <Button className="w-full flex items-center justify-center gap-2 py-6 glass bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/10 hover:border-blue-500/20 text-foreground" variant="outline">
            <Users className="w-5 h-5 text-blue-500" />
            <span>Gerenciar Clientes</span>
          </Button>
        </Link>
        <Link to="/portal/master/contratos/novo">
          <Button className="w-full flex items-center justify-center gap-2 py-6 glass bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10 hover:border-emerald-500/20 text-foreground" variant="outline">
            <Plus className="w-5 h-5 text-emerald-500" />
            <span>Gerar Novo Contrato</span>
          </Button>
        </Link>
        <Link to="/portal/master/auditoria">
          <Button className="w-full flex items-center justify-center gap-2 py-6 glass bg-indigo-500/5 hover:bg-indigo-500/10 border-indigo-500/10 hover:border-indigo-500/20 text-foreground" variant="outline">
            <History className="w-5 h-5 text-indigo-500" />
            <span>Logs de Auditoria</span>
          </Button>
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <Card key={i} className="glass p-5 flex flex-col justify-between hover:scale-[1.01] transition-transform">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{c.label}</span>
              <div className={`p-2 rounded-lg ${c.color}`}>
                <c.icon className="w-4 h-4" />
              </div>
            </div>
            {loading ? (
              <div className="h-9 w-16 bg-muted animate-pulse rounded" />
            ) : (
              <span className="text-3xl font-bold font-mono tracking-tight">{c.value}</span>
            )}
          </Card>
        ))}
      </div>

      {/* Grid: Recent contracts and audits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contracts */}
        <Card className="glass p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-base">Contratos Recentes</h3>
            </div>
            <Link to="/portal/master/contratos">
              <Button size="sm" variant="ghost" className="text-xs">
                Ver todos <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="divide-y divide-border/30">
            {loading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="py-3 flex justify-between items-center animate-pulse">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-muted rounded" />
                    <div className="h-3 w-48 bg-muted rounded" />
                  </div>
                  <div className="h-6 w-16 bg-muted rounded" />
                </div>
              ))
            ) : recentContracts.length > 0 ? (
              recentContracts.map((c) => (
                <div key={c.id} className="py-3 flex justify-between items-center text-sm">
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{c.clients?.razao_social || "Cliente Indefinido"}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {c.contract_number} • {c.plano_contratado}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-semibold">
                      {new Date(c.vigencia_fim).toLocaleDateString("pt-BR")}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                      c.status === "assinado" ? "bg-emerald-500/10 text-emerald-500" :
                      c.status === "enviado" ? "bg-blue-500/10 text-blue-500" :
                      "bg-amber-500/10 text-amber-500"
                    }`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">Nenhum contrato gerado.</p>
            )}
          </div>
        </Card>

        {/* Recent Audits */}
        <Card className="glass p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-base">Logs de Auditoria Recentes</h3>
            </div>
            <Link to="/portal/master/auditoria">
              <Button size="sm" variant="ghost" className="text-xs">
                Ver todos <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="divide-y divide-border/30">
            {loading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="py-3 flex justify-between items-center animate-pulse">
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-muted rounded" />
                    <div className="h-3 w-20 bg-muted rounded" />
                  </div>
                  <div className="h-4 w-12 bg-muted rounded" />
                </div>
              ))
            ) : recentAudits.length > 0 ? (
              recentAudits.map((a) => (
                <div key={a.id} className="py-3 flex justify-between items-center text-sm">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{a.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{a.actor_email}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(a.created_at).toLocaleTimeString("pt-BR")}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">Nenhum registro de auditoria.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardMaster;
