import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

type Row = { id: string; email: string; full_name: string | null; phone: string | null; status: string; company_id: string | null };
type Co = { id: string; name: string };

const Aprovacoes = () => {
  const { isAdmin, loading } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [companies, setCompanies] = useState<Co[]>([]);

  const load = async () => {
    const [{ data: p }, { data: c }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("companies").select("id,name"),
    ]);
    setRows((p ?? []) as Row[]);
    setCompanies((c ?? []) as Co[]);
  };
  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  if (loading) return null;
  if (!isAdmin) return <Navigate to="/portal" replace />;

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase.from("profiles").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Atualizado"); load();
  };

  const setCompany = async (id: string, company_id: string) => {
    const { error } = await supabase.from("profiles").update({ company_id }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Empresa vinculada"); load();
  };

  const setRole = async (user_id: string, role: "admin" | "gestor" | "funcionario") => {
    await supabase.from("user_roles").delete().eq("user_id", user_id);
    const { error } = await supabase.from("user_roles").insert({ user_id, role });
    if (error) return toast.error(error.message);
    toast.success("Papel atualizado");
  };

  return (
    <div>
      <PageHeader title="Aprovações de cadastro" subtitle="Revise solicitações de acesso, defina papel e empresa." />
      <div className="space-y-3">
        {rows.map((r) => (
          <Card key={r.id} className="glass p-5 grid md:grid-cols-6 gap-3 items-center">
            <div className="md:col-span-2">
              <p className="font-medium">{r.full_name || "—"}</p>
              <p className="text-xs text-muted-foreground">{r.email}</p>
              <p className="text-xs text-muted-foreground">{r.phone}</p>
            </div>
            <Badge variant={r.status === "approved" ? "default" : r.status === "rejected" ? "destructive" : "secondary"}>{r.status}</Badge>
            <Select value={r.company_id ?? ""} onValueChange={(v) => setCompany(r.id, v)}>
              <SelectTrigger><SelectValue placeholder="Empresa" /></SelectTrigger>
              <SelectContent>{companies.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
            <Select onValueChange={(v: any) => setRole(r.id, v)}>
              <SelectTrigger><SelectValue placeholder="Papel" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="gestor">Gestor</SelectItem>
                <SelectItem value="funcionario">Funcionário</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 justify-end">
              <Button size="sm" onClick={() => updateStatus(r.id, "approved")}>Aprovar</Button>
              <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, "rejected")}>Rejeitar</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Aprovacoes;
