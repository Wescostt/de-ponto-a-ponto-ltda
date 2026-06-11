// ─────────────────────────────────────────────────────────────────────────────
// TIPOS — De Ponto a Ponto — Módulo de Treinamentos
// ─────────────────────────────────────────────────────────────────────────────

export type TrainingStatus =
  | "draft"
  | "in_progress"
  | "published"
  | "review"
  | "archived";

export type TrainingLevel = "basic" | "intermediate" | "advanced";

export type TrainingAudience =
  | "client"
  | "hr"
  | "employee"
  | "support"
  | "sales"
  | "technical"
  | "admin";

export type TrainingCategory =
  | "onboarding"
  | "hr_training"
  | "employee_training"
  | "technical_support"
  | "sales"
  | "implementation"
  | "secullum_system"
  | "facial_tablet"
  | "rep_portaria"
  | "internal_procedures";

export type TrainingResource = {
  type: "image" | "video" | "link" | "pdf" | "document";
  title: string;
  url: string;
  description?: string;
};

export type TrainingStep = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  resources?: TrainingResource[];
  importantNote?: string;
};

export type TrainingModule = {
  id: string;
  title: string;
  description: string;
  steps: TrainingStep[];
  checklist?: string[];
};

export type Training = {
  id: string;
  title: string;
  description: string;
  category: TrainingCategory;
  audience: TrainingAudience[];
  status: TrainingStatus;
  level: TrainingLevel;
  estimatedTime: string;
  objective: string;
  prerequisites?: string[];
  modules: TrainingModule[];
  resources?: TrainingResource[];
  createdAt?: string;
  updatedAt?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// LABELS PARA EXIBIÇÃO
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORY_LABELS: Record<TrainingCategory, string> = {
  onboarding: "Onboarding de Clientes",
  hr_training: "Treinamento de RH",
  employee_training: "Treinamento de Colaboradores",
  technical_support: "Suporte Técnico",
  sales: "Comercial",
  implementation: "Implantação",
  secullum_system: "Sistema Secullum",
  facial_tablet: "Tablet Facial",
  rep_portaria: "REP / Portaria 671",
  internal_procedures: "Procedimentos Internos",
};

export const AUDIENCE_LABELS: Record<TrainingAudience, string> = {
  client: "Cliente",
  hr: "RH",
  employee: "Colaborador",
  support: "Suporte",
  sales: "Comercial",
  technical: "Técnico",
  admin: "Administrativo",
};

export const STATUS_LABELS: Record<TrainingStatus, string> = {
  draft: "Rascunho",
  in_progress: "Em Desenvolvimento",
  published: "Publicado",
  review: "Revisar",
  archived: "Arquivado",
};

export const LEVEL_LABELS: Record<TrainingLevel, string> = {
  basic: "Básico",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

// ─────────────────────────────────────────────────────────────────────────────
// DADOS MOCKADOS
// ─────────────────────────────────────────────────────────────────────────────

export const MOCK_TRAININGS: Training[] = [
  {
    id: "training-001",
    title: "Manual Base de Treinamentos — De Ponto a Ponto",
    description:
      "Modelo padrão para criação, organização e aplicação de todos os treinamentos da empresa. Serve como referência para novos treinamentos.",
    category: "internal_procedures",
    audience: ["admin", "support", "technical", "sales"],
    status: "published",
    level: "basic",
    estimatedTime: "30 min",
    objective:
      "Padronizar a criação e aplicação de treinamentos, garantindo clareza, organização e qualidade em todos os processos internos e com clientes.",
    prerequisites: ["Acesso ao sistema administrativo"],
    createdAt: "2025-01-01",
    updatedAt: "2025-05-01",
    resources: [
      {
        type: "link",
        title: "Portaria MTP nº 671/2021",
        url: "https://www.gov.br/trabalho-e-emprego/pt-br",
        description: "Referência legal sobre controle de jornada.",
      },
    ],
    modules: [
      {
        id: "m1",
        title: "Módulo 1 — Apresentação e Objetivo",
        description:
          "Introdução ao modelo padrão de treinamentos da De Ponto a Ponto.",
        steps: [
          {
            id: "s1",
            title: "Apresentação",
            description:
              "Este manual tem como objetivo padronizar a criação, organização e aplicação dos treinamentos da De Ponto a Ponto. Ele serve como guia para treinamentos de clientes, RHs, colaboradores, equipe técnica, suporte e comercial.",
          },
          {
            id: "s2",
            title: "Objetivo",
            description:
              "Garantir que cada treinamento seja claro, organizado, prático e fácil de acompanhar, reduzindo dúvidas, melhorando a experiência do cliente e fortalecendo a qualidade do atendimento da empresa.",
          },
          {
            id: "s3",
            title: "Público-alvo",
            description:
              "Este modelo pode ser usado para treinamentos destinados a clientes, profissionais de RH, colaboradores, técnicos de implantação, equipe de suporte, equipe comercial e demais envolvidos nos processos da empresa.",
          },
        ],
        checklist: [
          "Objetivo do treinamento definido",
          "Público-alvo identificado",
          "Pré-requisitos listados",
          "Materiais necessários separados",
        ],
      },
      {
        id: "m2",
        title: "Módulo 2 — Fluxo Recomendado",
        description: "Como estruturar e conduzir qualquer treinamento.",
        steps: [
          {
            id: "s4",
            title: "Fluxo padrão de aplicação",
            description:
              "Siga esta sequência para garantir qualidade e consistência em todos os treinamentos.",
            importantNote:
              "Nunca pule etapas. Cada passo garante que o cliente ou colaborador absorva o conteúdo corretamente.",
          },
          {
            id: "s5",
            title: "Passo 1 — Apresentar o objetivo",
            description:
              "Inicie explicando o que será aprendido e qual problema o treinamento resolve.",
          },
          {
            id: "s6",
            title: "Passo 2 — Contextualizar",
            description:
              "Explique por que esse conhecimento é importante para o dia a dia da empresa ou do RH.",
          },
          {
            id: "s7",
            title: "Passo 3 — Demonstrar o passo a passo",
            description:
              "Mostre cada etapa com clareza, usando imagens ou vídeos sempre que possível.",
          },
          {
            id: "s8",
            title: "Passo 4 — Reforçar pontos de atenção",
            description:
              "Destaque os erros mais comuns e como evitá-los. Use alertas visuais quando necessário.",
          },
          {
            id: "s9",
            title: "Passo 5 — Aplicar checklist de validação",
            description:
              "Use o checklist ao final para confirmar que tudo foi compreendido e executado corretamente.",
          },
          {
            id: "s10",
            title: "Passo 6 — Confirmar dúvidas e encaminhar materiais",
            description:
              "Responda dúvidas, registre a conclusão e envie materiais complementares.",
          },
        ],
        checklist: [
          "Objetivo apresentado",
          "Contexto explicado",
          "Passo a passo demonstrado",
          "Pontos de atenção reforçados",
          "Checklist aplicado",
          "Dúvidas respondidas",
          "Materiais enviados",
          "Conclusão registrada",
        ],
      },
      {
        id: "m3",
        title: "Módulo 3 — Boas Práticas",
        description: "Diretrizes para criar treinamentos de alta qualidade.",
        steps: [
          {
            id: "s11",
            title: "Boas práticas de criação",
            description:
              "Use linguagem simples e direta. Divida o conteúdo em etapas curtas. Insira imagens sempre que possível. Evite blocos longos de texto. Destaque alertas importantes com cores ou ícones.",
          },
          {
            id: "s12",
            title: "Boas práticas de aplicação",
            description:
              "Separe instruções técnicas de orientações comerciais. Crie checklists ao final de cada módulo. Mantenha os materiais sempre atualizados. Registre o andamento de cada treinamento.",
            importantNote:
              "Treinamentos desatualizados geram dúvidas e retrabalho. Revise periodicamente.",
          },
        ],
        checklist: [
          "Linguagem simples e objetiva",
          "Conteúdo dividido em etapas",
          "Imagens ou vídeos incluídos",
          "Alertas destacados",
          "Checklist criado",
          "Material revisado e atualizado",
        ],
      },
      {
        id: "m4",
        title: "Módulo 4 — Erros Comuns e Soluções",
        description:
          "Principais erros ao criar ou aplicar treinamentos e como corrigi-los.",
        steps: [
          {
            id: "s13",
            title: "Erros mais frequentes",
            description:
              "1. Treinamento muito longo sem divisão em módulos. 2. Linguagem técnica demais para colaboradores. 3. Falta de imagens ou exemplos práticos. 4. Não aplicar checklist ao final. 5. Não registrar conclusão do treinamento.",
          },
          {
            id: "s14",
            title: "Como corrigir",
            description:
              "Divida conteúdo longo em módulos de no máximo 15-20 minutos. Adapte o vocabulário ao público. Sempre inclua print ou imagem de apoio. Aplique o checklist obrigatoriamente. Registre data e nome de quem concluiu.",
          },
        ],
        checklist: [
          "Duração de cada módulo revisada",
          "Linguagem adequada ao público",
          "Imagens e exemplos incluídos",
          "Checklist ao final de cada módulo",
          "Conclusão registrada",
        ],
      },
    ],
  },
  {
    id: "training-002",
    title: "Onboarding Inicial do Cliente",
    description:
      "Guia completo para recepção, coleta de dados, configuração inicial, treinamento e acompanhamento do cliente nos primeiros dias.",
    category: "onboarding",
    audience: ["client", "hr"],
    status: "published",
    level: "basic",
    estimatedTime: "2h",
    objective:
      "Garantir que o cliente inicie o uso do sistema de forma correta, organizada e com suporte adequado desde o primeiro dia.",
    prerequisites: ["Contrato assinado", "Dados da empresa coletados"],
    createdAt: "2025-01-15",
    updatedAt: "2025-04-20",
    modules: [
      {
        id: "m1",
        title: "Módulo 1 — Boas-vindas",
        description: "Apresentação da De Ponto a Ponto e do processo de implantação.",
        steps: [
          {
            id: "s1",
            title: "Apresentar a empresa",
            description:
              "Apresente a De Ponto a Ponto: mais de 30 anos de experiência, especialização em controle de ponto, suporte próximo e solução completa.",
          },
          {
            id: "s2",
            title: "Explicar o processo",
            description:
              "Explique as etapas que serão seguidas: coleta de dados, configuração, testes, treinamento e acompanhamento.",
          },
        ],
        checklist: [
          "Empresa apresentada",
          "Processo explicado",
          "Expectativas alinhadas",
          "Canais de suporte informados",
        ],
      },
      {
        id: "m2",
        title: "Módulo 2 — Coleta de Dados",
        description: "Levantamento de informações necessárias para a configuração.",
        steps: [
          {
            id: "s3",
            title: "Dados da empresa",
            description:
              "Coletar: razão social, CNPJ, endereço, responsável pelo RH, e-mail e WhatsApp para contato.",
          },
          {
            id: "s4",
            title: "Dados dos colaboradores",
            description:
              "Coletar lista de colaboradores com: nome completo, CPF, função, turno, horário e tipo de jornada.",
          },
          {
            id: "s5",
            title: "Regras de jornada",
            description:
              "Levantar: horários de trabalho, intervalos, banco de horas, horas extras, feriados e regras específicas da empresa.",
            importantNote:
              "Regras mal configuradas geram erros no fechamento. Valide todas as jornadas antes de finalizar.",
          },
        ],
        checklist: [
          "Dados da empresa coletados",
          "Lista de colaboradores recebida",
          "Jornadas e turnos levantados",
          "Regras de banco de horas definidas",
          "Feriados informados",
        ],
      },
      {
        id: "m3",
        title: "Módulo 3 — Configuração do Sistema",
        description: "Parametrização inicial do sistema Secullum Web Ultimate.",
        steps: [
          {
            id: "s6",
            title: "Acessar o sistema",
            description:
              "Acessar o Secullum Web Ultimate com as credenciais da empresa e verificar se o ambiente está correto.",
          },
          {
            id: "s7",
            title: "Cadastrar empresa e colaboradores",
            description:
              "Inserir dados da empresa e cadastrar todos os colaboradores com suas respectivas jornadas.",
          },
          {
            id: "s8",
            title: "Configurar jornadas e regras",
            description:
              "Parametrizar horários, intervalos, banco de horas, horas extras e feriados conforme levantamento.",
          },
        ],
        checklist: [
          "Empresa cadastrada no sistema",
          "Colaboradores cadastrados",
          "Jornadas configuradas",
          "Banco de horas parametrizado",
          "Feriados inseridos",
          "Acessos configurados",
        ],
      },
    ],
  },
  {
    id: "training-003",
    title: "Treinamento de RH — Fechamento de Ponto",
    description:
      "Passo a passo para conferência de jornada, banco de horas, faltas, horas extras e fechamento mensal do ponto.",
    category: "hr_training",
    audience: ["hr"],
    status: "published",
    level: "intermediate",
    estimatedTime: "1h 30min",
    objective:
      "Capacitar o profissional de RH para fechar o ponto mensal com segurança, sem erros e com total domínio do sistema.",
    prerequisites: ["Acesso ao Secullum Web Ultimate", "Onboarding inicial concluído"],
    createdAt: "2025-02-01",
    updatedAt: "2025-04-15",
    modules: [
      {
        id: "m1",
        title: "Módulo 1 — Conferência de Jornada",
        description: "Como verificar os registros de ponto antes do fechamento.",
        steps: [
          {
            id: "s1",
            title: "Acessar relatório de jornada",
            description:
              "No Secullum Web Ultimate, acesse: Relatórios > Jornada de Trabalho. Selecione o período do fechamento.",
          },
          {
            id: "s2",
            title: "Identificar inconsistências",
            description:
              "Verifique marcações faltantes, sobreposições, jornadas sem fechamento e apontamentos incorretos.",
            importantNote:
              "Apontamentos em vermelho ou laranja indicam inconsistências que precisam ser tratadas antes do fechamento.",
          },
          {
            id: "s3",
            title: "Tratar inconsistências",
            description:
              "Para cada inconsistência: verificar o motivo, solicitar justificativa do colaborador se necessário, e corrigir via sistema com a devida parametrização.",
          },
        ],
        checklist: [
          "Relatório de jornada acessado",
          "Período correto selecionado",
          "Inconsistências identificadas",
          "Marcações faltantes verificadas",
          "Sobreposições corrigidas",
        ],
      },
      {
        id: "m2",
        title: "Módulo 2 — Banco de Horas e Horas Extras",
        description: "Como verificar e tratar banco de horas e horas extras.",
        steps: [
          {
            id: "s4",
            title: "Verificar saldo de banco de horas",
            description:
              "Acesse: Relatórios > Banco de Horas. Verifique o saldo de cada colaborador e identifique saldos negativos ou muito elevados.",
          },
          {
            id: "s5",
            title: "Conferir horas extras",
            description:
              "Acesse: Relatórios > Horas Extras. Confirme se as horas foram autorizadas e se estão parametrizadas corretamente.",
            importantNote:
              "Horas extras não autorizadas podem gerar passivo trabalhista. Sempre confirme a autorização antes do fechamento.",
          },
        ],
        checklist: [
          "Saldo de banco de horas conferido",
          "Horas extras verificadas",
          "Autorizações confirmadas",
          "Saldos negativos tratados",
        ],
      },
      {
        id: "m3",
        title: "Módulo 3 — Faltas e Feriados",
        description: "Como tratar faltas justificadas, injustificadas e feriados.",
        steps: [
          {
            id: "s6",
            title: "Identificar faltas",
            description:
              "Acesse: Relatórios > Faltas. Identifique faltas justificadas e injustificadas. Insira os documentos de justificativa quando necessário.",
          },
          {
            id: "s7",
            title: "Verificar feriados",
            description:
              "Confirme se os feriados do período estão cadastrados no sistema e se as regras de trabalho em feriado estão parametrizadas corretamente.",
            importantNote:
              "Feriados não cadastrados ou configurados errado afetam o cálculo de horas extras e banco de horas.",
          },
        ],
        checklist: [
          "Faltas identificadas e tratadas",
          "Justificativas registradas",
          "Feriados verificados no sistema",
          "Regras de feriado conferidas",
        ],
      },
      {
        id: "m4",
        title: "Módulo 4 — Fechamento Final",
        description: "Procedimento para fechar o ponto do período.",
        steps: [
          {
            id: "s8",
            title: "Revisar todos os dados",
            description:
              "Antes do fechamento final, revise todos os relatórios: jornada, banco de horas, horas extras, faltas e feriados.",
          },
          {
            id: "s9",
            title: "Executar o fechamento",
            description:
              "Acesse: Processos > Fechamento de Ponto. Selecione o período e confirme o fechamento.",
          },
          {
            id: "s10",
            title: "Exportar relatório final",
            description:
              "Após o fechamento, exporte o relatório final para envio ao departamento pessoal ou contabilidade.",
          },
        ],
        checklist: [
          "Todos os dados revisados",
          "Inconsistências corrigidas",
          "Fechamento executado",
          "Relatório final exportado",
          "Cópia armazenada para arquivo",
        ],
      },
    ],
  },
  {
    id: "training-004",
    title: "Procedimento Técnico — Tablet Facial",
    description:
      "Guia completo para instalação, configuração, testes e boas práticas do tablet com reconhecimento facial Secullum.",
    category: "facial_tablet",
    audience: ["technical", "support"],
    status: "published",
    level: "advanced",
    estimatedTime: "2h",
    objective:
      "Capacitar o técnico para instalar, configurar e validar o tablet de reconhecimento facial com qualidade e segurança.",
    prerequisites: [
      "Tablet Secullum em mãos",
      "Dados da empresa disponíveis",
      "Acesso ao sistema Secullum Web Ultimate",
    ],
    createdAt: "2025-02-15",
    updatedAt: "2025-05-01",
    modules: [
      {
        id: "m1",
        title: "Módulo 1 — Preparação",
        description: "O que verificar antes da instalação.",
        steps: [
          {
            id: "s1",
            title: "Verificar o equipamento",
            description:
              "Confirmar integridade física do tablet, carregador, suporte e acessórios. Verificar se o firmware está atualizado.",
          },
          {
            id: "s2",
            title: "Verificar o local de instalação",
            description:
              "Avaliar: iluminação do ambiente, altura adequada para reconhecimento facial, acesso à rede Wi-Fi, proximidade de tomada.",
            importantNote:
              "Iluminação insuficiente ou excessiva afeta diretamente a qualidade do reconhecimento facial.",
          },
          {
            id: "s3",
            title: "Verificar conectividade",
            description:
              "Testar sinal Wi-Fi no local de instalação. Confirmar que o tablet consegue se comunicar com o servidor Secullum.",
          },
        ],
        checklist: [
          "Equipamento verificado",
          "Local de instalação avaliado",
          "Iluminação adequada confirmada",
          "Sinal Wi-Fi testado",
          "Conectividade com servidor confirmada",
        ],
      },
      {
        id: "m2",
        title: "Módulo 2 — Instalação e Configuração",
        description: "Instalação física e configuração do sistema.",
        steps: [
          {
            id: "s4",
            title: "Instalar fisicamente",
            description:
              "Fixar o suporte na parede na altura correta (câmera na altura dos olhos dos colaboradores). Conectar o tablet ao suporte e à alimentação.",
          },
          {
            id: "s5",
            title: "Configurar o sistema",
            description:
              "Acessar as configurações do tablet, inserir os dados da empresa, configurar conexão com o servidor Secullum e testar comunicação.",
          },
          {
            id: "s6",
            title: "Cadastrar colaboradores para reconhecimento",
            description:
              "Realizar o cadastro biométrico facial dos colaboradores. Fotografar com boa iluminação, rosto centralizado e sem obstruções.",
            importantNote:
              "Fotos de baixa qualidade resultam em falhas de reconhecimento. Refaça o cadastro se a qualidade for insuficiente.",
          },
        ],
        checklist: [
          "Suporte instalado na altura correta",
          "Tablet conectado e ligado",
          "Sistema configurado",
          "Conexão com servidor testada",
          "Cadastro biométrico realizado",
          "Qualidade das fotos validada",
        ],
      },
      {
        id: "m3",
        title: "Módulo 3 — Testes e Validação",
        description: "Como validar o funcionamento correto do tablet.",
        steps: [
          {
            id: "s7",
            title: "Testar reconhecimento",
            description:
              "Solicitar que 3-5 colaboradores testem o reconhecimento facial. Verificar taxa de sucesso e tempo de resposta.",
          },
          {
            id: "s8",
            title: "Testar registro de ponto",
            description:
              "Confirmar que os registros aparecem corretamente no sistema Secullum Web após o reconhecimento facial.",
          },
          {
            id: "s9",
            title: "Ajustar nível de confiança",
            description:
              "Se houver falhas frequentes, ajustar o nível de confiança do reconhecimento nas configurações do sistema.",
          },
        ],
        checklist: [
          "Reconhecimento facial testado",
          "Registros aparecendo no sistema",
          "Tempo de resposta adequado",
          "Nível de confiança ajustado",
          "Todos os colaboradores validados",
        ],
      },
    ],
  },
  {
    id: "training-005",
    title: "Treinamento de Colaboradores",
    description:
      "Manual simples para o colaborador aprender a registrar ponto corretamente pelo tablet facial ou pelo aplicativo.",
    category: "employee_training",
    audience: ["employee"],
    status: "published",
    level: "basic",
    estimatedTime: "20 min",
    objective:
      "Ensinar o colaborador a registrar o ponto de forma correta, simples e sem dúvidas.",
    prerequisites: [],
    createdAt: "2025-03-01",
    updatedAt: "2025-04-10",
    modules: [
      {
        id: "m1",
        title: "Módulo 1 — Como Registrar o Ponto pelo Tablet",
        description: "Passo a passo para usar o tablet de reconhecimento facial.",
        steps: [
          {
            id: "s1",
            title: "Aproximar-se do tablet",
            description:
              "Posicione-se a aproximadamente 50 cm do tablet, de frente para a câmera, com o rosto centralizado na tela.",
          },
          {
            id: "s2",
            title: "Aguardar o reconhecimento",
            description:
              "O sistema irá reconhecer automaticamente o seu rosto. Não é necessário pressionar nenhum botão.",
          },
          {
            id: "s3",
            title: "Confirmar o registro",
            description:
              "Após o reconhecimento, o sistema exibirá seu nome e o horário do registro. Confirme que está correto.",
            importantNote:
              "Se o sistema não reconhecer, retire óculos escuros, bonés ou qualquer item que cubra o rosto e tente novamente.",
          },
        ],
        checklist: [
          "Posicionamento correto aprendido",
          "Reconhecimento facial funcionando",
          "Confirmação do registro entendida",
        ],
      },
      {
        id: "m2",
        title: "Módulo 2 — Dúvidas Frequentes",
        description: "Perguntas e respostas sobre o registro de ponto.",
        steps: [
          {
            id: "s4",
            title: "O que fazer se o sistema não reconhecer",
            description:
              "1. Verifique se há boa iluminação no local. 2. Retire óculos, boné ou máscara. 3. Centralize o rosto na câmera. 4. Se persistir, procure o RH.",
          },
          {
            id: "s5",
            title: "O que fazer se esquecer de bater o ponto",
            description:
              "Informe imediatamente ao responsável pelo RH. O ajuste deverá ser solicitado com justificativa.",
          },
          {
            id: "s6",
            title: "Posso bater o ponto pelo celular?",
            description:
              "Dependendo da configuração da sua empresa, pode ser possível pelo aplicativo Secullum. Confirme com o RH se essa opção está disponível para você.",
          },
        ],
        checklist: [
          "Procedimento em caso de falha aprendido",
          "Contato do RH anotado",
          "Dúvidas sobre o app esclarecidas",
        ],
      },
    ],
  },
  {
    id: "training-006",
    title: "Guia REP e Portaria 671",
    description:
      "Orientações sobre equipamentos REP, registros válidos, arquivos AFD e boas práticas relacionadas à Portaria MTP nº 671/2021.",
    category: "rep_portaria",
    audience: ["hr", "technical"],
    status: "published",
    level: "intermediate",
    estimatedTime: "1h",
    objective:
      "Orientar sobre as obrigações legais do REP e boas práticas para conformidade com a Portaria 671.",
    prerequisites: ["Conhecimento básico de controle de ponto"],
    createdAt: "2025-03-15",
    updatedAt: "2025-04-25",
    resources: [
      {
        type: "link",
        title: "Portaria MTP nº 671/2021 — Texto completo",
        url: "https://www.gov.br/trabalho-e-emprego/pt-br",
        description: "Acesse o texto oficial da portaria.",
      },
    ],
    modules: [
      {
        id: "m1",
        title: "Módulo 1 — O que é o REP",
        description: "Conceitos fundamentais sobre o Registrador Eletrônico de Ponto.",
        steps: [
          {
            id: "s1",
            title: "Definição de REP",
            description:
              "O REP (Registrador Eletrônico de Ponto) é o equipamento utilizado para registro eletrônico de jornada, conforme exigido pela Portaria MTP nº 671/2021.",
          },
          {
            id: "s2",
            title: "Tipos de REP",
            description:
              "REP-P: equipamento físico convencional. REP-A: alternativo (tablet, smartphone). REP-C: via sistema web/aplicativo com validação do empregador.",
          },
          {
            id: "s3",
            title: "CNPJ vinculado ao REP",
            description:
              "Atenção: o CNPJ registrado no REP não pode ser alterado por 5 anos. O equipamento fica vinculado ao CNPJ original, mesmo em casos de alteração societária.",
            importantNote:
              "Em caso de mudança de CNPJ, a empresa precisará adquirir novo equipamento. O AFD deve ser guardado por 5 anos.",
          },
        ],
        checklist: [
          "Conceito de REP compreendido",
          "Tipos de REP identificados",
          "Regra de CNPJ vinculado entendida",
        ],
      },
      {
        id: "m2",
        title: "Módulo 2 — Obrigações e Boas Práticas",
        description: "O que a empresa precisa cumprir para estar em conformidade.",
        steps: [
          {
            id: "s4",
            title: "Obrigações do empregador",
            description:
              "O empregador deve: manter o REP em funcionamento, garantir acesso ao registro para todos os colaboradores, guardar o AFD por no mínimo 5 anos, fornecer comprovante de registro ao colaborador.",
          },
          {
            id: "s5",
            title: "Arquivo AFD",
            description:
              "O AFD (Arquivo Fonte de Dados) contém todos os registros de ponto. Deve ser gerado mensalmente e guardado por 5 anos para fins de fiscalização.",
          },
          {
            id: "s6",
            title: "Boas práticas para conformidade",
            description:
              "Manter o equipamento atualizado, treinar os colaboradores, realizar backup do AFD mensalmente, verificar se o sistema emite comprovante válido e manter suporte técnico contratado.",
          },
        ],
        checklist: [
          "Obrigações do empregador conhecidas",
          "Procedimento de geração do AFD definido",
          "Backup mensal planejado",
          "Comprovante de registro validado",
          "Suporte técnico contratado",
        ],
      },
    ],
  },
  {
    id: "training-007",
    title: "Treinamento Secullum Ponto Web Ultimate — Operação Completa",
    description: "Curso completo em módulos e aulas práticas para capacitação no sistema Secullum Ponto Web Ultimate. Ideal para gestores de RH/DP e operadores.",
    category: "secullum_system",
    audience: ["hr", "admin", "client", "support"],
    status: "published",
    level: "intermediate",
    estimatedTime: "12h",
    objective: "Capacitar operadores e profissionais de RH/DP para gerenciar com total autonomia e conformidade o sistema Secullum Ponto Web Ultimate.",
    prerequisites: ["Acesso ao portal De Ponto a Ponto", "Ambiente Secullum Web ativo"],
    resources: [
      {
        type: "link",
        title: "Blog da Secullum",
        url: "https://blog.secullum.com.br/",
        description: "Blog oficial com novidades e dicas de ponto."
      },
      {
        type: "link",
        title: "Legislação — Portaria MTP nº 671/2021",
        url: "https://www.gov.br/trabalho-e-emprego/pt-br",
        description: "Portaria compilada oficial sobre controle eletrônico de jornada."
      }
    ],
    modules: [
      {
        id: "t7m1",
        title: "Módulo 01 — Boas-vindas e preparação",
        description: "Introdução à trilha de aprendizagem, acessos e suporte.",
        steps: [
          {
            id: "t7s1",
            title: "Apresentação e proposta do curso",
            description: "Entenda a proposta deste treinamento: autonomia, segurança operacional e organização. Cursos práticos projetados pela De Ponto a Ponto Ltda."
          },
          {
            id: "t7s2",
            title: "Acesso à área do aluno e navegação",
            description: "Como navegar no dashboard, acompanhar o progresso e baixar os materiais de apoio."
          },
          {
            id: "t7s3",
            title: "Como estudar com o sistema aberto",
            description: "Utilize uma aba separada com o Secullum Ponto Web logado para realizar os exercícios práticos propostos."
          },
          {
            id: "t7s4",
            title: "Responsabilidades do usuário treinado",
            description: "Compromisso em aprender de forma técnica e consultiva. O certificado não substitui validações jurídicas ou contábeis."
          },
          {
            id: "t7s5",
            title: "Onde buscar ajuda e canais de suporte",
            description: "Como acionar o suporte da De Ponto a Ponto pelo WhatsApp (21) 9649-7367 ou e-mail depontosuporte@gmail.com."
          }
        ],
        checklist: [
          "Acessei a área de treinamento",
          "Entendi como funciona o progresso da trilha",
          "Entendi que preciso praticar com o sistema aberto",
          "Sei onde baixar materiais de apoio",
          "Sei quando acionar o suporte da De Ponto a Ponto"
        ]
      },
      {
        id: "t7m2",
        title: "Módulo 02 — Controle de jornada, CLT e Portaria 671",
        description: "Fundamentos legais do ponto eletrônico e conformidade.",
        steps: [
          {
            id: "t7s6",
            title: "Por que controlar jornada",
            description: "O controle de ponto como rotina estratégica de RH/DP para redução de inconsistências e segurança."
          },
          {
            id: "t7s7",
            title: "Conceitos básicos de ponto eletrônico",
            description: "Entenda o fluxo operacional do ponto eletrônico no dia a dia."
          },
          {
            id: "t7s8",
            title: "CLT aplicada ao controle de ponto",
            description: "Duração de jornada, banco de horas e limites. Recomenda-se validar regras com seu contador ou jurídico."
          },
          {
            id: "t7s9",
            title: "Portaria MTP 671 na prática",
            description: "As regras do MTE sobre registro eletrônico e Programa de Tratamento de Registro de Ponto."
          },
          {
            id: "t7s10",
            title: "REP-C, REP-A, REP-P, AFD, AEJ e espelho",
            description: "Diferenças conceituais entre modelos de registrador e os arquivos de fiscalização (AFD/AEJ)."
          },
          {
            id: "t7s11",
            title: "Boas práticas e limites trabalhistas",
            description: "Aviso: Este treinamento é operacional. Regras internas, banco de horas, escalas e convenções exigem validação jurídica."
          }
        ],
        checklist: [
          "Entendi que o controle de ponto ajuda a organizar jornada",
          "Entendi que regras legais devem ser validadas com contador/jurídico",
          "Compreendi a diferença conceitual entre REP-C, REP-A e REP-P",
          "Sei que AFD e AEJ têm funções diferentes",
          "Entendi que o sistema apoia a operação, mas não substitui política interna"
        ]
      },
      {
        id: "t7m3",
        title: "Módulo 03 — Visão geral do sistema",
        description: "Apresentação dos fluxos e menus operacionais.",
        steps: [
          {
            id: "t7s12",
            title: "Principais áreas do Secullum Ponto Web",
            description: "Navegação pelos menus: Cadastros, Horários, Funcionários, Cálculos, Relatórios e Manutenções."
          },
          {
            id: "t7s13",
            title: "Perfis, permissões e responsabilidades",
            description: "Como as telas e relatórios mudam de acordo com o nível de acesso do usuário."
          },
          {
            id: "t7s14",
            title: "Fluxo operacional completo",
            description: "A lógica de uso do sistema: cadastros -> marcações -> tratamento -> relatórios -> fechamento."
          },
          {
            id: "t7s15",
            title: "Rotina diária, semanal e mensal",
            description: "Divisão do tempo do RH/DP para manter o ponto organizado e sem gargalos de fechamento."
          },
          {
            id: "t7s16",
            title: "Como evitar erros comuns no início",
            description: "Antes de alterar qualquer configuração sensível de cálculo, consulte o suporte técnico."
          }
        ],
        checklist: [
          "Identifiquei os menus principais",
          "Entendi o fluxo de cadastros até fechamento",
          "Sei que permissões impactam o que aparece na tela",
          "Entendi que menus podem variar por licença/configuração"
        ]
      },
      {
        id: "t7m4",
        title: "Módulo 04 — Cadastros essenciais",
        description: "Parametrização inicial e proteção de dados.",
        steps: [
          {
            id: "t7s17",
            title: "Empresas e filiais",
            description: "Como cadastrar e conferir os dados da empresa e seu CNPJ."
          },
          {
            id: "t7s18",
            title: "Departamentos e cargos",
            description: "Estruturação interna da empresa para organização dos relatórios."
          },
          {
            id: "t7s19",
            title: "Funcionários",
            description: "Cadastro completo com data de admissão, turnos e dados obrigatórios."
          },
          {
            id: "t7s20",
            title: "Dados obrigatórios e LGPD",
            description: "Cuidados com dados pessoais sensíveis e restrição de acessos apenas a responsáveis."
          },
          {
            id: "t7s21",
            title: "Usuários e permissões",
            description: "Como criar novos perfis de acesso no Secullum Ponto Web."
          },
          {
            id: "t7s22",
            title: "Conferência inicial de cadastros",
            description: "Revisar todos os funcionários ativos para evitar inconsistências no primeiro cálculo."
          }
        ],
        checklist: [
          "Conferi dados da empresa e CNPJ",
          "Conferi departamentos e cargos",
          "Conferi funcionários ativos e turnos",
          "Conferi CPF e PIS dos colaboradores",
          "Conferi horário ou escala vinculada",
          "Conferi permissões de acesso",
          "Garanti que dados sensíveis estão protegidos conforme LGPD"
        ]
      },
      {
        id: "t7m5",
        title: "Módulo 05 — Horários, escalas, feriados e jornadas",
        description: "Configuração de jornada e escalas cíclicas.",
        steps: [
          {
            id: "t7s23",
            title: "Horários semanais",
            description: "Configuração de horários padrão de segunda a sexta/sábado."
          },
          {
            id: "t7s24",
            title: "Escalas mensais e data base",
            description: "Configuração de escalas que variam ao longo do mês."
          },
          {
            id: "t7s25",
            title: "Escalas cíclicas",
            description: "Como parametrizar escalas de revezamento contínuo (5x1, 12x36, 24x48)."
          },
          {
            id: "t7s26",
            title: "Jornada com virada de dia",
            description: "Configurações para trabalhadores noturnos que ultrapassam a meia-noite."
          },
          {
            id: "t7s27",
            title: "Fechamento em jornadas longas",
            description: "Alocação correta de batidas e limite de alocação no dia."
          },
          {
            id: "t7s28",
            title: "Feriados e ponto facultativo",
            description: "Inserção de calendário de feriados no sistema para evitar erros de faltas."
          },
          {
            id: "t7s29",
            title: "Trabalho em feriados e folgas",
            description: "Parametrização para cálculo de adicional 100% ou banco de horas."
          },
          {
            id: "t7s30",
            title: "Escala 6x1 e temas em debate",
            description: "Explique de forma neutra que mudanças legislativas dependem de lei aprovada. Prepare as escalas no sistema."
          }
        ],
        checklist: [
          "Entendi a diferença entre horário semanal, mensal e cíclico",
          "Conferi data base e ciclos das escalas",
          "Validei feriados do período",
          "Parametrizar jornada que passa da meia-noite",
          "Entendi que mudanças sobre escala 6x1 dependem de lei vigente aprovada"
        ]
      },
      {
        id: "t7m6",
        title: "Módulo 06 — Marcações de ponto e origem das batidas",
        description: "Conferência de marcações e integridade de registros.",
        steps: [
          {
            id: "t7s31",
            title: "Origem das marcações",
            description: "Entenda de qual dispositivo (REP, app, tablet) veio cada registro de ponto."
          },
          {
            id: "t7s32",
            title: "Importação de batidas",
            description: "Importação manual de arquivos AFD/AEJ quando necessário."
          },
          {
            id: "t7s33",
            title: "Marcações ímpares",
            description: "Identificar batidas que não têm par (faltou entrada ou saída) para correção."
          },
          {
            id: "t7s34",
            title: "Batidas duplicadas",
            description: "Como o sistema trata dois registros no mesmo minuto."
          },
          {
            id: "t7s35",
            title: "Marcações esquecidas",
            description: "Procedimento correto de inclusão justificada sem mascarar a jornada real."
          },
          {
            id: "t7s36",
            title: "Ajustes e justificativas",
            description: "Importância de registrar o motivo do ajuste manual para fins de fiscalização."
          },
          {
            id: "t7s37",
            title: "Relatório de origem das marcações",
            description: "Emissão de relatórios para fins de auditoria de localização e dispositivo."
          }
        ],
        checklist: [
          "Consultei origem das marcações",
          "Identifiquei marcações ímpares",
          "Identifiquei ausência de marcações",
          "Registrei justificativas claras nos ajustes manuais",
          "Entendi que não se deve manipular ponto indevidamente"
        ]
      },
      {
        id: "t7m7",
        title: "Módulo 07 — Reconhecimento facial, tablet e aplicativo",
        description: "Boas práticas de biometria facial e LGPD.",
        steps: [
          {
            id: "t7s38",
            title: "Como orientar colaborador no cadastro",
            description: "Cadastro biométrico facial: câmera limpa, boa iluminação, rosto centralizado e sem acessórios."
          },
          {
            id: "t7s39",
            title: "Boas práticas de posicionamento",
            description: "Posicione o tablet na altura dos olhos e a aproximadamente 50 cm de distância."
          },
          {
            id: "t7s40",
            title: "Iluminação, câmera e ambiente",
            description: "Evite luz forte atrás do colaborador (silhueta) e sombras fortes no rosto."
          },
          {
            id: "t7s41",
            title: "Limiar facial",
            description: "Explicação: limiar baixo pode reconhecer colega errado; limiar alto gera muitas recusas. Use nível equilibrado."
          },
          {
            id: "t7s42",
            title: "Falhas recorrentes e recadastro",
            description: "Se o sistema falhar com frequência, refaça o cadastro facial daquele colaborador."
          },
          {
            id: "t7s43",
            title: "Conferência do nome reconhecido",
            description: "Orientar o funcionário a sempre confirmar se o nome que apareceu na tela é o dele."
          },
          {
            id: "t7s44",
            title: "Cuidados com LGPD",
            description: "Preservação dos dados biométricos e uso exclusivo para controle de jornada."
          }
        ],
        checklist: [
          "Conferi iluminação frontal e lente da câmera",
          "Tablet instalado na altura correta",
          "Evitei óculos escuros e bonés no cadastro",
          "Testei cadastro facial após salvar",
          "Nome reconhecido conferido pelo colaborador",
          "Entendi que o limiar não deve ser alterado sem suporte técnico"
        ]
      },
      {
        id: "t7m8",
        title: "Módulo 08 — Tratamento do ponto e justificativas",
        description: "Apuração e correção de inconsistências no cartão.",
        steps: [
          {
            id: "t7s45",
            title: "Tela de cálculos e cartões",
            description: "Conferência da jornada realizada comparada com a planejada na tela de cálculos."
          },
          {
            id: "t7s46",
            title: "Abonos e justificativas",
            description: "Como abonar faltas e atrasos utilizando justificativas padronizadas."
          },
          {
            id: "t7s47",
            title: "Faltas e atrasos",
            description: "Conferência da ocorrência de atrasos e faltas no relatório."
          },
          {
            id: "t7s48",
            title: "Horas extras",
            description: "Apuração de horas excedentes e regras de tolerância (CLT Art. 58)."
          },
          {
            id: "t7s49",
            title: "Ajustes manuais e rastreabilidade",
            description: "O sistema registra quem alterou cada marcação. Mantenha justificativa coerente."
          },
          {
            id: "t7s50",
            title: "Padrão de justificativas",
            description: "Como usar termos claros e anexar atestados no sistema."
          },
          {
            id: "t7s51",
            title: "Revisão antes do fechamento",
            description: "Checklist diário e semanal para evitar acúmulo de inconsistências no fim do mês."
          }
        ],
        checklist: [
          "Conferi pendências e marcações em vermelho",
          "Conferi marcações faltantes",
          "Apliquei justificativas autorizadas",
          "Evitei qualquer ajuste sem respaldo",
          "Revisei impacto em banco de horas e extras antes de salvar"
        ]
      },
      {
        id: "t7m9",
        title: "Módulo 09 — Banco de horas e saldos",
        description: "Apuração de saldo acumulado de banco de horas.",
        steps: [
          {
            id: "t7s52",
            title: "Conceito de banco de horas",
            description: "Diferença entre tolerância (cálculo diário) e banco de horas (destino das horas)."
          },
          {
            id: "t7s53",
            title: "Créditos e débitos",
            description: "Como o sistema apura o saldo do dia com base na tolerância."
          },
          {
            id: "t7s54",
            title: "BCred, BDeb, BTotal e BSaldo",
            description: "Definições: BCred (créditos), BDeb (débitos), BTotal (período), BSaldo (saldo geral)."
          },
          {
            id: "t7s55",
            title: "Configurações de banco",
            description: "Configuração do período de vigência e regras de compensação."
          },
          {
            id: "t7s56",
            title: "Extrato de banco de horas",
            description: "Relatório detalhado para acompanhar o saldo acumulado."
          },
          {
            id: "t7s57",
            title: "Zeramento ou fechamento de período",
            description: "Como zerar o saldo ou pagar em folha no sistema."
          },
          {
            id: "t7s58",
            title: "Exercícios práticos de leitura de saldo",
            description: "Pratique a leitura: se o saldo é BSaldo 12:40, este é o saldo acumulado real do banco."
          }
        ],
        checklist: [
          "Entendi BCred (créditos)",
          "Entendi BDeb (débitos)",
          "Entendi BTotal (período)",
          "Entendi BSaldo (saldo geral)",
          "Sei que BSaldo é a referência principal do saldo acumulado",
          "Conferi extrato de banco antes do fechamento",
          "Entendi que regras de banco devem ser validadas com contador/jurídico"
        ]
      },
      {
        id: "t7m10",
        title: "Módulo 10 — Relatórios, indicadores e conferência",
        description: "Geração de relatórios gerenciais e operacionais.",
        steps: [
          {
            id: "t7s59",
            title: "Espelho de ponto",
            description: "Emissão e conferência do cartão espelho de ponto de cada funcionário."
          },
          {
            id: "t7s60",
            title: "Relatórios de cálculos",
            description: "Exportação de horas trabalhadas, faltas e atrasos."
          },
          {
            id: "t7s61",
            title: "Relatórios de banco de horas",
            description: "Exportação do extrato acumulado do banco."
          },
          {
            id: "t7s62",
            title: "Origem das marcações",
            description: "Relatório de conformidade que mostra de onde veio cada marcação."
          },
          {
            id: "t7s63",
            title: "Indicadores de extras",
            description: "Como analisar absenteísmo, rotatividade e horas extras por departamento."
          },
          {
            id: "t7s64",
            title: "Relatórios gerenciais",
            description: "Envio de relatórios formatados para tomada de decisão pela gerência."
          },
          {
            id: "t7s65",
            title: "Exportação e conferência final",
            description: "Como exportar arquivos de integração com sistema de folha de pagamento."
          }
        ],
        checklist: [
          "Emiti relatório de conferência de jornada",
          "Conferi banco de horas e extras",
          "Conferi origem das marcações",
          "Salvei evidências em PDF conforme política interna",
          "Identifiquei relatórios a enviar para o DP"
        ]
      },
      {
        id: "t7m11",
        title: "Módulo 11 — Fechamento mensal",
        description: "Rotina operacional padronizada para encerramento do período.",
        steps: [
          {
            id: "t7s66",
            title: "Preparação do fechamento",
            description: "Definição do período correto e verificação de funcionários ativos."
          },
          {
            id: "t7s67",
            title: "Conferência de cadastros",
            description: "Revisar admissões, demissões e alterações cadastrais do período."
          },
          {
            id: "t7s68",
            title: "Conferência de escalas e feriados",
            description: "Garantir que feriados e folgas foram cadastrados antes de calcular."
          },
          {
            id: "t7s69",
            title: "Tratamento de inconsistências",
            description: "Resolução de marcações ímpares, batidas duplicadas e faltas injustificadas."
          },
          {
            id: "t7s70",
            title: "Conferência de banco de horas",
            description: "Validação final do BSaldo acumulado."
          },
          {
            id: "t7s71",
            title: "Geração de relatórios",
            description: "Emissão de espelho de ponto e relatórios de cálculos."
          },
          {
            id: "t7s72",
            title: "Checklist final e envio",
            description: "Auditoria final, recolhimento de assinaturas e envio para contabilidade."
          }
        ],
        checklist: [
          "Período de fechamento selecionado corretamente",
          "Funcionários ativos e movimentações conferidos",
          "Escalas e feriados do período validados",
          "Marcações ímpares tratadas e corrigidas",
          "Justificativas de faltas/atrasos aplicadas",
          "Banco de horas conferido",
          "Relatórios emitidos e salvos",
          "Pendências documentadas",
          "Evidências arquivadas"
        ]
      },
      {
        id: "t7m12",
        title: "Módulo 12 — Rotinas especiais e encerramento",
        description: "Afastamentos, auditoria, avaliação final e certificação.",
        steps: [
          {
            id: "t7s73",
            title: "Férias e afastamentos",
            description: "Como cadastrar férias e afastamentos médicos no Secullum Ponto Web."
          },
          {
            id: "t7s74",
            title: "Logs e auditoria",
            description: "Acompanhamento das ações administrativas e alterações de ponto."
          },
          {
            id: "t7s75",
            title: "Pontos de restauração",
            description: "Como criar backups e restaurar o sistema em caso de erros."
          },
          {
            id: "t7s76",
            title: "Colunas mix",
            description: "Recursos avançados para visualização de relatórios customizados."
          },
          {
            id: "t7s77",
            title: "Funcionalidades conforme licença",
            description: "Limitações e permissões conforme versão Basic, Pro ou Ultimate."
          },
          {
            id: "t7s78",
            title: "Recursos cobrados à parte",
            description: "Nota: O FAQ 1138 e outros recursos avançados são cobrados à parte. Consulte o comercial para contratar."
          },
          {
            id: "t7s79",
            title: "Revisão final",
            description: "Checklist final das competências operacionais aprendidas."
          },
          {
            id: "t7s80",
            title: "Avaliação final e certificado",
            description: "Responda à prova de aptidão operacional para emitir o certificado final."
          }
        ],
        checklist: [
          "Entendi que alguns recursos dependem da licença e podem ser cobrados à parte",
          "Sei consultar suporte técnico em caso de dúvidas de configuração",
          "Concluí a revisão final",
          "Respondi à avaliação final",
          "Solicitei meu certificado de conclusão"
        ]
      }
    ]
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ESTATÍSTICAS
// ─────────────────────────────────────────────────────────────────────────────

export function getTrainingStats(trainings: Training[]) {
  return {
    total: trainings.length,
    published: trainings.filter((t) => t.status === "published").length,
    inProgress: trainings.filter((t) => t.status === "in_progress").length,
    draft: trainings.filter((t) => t.status === "draft").length,
    onboarding: trainings.filter((t) => t.category === "onboarding").length,
    technical: trainings.filter((t) => t.category === "technical_support" || t.category === "facial_tablet").length,
    totalModules: trainings.reduce((acc, t) => acc + t.modules.length, 0),
  };
}