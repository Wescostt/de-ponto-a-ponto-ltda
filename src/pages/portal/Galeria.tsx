import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const CATEGORIES = ["instalacoes", "treinamentos", "projetos", "bastidores"] as const;

type MediaRow = { id: string; type: "image" | "video"; category: string; title: string | null; storage_path: string };

const Galeria = () => {
  const { isAdmin } = useAuth();
  const [items, setItems] = useState<MediaRow[]>([]);
  const [filter, setFilter] = useState<"all" | typeof CATEGORIES[number]>("all");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ title: "", category: "instalacoes", type: "image" as "image" | "video" });
  const [file, setFile] = useState<File | null>(null);

  const load = async () => {
    let q = supabase.from("media").select("*").order("created_at", { ascending: false });
    if (filter !== "all") q = q.eq("category", filter as any);
    const { data } = await q;
    setItems((data ?? []) as MediaRow[]);
  };

  useEffect(() => { load(); }, [filter]);

  const urlFor = (p: string) => supabase.storage.from("media").getPublicUrl(p).data.publicUrl;

  const upload = async () => {
    if (!file) return toast.error("Selecione um arquivo");
    setBusy(true);
    try {
      const path = `${form.category}/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("media").upload(path, file);
      if (upErr) throw upErr;
      const { error } = await supabase.from("media").insert({
        type: form.type, category: form.category as any, title: form.title || file.name, storage_path: path,
      });
      if (error) throw error;
      toast.success("Mídia publicada");
      setFile(null); setForm({ ...form, title: "" });
      load();
    } catch (e: any) { toast.error(e.message); } finally { setBusy(false); }
  };

  return (
    <div>
      <PageHeader title="Galeria de mídia" subtitle="Imagens e vídeos do dia a dia." />

      {isAdmin && (
        <Card className="glass p-5 mb-6">
          <div className="grid md:grid-cols-5 gap-3 items-end">
            <div><Label>Título</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Categoria</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label>Tipo</Label>
              <Select value={form.type} onValueChange={(v: any) => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="image">Imagem</SelectItem><SelectItem value="video">Vídeo</SelectItem></SelectContent>
              </Select>
            </div>
            <div><Label>Arquivo</Label><Input type="file" accept={form.type === "image" ? "image/*" : "video/*"} onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></div>
            <Button onClick={upload} disabled={busy}><Upload className="w-4 h-4 mr-2" />Publicar</Button>
          </div>
        </Card>
      )}

      <Tabs value={filter} onValueChange={(v: any) => setFilter(v)} className="mb-4">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          {CATEGORIES.map((c) => <TabsTrigger key={c} value={c}>{c}</TabsTrigger>)}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((m) => (
          <Card key={m.id} className="glass overflow-hidden group">
            {m.type === "image" ? (
              <img src={urlFor(m.storage_path)} alt={m.title ?? ""} className="w-full h-48 object-cover group-hover:scale-105 transition" />
            ) : (
              <video src={urlFor(m.storage_path)} controls className="w-full h-48 object-cover" />
            )}
            <div className="p-3">
              <p className="text-sm font-medium truncate">{m.title}</p>
              <p className="text-xs text-muted-foreground capitalize">{m.category}</p>
            </div>
          </Card>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground col-span-full text-center py-12">Nenhuma mídia ainda.</p>}
      </div>
    </div>
  );
};
export default Galeria;
