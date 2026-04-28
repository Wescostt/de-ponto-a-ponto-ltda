import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Send } from "lucide-react";

const TYPES = ["suporte", "manutencao", "troca", "treinamento", "onboarding"] as const;
const STATUS_COLORS: Record<string, string> = {
  aberto: "bg-blue-500/20 text-blue-300",
  em_andamento: "bg-yellow-500/20 text-yellow-300",
  aguardando: "bg-orange-500/20 text-orange-300",
  resolvido: "bg-green-500/20 text-green-300",
  fechado: "bg-muted text-muted-foreground",
};

type Ticket = { id: string; type: string; subject: string; description: string | null; status: string; created_at: string };
type Msg = { id: string; body: string; created_at: string; author_id: string };

const Tickets = () => {
  const { user, profile } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "suporte", subject: "", description: "" });
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [reply, setReply] = useState("");

  const load = async () => {
    const { data } = await supabase.from("tickets").select("*").order("created_at", { ascending: false });
    setTickets((data ?? []) as Ticket[]);
  };
  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (!selected) return;
    (async () => {
      const { data } = await supabase.from("ticket_messages").select("*").eq("ticket_id", selected.id).order("created_at");
      setMsgs((data ?? []) as Msg[]);
    })();
  }, [selected]);

  const create = async () => {
    if (!user || !form.subject) return;
    const { error } = await supabase.from("tickets").insert({
      created_by: user.id, company_id: profile?.company_id ?? null,
      type: form.type as any, subject: form.subject, description: form.description,
    });
    if (error) return toast.error(error.message);
    toast.success("Ticket aberto");
    setOpen(false); setForm({ type: "suporte", subject: "", description: "" });
    load();
  };

  const sendReply = async () => {
    if (!selected || !user || !reply) return;
    const { error } = await supabase.from("ticket_messages").insert({
      ticket_id: selected.id, author_id: user.id, body: reply,
    });
    if (error) return toast.error(error.message);
    setReply("");
    const { data } = await supabase.from("ticket_messages").select("*").eq("ticket_id", selected.id).order("created_at");
    setMsgs((data ?? []) as Msg[]);
  };

  return (
    <div>
      <PageHeader
        title="Tickets de suporte"
        subtitle="Suporte técnico, manutenção, troca de equipamento, treinamento e onboarding."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />Novo ticket</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Abrir novo ticket</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Tipo</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Assunto</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></div>
                <div><Label>Descrição</Label><Textarea rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <Button onClick={create} className="w-full">Abrir ticket</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-2">
          {tickets.map((t) => (
            <Card key={t.id} onClick={() => setSelected(t)}
              className={`glass p-4 cursor-pointer transition ${selected?.id === t.id ? "border-primary" : ""}`}>
              <div className="flex justify-between items-start gap-2 mb-1">
                <p className="font-medium text-sm truncate">{t.subject}</p>
                <Badge className={STATUS_COLORS[t.status]}>{t.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground capitalize">{t.type} • {new Date(t.created_at).toLocaleDateString("pt-BR")}</p>
            </Card>
          ))}
          {tickets.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">Nenhum ticket.</p>}
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <Card className="glass p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{selected.subject}</h3>
                  <p className="text-xs text-muted-foreground capitalize">{selected.type}</p>
                </div>
                <Badge className={STATUS_COLORS[selected.status]}>{selected.status}</Badge>
              </div>
              {selected.description && <p className="text-sm text-muted-foreground mb-6 whitespace-pre-wrap">{selected.description}</p>}

              <div className="space-y-3 mb-4 max-h-80 overflow-auto">
                {msgs.map((m) => (
                  <div key={m.id} className={`p-3 rounded-lg text-sm ${m.author_id === user?.id ? "bg-primary/15 ml-8" : "bg-muted/30 mr-8"}`}>
                    {m.body}
                    <p className="text-[10px] text-muted-foreground mt-1">{new Date(m.created_at).toLocaleString("pt-BR")}</p>
                  </div>
                ))}
                {msgs.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">Nenhuma mensagem ainda.</p>}
              </div>

              <div className="flex gap-2">
                <Textarea rows={2} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Sua mensagem…" />
                <Button onClick={sendReply}><Send className="w-4 h-4" /></Button>
              </div>
            </Card>
          ) : (
            <Card className="glass p-12 text-center text-muted-foreground text-sm">Selecione um ticket para ver detalhes.</Card>
          )}
        </div>
      </div>
    </div>
  );
};
export default Tickets;
