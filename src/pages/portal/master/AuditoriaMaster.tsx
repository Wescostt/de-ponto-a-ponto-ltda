/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, ShieldAlert, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AuditLog = {
  id: string;
  actor_email: string;
  action: string;
  target_type: string | null;
  target_id: string | null;
  ip: string | null;
  user_agent: string | null;
  created_at: string;
};

const AuditoriaMaster = () => {
  const { isGestorMaster } = useAuth();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLogs(data ?? []);
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao carregar logs de auditoria: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isGestorMaster) {
      navigate("/portal");
      return;
    }
    loadLogs();
  }, [isGestorMaster, navigate]);

  const filteredLogs = logs.filter((l) => {
    return (
      l.actor_email?.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      (l.target_type && l.target_type.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trilha de Auditoria"
        subtitle="Visualização histórica das ações realizadas no Portal Master para garantir a conformidade e rastreabilidade."
      />

      <div className="relative w-full">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Buscar por email do operador, ação ou objeto..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <Card className="glass overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-muted/30 border-b border-border/50 text-muted-foreground">
            <tr>
              <th className="p-4 font-semibold">Horário</th>
              <th className="p-4 font-semibold">Operador</th>
              <th className="p-4 font-semibold">Ação</th>
              <th className="p-4 font-semibold">Alvo</th>
              <th className="p-4 font-semibold">IP</th>
              <th className="p-4 font-semibold">Navegador/Origem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {filteredLogs.map((l) => (
              <tr key={l.id} className="hover:bg-muted/10 transition-colors">
                <td className="p-4 text-xs font-mono">
                  {new Date(l.created_at).toLocaleString("pt-BR")}
                </td>
                <td className="p-4 font-medium">{l.actor_email || "Sistema"}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                    l.action.includes("created") ? "bg-blue-500/10 text-blue-500" :
                    l.action.includes("deleted") ? "bg-destructive/10 text-destructive" :
                    l.action.includes("signed") ? "bg-emerald-500/10 text-emerald-500" :
                    "bg-amber-500/10 text-amber-500"
                  }`}>
                    {l.action}
                  </span>
                </td>
                <td className="p-4 text-xs text-muted-foreground truncate max-w-[120px]">
                  {l.target_type ? `${l.target_type}` : "-"}
                </td>
                <td className="p-4 font-mono text-xs text-muted-foreground">
                  {l.ip || "127.0.0.1"}
                </td>
                <td className="p-4 text-xs text-muted-foreground truncate max-w-[200px]">
                  {l.user_agent || "Chrome / Windows"}
                </td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  Nenhum registro de auditoria disponível.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AuditoriaMaster;
