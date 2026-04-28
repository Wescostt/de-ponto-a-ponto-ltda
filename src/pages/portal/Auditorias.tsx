import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck2, Download } from "lucide-react";
import { toast } from "sonner";

type Audit = { id: string; reference_month: string; title: string; summary: string | null; report_path: string | null };

const Auditorias = () => {
  const [audits, setAudits] = useState<Audit[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("audits").select("*").order("reference_month", { ascending: false });
      setAudits((data ?? []) as Audit[]);
    })();
  }, []);

  const download = async (path: string) => {
    const { data, error } = await supabase.storage.from("audits").createSignedUrl(path, 60);
    if (error) return toast.error(error.message);
    window.open(data.signedUrl, "_blank");
  };

  return (
    <div>
      <PageHeader title="Auditorias mensais" subtitle="Histórico de auditorias preventivas e relatórios." />
      <div className="space-y-3">
        {audits.map((a) => (
          <Card key={a.id} className="glass p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary"><FileCheck2 className="w-5 h-5" /></div>
            <div className="flex-1">
              <p className="font-medium text-sm">{a.title}</p>
              <p className="text-xs text-muted-foreground">{new Date(a.reference_month).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}</p>
              {a.summary && <p className="text-xs text-muted-foreground mt-1">{a.summary}</p>}
            </div>
            {a.report_path && (
              <Button size="sm" variant="outline" onClick={() => download(a.report_path!)}>
                <Download className="w-4 h-4 mr-2" />Relatório
              </Button>
            )}
          </Card>
        ))}
        {audits.length === 0 && (
          <Card className="glass p-12 text-center text-sm text-muted-foreground">
            Nenhuma auditoria publicada ainda. As auditorias mensais aparecerão aqui.
          </Card>
        )}
      </div>
    </div>
  );
};
export default Auditorias;
