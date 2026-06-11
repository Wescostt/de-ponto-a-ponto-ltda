import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Printer, Download, ArrowLeft, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

interface Certificate {
  id: string;
  certificate_type: "module" | "final";
  verification_code: string;
  certificate_title: string;
  certificate_text: string;
  issued_at: string;
  pdf_path?: string;
  profiles: {
    full_name: string;
  };
  companies?: {
    name: string;
  };
}

interface TreinamentoCertificatesProps {
  certificateId: string;
  onBack: () => void;
}

export function TreinamentoCertificates({ certificateId, onBack }: TreinamentoCertificatesProps) {
  const [cert, setCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  const loadCertificate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("training_certificates" as any)
        .select("*, profiles(full_name), companies(name)")
        .eq("id", certificateId)
        .maybeSingle();

      if (error || !data) throw new Error("Certificado não encontrado");
      setCert(data as any);
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erro ao carregar certificado",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificate();
  }, [certificateId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground">Carregando certificado...</p>
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="text-center p-12 bg-card border border-border/50 rounded-xl max-w-md mx-auto">
        <p className="text-destructive font-semibold">Não foi possível carregar o certificado.</p>
        <Button onClick={onBack} variant="outline" className="mt-4">
          Voltar
        </Button>
      </div>
    );
  }

  const formattedDate = new Date(cert.issued_at || new Date()).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Estilo para impressão */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
            background: #fff !important;
            color: #000 !important;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            border: 4px double #1e293b !important;
            padding: 40px !important;
            background: #fff !important;
            color: #000 !important;
            box-shadow: none !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Ações superiores */}
      <div className="no-print flex items-center justify-between border-b border-border/50 pb-4">
        <Button onClick={onBack} variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} />
          Voltar
        </Button>
        <div className="flex items-center gap-2">
          <Button onClick={handlePrint} className="flex items-center gap-2">
            <Printer size={16} />
            Imprimir Certificado
          </Button>
        </div>
      </div>

      {/* Área Visual do Certificado */}
      <div className="print-area max-w-4xl mx-auto bg-card border-4 border-double border-slate-700 rounded-2xl p-12 shadow-2xl relative overflow-hidden flex flex-col items-center justify-between text-center min-h-[550px]">
        {/* Adorno visual */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-primary/20 pointer-events-none rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-primary/20 pointer-events-none rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-primary/20 pointer-events-none rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-primary/20 pointer-events-none rounded-br-2xl"></div>

        {/* Logo/Cabeçalho */}
        <div className="flex flex-col items-center space-y-2 mb-8">
          <img src={logo} alt="De Ponto a Ponto" className="w-16 h-16 object-contain" />
          <h2 className="text-xl font-bold tracking-widest text-foreground">DE PONTO A PONTO</h2>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Há mais de 30 anos superando expectativas
          </span>
        </div>

        {/* Título Principal */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-serif font-semibold text-foreground tracking-wide">
            {cert.certificate_title || "Certificado de Conclusão"}
          </h1>
          <div className="w-24 h-0.5 bg-primary mx-auto"></div>
        </div>

        {/* Conteúdo */}
        <div className="max-w-2xl mx-auto space-y-6 mb-8 text-foreground">
          <p className="text-sm text-muted-foreground uppercase tracking-widest">Certificamos que</p>
          <p className="text-2xl font-bold font-serif text-primary">{cert.profiles?.full_name}</p>
          <p className="text-md leading-relaxed text-muted-foreground max-w-xl mx-auto">
            {cert.certificate_text ||
              `concluiu com êxito o treinamento promovido pela De Ponto a Ponto Ltda., demonstrando aptidão operacional para utilizar o sistema de ponto.`}
          </p>
        </div>

        {/* Assinatura / Validação */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-end pt-8 border-t border-border/50 text-left mt-auto">
          <div className="space-y-1 mb-4 sm:mb-0">
            <span className="text-xs text-muted-foreground block">Emitido em:</span>
            <span className="text-sm font-semibold text-foreground">{formattedDate}</span>
          </div>

          <div className="flex flex-col items-center space-y-1 text-center mb-4 sm:mb-0 border-t border-border/30 pt-4 w-48">
            <span className="text-sm font-bold text-foreground">De Ponto a Ponto Ltda</span>
            <span className="text-[10px] text-muted-foreground">Diretoria Técnica</span>
          </div>

          <div className="space-y-1 text-right">
            <div className="flex items-center gap-1 text-emerald-400 justify-end">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-semibold uppercase tracking-widest">Autenticidade Garantida</span>
            </div>
            <span className="text-[10px] text-muted-foreground block">Código de Verificação:</span>
            <span className="text-xs font-mono font-bold text-foreground block">{cert.verification_code}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
