export interface QuestionOption {
  id: string;
  option_text: string;
  is_correct: boolean;
}

export interface Question {
  id: string;
  question: string;
  explanation: string;
  question_type: string;
  points: number;
  options: QuestionOption[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  passing_score: number;
  max_attempts: number;
  is_final: boolean;
}

export const MOCK_QUIZZES_DATA: Record<string, { quiz: Quiz; questions: Question[] }> = {
  // MÓDULO 1
  "quiz_t7m1": {
    quiz: {
      id: "quiz_t7m1",
      title: "Avaliação do Módulo 01 — Boas-vindas e preparação",
      description: "Responda às questões para validar seus conhecimentos sobre o Módulo 1.",
      passing_score: 80,
      max_attempts: 99,
      is_final: false,
    },
    questions: [
      {
        id: "q_t7m1_1",
        question: "Qual é o principal objetivo do Treinamento Secullum Ponto Web?",
        explanation: "O treinamento visa dar autonomia operacional e organização no controle de ponto.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m1_1_a", option_text: "Automatizar demissões de funcionários.", is_correct: false },
          { id: "o_t7m1_1_b", option_text: "Garantir autonomia operacional e organização no controle de ponto.", is_correct: true },
          { id: "o_t7m1_1_c", option_text: "Substituir a assessoria jurídica da empresa.", is_correct: false },
          { id: "o_t7m1_1_d", option_text: "Cadastrar apenas novos equipamentos de ponto.", is_correct: false },
        ]
      },
      {
        id: "q_t7m1_2",
        question: "Como o suporte da De Ponto a Ponto Ltda. pode ser acionado por WhatsApp?",
        explanation: "O número oficial de suporte é (21) 9649-7367.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m1_2_a", option_text: "(21) 9999-9999", is_correct: false },
          { id: "o_t7m1_2_b", option_text: "(21) 9649-7367", is_correct: true },
          { id: "o_t7m1_2_c", option_text: "(11) 9888-8888", is_correct: false },
          { id: "o_t7m1_2_d", option_text: "(21) 3333-3333", is_correct: false },
        ]
      },
      {
        id: "q_t7m1_3",
        question: "O que é recomendado fazer para realizar os exercícios práticos do treinamento?",
        explanation: "O ideal é ter o Secullum logado em outra aba para praticar enquanto estuda.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m1_3_a", option_text: "Estudar apenas lendo o conteúdo sem abrir o sistema.", is_correct: false },
          { id: "o_t7m1_3_b", option_text: "Ter uma aba separada com o Secullum Ponto Web logado para praticar.", is_correct: true },
          { id: "o_t7m1_3_c", option_text: "Praticar direto no banco de dados de produção de outra empresa.", is_correct: false },
          { id: "o_t7m1_3_d", option_text: "Assistir aos vídeos em velocidade 3x.", is_correct: false },
        ]
      },
      {
        id: "q_t7m1_4",
        question: "O certificado de conclusão de aptidão operacional substitui validações contábeis ou jurídicas?",
        explanation: "O certificado comprova aptidão operacional, mas não substitui validações jurídicas ou contábeis.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m1_4_a", option_text: "Sim, substitui integralmente a assessoria jurídica.", is_correct: false },
          { id: "o_t7m1_4_b", option_text: "Não, ele comprova aptidão operacional e não substitui validações jurídicas ou contábeis.", is_correct: true },
          { id: "o_t7m1_4_c", option_text: "Sim, substitui a fiscalização do Ministério do Trabalho.", is_correct: false },
          { id: "o_t7m1_4_d", option_text: "Substitui a folha de pagamento da empresa.", is_correct: false },
        ]
      },
      {
        id: "q_t7m1_5",
        question: "Qual é o e-mail oficial de suporte da De Ponto a Ponto?",
        explanation: "O e-mail oficial de suporte é depontosuporte@gmail.com.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m1_5_a", option_text: "suporte@secullum.com.br", is_correct: false },
          { id: "o_t7m1_5_b", option_text: "depontosuporte@gmail.com", is_correct: true },
          { id: "o_t7m1_5_c", option_text: "comercial@deponto.com", is_correct: false },
          { id: "o_t7m1_5_d", option_text: "financeiro@deponto.com.br", is_correct: false },
        ]
      }
    ]
  },
  // MÓDULO 2
  "quiz_t7m2": {
    quiz: {
      id: "quiz_t7m2",
      title: "Avaliação do Módulo 02 — Controle de jornada, CLT e Portaria 671",
      description: "Responda às questões para validar seus conhecimentos sobre a legislação do ponto eletrônico.",
      passing_score: 80,
      max_attempts: 99,
      is_final: false,
    },
    questions: [
      {
        id: "q_t7m2_1",
        question: "Qual portaria do MTE regulamenta o registro eletrônico de ponto atualmente?",
        explanation: "A Portaria MTP nº 671/2021 unificou as regras de ponto eletrônico.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m2_1_a", option_text: "Portaria 1510", is_correct: false },
          { id: "o_t7m2_1_b", option_text: "Portaria 373", is_correct: false },
          { id: "o_t7m2_1_c", option_text: "Portaria MTP 671/2021", is_correct: true },
          { id: "o_t7m2_1_d", option_text: "Portaria 1010", is_correct: false },
        ]
      },
      {
        id: "q_t7m2_2",
        question: "O que significa a sigla REP-C de acordo com a legislação?",
        explanation: "REP-C é o registrador eletrônico de ponto via programa/software de tratamento.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m2_2_a", option_text: "Registrador Eletrônico de Ponto em Nuvem (via software de tratamento).", is_correct: true },
          { id: "o_t7m2_2_b", option_text: "Registrador Eletrônico de Ponto Convencional.", is_correct: false },
          { id: "o_t7m2_2_c", option_text: "Registro de Empregados e Ponto Coletivo.", is_correct: false },
          { id: "o_t7m2_2_d", option_text: "Relatório de Escalas de Ponto Cíclico.", is_correct: false },
        ]
      },
      {
        id: "q_t7m2_3",
        question: "O que é o arquivo AFD e por quanto tempo deve ser guardado?",
        explanation: "AFD é o Arquivo Fonte de Dados, que deve ser guardado por no mínimo 5 anos.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m2_3_a", option_text: "Ajuste de Faltas Diárias, deve ser guardado por 1 ano.", is_correct: false },
          { id: "o_t7m2_3_b", option_text: "Arquivo Fonte de Dados, deve ser guardado por no mínimo 5 anos.", is_correct: true },
          { id: "o_t7m2_3_c", option_text: "Arquivo de Férias e Demissões, deve ser guardado por 2 anos.", is_correct: false },
          { id: "o_t7m2_3_d", option_text: "Auditoria Financeira de DP, deve ser guardado por 10 anos.", is_correct: false },
        ]
      },
      {
        id: "q_t7m2_4",
        question: "Qual a diferença conceitual entre o AFD e o AEJ?",
        explanation: "O AFD é gerado pelo registrador de ponto, e o AEJ é gerado pelo programa de tratamento.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m2_4_a", option_text: "O AFD é gerado pelo registrador, e o AEJ é gerado pelo programa de tratamento.", is_correct: true },
          { id: "o_t7m2_4_b", option_text: "O AFD é um relatório PDF e o AEJ é uma planilha Excel.", is_correct: false },
          { id: "o_t7m2_4_c", option_text: "O AEJ serve para cadastrar funcionários e o AFD para emitir o espelho de ponto.", is_correct: false },
          { id: "o_t7m2_4_d", option_text: "Não há diferença, são o mesmo arquivo.", is_correct: false },
        ]
      },
      {
        id: "q_t7m2_5",
        question: "Regras internas de banco de horas e limites de hora extra no fechamento de ponto devem ser validadas com quem?",
        explanation: "Essas políticas internas e limites trabalhistas devem ser validados com a contabilidade ou assessoria jurídica.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m2_5_a", option_text: "Diretamente com o fabricante do relógio de ponto.", is_correct: false },
          { id: "o_t7m2_5_b", option_text: "Com o setor comercial da De Ponto a Ponto.", is_correct: false },
          { id: "o_t7m2_5_c", option_text: "Com a contabilidade ou assessoria jurídica da empresa.", is_correct: true },
          { id: "o_t7m2_5_d", option_text: "Apenas com os próprios funcionários da empresa.", is_correct: false },
        ]
      }
    ]
  },
  // MÓDULO 3
  "quiz_t7m3": {
    quiz: {
      id: "quiz_t7m3",
      title: "Avaliação do Módulo 03 — Visão geral do sistema",
      description: "Responda às questões para validar seus conhecimentos sobre a estrutura básica do Secullum.",
      passing_score: 80,
      max_attempts: 99,
      is_final: false,
    },
    questions: [
      {
        id: "q_t7m3_1",
        question: "Quais são os principais menus operacionais do Secullum Ponto Web?",
        explanation: "Os principais menus são: Cadastros, Horários, Funcionários, Cálculos, Relatórios e Manutenções.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m3_1_a", option_text: "Vendas, Compras, Faturamento e Caixa.", is_correct: false },
          { id: "o_t7m3_1_b", option_text: "Cadastros, Horários, Funcionários, Cálculos, Relatórios e Manutenções.", is_correct: true },
          { id: "o_t7m3_1_c", option_text: "CRM, Kanban, Projetos e Metas.", is_correct: false },
          { id: "o_t7m3_1_d", option_text: "Chat, Chamados, Biblioteca e Treinamentos.", is_correct: false },
        ]
      },
      {
        id: "q_t7m3_2",
        question: "O que dita o que o usuário consegue ver ou editar nas telas e relatórios do Secullum?",
        explanation: "O nível de permissão e o perfil de acesso do usuário definem o que é exibido.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m3_2_a", option_text: "O tipo de navegador web utilizado.", is_correct: false },
          { id: "o_t7m3_2_b", option_text: "O nível de permissão e perfil de acesso configurado.", is_correct: true },
          { id: "o_t7m3_2_c", option_text: "A velocidade da conexão de internet.", is_correct: false },
          { id: "o_t7m3_2_d", option_text: "O horário do dia em que acessa o sistema.", is_correct: false },
        ]
      },
      {
        id: "q_t7m3_3",
        question: "Qual é a lógica correta do fluxo operacional básico no Secullum?",
        explanation: "Cadastros -> Marcações -> Tratamento -> Relatórios -> Fechamento.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m3_3_a", option_text: "Fechamento -> Cadastros -> Marcações -> Relatórios.", is_correct: false },
          { id: "o_t7m3_3_b", option_text: "Cadastros -> Marcações -> Tratamento -> Relatórios -> Fechamento.", is_correct: true },
          { id: "o_t7m3_3_c", option_text: "Marcações -> Fechamento -> Relatórios -> Cadastros.", is_correct: false },
          { id: "o_t7m3_3_d", option_text: "Relatórios -> Tratamento -> Cadastros -> Marcações.", is_correct: false },
        ]
      },
      {
        id: "q_t7m3_4",
        question: "O que a rotina diária ou semanal do RH ajuda a evitar no fechamento mensal?",
        explanation: "O tratamento constante evita acúmulo de erros e gargalos no final do mês.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m3_4_a", option_text: "O acúmulo de marcações não tratadas e gargalos na folha.", is_correct: true },
          { id: "o_t7m3_4_b", option_text: "O aumento da conta de luz do escritório.", is_correct: false },
          { id: "o_t7m3_4_c", option_text: "Que os colaboradores esqueçam de registrar o ponto.", is_correct: false },
          { id: "o_t7m3_4_d", option_text: "A expiração da licença anual do sistema.", is_correct: false },
        ]
      },
      {
        id: "q_t7m3_5",
        question: "Qual é a orientação recomendada antes de alterar configurações de cálculo sensíveis?",
        explanation: "Consulte o suporte técnico para evitar desconfigurações nos cálculos.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m3_5_a", option_text: "Alterar livremente e ver o que acontece.", is_correct: false },
          { id: "o_t7m3_5_b", option_text: "Consultar o suporte técnico para evitar erros de cálculo.", is_correct: true },
          { id: "o_t7m3_5_c", option_text: "Reiniciar o relógio de ponto físico.", is_correct: false },
          { id: "o_t7m3_5_d", option_text: "Criar um novo CNPJ no sistema.", is_correct: false },
        ]
      }
    ]
  },
  // MÓDULO 4
  "quiz_t7m4": {
    quiz: {
      id: "quiz_t7m4",
      title: "Avaliação do Módulo 04 — Cadastros essenciais",
      description: "Responda às questões para validar seus conhecimentos sobre parametrização de cadastros.",
      passing_score: 80,
      max_attempts: 99,
      is_final: false,
    },
    questions: [
      {
        id: "q_t7m4_1",
        question: "Quais dados cadastrais de funcionários são cruciais e obrigatórios para o Secullum se comunicar com o REP?",
        explanation: "CPF e número do PIS/NIT são os identificadores fundamentais e obrigatórios.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m4_1_a", option_text: "Endereço e estado civil.", is_correct: false },
          { id: "o_t7m4_1_b", option_text: "CPF e número de PIS/NIT.", is_correct: true },
          { id: "o_t7m4_1_c", option_text: "Nome da mãe e tipo sanguíneo.", is_correct: false },
          { id: "o_t7m4_1_d", option_text: "Escolaridade e pretensão salarial.", is_correct: false },
        ]
      },
      {
        id: "q_t7m4_2",
        question: "Como a LGPD se aplica aos cadastros do Secullum?",
        explanation: "A LGPD exige cuidados no armazenamento de dados pessoais e restrição aos relatórios e biometrias.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m4_2_a", option_text: "Exige que todos os funcionários vejam os pontos dos outros.", is_correct: false },
          { id: "o_t7m4_2_b", option_text: "Exige cuidados com dados pessoais e restrição de acesso apenas aos responsáveis.", is_correct: true },
          { id: "o_t7m4_2_c", option_text: "Proíbe cadastros de funcionários menores de 18 anos.", is_correct: false },
          { id: "o_t7m4_2_d", option_text: "Obriga a exclusão dos registros após 30 dias.", is_correct: false },
        ]
      },
      {
        id: "q_t7m4_3",
        question: "Para que serve o cadastro de Departamentos no Secullum Ponto Web?",
        explanation: "Serve para organizar, agrupar e filtrar os relatórios e visualizações de funcionários.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m4_3_a", option_text: "Para calcular a folha de pagamento de forma unificada.", is_correct: false },
          { id: "o_t7m4_3_b", option_text: "Para organizar relatórios, filtros e visões de funcionários no sistema.", is_correct: true },
          { id: "o_t7m4_3_c", option_text: "Para definir a escala de folgas obrigatória.", is_correct: false },
          { id: "o_t7m4_3_d", option_text: "Para registrar as filiais da empresa.", is_correct: false },
        ]
      },
      {
        id: "q_t7m4_4",
        question: "Como é possível criar um novo operador/usuário com permissões restritas no Secullum?",
        explanation: "No menu Cadastros > Usuários, definindo o nível e as permissões apropriadas.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m4_4_a", option_text: "No menu Cadastros > Usuários, definindo o perfil de acesso correspondente.", is_correct: true },
          { id: "o_t7m4_4_b", option_text: "Enviando um e-mail para o suporte do Ministério do Trabalho.", is_correct: false },
          { id: "o_t7m4_4_c", option_text: "Cadastrando o usuário como funcionário comum e ativando o aplicativo.", is_correct: false },
          { id: "o_t7m4_4_d", option_text: "No menu Horários > Escalas.", is_correct: false },
        ]
      },
      {
        id: "q_t7m4_5",
        question: "Por que é importante revisar os funcionários ativos antes do primeiro fechamento de ponto?",
        explanation: "Garante conformidade com o limite da licença contratada e previne inconsistências de cálculo.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m4_5_a", option_text: "Para garantir que a licença não foi excedida e evitar inconsistências de cálculo.", is_correct: true },
          { id: "o_t7m4_5_b", option_text: "Para alterar a razão social da empresa.", is_correct: false },
          { id: "o_t7m4_5_c", option_text: "Para emitir recibos de pagamento automáticos.", is_correct: false },
          { id: "o_t7m4_5_d", option_text: "Para verificar os saldos bancários da empresa.", is_correct: false },
        ]
      }
    ]
  },
  // MÓDULO 5
  "quiz_t7m5": {
    quiz: {
      id: "quiz_t7m5",
      title: "Avaliação do Módulo 05 — Horários, escalas e jornadas",
      description: "Responda às questões para validar seus conhecimentos sobre configurações de horários e escalas.",
      passing_score: 80,
      max_attempts: 99,
      is_final: false,
    },
    questions: [
      {
        id: "q_t7m5_1",
        question: "O que é uma escala cíclica (ex: 12x36 ou 5x1) no Secullum Ponto Web?",
        explanation: "É uma escala de revezamento contínuo onde os dias trabalhados e de folga repetem um ciclo fixo.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m5_1_a", option_text: "Um horário flexível onde o funcionário escolhe quando trabalha.", is_correct: false },
          { id: "o_t7m5_1_b", option_text: "Uma escala de revezamento contínuo onde os dias de trabalho e folga seguem um padrão fixo.", is_correct: true },
          { id: "o_t7m5_1_c", option_text: "Um horário noturno de segunda a sexta.", is_correct: false },
          { id: "o_t7m5_1_d", option_text: "Uma escala de férias coletivas da empresa.", is_correct: false },
        ]
      },
      {
        id: "q_t7m5_2",
        question: "Em jornadas que passam da meia-noite (noturnas), o que deve ser configurado no horário?",
        explanation: "Deve-se configurar a virada de dia/limite de jornada para alocação correta das batidas.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m5_2_a", option_text: "Um novo cadastro de empresa.", is_correct: false },
          { id: "o_t7m5_2_b", option_text: "A virada de dia (ou limite de jornada) para alocação correta das batidas.", is_correct: true },
          { id: "o_t7m5_2_c", option_text: "A exclusão das batidas do dia anterior.", is_correct: false },
          { id: "o_t7m5_2_d", option_text: "O zeramento automático do banco de horas.", is_correct: false },
        ]
      },
      {
        id: "q_t7m5_3",
        question: "O que acontece se feriados e pontos facultativos não forem cadastrados no calendário do Secullum?",
        explanation: "O sistema apontará falta injustificada para os colaboradores no dia do feriado.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m5_3_a", option_text: "O sistema acusa falta injustificada para os funcionários no dia do feriado.", is_correct: true },
          { id: "o_t7m5_3_b", option_text: "O relógio de ponto físico para de funcionar.", is_correct: false },
          { id: "o_t7m5_3_c", option_text: "Os funcionários ganham horas extras em triplo automaticamente.", is_correct: false },
          { id: "o_t7m5_3_d", option_text: "O sistema bloqueia o acesso à tela de cálculos.", is_correct: false },
        ]
      },
      {
        id: "q_t7m5_4",
        question: "O trabalho realizado em feriados e folgas pode ser calculado de quais formas?",
        explanation: "Pode ser calculado como horas extras (100% ou índice configurado) ou ir para o banco de horas.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m5_4_a", option_text: "Apenas como falta abonada.", is_correct: false },
          { id: "o_t7m5_4_b", option_text: "Como adicional de 100% de horas extras ou direcionado para banco de horas.", is_correct: true },
          { id: "o_t7m5_4_c", option_text: "Apenas como folga compensatória no próprio dia.", is_correct: false },
          { id: "o_t7m5_4_d", option_text: "Não pode ser calculado pelo sistema.", is_correct: false },
        ]
      },
      {
        id: "q_t7m5_5",
        question: "Qual é o posicionamento correto sobre o debate de mudanças na escala 6x1 no sistema?",
        explanation: "As mudanças dependem de lei vigente aprovada, e o RH deve cadastrar e parametrizar o horário correspondente no sistema.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m5_5_a", option_text: "O sistema altera a jornada automaticamente baseado nas notícias da internet.", is_correct: false },
          { id: "o_t7m5_5_b", option_text: "Mudanças dependem de aprovação legal vigente, e o RH deve preparar as escalas correspondentes conforme legislação.", is_correct: true },
          { id: "o_t7m5_5_c", option_text: "O Secullum proíbe o cadastro de escalas 6x1.", is_correct: false },
          { id: "o_t7m5_5_d", option_text: "A escala 6x1 foi extinta do sistema no último commit.", is_correct: false },
        ]
      }
    ]
  },
  // MÓDULO 6
  "quiz_t7m6": {
    quiz: {
      id: "quiz_t7m6",
      title: "Avaliação do Módulo 06 — Marcações de ponto e origem das batidas",
      description: "Responda às questões para validar seus conhecimentos sobre controle e origem das batidas.",
      passing_score: 80,
      max_attempts: 99,
      is_final: false,
    },
    questions: [
      {
        id: "q_t7m6_1",
        question: "Como o RH consegue saber de qual dispositivo (REP, app, tablet) veio uma marcação?",
        explanation: "A origem pode ser consultada na coluna correspondente das telas e relatórios de cálculos.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m6_1_a", option_text: "Perguntando diretamente ao colaborador.", is_correct: false },
          { id: "o_t7m6_1_b", option_text: "Pela coluna/campo de origem e rastreabilidade da batida nas telas e relatórios.", is_correct: true },
          { id: "o_t7m6_1_c", option_text: "Apenas abrindo um chamado no suporte.", is_correct: false },
          { id: "o_t7m6_1_d", option_text: "Não é possível rastrear a origem das batidas.", is_correct: false },
        ]
      },
      {
        id: "q_t7m6_2",
        question: "O que é uma marcação ímpar no cartão de ponto?",
        explanation: "É uma batida que não possui o par correspondente (ex: marcou entrada mas não registrou a saída).",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m6_2_a", option_text: "Uma batida realizada em um dia de feriado.", is_correct: false },
          { id: "o_t7m6_2_b", option_text: "Um registro de ponto sem o seu par correspondente (ex: registrou entrada mas esqueceu a saída).", is_correct: true },
          { id: "o_t7m6_2_c", option_text: "Um ponto batido em horário de folga.", is_correct: false },
          { id: "o_t7m6_2_d", option_text: "Uma marcação com número de PIS incorreto.", is_correct: false },
        ]
      },
      {
        id: "q_t7m6_3",
        question: "Como o Secullum trata batidas duplicadas no mesmo minuto?",
        explanation: "O sistema descarta ou desconsidera a duplicada de acordo com as regras de cálculo configuradas.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m6_3_a", option_text: "Bloqueia o cadastro do funcionário.", is_correct: false },
          { id: "o_t7m6_3_b", option_text: "Considera apenas uma batida e descarta/desconsidera a duplicada conforme parametrização.", is_correct: true },
          { id: "o_t7m6_3_c", option_text: "Soma as duas batidas gerando horas extras.", is_correct: false },
          { id: "o_t7m6_3_d", option_text: "Apaga todas as marcações daquele dia.", is_correct: false },
        ]
      },
      {
        id: "q_t7m6_4",
        question: "Qual é o procedimento legal correto para inserir uma marcação de ponto esquecida pelo funcionário?",
        explanation: "O RH deve inserir a batida manualmente registrando o motivo/justificativa do ajuste manual.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m6_4_a", option_text: "Inserir manualmente no sistema, registrando o motivo/justificativa do ajuste manual.", is_correct: true },
          { id: "o_t7m6_4_b", option_text: "Pedir para outro colaborador bater o ponto por ele no dia seguinte.", is_correct: false },
          { id: "o_t7m6_4_c", option_text: "Alterar o horário contratual do colaborador daquele dia.", is_correct: false },
          { id: "o_t7m6_4_d", option_text: "O sistema não permite inserções manuais.", is_correct: false },
        ]
      },
      {
        id: "q_t7m6_5",
        question: "Para que serve o relatório de origem das marcações?",
        explanation: "Audita geolocalização e o dispositivo utilizado para validar conformidade legal e segurança.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m6_5_a", option_text: "Para auditar a localização GPS e dispositivo de registro para segurança e fiscalização.", is_correct: true },
          { id: "o_t7m6_5_b", option_text: "Para enviar comprovantes de PIX para os colaboradores.", is_correct: false },
          { id: "o_t7m6_5_c", option_text: "Para calcular a comissão de vendas do suporte técnico.", is_correct: false },
          { id: "o_t7m6_5_d", option_text: "Para registrar a entrada de visitantes na recepção.", is_correct: false },
        ]
      }
    ]
  },
  // MÓDULO 7
  "quiz_t7m7": {
    quiz: {
      id: "quiz_t7m7",
      title: "Avaliação do Módulo 07 — Reconhecimento facial, tablet e aplicativo",
      description: "Responda às questões para validar seus conhecimentos sobre biometria facial.",
      passing_score: 80,
      max_attempts: 99,
      is_final: false,
    },
    questions: [
      {
        id: "q_t7m7_1",
        question: "Quais cuidados o colaborador deve ter ao cadastrar sua foto no tablet facial?",
        explanation: "Rosto bem iluminado, centralizado, sem óculos escuros, bonés ou acessórios que encubram a face.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m7_1_a", option_text: "Estar em local escuro de óculos escuros e boné.", is_correct: false },
          { id: "o_t7m7_1_b", option_text: "Câmera limpa, boa iluminação, rosto centralizado e sem acessórios que obstruam a face.", is_correct: true },
          { id: "o_t7m7_1_c", option_text: "Sorrir muito e se mover rapidamente.", is_correct: false },
          { id: "o_t7m7_1_d", option_text: "Cadastrar a foto de outra foto impressa.", is_correct: false },
        ]
      },
      {
        id: "q_t7m7_2",
        question: "Qual a altura ideal recomendada para fixação física do tablet facial?",
        explanation: "A câmera deve estar na altura média dos olhos dos colaboradores para facilitar o enquadramento.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m7_2_a", option_text: "A 1 metro do chão.", is_correct: false },
          { id: "o_t7m7_2_b", option_text: "Com a câmera na altura média dos olhos dos colaboradores.", is_correct: true },
          { id: "o_t7m7_2_c", option_text: "O mais alto possível, perto do teto.", is_correct: false },
          { id: "o_t7m7_2_d", option_text: "Apenas apoiado solto em cima de uma mesa baixa.", is_correct: false },
        ]
      },
      {
        id: "q_t7m7_3",
        question: "O que acontece se o tablet facial for instalado com luz solar forte diretamente atrás do colaborador?",
        explanation: "Cria um contra-luz que deixa o rosto do colaborador escuro, dificultando a biometria.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m7_3_a", option_text: "O reconhecimento facial melhora.", is_correct: false },
          { id: "o_t7m7_3_b", option_text: "Ocorre efeito de silhueta (contra-luz) dificultando ou impedindo o reconhecimento.", is_correct: true },
          { id: "o_t7m7_3_c", option_text: "O tablet desliga automaticamente por superaquecimento.", is_correct: false },
          { id: "o_t7m7_3_d", option_text: "Os registros de ponto são duplicados.", is_correct: false },
        ]
      },
      {
        id: "q_t7m7_4",
        question: "O que é o 'limiar' (threshold) facial nas configurações?",
        explanation: "É o nível de confiança exigido para correspondência da face. Um limiar desregulado causa erros de falso-positivo ou rejeição excessiva.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m7_4_a", option_text: "O tempo que o tablet leva para ligar.", is_correct: false },
          { id: "o_t7m7_4_b", option_text: "O nível de precisão/confiança exigido para validar a identidade.", is_correct: true },
          { id: "o_t7m7_4_c", option_text: "O número máximo de funcionários cadastrados.", is_correct: false },
          { id: "o_t7m7_4_d", option_text: "A distância máxima em metros que a câmera alcança.", is_correct: false },
        ]
      },
      {
        id: "q_t7m7_5",
        question: "Qual a orientação para o funcionário após bater o ponto no tablet facial?",
        explanation: "O funcionário deve ler o nome que aparece na tela para garantir que a batida foi atribuída a ele.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m7_5_a", option_text: "Sair correndo imediatamente.", is_correct: false },
          { id: "o_t7m7_5_b", option_text: "Aguardar a mensagem de confirmação e ler se o nome exibido na tela é realmente o dele.", is_correct: true },
          { id: "o_t7m7_5_c", option_text: "Tentar bater o ponto mais 3 vezes para garantir.", is_correct: false },
          { id: "o_t7m7_5_d", option_text: "Digitar sua senha no teclado numérico.", is_correct: false },
        ]
      }
    ]
  },
  // MÓDULO 8
  "quiz_t7m8": {
    quiz: {
      id: "quiz_t7m8",
      title: "Avaliação do Módulo 08 — Tratamento do ponto e justificativas",
      description: "Responda às questões para validar seus conhecimentos sobre tratamento de inconsistências.",
      passing_score: 80,
      max_attempts: 99,
      is_final: false,
    },
    questions: [
      {
        id: "q_t7m8_1",
        question: "Onde o RH visualiza e corrige as ocorrências diárias do cartão de ponto?",
        explanation: "Isso é feito na tela de Cálculos (onde se edita o Cartão de Ponto).",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m8_1_a", option_text: "No menu Cadastros > Departamentos.", is_correct: false },
          { id: "o_t7m8_1_b", option_text: "Na tela de Cálculos (ou Cartão de Ponto).", is_correct: true },
          { id: "o_t7m8_1_c", option_text: "No menu Manutenções > Backup.", is_correct: false },
          { id: "o_t7m8_1_d", option_text: "No painel de controle do tablet facial.", is_correct: false },
        ]
      },
      {
        id: "q_t7m8_2",
        question: "Como se deve abonar uma falta justificada por atestado médico no Secullum?",
        explanation: "Lança-se um abono na ocorrência daquele dia, indicando o horário a ser justificado.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m8_2_a", option_text: "Apagando o dia de trabalho do calendário do funcionário.", is_correct: false },
          { id: "o_t7m8_2_b", option_text: "Lançando um abono ou justificativa associada ao dia da ocorrência no cartão de ponto.", is_correct: true },
          { id: "o_t7m8_2_c", option_text: "Adicionando 8 horas extras manuais naquele dia.", is_correct: false },
          { id: "o_t7m8_2_d", option_text: "O sistema abona automaticamente ao ler o atestado via câmera.", is_correct: false },
        ]
      },
      {
        id: "q_t7m8_3",
        question: "O que a CLT estabelece (Artigo 58) sobre tolerância diária de variação de horário no ponto?",
        explanation: "Tolerância máxima de 5 minutos por batida, respeitando o limite diário de 10 minutos.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m8_3_a", option_text: "Até 30 minutos por batida.", is_correct: false },
          { id: "o_t7m8_3_b", option_text: "Até 5 minutos por marcação, com limite máximo de 10 minutos diários de variação.", is_correct: true },
          { id: "o_t7m8_3_c", option_text: "Não há nenhuma tolerância, qualquer minuto gera hora extra ou atraso.", is_correct: false },
          { id: "o_t7m8_3_d", option_text: "Tolerância de até 2 horas semanais.", is_correct: false },
        ]
      },
      {
        id: "q_t7m8_4",
        question: "Por que as alterações manuais no cartão de ponto exigem justificativas claras?",
        explanation: "As justificativas manuais garantem a lisura em caso de fiscalizações trabalhistas e auditorias.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m8_4_a", option_text: "Porque o sistema não grava quem fez as alterações.", is_correct: false },
          { id: "o_t7m8_4_b", option_text: "Para garantir rastreabilidade e segurança em auditorias e fiscalizações trabalhistas.", is_correct: true },
          { id: "o_t7m8_4_c", option_text: "Para que o funcionário receba uma notificação por SMS.", is_correct: false },
          { id: "o_t7m8_4_d", option_text: "Para liberar espaço em disco no servidor.", is_correct: false },
        ]
      },
      {
        id: "q_t7m8_5",
        question: "Qual é o benefício de realizar o tratamento do ponto semanalmente?",
        explanation: "Impede o acúmulo de cartões vermelhos ou erros, tornando o fechamento ágil e correto.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m8_5_a", option_text: "Evitar o acúmulo de inconsistências facilitando um fechamento rápido e correto.", is_correct: true },
          { id: "o_t7m8_5_b", option_text: "Aumentar a franquia de internet da empresa.", is_correct: false },
          { id: "o_t7m8_5_c", option_text: "Reduzir o valor da mensalidade do sistema.", is_correct: false },
          { id: "o_t7m8_5_d", option_text: "Bloquear marcações indesejadas de funcionários.", is_correct: false },
        ]
      }
    ]
  },
  // MÓDULO 9
  "quiz_t7m9": {
    quiz: {
      id: "quiz_t7m9",
      title: "Avaliação do Módulo 09 — Banco de horas e saldos",
      description: "Responda às questões para validar seus conhecimentos sobre parametrização e extrato de banco de horas.",
      passing_score: 80,
      max_attempts: 99,
      is_final: false,
    },
    questions: [
      {
        id: "q_t7m9_1",
        question: "Qual a diferença conceitual entre tolerância de cálculo diário e banco de horas?",
        explanation: "Tolerância define desvios ignorados no dia; banco acumula saldos positivos/negativos para compensações.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m9_1_a", option_text: "Nenhuma, são o mesmo conceito.", is_correct: false },
          { id: "o_t7m9_1_b", option_text: "A tolerância define desvios que não geram débito/crédito; o banco acumula horas para compensação.", is_correct: true },
          { id: "o_t7m9_1_c", option_text: "A tolerância calcula faltas e o banco de horas calcula salários.", is_correct: false },
          { id: "o_t7m9_1_d", option_text: "Tolerância é para estagiários e banco de horas é para diretores.", is_correct: false },
        ]
      },
      {
        id: "q_t7m9_2",
        question: "O que significam as siglas BCred, BDeb, BTotal e BSaldo no banco de horas?",
        explanation: "BCred é o crédito, BDeb o débito, BTotal o saldo apurado no período do relatório e BSaldo o saldo acumulado total.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m9_2_a", option_text: "Siglas de controle financeiro de contas a pagar.", is_correct: false },
          { id: "o_t7m9_2_b", option_text: "BCred (crédito), BDeb (débito), BTotal (período), BSaldo (saldo geral acumulado ativo).", is_correct: true },
          { id: "o_t7m9_2_c", option_text: "Siglas para Controle de Ponto de Colaboradores Externos.", is_correct: false },
          { id: "o_t7m9_2_d", option_text: "Nomes dos servidores em nuvem da Secullum.", is_correct: false },
        ]
      },
      {
        id: "q_t7m9_3",
        question: "Qual campo do extrato de banco de horas representa o saldo acumulado real do colaborador?",
        explanation: "BSaldo é a sigla que representa o saldo total ativo acumulado do banco.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m9_3_a", option_text: "BCred", is_correct: false },
          { id: "o_t7m9_3_b", option_text: "BSaldo (Saldo Acumulado / Atual).", is_correct: true },
          { id: "o_t7m9_3_c", option_text: "BDeb", is_correct: false },
          { id: "o_t7m9_3_d", option_text: "Apenas as observações em texto.", is_correct: false },
        ]
      },
      {
        id: "q_t7m9_4",
        question: "Como é feito o zeramento (quitação) do banco de horas no Secullum?",
        explanation: "O menu de Processos possui rotinas específicas de fechamento e zeramento do banco de horas.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m9_4_a", option_text: "Apagando o funcionário do cadastro.", is_correct: false },
          { id: "o_t7m9_4_b", option_text: "Utilizando a rotina de Fechamento/Zeramento de banco de horas no menu de Processos.", is_correct: true },
          { id: "o_t7m9_4_c", option_text: "Alterando todas as jornadas para 0.", is_correct: false },
          { id: "o_t7m9_4_d", option_text: "O sistema zera o banco de horas todo dia 1º automaticamente.", is_correct: false },
        ]
      },
      {
        id: "q_t7m9_5",
        question: "Por que as regras de vigência e compensação do banco de horas devem ser alinhadas com o contador ou jurídico?",
        explanation: "Garante conformidade com o acordo coletivo (CCT) ou acordo individual (ACT) de banco de horas.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m9_5_a", option_text: "Para garantir conformidade com acordos coletivos e legislação trabalhista.", is_correct: true },
          { id: "o_t7m9_5_b", option_text: "Porque a Secullum cobra taxas diferentes dependendo da regra.", is_correct: false },
          { id: "o_t7m9_5_c", option_text: "Para traduzir as telas do sistema para outros idiomas.", is_correct: false },
          { id: "o_t7m9_5_d", option_text: "Para configurar o relógio de ponto físico.", is_correct: false },
        ]
      }
    ]
  },
  // MÓDULO 10
  "quiz_t7m10": {
    quiz: {
      id: "quiz_t7m10",
      title: "Avaliação do Módulo 10 — Relatórios, indicadores e conferência",
      description: "Responda às questões para validar seus conhecimentos sobre relatórios e exportação.",
      passing_score: 80,
      max_attempts: 99,
      is_final: false,
    },
    questions: [
      {
        id: "q_t7m10_1",
        question: "O que é o relatório 'Espelho de Ponto' no Secullum?",
        explanation: "O Espelho de Ponto mostra todas as batidas originais, cálculos de saldo e abonos aplicados no período.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m10_1_a", option_text: "O documento onde consta a foto diária do colaborador tirada pela câmera.", is_correct: false },
          { id: "o_t7m10_1_b", option_text: "O relatório oficial que mostra todas as batidas reais, tratamentos, abonos e saldos.", is_correct: true },
          { id: "o_t7m10_1_c", option_text: "Uma planilha financeira de custos por funcionário.", is_correct: false },
          { id: "o_t7m10_1_d", option_text: "O formulário de solicitação de férias.", is_correct: false },
        ]
      },
      {
        id: "q_t7m10_2",
        question: "Para que serve o arquivo de integração gerado após a conferência final do ponto?",
        explanation: "Ele serve para importar as horas calculadas diretamente para o software de folha de pagamento.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m10_2_a", option_text: "Para exportar as horas apuradas direto para o sistema de folha de pagamento.", is_correct: true },
          { id: "o_t7m10_2_b", option_text: "Para fazer backup das imagens do tablet facial.", is_correct: false },
          { id: "o_t7m10_2_c", option_text: "Para enviar o relatório de auditoria para o Ministério do Trabalho.", is_correct: false },
          { id: "o_t7m10_2_d", option_text: "Para atualizar o sistema operacional do computador.", is_correct: false },
        ]
      },
      {
        id: "q_t7m10_3",
        question: "Onde o gestor de RH pode analisar a quantidade de horas extras por departamento no sistema?",
        explanation: "Em Relatórios > Cálculos, ou no menu específico de Indicadores Gerenciais.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m10_3_a", option_text: "No menu Cadastros > Usuários.", is_correct: false },
          { id: "o_t7m10_3_b", option_text: "Em Relatórios > Cálculos / Indicadores Gerenciais.", is_correct: true },
          { id: "o_t7m10_3_c", option_text: "Na tela de cadastro do relógio de ponto.", is_correct: false },
          { id: "o_t7m10_3_d", option_text: "Apenas exportando o arquivo AFD.", is_correct: false },
        ]
      },
      {
        id: "q_t7m10_4",
        question: "Como o RH deve armazenar os espelhos de ponto assinados pelos funcionários?",
        explanation: "Devem ser guardados em local seguro ou repositório digital conforme os prazos legais.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m10_4_a", option_text: "Deixar salvos temporariamente na pasta de downloads.", is_correct: false },
          { id: "o_t7m10_4_b", option_text: "Salvar e arquivar em PDF de forma organizada conforme política interna.", is_correct: true },
          { id: "o_t7m10_4_c", option_text: "Apagar após o envio do arquivo de integração.", is_correct: false },
          { id: "o_t7m10_4_d", option_text: "O sistema apaga todos os PDFs após 5 dias.", is_correct: false },
        ]
      },
      {
        id: "q_t7m10_5",
        question: "Qual relatório do Secullum comprova os locais geográficos onde o colaborador registrou o ponto pelo aplicativo?",
        explanation: "O relatório de Geolocalização extrai as coordenadas GPS colhidas pelo aplicativo.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m10_5_a", option_text: "Relatório de Horários de Trabalho.", is_correct: false },
          { id: "o_t7m10_5_b", option_text: "Relatório de Geolocalização (ou Origem das Marcações).", is_correct: true },
          { id: "o_t7m10_5_c", option_text: "Extrato de Banco de Horas.", is_correct: false },
          { id: "o_t7m10_5_d", option_text: "Cadastro de Empresas.", is_correct: false },
        ]
      }
    ]
  },
  // MÓDULO 11
  "quiz_t7m11": {
    quiz: {
      id: "quiz_t7m11",
      title: "Avaliação do Módulo 11 — Fechamento mensal",
      description: "Responda às questões para validar seus conhecimentos sobre a rotina de fechamento de folha.",
      passing_score: 80,
      max_attempts: 99,
      is_final: false,
    },
    questions: [
      {
        id: "q_t7m11_1",
        question: "Qual a sequência correta da rotina de fechamento mensal no Secullum Ponto Web?",
        explanation: "AFD -> Feriados -> Tratar Cartões -> Emitir Espelhos -> Exportar Folha.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m11_1_a", option_text: "Importar AFD -> Cadastrar Feriados -> Tratar Cartões -> Emitir Espelhos -> Exportar Folha.", is_correct: true },
          { id: "o_t7m11_1_b", option_text: "Exportar Folha -> Emitir Espelhos -> Importar AFD.", is_correct: false },
          { id: "o_t7m11_1_c", option_text: "Tratar Cartões -> Exportar Folha -> Cadastrar Feriados.", is_correct: false },
          { id: "o_t7m11_1_d", option_text: "Apenas exportar a folha, o sistema faz o resto automaticamente.", is_correct: false },
        ]
      },
      {
        id: "q_t7m11_2",
        question: "Qual cuidado o RH deve ter com admissões e demissões no período do fechamento?",
        explanation: "Conferir e alimentar as datas de admissão e demissão corretamente previne cálculos fora do período de vigência contratual.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m11_2_a", option_text: "Cadastrar os demitidos como ativos no sistema.", is_correct: false },
          { id: "o_t7m11_2_b", option_text: "Atualizar e conferir as datas de admissão e demissão no cadastro para evitar cálculos indevidos.", is_correct: true },
          { id: "o_t7m11_2_c", option_text: "Excluir o registro dos demitidos imediatamente.", is_correct: false },
          { id: "o_t7m11_2_d", option_text: "Não registrar as datas de admissão no sistema.", is_correct: false },
        ]
      },
      {
        id: "q_t7m11_3",
        question: "O que deve ser feito com marcações ímpares remanescentes no dia do fechamento?",
        explanation: "As batidas devem ser ajustadas manualmente mediante justificativa de esquecimento/problema.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m11_3_a", option_text: "Deixar em branco para o sistema deduzir o horário.", is_correct: false },
          { id: "o_t7m11_3_b", option_text: "Realizar o ajuste da marcação faltante mediante justificativa para completar o par.", is_correct: true },
          { id: "o_t7m11_3_c", option_text: "Excluir todas as outras batidas daquele dia.", is_correct: false },
          { id: "o_t7m11_3_d", option_text: "O sistema fecha o ponto mesmo com marcações ímpares pendentes.", is_correct: false },
        ]
      },
      {
        id: "q_t7m11_4",
        question: "O que o RH deve fazer com o espelho de ponto de funcionários desligados no período?",
        explanation: "Emitir o espelho de ponto proporcional e obter a assinatura do demitido até o dia do desligamento.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m11_4_a", option_text: "Não emitir espelho de ponto para demitidos.", is_correct: false },
          { id: "o_t7m11_4_b", option_text: "Emitir e colher assinatura do espelho de ponto proporcional até a data do desligamento.", is_correct: true },
          { id: "o_t7m11_4_c", option_text: "Alterar as batidas do demitido para folga.", is_correct: false },
          { id: "o_t7m11_4_d", option_text: "O Secullum apaga o cartão proporcional de demitidos.", is_correct: false },
        ]
      },
      {
        id: "q_t7m11_5",
        question: "O que o checklist final de fechamento mensal busca garantir antes de enviar para a contabilidade?",
        explanation: "Verificar se todos os cartões estão sem inconsistências ou marcações vermelhas pendentes e assinados.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m11_5_a", option_text: "Que todos os cartões de ponto estão tratados, sem erros e validados pelo gestor e colaborador.", is_correct: true },
          { id: "o_t7m11_5_b", option_text: "Que o limite do banco de dados do Supabase foi atingido.", is_correct: false },
          { id: "o_t7m11_5_c", option_text: "Que as vendas do mês foram computadas.", is_correct: false },
          { id: "o_t7m11_5_d", option_text: "Que os relógios físicos estão desligados.", is_correct: false },
        ]
      }
    ]
  },
  // MÓDULO 12
  "quiz_t7m12": {
    quiz: {
      id: "quiz_t7m12",
      title: "Avaliação do Módulo 12 — Rotinas especiais e encerramento",
      description: "Responda às questões para validar seus conhecimentos sobre rotinas de afastamentos e auditoria.",
      passing_score: 80,
      max_attempts: 99,
      is_final: false,
    },
    questions: [
      {
        id: "q_t7m12_1",
        question: "Como registrar o período de férias de um colaborador no Secullum Ponto Web?",
        explanation: "Registra-se um Afastamento no período com o motivo 'Férias' para fins de abono automático.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m12_1_a", option_text: "Apagando o funcionário do cadastro por 30 dias.", is_correct: false },
          { id: "o_t7m12_1_b", option_text: "Lançando um cadastro de Afastamento com o motivo 'Férias' no período correspondente.", is_correct: true },
          { id: "o_t7m12_1_c", option_text: "Alterando o horário do funcionário para folga contínua.", is_correct: false },
          { id: "o_t7m12_1_d", option_text: "Inserindo 4 batidas manuais de folga todo dia.", is_correct: false },
        ]
      },
      {
        id: "q_t7m12_2",
        question: "Qual recurso do Secullum registra e mostra quem fez cada alteração manual nos cartões?",
        explanation: "O menu de Auditoria/Logs de Auditoria registra as credenciais que realizaram modificações.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m12_2_a", option_text: "Relatório de Horas Extras.", is_correct: false },
          { id: "o_t7m12_2_b", option_text: "Logs de Auditoria do Sistema.", is_correct: true },
          { id: "o_t7m12_2_c", option_text: "Cadastro de Usuários.", is_correct: false },
          { id: "o_t7m12_2_d", option_text: "FAQ 1138.", is_correct: false },
        ]
      },
      {
        id: "q_t7m12_3",
        question: "Para que serve o ponto de restauração (ou backup) de configurações?",
        explanation: "Permite reverter configurações ou banco de dados a um estado anterior correto em caso de erros.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m12_3_a", option_text: "Para restaurar o sistema a um estado estável anterior em caso de erros.", is_correct: true },
          { id: "o_t7m12_3_b", option_text: "Para limpar o histórico de marcações de funcionários.", is_correct: false },
          { id: "o_t7m12_3_c", option_text: "Para resetar a senha de todos os funcionários.", is_correct: false },
          { id: "o_t7m12_3_d", option_text: "Para atualizar a tabela de feriados nacionais.", is_correct: false },
        ]
      },
      {
        id: "q_t7m12_4",
        question: "O que a nota explicativa do sistema ressalta sobre o 'FAQ 1138' ou recursos avançados do Secullum?",
        explanation: "O FAQ 1138 e outros recursos avançados exigem licenciamento ou cobrança adicional.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m12_4_a", option_text: "São recursos gratuitos inclusos na versão básica.", is_correct: false },
          { id: "o_t7m12_4_b", option_text: "São recursos opcionais avançados, cobrados à parte pelo comercial.", is_correct: true },
          { id: "o_t7m12_4_c", option_text: "São ilegais perante a Portaria 671.", is_correct: false },
          { id: "o_t7m12_4_d", option_text: "Foram descontinuados da plataforma.", is_correct: false },
        ]
      },
      {
        id: "q_t7m12_5",
        question: "Para emitir o certificado final de aptidão operacional promovido pela De Ponto a Ponto Ltda, o que é exigido?",
        explanation: "É necessária a conclusão das aulas (100%), preenchimento do checklist prático e aprovação na avaliação final.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: "o_t7m12_5_a", option_text: "Pagar uma taxa extra por PIX.", is_correct: false },
          { id: "o_t7m12_5_b", option_text: "Conclusão de todas as aulas (100% de progresso), checklist prático e aprovação na avaliação final.", is_correct: true },
          { id: "o_t7m12_5_c", option_text: "Apenas ler a primeira aula do manual.", is_correct: false },
          { id: "o_t7m12_5_d", option_text: "Assistir a todos os vídeos do suporte no YouTube.", is_correct: false },
        ]
      }
    ]
  }
};

export function getFallbackQuiz(quizId: string, moduleTitle: string): { quiz: Quiz; questions: Question[] } {
  return {
    quiz: {
      id: quizId,
      title: `Avaliação — ${moduleTitle || "Conteúdo do Módulo"}`,
      description: `Responda a este questionário de 5 perguntas para validar seu aprendizado no módulo de ${moduleTitle || "Treinamento"}.`,
      passing_score: 80,
      max_attempts: 99,
      is_final: false
    },
    questions: [
      {
        id: `${quizId}_q1`,
        question: `Qual é o principal objetivo das práticas apresentadas em '${moduleTitle || "este módulo"}'?`,
        explanation: "O foco principal é garantir o correto fluxo operacional e a conformidade.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: `${quizId}_q1_o1`, option_text: "Calcular salários incorretamente.", is_correct: false },
          { id: `${quizId}_q1_o2`, option_text: "Garantir o correto fluxo operacional, conformidade legal e autonomia no sistema.", is_correct: true },
          { id: `${quizId}_q1_o3`, option_text: "Substituir assessores contábeis.", is_correct: false },
          { id: `${quizId}_q1_o4`, option_text: "Nenhuma das alternativas anteriores.", is_correct: false }
        ]
      },
      {
        id: `${quizId}_q2`,
        question: "Como devemos tratar as pendências ou marcações atípicas apresentadas neste módulo?",
        explanation: "Ajustes manuais exigem justificativas claras para fins de rastreabilidade legal.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: `${quizId}_q2_o1`, option_text: "Ignorar e forçar o fechamento do período sem tratar.", is_correct: false },
          { id: `${quizId}_q2_o2`, option_text: "Revisar com atenção e aplicar a justificativa ou ajuste adequado mantendo o histórico.", is_correct: true },
          { id: `${quizId}_q2_o3`, option_text: "Excluir o funcionário do sistema para limpar o cartão.", is_correct: false },
          { id: `${quizId}_q2_o4`, option_text: "Apagar todas as batidas daquele funcionário no mês.", is_correct: false }
        ]
      },
      {
        id: `${quizId}_q3`,
        question: "O que a De Ponto a Ponto Ltda. recomenda para melhor fixar o aprendizado prático?",
        explanation: "Praticar de forma consultiva no Secullum em uma aba separada ajuda na fixação.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: `${quizId}_q3_o1`, option_text: "Apenas ler os títulos dos tópicos rapidamente.", is_correct: false },
          { id: `${quizId}_q3_o2`, option_text: "Executar os passos propostos no Secullum em uma aba paralela ou ambiente de testes.", is_correct: true },
          { id: `${quizId}_q3_o3`, option_text: "Assistir a vídeos de entretenimento em paralelo.", is_correct: false },
          { id: `${quizId}_q3_o4`, option_text: "Esperar a equipe de suporte realizar todo o fechamento por você.", is_correct: false }
        ]
      },
      {
        id: `${quizId}_q4`,
        question: "De quem é a responsabilidade final por validar as regras internas e convenções coletivas no sistema?",
        explanation: "As parametrizações operacionais devem respeitar as diretrizes da contabilidade ou assessoria jurídica da empresa.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: `${quizId}_q4_o1`, option_text: "Exclusiva da equipe de suporte do Secullum.", is_correct: false },
          { id: `${quizId}_q4_o2`, option_text: "Do RH/DP da empresa com a devida validação da contabilidade ou jurídico.", is_correct: true },
          { id: `${quizId}_q4_o3`, option_text: "Dos próprios colaboradores através do aplicativo.", is_correct: false },
          { id: `${quizId}_q4_o4`, option_text: "Da equipe de suporte de TI terceirizada.", is_correct: false }
        ]
      },
      {
        id: `${quizId}_q5`,
        question: "Caso surjam dúvidas operacionais complexas não cobertas pelo texto, qual canal acionar?",
        explanation: "O suporte técnico da De Ponto a Ponto está pronto para ajudar via WhatsApp ou e-mail.",
        question_type: "multiple_choice",
        points: 20,
        options: [
          { id: `${quizId}_q5_o1`, option_text: "Pesquisar em blogs não oficiais na internet.", is_correct: false },
          { id: `${quizId}_q5_o2`, option_text: "Acionar o canal de suporte oficial da De Ponto a Ponto Ltda. por WhatsApp ou e-mail.", is_correct: true },
          { id: `${quizId}_q5_o3`, option_text: "Abrir um chamado em redes sociais pessoais.", is_correct: false },
          { id: `${quizId}_q5_o4`, option_text: "Não buscar ajuda e manter o erro no cartão.", is_correct: false }
        ]
      }
    ]
  };
}
