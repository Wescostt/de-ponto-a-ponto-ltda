import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";

type Post = { id: string; title: string; body: string; created_at: string; author_id: string };
type Reply = { id: string; body: string; created_at: string; author_id: string };

const Forum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", body: "" });
  const [selected, setSelected] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [reply, setReply] = useState("");

  const load = async () => {
    const { data } = await supabase.from("forum_posts").select("*").order("created_at", { ascending: false });
    setPosts((data ?? []) as Post[]);
  };
  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (!selected) return;
    (async () => {
      const { data } = await supabase.from("forum_replies").select("*").eq("post_id", selected.id).order("created_at");
      setReplies((data ?? []) as Reply[]);
    })();
  }, [selected]);

  const create = async () => {
    if (!user || !form.title || !form.body) return;
    const { error } = await supabase.from("forum_posts").insert({ author_id: user.id, ...form });
    if (error) return toast.error(error.message);
    setOpen(false); setForm({ title: "", body: "" }); load();
  };

  const send = async () => {
    if (!user || !selected || !reply) return;
    const { error } = await supabase.from("forum_replies").insert({ post_id: selected.id, author_id: user.id, body: reply });
    if (error) return toast.error(error.message);
    setReply("");
    const { data } = await supabase.from("forum_replies").select("*").eq("post_id", selected.id).order("created_at");
    setReplies((data ?? []) as Reply[]);
  };

  return (
    <div>
      <PageHeader title="Fórum interno" subtitle="Tire dúvidas e troque experiências."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />Novo tópico</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Novo tópico</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <Textarea rows={5} placeholder="Conteúdo" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
                <Button onClick={create} className="w-full">Publicar</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      {selected ? (
        <div>
          <Button variant="ghost" size="sm" onClick={() => setSelected(null)} className="mb-4">← Voltar</Button>
          <Card className="glass p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">{selected.title}</h2>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selected.body}</p>
          </Card>
          <div className="space-y-2 mb-4">
            {replies.map((r) => (
              <Card key={r.id} className="glass p-3 text-sm">{r.body}
                <p className="text-[10px] text-muted-foreground mt-1">{new Date(r.created_at).toLocaleString("pt-BR")}</p>
              </Card>
            ))}
          </div>
          <div className="flex gap-2">
            <Textarea rows={2} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Responder…" />
            <Button onClick={send}>Enviar</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((p) => (
            <Card key={p.id} onClick={() => setSelected(p)} className="glass p-4 cursor-pointer hover:border-primary transition">
              <p className="font-medium">{p.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{p.body}</p>
              <p className="text-[10px] text-muted-foreground mt-2">{new Date(p.created_at).toLocaleString("pt-BR")}</p>
            </Card>
          ))}
          {posts.length === 0 && <p className="text-sm text-muted-foreground text-center py-12">Nenhum tópico ainda.</p>}
        </div>
      )}
    </div>
  );
};
export default Forum;
