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
import {
  Users,
  Plus,
  Search,
  Building2,
  Trash2,
  Edit2,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  FileCheck2,
  Globe,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Client = {
  id: string;
  razao_social: string;
  nome_fantasia: string | null;
  cnpj: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  estado: string;
  telefone: string;
  whatsapp: string | null;
  email_principal: string;
  email_financeiro: string | null;
  email_tecnico: string | null;
  representante_nome: string | null;
  representante_cpf: string | null;
  status: string;
  created_at: string;
};

type CommercialProfile = {
  id: string;
  client_id: string;
  plano_contratado: string | null;
  qtd_funcionarios: number | null;
  qtd_cnpjs_atendidos: number | null;
  qtd_unidades: number | null;
  possui_reconhecimento_facial: boolean;
  possui_rep: boolean;
  possui_app: boolean;
  modulos_adicionais: string | null;
  valor_anual: number | null;
  forma_pagamento: string | null;
  observacoes_comerciais: string | null;
};

const PLAN_OPTIONS = [
  "Secullum Ponto Web Basic",
  "Secullum Ponto Web Pro",
  "Secullum Ponto Web Ultimate",
  "Secullum Ponto Web + reconhecimento facial",
  "Plano personalizado"
];

const ClientesMaster = () => {
  const { isGestorMaster, user } = useAuth();
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");

  const [isEditing, setIsEditing] = useState(false);
  const [currentTab, setCurrentTab] = useState<"cadastral" | "comercial" | "portal">("cadastral");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Form states
  const [clientForm, setClientForm] = useState({
    razao_social: "",
    nome_fantasia: "",
    cnpj: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "RJ",
    telefone: "",
    whatsapp: "",
    email_principal: "",
    email_financeiro: "",
    email_tecnico: "",
    representante_nome: "",
    representante_cpf: "",
    status: "ativo"
  });

  const [commercialForm, setCommercialForm] = useState({
    plano_contratado: "Secullum Ponto Web Ultimate",
    qtd_funcionarios: 50,
    qtd_cnpjs_atendidos: 1,
    qtd_unidades: 1,
    possui_reconhecimento_facial: false,
    possui_rep: false,
    possui_app: false,
    modulos_adicionais: "",
    valor_anual: 1200,
    forma_pagamento: "parcelado",
    observacoes_comerciais: ""
  });

  const [portalForm, setPortalForm] = useState({
    criar_acesso_cliente: false,
    gestor_cliente_nome: "",
    gestor_cliente_email: "",
    gestor_cliente_telefone: "",
    liberar_treinamento: false,
    trilha_liberada: "secullum_ultimate",
    limite_alunos: 5,
    certificado_habilitado: true,
    validade_treinamento: ""
  });

  const loadClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("razao_social");

      if (error) throw error;
      setClients(data ?? []);
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao carregar clientes: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isGestorMaster) {
      navigate("/portal");
      return;
    }
    loadClients();
  }, [isGestorMaster, navigate]);

  const handleCreateNew = () => {
    setSelectedClient(null);
    setClientForm({
      razao_social: "",
      nome_fantasia: "",
      cnpj: "",
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "RJ",
      telefone: "",
      whatsapp: "",
      email_principal: "",
      email_financeiro: "",
      email_tecnico: "",
      representante_nome: "",
      representante_cpf: "",
      status: "ativo"
    });
    setCommercialForm({
      plano_contratado: "Secullum Ponto Web Ultimate",
      qtd_funcionarios: 50,
      qtd_cnpjs_atendidos: 1,
      qtd_unidades: 1,
      possui_reconhecimento_facial: false,
      possui_rep: false,
      possui_app: false,
      modulos_adicionais: "",
      valor_anual: 1200,
      forma_pagamento: "parcelado",
      observacoes_comerciais: ""
    });
    setPortalForm({
      criar_acesso_cliente: false,
      gestor_cliente_nome: "",
      gestor_cliente_email: "",
      gestor_cliente_telefone: "",
      liberar_treinamento: false,
      trilha_liberada: "secullum_ultimate",
      limite_alunos: 5,
      certificado_habilitado: true,
      validade_treinamento: ""
    });
    setCurrentTab("cadastral");
    setIsEditing(true);
  };

  const handleEdit = async (client: Client) => {
    setSelectedClient(client);
    setClientForm({
      razao_social: client.razao_social,
      nome_fantasia: client.nome_fantasia ?? "",
      cnpj: client.cnpj,
      cep: client.cep,
      endereco: client.endereco,
      numero: client.numero,
      complemento: client.complemento ?? "",
      bairro: client.bairro,
      cidade: client.cidade,
      estado: client.estado,
      telefone: client.telefone,
      whatsapp: client.whatsapp ?? "",
      email_principal: client.email_principal,
      email_financeiro: client.email_financeiro ?? "",
      email_tecnico: client.email_tecnico ?? "",
      representante_nome: client.representante_nome ?? "",
      representante_cpf: client.representante_cpf ?? "",
      status: client.status
    });

    // Load commercial profile
    try {
      const { data: comm } = await supabase
        .from("client_commercial_profile")
        .select("*")
        .eq("client_id", client.id)
        .maybeSingle();

      if (comm) {
        setCommercialForm({
          plano_contratado: comm.plano_contratado ?? "Secullum Ponto Web Ultimate",
          qtd_funcionarios: comm.qtd_funcionarios ?? 50,
          qtd_cnpjs_atendidos: comm.qtd_cnpjs_atendidos ?? 1,
          qtd_unidades: comm.qtd_unidades ?? 1,
          possui_reconhecimento_facial: comm.possui_reconhecimento_facial ?? false,
          possui_rep: comm.possui_rep ?? false,
          possui_app: comm.possui_app ?? false,
          modulos_adicionais: comm.modulos_adicionais ?? "",
          valor_anual: comm.valor_anual ? Number(comm.valor_anual) : 1200,
          forma_pagamento: comm.forma_pagamento ?? "parcelado",
          observacoes_comerciais: comm.observacoes_comerciais ?? ""
        });
      }
    } catch (err) {
      console.error(err);
    }

    setCurrentTab("cadastral");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!clientForm.razao_social || !clientForm.cnpj || !clientForm.cep || !clientForm.endereco || !clientForm.numero || !clientForm.bairro || !clientForm.cidade || !clientForm.telefone || !clientForm.email_principal) {
      toast.error("Por favor, preencha todos os campos obrigatórios (*) da aba Cadastral.");
      setCurrentTab("cadastral");
      return;
    }

    try {
      setLoading(true);
      let clientId = selectedClient?.id;

      if (selectedClient) {
        // Update client
        const { error } = await supabase
          .from("clients")
          .update({
            ...clientForm,
            updated_at: new Date().toISOString()
          })
          .eq("id", selectedClient.id);

        if (error) throw error;

        // Upsert commercial profile
        const { error: commError } = await supabase
          .from("client_commercial_profile")
          .upsert({
            client_id: selectedClient.id,
            ...commercialForm,
            updated_at: new Date().toISOString()
          }, { onConflict: "client_id" });

        if (commError) throw commError;

        // Log audit
        await supabase.from("audit_logs").insert({
          actor_user_id: user?.id,
          actor_email: user?.email,
          action: "client.updated",
          target_type: "client",
          target_id: selectedClient.id,
          after_json: { ...clientForm, ...commercialForm } as any
        });

        toast.success("Cliente atualizado com sucesso.");
      } else {
        // Insert client
        const { data: newClient, error } = await supabase
          .from("clients")
          .insert({
            ...clientForm,
            created_by: user?.id
          })
          .select()
          .single();

        if (error) throw error;
        clientId = newClient.id;

        // Insert commercial profile
        const { error: commError } = await supabase
          .from("client_commercial_profile")
          .insert({
            client_id: clientId,
            ...commercialForm
          });

        if (commError) throw commError;

        // Create portal access / invitation if enabled
        if (portalForm.criar_acesso_cliente && portalForm.gestor_cliente_email) {
          const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
          const { error: inviteErr } = await supabase
            .from("invitations")
            .insert({
              email: portalForm.gestor_cliente_email,
              token_hash: token,
              type: "client_gestor",
              client_id: clientId,
              invited_by: user?.id,
              expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
            });

          if (inviteErr) throw inviteErr;

          // Create mock invitation link alert
          toast.info(`Convite de acesso criado! Link seguro: /auth?invite=${token}`);
        }

        // Log audit
        await supabase.from("audit_logs").insert({
          actor_user_id: user?.id,
          actor_email: user?.email,
          action: "client.created",
          target_type: "client",
          target_id: clientId,
          after_json: { ...clientForm, ...commercialForm } as any
        });

        toast.success("Cliente cadastrado com sucesso.");
      }

      setIsEditing(false);
      loadClients();
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao salvar cliente: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Deseja realmente arquivar/deletar este cliente e todo o seu perfil comercial?")) return;

    try {
      setLoading(true);
      const { error } = await supabase.from("clients").delete().eq("id", id);
      if (error) throw error;

      // Log audit
      await supabase.from("audit_logs").insert({
        actor_user_id: user?.id,
        actor_email: user?.email,
        action: "client.deleted",
        target_type: "client",
        target_id: id
      });

      toast.success("Cliente arquivado com sucesso.");
      loadClients();
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao deletar cliente: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.razao_social.toLowerCase().includes(search.toLowerCase()) ||
      c.cnpj.includes(search) ||
      (c.nome_fantasia && c.nome_fantasia.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Controle de Clientes"
        subtitle="Gerenciamento da carteira de clientes, acessos ao portal e parametrização comercial."
      />

      {isEditing ? (
        <Card className="glass p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div className="flex items-center gap-3">
              <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h3 className="font-semibold text-lg">{selectedClient ? "Editar Cliente" : "Cadastrar Novo Cliente"}</h3>
                <p className="text-xs text-muted-foreground">Preencha as informações comerciais e de acesso.</p>
              </div>
            </div>
            <Button onClick={handleSave}>Salvar Cliente</Button>
          </div>

          {/* Form Tabs */}
          <div className="flex border-b border-border/50 gap-4">
            <button
              onClick={() => setCurrentTab("cadastral")}
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
                currentTab === "cadastral"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>1. Dados Cadastrais</span>
            </button>
            <button
              onClick={() => setCurrentTab("comercial")}
              className={`pb-2 px-1 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
                currentTab === "comercial"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>2. Dados Comerciais</span>
            </button>
            {!selectedClient && (
              <button
                onClick={() => setCurrentTab("portal")}
                className={`pb-2 px-1 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
                  currentTab === "portal"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>3. Portal e Treinamento</span>
              </button>
            )}
          </div>

          {/* Form Content */}
          <div className="space-y-4">
            {currentTab === "cadastral" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Razão Social *</Label>
                  <Input value={clientForm.razao_social} onChange={(e) => setClientForm({ ...clientForm, razao_social: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Nome Fantasia</Label>
                  <Input value={clientForm.nome_fantasia} onChange={(e) => setClientForm({ ...clientForm, nome_fantasia: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ *</Label>
                  <Input placeholder="Apenas números" value={clientForm.cnpj} onChange={(e) => setClientForm({ ...clientForm, cnpj: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Telefone Principal *</Label>
                  <Input value={clientForm.telefone} onChange={(e) => setClientForm({ ...clientForm, telefone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp</Label>
                  <Input value={clientForm.whatsapp} onChange={(e) => setClientForm({ ...clientForm, whatsapp: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Email Principal *</Label>
                  <Input type="email" value={clientForm.email_principal} onChange={(e) => setClientForm({ ...clientForm, email_principal: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Email Financeiro</Label>
                  <Input type="email" value={clientForm.email_financeiro} onChange={(e) => setClientForm({ ...clientForm, email_financeiro: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Email Técnico</Label>
                  <Input type="email" value={clientForm.email_tecnico} onChange={(e) => setClientForm({ ...clientForm, email_tecnico: e.target.value })} />
                </div>
                <div className="md:col-span-2 grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label>CEP *</Label>
                    <Input value={clientForm.cep} onChange={(e) => setClientForm({ ...clientForm, cep: e.target.value })} />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Endereço *</Label>
                    <Input value={clientForm.endereco} onChange={(e) => setClientForm({ ...clientForm, endereco: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label>Número *</Label>
                    <Input value={clientForm.numero} onChange={(e) => setClientForm({ ...clientForm, numero: e.target.value })} />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Complemento</Label>
                    <Input value={clientForm.complemento} onChange={(e) => setClientForm({ ...clientForm, complemento: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label>Bairro *</Label>
                    <Input value={clientForm.bairro} onChange={(e) => setClientForm({ ...clientForm, bairro: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Cidade *</Label>
                    <Input value={clientForm.cidade} onChange={(e) => setClientForm({ ...clientForm, cidade: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Estado *</Label>
                    <Input value={clientForm.estado} onChange={(e) => setClientForm({ ...clientForm, estado: e.target.value })} />
                  </div>
                </div>
                <div className="md:col-span-2 border-t border-border/30 pt-4 mt-2">
                  <h4 className="font-medium text-sm mb-3 text-muted-foreground">Representação Legal (Opcional)</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nome do Representante</Label>
                      <Input value={clientForm.representante_nome} onChange={(e) => setClientForm({ ...clientForm, representante_nome: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>CPF do Representante</Label>
                      <Input value={clientForm.representante_cpf} onChange={(e) => setClientForm({ ...clientForm, representante_cpf: e.target.value })} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentTab === "comercial" && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Plano Contratado *</Label>
                  <Select value={commercialForm.plano_contratado} onValueChange={(v) => setCommercialForm({ ...commercialForm, plano_contratado: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PLAN_OPTIONS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quantidade de Funcionários *</Label>
                  <Input type="number" value={commercialForm.qtd_funcionarios} onChange={(e) => setCommercialForm({ ...commercialForm, qtd_funcionarios: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Quantidade de CNPJs Atendidos *</Label>
                  <Input type="number" value={commercialForm.qtd_cnpjs_atendidos} onChange={(e) => setCommercialForm({ ...commercialForm, qtd_cnpjs_atendidos: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Quantidade de Unidades</Label>
                  <Input type="number" value={commercialForm.qtd_unidades} onChange={(e) => setCommercialForm({ ...commercialForm, qtd_unidades: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Valor Anual *</Label>
                  <Input type="number" value={commercialForm.valor_anual} onChange={(e) => setCommercialForm({ ...commercialForm, valor_anual: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Forma de Pagamento *</Label>
                  <Select value={commercialForm.forma_pagamento} onValueChange={(v) => setCommercialForm({ ...commercialForm, forma_pagamento: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vista">Anual à Vista</SelectItem>
                      <SelectItem value="parcelado">Parcelado</SelectItem>
                      <SelectItem value="especial">Condição Especial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4 md:col-span-2 border-t border-border/30 pt-4 mt-2">
                  <h4 className="font-medium text-sm text-muted-foreground mb-3">Recursos inclusos no escopo</h4>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Switch checked={commercialForm.possui_reconhecimento_facial} onCheckedChange={(c) => setCommercialForm({ ...commercialForm, possui_reconhecimento_facial: c })} />
                      <Label className="cursor-pointer">Reconhecimento Facial</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={commercialForm.possui_rep} onCheckedChange={(c) => setCommercialForm({ ...commercialForm, possui_rep: c })} />
                      <Label className="cursor-pointer">Equipamento REP</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={commercialForm.possui_app} onCheckedChange={(c) => setCommercialForm({ ...commercialForm, possui_app: c })} />
                      <Label className="cursor-pointer">Aplicativo de Ponto</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Módulos Adicionais</Label>
                  <Input value={commercialForm.modulos_adicionais ?? ""} onChange={(e) => setCommercialForm({ ...commercialForm, modulos_adicionais: e.target.value })} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Observações Comerciais</Label>
                  <textarea className="w-full min-h-[80px] bg-background border border-input rounded-md px-3 py-2 text-sm" value={commercialForm.observacoes_comerciais ?? ""} onChange={(e) => setCommercialForm({ ...commercialForm, observacoes_comerciais: e.target.value })} />
                </div>
              </div>
            )}

            {currentTab === "portal" && !selectedClient && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Switch checked={portalForm.criar_acesso_cliente} onCheckedChange={(c) => setPortalForm({ ...portalForm, criar_acesso_cliente: c })} />
                    <Label className="cursor-pointer">Criar acesso do cliente imediatamente?</Label>
                  </div>

                  {portalForm.criar_acesso_cliente && (
                    <div className="grid md:grid-cols-2 gap-4 border-l-2 border-primary/30 pl-4 py-2 space-y-2">
                      <div className="space-y-2">
                        <Label>Nome do Gestor do Cliente *</Label>
                        <Input value={portalForm.gestor_cliente_nome} onChange={(e) => setPortalForm({ ...portalForm, gestor_cliente_nome: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Email do Gestor do Cliente *</Label>
                        <Input type="email" value={portalForm.gestor_cliente_email} onChange={(e) => setPortalForm({ ...portalForm, gestor_cliente_email: e.target.value })} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 border-t border-border/30 pt-4">
                  <div className="flex items-center gap-2">
                    <Switch checked={portalForm.liberar_treinamento} onCheckedChange={(c) => setPortalForm({ ...portalForm, liberar_treinamento: c })} />
                    <Label className="cursor-pointer">Liberar acesso ao Treinamento Secullum?</Label>
                  </div>

                  {portalForm.liberar_treinamento && (
                    <div className="grid md:grid-cols-2 gap-4 border-l-2 border-indigo-500/30 pl-4 py-2">
                      <div className="space-y-2">
                        <Label>Trilha Liberada</Label>
                        <Select value={portalForm.trilha_liberada} onValueChange={(v) => setPortalForm({ ...portalForm, trilha_liberada: v })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="secullum_ultimate">Secullum Ponto Web Ultimate</SelectItem>
                            <SelectItem value="secullum_basic">Secullum Ponto Web Básico</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Limite de Alunos</Label>
                        <Input type="number" value={portalForm.limite_alunos} onChange={(e) => setPortalForm({ ...portalForm, limite_alunos: Number(e.target.value) })} />
                      </div>
                      <div className="flex items-center gap-2 md:col-span-2">
                        <Switch checked={portalForm.certificado_habilitado} onCheckedChange={(c) => setPortalForm({ ...portalForm, certificado_habilitado: c })} />
                        <Label className="cursor-pointer">Emitir Certificado ao concluir?</Label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Buscar por Razão Social ou CNPJ..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Button onClick={handleCreateNew} className="shrink-0 w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </div>

          <Card className="glass overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/30 border-b border-border/50 text-muted-foreground">
                <tr>
                  <th className="p-4 font-semibold">Razão Social</th>
                  <th className="p-4 font-semibold">CNPJ</th>
                  <th className="p-4 font-semibold">Responsável</th>
                  <th className="p-4 font-semibold">Telefone</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredClients.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-4 font-medium max-w-[200px] truncate">{c.razao_social}</td>
                    <td className="p-4 font-mono text-xs">{c.cnpj}</td>
                    <td className="p-4">{c.representante_nome || c.email_principal}</td>
                    <td className="p-4">{c.telefone}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                        c.status === "ativo" ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(c)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(c.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredClients.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      Nenhum cliente cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ClientesMaster;
