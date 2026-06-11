/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/portal/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FileText, ArrowLeft, ArrowRight, Save, Printer, Send } from "lucide-react";

type Client = {
  id: string;
  razao_social: string;
  cnpj: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  estado: string;
  telefone: string;
  email_principal: string;
  representante_nome: string | null;
  representante_cpf: string | null;
};

// --- NUMBER TO WORDS PORTUGUESE HELPERS ---
const UNIDADES = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
const DEZENAS_10 = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
const DEZENAS = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
const CENTENAS = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

function númeroParaTexto(n: number): string {
  if (n === 0) return "zero";
  if (n < 0) return "menos " + númeroParaTexto(Math.abs(n));
  
  let texto = "";
  
  if (Math.floor(n / 1000) > 0) {
    const mil = Math.floor(n / 1000);
    texto += (mil === 1 ? "" : númeroParaTexto(mil) + " ") + "mil";
    n %= 1000;
    if (n > 0) texto += " e ";
  }
  
  if (Math.floor(n / 100) > 0) {
    const cent = Math.floor(n / 100);
    if (cent === 1 && n === 100) {
      texto += "cem";
    } else {
      texto += CENTENAS[cent];
    }
    n %= 100;
    if (n > 0) texto += " e ";
  }
  
  if (Math.floor(n / 10) > 0) {
    const dez = Math.floor(n / 10);
    if (dez === 1) {
      texto += DEZENAS_10[n - 10];
      n = 0;
    } else {
      texto += DEZENAS[dez];
      n %= 10;
      if (n > 0) texto += " e ";
    }
  }
  
  if (n > 0) {
    texto += UNIDADES[n];
  }
  
  return texto;
}

function valorParaExtenso(valor: number): string {
  const inteiro = Math.floor(valor);
  const centavos = Math.round((valor - inteiro) * 100);
  
  let result = "";
  if (inteiro > 0) {
    result += númeroParaTexto(inteiro) + (inteiro === 1 ? " real" : " reais");
  }
  if (centavos > 0) {
    if (inteiro > 0) result += " e ";
    result += númeroParaTexto(centavos) + (centavos === 1 ? " centavo" : " centavos");
  }
  return result;
}

const NovoContratoMaster = () => {
  const { isGestorMaster, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const previewId = searchParams.get("previewId");
  const isPrintMode = searchParams.get("print") === "true";

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Form selections
  const [selectedClientId, setSelectedClientId] = useState("");
  const [plano, setPlano] = useState("Secullum Ponto Web Ultimate");
  const [funcionarios, setFuncionarios] = useState(100);
  const [cnpjsAtendidos, setCnpjsAtendidos] = useState(1);
  const [valorAnual, setValorAnual] = useState(8988);
  const [formaPagamento, setFormaPagamento] = useState("parcelado");
  const [parcelas, setParcelas] = useState(2);
  const [vencimentoInicio, setVencimentoInicio] = useState("");
  const [vencimentoFim, setVencimentoFim] = useState("");
  const [permitirAjusteManual, setPermitirAjusteManual] = useState(false);
  const [motivoAjuste, setMotivoAjuste] = useState("");
  const [obsComercial, setObsComercial] = useState(
    "A divisão em janeiro e julho representa condição comercial do ciclo vigente e não transforma a contratação anual em contrato mensal."
  );

  // Loaded contract details (for preview mode)
  const [contractPreview, setContractPreview] = useState<any>(null);

  useEffect(() => {
    if (!isGestorMaster) {
      navigate("/portal");
      return;
    }

    const loadClients = async () => {
      const { data } = await supabase.from("clients").select("*");
      setClients(data ?? []);
    };

    loadClients();
  }, [isGestorMaster, navigate]);

  // Handle calculated date
  useEffect(() => {
    if (vencimentoInicio && !permitirAjusteManual) {
      const start = new Date(vencimentoInicio);
      const end = new Date(start.setFullYear(start.getFullYear() + 1));
      end.setDate(end.getDate() - 1);
      setVencimentoFim(end.toISOString().split("T")[0]);
    }
  }, [vencimentoInicio, permitirAjusteManual]);

  // Load contract details if we are in preview/print mode
  useEffect(() => {
    if (previewId) {
      const loadPreview = async () => {
        try {
          const { data, error } = await supabase
            .from("contracts")
            .select("*, clients(*)")
            .eq("id", previewId)
            .maybeSingle();

          if (error) throw error;
          if (data) {
            setContractPreview(data);
            if (isPrintMode) {
              setTimeout(() => {
                window.print();
              }, 800);
            }
          }
        } catch (err) {
          console.error(err);
        }
      };
      loadPreview();
    }
  }, [previewId, isPrintMode]);

  const handleGenerate = async () => {
    if (!selectedClientId) {
      toast.error("Por favor, selecione um cliente.");
      return;
    }

    try {
      setLoading(true);

      const client = clients.find((c) => c.id === selectedClientId);
      if (!client) return;

      const contractNumber = `DPP-CTR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const valorMensal = Math.round((valorAnual / 12) * 100) / 100;
      const valorParcela = Math.round((valorAnual / parcelas) * 100) / 100;

      const condicaoResumo = formaPagamento === "parcelado" 
        ? `${parcelas} parcelas de ${valorParcela.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
        : `Pagamento à vista de ${valorAnual.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;

      const condicaoCompleta = formaPagamento === "parcelado"
        ? `${parcelas} parcelas de ${valorParcela.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} (${valorParaExtenso(valorParcela)})`
        : `Pagamento à vista de ${valorAnual.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} (${valorParaExtenso(valorAnual)})`;

      const { data: newContract, error } = await supabase
        .from("contracts")
        .insert({
          contract_number: contractNumber,
          client_id: selectedClientId,
          version: 1,
          status: "gerado",
          plano_contratado: plano,
          qtd_funcionarios: funcionarios,
          qtd_cnpjs_atendidos: cnpjsAtendidos,
          valor_anual: valorAnual,
          valor_mensal_referencia: valorMensal,
          forma_pagamento: formaPagamento,
          condicao_pagamento_resumo: condicaoResumo,
          condicao_pagamento_completa: condicaoCompleta,
          vigencia_inicio: vencimentoInicio,
          vigencia_fim: vencimentoFim,
          generated_at: new Date().toISOString(),
          created_by: user?.id
        })
        .select()
        .single();

      if (error) throw error;

      // Create initial version snapshot
      await supabase.from("contract_versions").insert({
        contract_id: newContract.id,
        version: 1,
        change_reason: "Criação inicial do contrato"
      });

      // Log audit
      await supabase.from("audit_logs").insert({
        actor_user_id: user?.id,
        actor_email: user?.email,
        action: "contract.generated",
        target_type: "contract",
        target_id: newContract.id
      });

      toast.success("Contrato gerado com sucesso.");
      navigate(`/portal/master/contratos?previewId=${newContract.id}`);
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao gerar contrato: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper to replace placeholders dynamically for preview rendering
  const renderContractHTML = (cData: any) => {
    const client = cData.clients;
    const formatCurrency = (val: number) => val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    
    const placeholders: Record<string, string> = {
      "{{CLIENTE_RAZAO_SOCIAL}}": client?.razao_social || "",
      "{{CLIENTE_CNPJ}}": client?.cnpj || "",
      "{{CLIENTE_ENDERECO_COMPLETO}}": `${client?.endereco}, nº ${client?.numero}${client?.complemento ? `, ${client.complemento}` : ""}, Bairro ${client?.bairro}, CEP ${client?.cep}, ${client?.cidade}/${client?.estado}`,
      "{{CLIENTE_ENDERECO_RESUMO}}": `${client?.endereco}, nº ${client?.numero}, ${client?.cidade}/${client?.estado}`,
      "{{CLIENTE_TELEFONE}}": client?.telefone || "",
      "{{CLIENTE_EMAIL}}": client?.email_principal || "",
      "{{CLIENTE_REPRESENTANTE_NOME}}": client?.representante_nome || "seu representante legal",
      "{{CLIENTE_REPRESENTANTE_CPF}}": client?.representante_cpf ? `CPF nº ${client.representante_cpf}` : "",
      
      "{{PLANO_CONTRATADO}}": cData.plano_contratado || "",
      "{{QTD_CNPJS_ATENDIDOS}}": String(cData.qtd_cnpjs_atendidos),
      "{{QTD_CNPJS_ATENDIDOS_EXTENSO}}": cData.qtd_cnpjs_atendidos === 1 ? "01 (um) CNPJ" : `${cData.qtd_cnpjs_atendidos} CNPJs`,
      "{{QTD_FUNCIONARIOS}}": String(cData.qtd_funcionarios),
      
      "{{VALOR_ANUAL}}": formatCurrency(Number(cData.valor_anual)),
      "{{VALOR_ANUAL_EXTENSO}}": valorParaExtenso(Number(cData.valor_anual)),
      "{{VALOR_MENSAL_REFERENCIA}}": formatCurrency(Number(cData.valor_mensal_referencia)),
      "{{VALOR_MENSAL_REFERENCIA_EXTENSO}}": valorParaExtenso(Number(cData.valor_mensal_referencia)),
      "{{VALOR_PARCELA}}": formatCurrency(Number(cData.valor_anual) / 2),
      "{{VALOR_PARCELA_EXTENSO}}": valorParaExtenso(Number(cData.valor_anual) / 2),
      
      "{{CONDICAO_PAGAMENTO_RESUMO}}": cData.condicao_pagamento_resumo || "",
      "{{CONDICAO_PAGAMENTO_COMPLETA}}": cData.condicao_pagamento_completa || "",
      
      "{{VIGENCIA_INICIO}}": new Date(cData.vigencia_inicio).toLocaleDateString("pt-BR"),
      "{{VIGENCIA_FIM}}": new Date(cData.vigencia_fim).toLocaleDateString("pt-BR"),
      
      "{{DATA_ASSINATURA_CIDADE}}": "Rio de Janeiro",
      "{{DATA_ASSINATURA_DIA}}": String(new Date().getDate()),
      "{{DATA_ASSINATURA_MES_EXTENSO}}": new Date().toLocaleString("pt-BR", { month: "long" }),
      "{{DATA_ASSINATURA_ANO}}": String(new Date().getFullYear()),
      
      "{{CONTRATADA_RAZAO_SOCIAL}}": "DE PONTO A PONTO W & I LTDA",
      "{{CONTRATADA_CNPJ}}": "34.523.710/0001-18",
      "{{CONTRATADA_ENDERECO}}": "Rua Carlos Chagas, S/N, Lote 47, Quadra 65, Jardim Gramacho, Duque de Caxias/RJ, CEP 25051-240",
      "{{NUMERO_CONTRATO}}": cData.contract_number,
      "{{VERSAO_CONTRATO}}": String(cData.version)
    };

    // Hardcoded model text from document 05 template
    let text = `
<h2>Contrato de Prestação de Serviços de Assistência Técnica, Suporte e Manutenção de Sistema de Ponto Informatizado</h2>
<p>CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE ASSISTÊNCIA TÉCNICA, SUPORTE OPERACIONAL E MANUTENÇÃO DE SISTEMA DE PONTO INFORMATIZADO, SOFTWARE DE PONTO, EQUIPAMENTOS COMPATÍVEIS E SOLUÇÕES COM RECONHECIMENTO FACIAL</p>

<p>Pelo presente instrumento particular, de um lado:</p>
<p><strong>CONTRATANTE:</strong> {{CLIENTE_RAZAO_SOCIAL}}, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº {{CLIENTE_CNPJ}}, com sede/endereço na {{CLIENTE_ENDERECO_COMPLETO}}, telefone {{CLIENTE_TELEFONE}}, e-mail {{CLIENTE_EMAIL}}, neste ato representada por {{CLIENTE_REPRESENTANTE_NOME}}, {{CLIENTE_REPRESENTANTE_CPF}}, doravante denominada simplesmente CONTRATANTE;</p>
<p>E, de outro lado:</p>
<p><strong>CONTRATADA:</strong> DE PONTO A PONTO W & I LTDA, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 34.523.710/0001-18, com sede na Rua Carlos Chagas, S/N, Lote 47, Quadra 65, Jardim Gramacho, Duque de Caxias/RJ, CEP 25051-240, doravante denominada simplesmente CONTRATADA;</p>

<div style="border: 1px solid var(--border); padding: 16px; margin: 24px 0; border-radius: 8px;">
  <h3 style="margin-top:0;">QUADRO RESUMO COMERCIAL</h3>
  <table style="width:100%; border-collapse: collapse; font-size:13px;">
    <tr><td style="padding:4px; font-weight:bold;">Cliente:</td><td>{{CLIENTE_RAZAO_SOCIAL}}</td></tr>
    <tr><td style="padding:4px; font-weight:bold;">CNPJ:</td><td>{{CLIENTE_CNPJ}}</td></tr>
    <tr><td style="padding:4px; font-weight:bold;">Endereço:</td><td>{{CLIENTE_ENDERECO_RESUMO}}</td></tr>
    <tr><td style="padding:4px; font-weight:bold;">Plano/Serviço:</td><td>{{PLANO_CONTRATADO}}</td></tr>
    <tr><td style="padding:4px; font-weight:bold;">CNPJ atendido:</td><td>{{QTD_CNPJS_ATENDIDOS_EXTENSO}}</td></tr>
    <tr><td style="padding:4px; font-weight:bold;">Funcionários:</td><td>Até {{QTD_FUNCIONARIOS}} funcionários contemplados no plano contratado.</td></tr>
    <tr><td style="padding:4px; font-weight:bold;">Valor Anual:</td><td>{{VALOR_ANUAL}} ({{VALOR_ANUAL_EXTENSO}})</td></tr>
    <tr><td style="padding:4px; font-weight:bold;">Pagamento:</td><td>{{CONDICAO_PAGAMENTO_RESUMO}}</td></tr>
  </table>
</div>

<h3>CLÁUSULA PRIMEIRA — DO OBJETO</h3>
<p>1.1. Constitui objeto do presente contrato a prestação, pela CONTRATADA, de serviços de assistência técnica, suporte operacional, orientação de uso, manutenção preventiva e/ou corretiva, atendimento remoto e, quando cabível, atendimento presencial relacionado ao sistema de ponto informatizado utilizado pela CONTRATANTE, incluindo o software Secullum Ponto Web, equipamentos compatíveis, funcionalidades contratadas e recursos de registro de ponto, inclusive por reconhecimento facial, quando aplicável.</p>

<h3>CLÁUSULA SEGUNDA — DA VIGÊNCIA, PRAZO CONTRATUAL E RENOVAÇÃO</h3>
<p>2.1. O presente contrato é celebrado pelo prazo certo e determinado de 12 (doze) meses, correspondente ao ciclo anual de {{VIGENCIA_INICIO}} a {{VIGENCIA_FIM}}.</p>
<p>2.2. Ao término do prazo inicial, o contrato poderá ser renovado automaticamente por iguais períodos de 12 (doze) meses, salvo manifestação expressa e escrita com antecedência mínima de 30 dias.</p>

<h3>CLÁUSULA TERCEIRA — DO VALOR, FORMA DE PAGAMENTO E REAJUSTE</h3>
<p>3.1. Pela prestação dos serviços objeto deste contrato, a CONTRATANTE pagará à CONTRATADA o valor anual cheio de {{VALOR_ANUAL}} ({{VALOR_ANUAL_EXTENSO}}).</p>
<p>3.2. A divisão em parcelas não descaracteriza a natureza anual da contratação. O pagamento será realizado conforme a condição: {{CONDICAO_PAGAMENTO_COMPLETA}}.</p>

<h3>CAMPOS DE ASSINATURA</h3>
<p>{{DATA_ASSINATURA_CIDADE}}/RJ, {{DATA_ASSINATURA_DIA}} de {{DATA_ASSINATURA_MES_EXTENSO}} de {{DATA_ASSINATURA_ANO}}.</p>

<table style="width:100%; margin-top:40px;">
  <tr>
    <td style="width:50%; vertical-align: top;">
      <strong>CONTRATANTE:</strong><br />
      {{CLIENTE_RAZAO_SOCIAL}}<br /><br />
      Assinatura: ___________________________<br />
      Representante: ________________________<br />
      CPF: _________________________________
    </td>
    <td style="width:50%; vertical-align: top;">
      <strong>CONTRATADA:</strong><br />
      {{CONTRATADA_RAZAO_SOCIAL}}<br /><br />
      Assinatura: ___________________________<br />
      Representante: Wesley Nascimento Costa<br />
      CPF: _________________________________
    </td>
  </tr>
</table>
`;

    // Perform replacement
    Object.entries(placeholders).forEach(([key, val]) => {
      text = text.replaceAll(key, val);
    });

    return text;
  };

  // Preview Mode layout rendering
  if (previewId && contractPreview) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4 print:hidden">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" onClick={() => navigate("/portal/master/contratos")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h3 className="font-semibold text-lg">Visualização do Contrato</h3>
              <p className="text-xs text-muted-foreground">{contractPreview.contract_number}</p>
            </div>
          </div>
          <Button onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" />
            Imprimir Contrato
          </Button>
        </div>

        {/* Contract Page Layout */}
        <div className="bg-white text-black p-12 border shadow-lg max-w-[900px] mx-auto min-h-[1100px] print:border-0 print:shadow-none print:p-0">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-800">DE PONTO A PONTO</h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Há mais de 30 anos superando expectativas.</p>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <p>Contrato: {contractPreview.contract_number}</p>
              <p>Versão: v{contractPreview.version}</p>
            </div>
          </div>

          <div
            className="prose prose-sm max-w-none text-justify leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderContractHTML(contractPreview) }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gerador de Contratos"
        subtitle="Emita contratos comerciais anuais de prestação de serviços."
      />

      <Card className="glass p-6 space-y-6">
        {step === 1 ? (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-border/50 pb-2">Etapa 1. Selecionar Cliente e Detalhes Comerciais</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cliente *</Label>
                <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                  <SelectTrigger><SelectValue placeholder="Selecione o cliente" /></SelectTrigger>
                  <SelectContent>
                    {clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.razao_social} ({c.cnpj})</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Plano Contratado *</Label>
                <Select value={plano} onValueChange={setPlano}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PLAN_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Quantidade de Funcionários *</Label>
                <Input type="number" value={funcionarios} onChange={(e) => setFuncionarios(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <Label>CNPJs Atendidos *</Label>
                <Input type="number" value={cnpjsAtendidos} onChange={(e) => setCnpjsAtendidos(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <Label>Valor Anual *</Label>
                <Input type="number" value={valorAnual} onChange={(e) => setValorAnual(Number(e.target.value))} />
              </div>

              <div className="space-y-2">
                <Label>Forma de Pagamento *</Label>
                <Select value={formaPagamento} onValueChange={setFormaPagamento}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vista">Anual à Vista</SelectItem>
                    <SelectItem value="parcelado">Parcelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formaPagamento === "parcelado" && (
                <div className="space-y-2">
                  <Label>Número de Parcelas</Label>
                  <Input type="number" value={parcelas} onChange={(e) => setParcelas(Number(e.target.value))} />
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={() => setStep(2)}>
                Próximo passo <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-border/50 pb-2">Etapa 2. Configurar Vigência e Observações</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data de Início da Vigência *</Label>
                <Input type="date" value={vencimentoInicio} onChange={(e) => setVencimentoInicio(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Data de Fim da Vigência *</Label>
                <Input type="date" value={vencimentoFim} disabled={!permitirAjusteManual} onChange={(e) => setVencimentoFim(e.target.value)} />
              </div>

              <div className="flex items-center gap-2 md:col-span-2 pt-2">
                <Switch checked={permitirAjusteManual} onCheckedChange={setPermitirAjusteManual} />
                <Label className="cursor-pointer">Permitir ajuste manual da data final?</Label>
              </div>

              {permitirAjusteManual && (
                <div className="space-y-2 md:col-span-2">
                  <Label>Motivo do Ajuste Manual *</Label>
                  <Input value={motivoAjuste} onChange={(e) => setMotivoAjuste(e.target.value)} />
                </div>
              )}

              <div className="space-y-2 md:col-span-2">
                <Label>Observação sobre Pagamento (Quadro Resumo)</Label>
                <textarea className="w-full min-h-[80px] bg-background border border-input rounded-md px-3 py-2 text-sm" value={obsComercial} onChange={(e) => setObsComercial(e.target.value)} />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
              </Button>
              <Button onClick={handleGenerate} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                Gerar Contrato
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default NovoContratoMaster;
