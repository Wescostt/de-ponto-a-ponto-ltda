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