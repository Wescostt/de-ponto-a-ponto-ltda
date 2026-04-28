import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import { Plus } from "lucide-react";

type Co = { id: string; name: string; cnpj: string | null; contact_email: string | null; contact_phone: string | null };

const Empresas = () => {
  const { isAdmin, loading } = useAuth();
  const [rows, setRows] = useState<Co[]>([]);
  const [form, setForm] = useState({ name: "", cnpj: "", contact_email: "", contact_phone: "" });

  const load = async () => {
    const { data } = await supabase.from("companies").select("*").order("name");
    setRows((data ?? []) as Co[]);
  };
  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  if (loading) return null;
  if (!isAdmin) return <Navigate to="/portal" replace />;

  const create = async () => {
    if (!form.name) return;
    const { error } = await supabase.from("companies").insert(form);
    if (error) return toast.error(error.message);
    toast.success("Empresa criada"); setForm({ name: "", cnpj: "", contact_email: "", contact_phone: "" }); load();
  };

  return (
    <div>
      <PageHeader title="Empresas clientes" subtitle="Cadastre empresas para vincular aos usuários." />
      <Card className="glass p-5 mb-6 grid md:grid-cols-5 gap-3 items-end">
        <div><Label>Nome</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><Label>CNPJ</Label><Input value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: e.target.value })} /></div>
        <div><Label>Email</Label><Input value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} /></div>
        <div><Label>Telefone</Label><Input value={form.contact_phone} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} /></div>
        <Button onClick={create}><Plus className="w-4 h-4 mr-2" />Criar</Button>
      </Card>
      <div className="space-y-2">
        {rows.map((c) => (
          <Card key={c.id} className="glass p-4 grid md:grid-cols-4 gap-3 text-sm">
            <span className="font-medium">{c.name}</span>
            <span className="text-muted-foreground">{c.cnpj}</span>
            <span className="text-muted-foreground">{c.contact_email}</span>
            <span className="text-muted-foreground">{c.contact_phone}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Empresas;
