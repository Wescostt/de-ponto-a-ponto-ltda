/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  FileText,
  Plus,
  Search,
  Download,
  Printer,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  ChevronDown
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type Contract = {
  id: string;
  contract_number: string;
  client_id: string;
  version: number;
  status: string;
  plano_contratado: string;
  valor_anual: number;
  vigencia_inicio: string;
  vigencia_fim: string;
  pdf_url: string | null;
  created_at: string;
  clients: { razao_social: string; cnpj: string } | null;
};

const ContratosMaster = () => {
  const { isGestorMaster, user } = useAuth();
  const navigate = useNavigate();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadContracts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("contracts")
        .select("*, clients(razao_social, cnpj)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setContracts(data as any ?? []);
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao carregar contratos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isGestorMaster) {
      navigate("/portal");
      return;
    }
    loadContracts();
  }, [isGestorMaster, navigate]);

  const handleMarkSigned = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("contracts")
        .update({
          status: "assinado",
          signed_at: new Date().toISOString(),
          data_assinatura: new Date().toISOString().split("T")[0]
        })
        .eq("id", id);

      if (error) throw error;

      // Log audit
      await supabase.from("audit_logs").insert({
        actor_user_id: user?.id,
        actor_email: user?.email,
        action: "contract.signed",
        target_type: "contract",
        target_id: id
      });

      toast.success("Contrato marcado como assinado.");
      loadContracts();
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao atualizar status: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = (c: Contract) => {
    // Navigate directly to the preview view which triggers window.print
    navigate(`/portal/master/contratos/novo?previewId=${c.id}&print=true`);
  };

  const handlePreview = (c: Contract) => {
    navigate(`/portal/master/contratos/novo?previewId=${c.id}`);
  };

  const filteredContracts = contracts.filter((c) => {
    return (
      c.contract_number.toLowerCase().includes(search.toLowerCase()) ||
      (c.clients?.razao_social && c.clients.razao_social.toLowerCase().includes(search.toLowerCase())) ||
      c.plano_contratado.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gerenciador de Contratos"
        subtitle="Consulte e administre os contratos vigentes e históricos gerados."
      />

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Buscar por número, cliente ou plano..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Link to="/portal/master/contratos/novo" className="shrink-0 w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Gerar Contrato
          </Button>
        </Link>
      </div>

      <Card className="glass overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-muted/30 border-b border-border/50 text-muted-foreground">
            <tr>
              <th className="p-4 font-semibold">Número</th>
              <th className="p-4 font-semibold">Cliente</th>
              <th className="p-4 font-semibold">Plano</th>
              <th className="p-4 font-semibold">Valor Anual</th>
              <th className="p-4 font-semibold">Vigência</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {filteredContracts.map((c) => (
              <tr key={c.id} className="hover:bg-muted/10 transition-colors">
                <td className="p-4 font-mono text-xs font-semibold">{c.contract_number} (v{c.version})</td>
                <td className="p-4">
                  <div className="font-semibold">{c.clients?.razao_social || "Cliente Excluído"}</div>
                  <div className="text-xs text-muted-foreground font-mono">{c.clients?.cnpj}</div>
                </td>
                <td className="p-4 max-w-[180px] truncate">{c.plano_contratado}</td>
                <td className="p-4 font-semibold">
                  {c.valor_anual.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </td>
                <td className="p-4 text-xs font-mono">
                  {new Date(c.vigencia_inicio).toLocaleDateString("pt-BR")} - {new Date(c.vigencia_fim).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                    c.status === "assinado" ? "bg-emerald-500/10 text-emerald-500" :
                    c.status === "enviado" ? "bg-blue-500/10 text-blue-500" :
                    "bg-amber-500/10 text-amber-500"
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handlePreview(c)} title="Visualizar">
                      <FileText className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handlePrint(c)} title="Imprimir">
                      <Printer className="w-4 h-4" />
                    </Button>
                    {c.status !== "assinado" && (
                      <Button size="sm" variant="ghost" className="text-emerald-500 hover:bg-emerald-500/10" onClick={() => handleMarkSigned(c.id)} title="Marcar como Assinado">
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filteredContracts.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  Nenhum contrato encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ContratosMaster;
