import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Download, Search, Upload, FileText } from "lucide-react";

const CATS = ["rh", "sistema", "legislacao"] as const;

type Doc = { id: string; title: string; description: string | null; category: string; storage_path: string; mime_type: string | null };

const Biblioteca = () => {
  const { isAdmin } = useAuth();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"all" | typeof CATS[number]>("all");
  const [form, setForm] = useState({ title: "", description: "", category: "rh" });
  const [file, setFile] = useState<File | null>(null);

  const load = async () => {
    let query = supabase.from("documents").select("*").order("created_at", { ascending: false });
    if (cat !== "all") query = query.eq("category", cat as any);
    const { data } = await query;
    let list = (data ?? []) as Doc[];
    if (q) list = list.filter((d) => d.title.toLowerCase().includes(q.toLowerCase()));
    setDocs(list);
  };

  useEffect(() => { load(); }, [cat, q]);

  const download = async (d: Doc) => {
    const { data, error } = await supabase.storage.from("documents").createSignedUrl(d.storage_path, 60);
    if (error) return toast.error(error.message);
    window.open(data.signedUrl, "_blank");
  };

  const upload = async () => {
    if (!file || !form.title) return toast.error("Preencha título e arquivo");
    const path = `${form.category}/${Date.now()}-${file.name}`;
    const { error: e1 } = await supabase.storage.from("documents").upload(path, file);
    if (e1) return toast.error(e1.message);
    const { error } = await supabase.from("documents").insert({
      title: form.title, description: form.description, category: form.category as any,
      storage_path: path, mime_type: file.type, file_size: file.size,
    });
    if (error) return toast.error(error.message);
    toast.success("Documento adicionado");
    setForm({ title: "", description: "", category: "rh" }); setFile(null);
    load();
  };

  return (
    <div>
      <PageHeader title="Biblioteca de conteúdo" subtitle="Manuais, guias e documentos de apoio." />

      {isAdmin && (
        <Card className="glass p-5 mb-6 grid md:grid-cols-5 gap-3 items-end">
          <div><Label>Título</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div><Label>Categoria</Label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{CATS.map((c) => <SelectItem key={c} value={c}>{c.toUpperCase()}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2"><Label>Descrição</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div><Label>Arquivo</Label><Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></div>
          <Button onClick={upload} className="md:col-span-5"><Upload className="w-4 h-4 mr-2" />Publicar documento</Button>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Buscar documentos…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Select value={cat} onValueChange={(v: any) => setCat(v)}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            {CATS.map((c) => <SelectItem key={c} value={c}>{c.toUpperCase()}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {docs.map((d) => (
          <Card key={d.id} className="glass p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary"><FileText className="w-5 h-5" /></div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{d.title}</p>
              <p className="text-xs text-muted-foreground truncate">{d.description}</p>
              <p className="text-[10px] uppercase tracking-widest text-primary mt-1">{d.category}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => download(d)}><Download className="w-4 h-4" /></Button>
          </Card>
        ))}
        {docs.length === 0 && <p className="text-sm text-muted-foreground col-span-full text-center py-12">Nenhum documento.</p>}
      </div>
    </div>
  );
};
export default Biblioteca;
