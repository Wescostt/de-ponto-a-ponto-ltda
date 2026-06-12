// ─────────────────────────────────────────────────────────────────────────────
// Treinamentos.tsx — Central de treinamentos com integração Supabase
// De Ponto a Ponto — Portal do Cliente
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Plus, Search, Filter, BookMarked, Users, Wrench,
  GraduationCap, BarChart3, ArrowLeft, ChevronDown, ChevronUp, CheckCircle,
  PlayCircle, Lock, Award, FileText, ClipboardList, HelpCircle, Save, CheckSquare
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useLessonHeartbeat } from "@/hooks/useLessonHeartbeat";
import { TreinamentoQuizzes } from "@/components/treinamentos/TreinamentoQuizzes";
import { TreinamentoCertificates } from "@/components/treinamentos/TreinamentoCertificates";
import { MOCK_TRAININGS } from "@/components/treinamentos/trainingsData";

// Importações de Imagens dos Assets
import photoCampo from "@/assets/photo-campo.png";
import photoTreinamento from "@/assets/photo-treinamento.png";
import photoSuporte from "@/assets/photo-suporte.png";
import photoTecnologia from "@/assets/photo-tecnologia.png";
import photoTime from "@/assets/photo-time.jpeg";
import photoInstitucional from "@/assets/photo-institucional.png";

// Dicionário de Mapeamento de Lições do BD para Passos Detalhados dos Mocks
const LESSON_MAPPING: Record<string, { courseId: string; stepId: string }[]> = {
  "objetivo-da-trilha": [
    { courseId: "training-007", stepId: "t7s1" },
    { courseId: "training-007", stepId: "t7s2" },
    { courseId: "training-007", stepId: "t7s4" },
  ],
  "como-praticar-com-sistema-aberto": [
    { courseId: "training-007", stepId: "t7s3" },
    { courseId: "training-007", stepId: "t7s5" },
  ],
  "responsabilidade-operacional": [
    { courseId: "training-007", stepId: "t7s6" },
    { courseId: "training-007", stepId: "t7s7" },
    { courseId: "training-007", stepId: "t7s11" },
  ],
  "portaria-671-informativo": [
    { courseId: "training-007", stepId: "t7s8" },
    { courseId: "training-007", stepId: "t7s9" },
    { courseId: "training-007", stepId: "t7s10" },
  ],
  "visao-geral-ambiente": [
    { courseId: "training-007", stepId: "t7s12" },
    { courseId: "training-007", stepId: "t7s13" },
    { courseId: "training-007", stepId: "t7s14" },
    { courseId: "training-007", stepId: "t7s15" },
  ],
  "cadastro-funcionarios": [
    { courseId: "training-007", stepId: "t7s19" },
    { courseId: "training-007", stepId: "t7s20" },
  ],
  "cadastro-departamentos": [
    { courseId: "training-007", stepId: "t7s17" },
    { courseId: "training-007", stepId: "t7s18" },
    { courseId: "training-007", stepId: "t7s21" },
    { courseId: "training-007", stepId: "t7s22" },
  ],
  "horarios-jornadas": [
    { courseId: "training-007", stepId: "t7s23" },
    { courseId: "training-007", stepId: "t7s24" },
    { courseId: "training-007", stepId: "t7s26" },
    { courseId: "training-007", stepId: "t7s27" },
  ],
  "escalas-e-feriados": [
    { courseId: "training-007", stepId: "t7s25" },
    { courseId: "training-007", stepId: "t7s28" },
    { courseId: "training-007", stepId: "t7s29" },
    { courseId: "training-007", stepId: "t7s30" },
  ],
  "origem-das-marcacoes": [
    { courseId: "training-007", stepId: "t7s31" },
    { courseId: "training-007", stepId: "t7s32" },
    { courseId: "training-007", stepId: "t7s37" },
  ],
  "tratamento-inconsistencias": [
    { courseId: "training-007", stepId: "t7s33" },
    { courseId: "training-007", stepId: "t7s34" },
    { courseId: "training-007", stepId: "t7s35" },
    { courseId: "training-007", stepId: "t7s36" },
  ],
  "conceitos-banco-horas": [
    { courseId: "training-007", stepId: "t7s52" },
    { courseId: "training-007", stepId: "t7s53" },
    { courseId: "training-007", stepId: "t7s54" },
    { courseId: "training-007", stepId: "t7s55" },
  ],
  "interpretar-bsaldo": [
    { courseId: "training-007", stepId: "t7s56" },
    { courseId: "training-007", stepId: "t7s57" },
    { courseId: "training-007", stepId: "t7s58" },
  ],
  "boas-praticas-facial": [
    { courseId: "training-007", stepId: "t7s38" },
    { courseId: "training-007", stepId: "t7s39" },
    { courseId: "training-007", stepId: "t7s40" },
    { courseId: "training-007", stepId: "t7s41" },
    { courseId: "training-007", stepId: "t7s42" },
    { courseId: "training-007", stepId: "t7s43" },
    { courseId: "training-007", stepId: "t7s44" },
  ],
  "espelho-de-ponto": [
    { courseId: "training-007", stepId: "t7s59" },
    { courseId: "training-007", stepId: "t7s60" },
    { courseId: "training-007", stepId: "t7s61" },
    { courseId: "training-007", stepId: "t7s62" },
    { courseId: "training-007", stepId: "t7s63" },
    { courseId: "training-007", stepId: "t7s64" },
    { courseId: "training-007", stepId: "t7s65" },
  ],
  "checklist-fechamento": [
    { courseId: "training-007", stepId: "t7s66" },
    { courseId: "training-007", stepId: "t7s67" },
    { courseId: "training-007", stepId: "t7s68" },
    { courseId: "training-007", stepId: "t7s69" },
    { courseId: "training-007", stepId: "t7s70" },
    { courseId: "training-007", stepId: "t7s71" },
    { courseId: "training-007", stepId: "t7s72" },
  ],
  "ferias-afastamentos-abonos": [
    { courseId: "training-007", stepId: "t7s73" },
    { courseId: "training-007", stepId: "t7s74" },
    { courseId: "training-007", stepId: "t7s75" },
  ],
  "erros-comuns": [
    { courseId: "training-007", stepId: "t7s16" },
    { courseId: "training-007", stepId: "t7s51" },
    { courseId: "training-007", stepId: "t7s76" },
    { courseId: "training-007", stepId: "t7s77" },
    { courseId: "training-007", stepId: "t7s78" },
  ],
  "orientacoes-avaliacao": [
    { courseId: "training-007", stepId: "t7s79" },
    { courseId: "training-007", stepId: "t7s80" },
  ],
};


// ── Badges Auxiliares ────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, { bg: string; text: string }> = {
    draft: { bg: "bg-slate-500/10 text-slate-400 border-slate-500/20", text: "Rascunho" },
    published: { bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", text: "Publicado" },
    completed: { bg: "bg-blue-500/10 text-blue-400 border-blue-500/20", text: "Concluído" },
    in_progress: { bg: "bg-amber-500/10 text-amber-400 border-amber-500/20", text: "Em Andamento" },
  };
  const s = styles[status] || styles.draft;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${s.bg}`}>
      {s.text}
    </span>
  );
};

export default function Treinamentos() {
  const { user, profile, isApproved, isGestorMaster, isAdmin } = useAuth();
  const { toast } = useToast();

  // Estados Globais de Navegação
  const [activeTab, setActiveTab] = useState<"student" | "admin">("student");
  const [courses, setCourses] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<Record<string, any>>({});
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [lessons, setLessons] = useState<Record<string, any[]>>({}); // moduleId -> lessons
  const [lessonProgress, setLessonProgress] = useState<Record<string, any>>({}); // lessonId -> progress
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const [activeLessonTab, setActiveLessonTab] = useState<"content" | "material" | "checklist" | "notes" | "quiz">("content");

  // Checklists e Respostas
  const [checklists, setChecklists] = useState<Record<string, any>>({}); // lessonId -> checklist
  const [checklistResponses, setChecklistResponses] = useState<Record<string, boolean>>({}); // checklistItemId -> checked
  const [quizAttempts, setQuizAttempts] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [selectedCertificateId, setSelectedCertificateId] = useState<string | null>(null);
  const [finalQuizId, setFinalQuizId] = useState<string | null>(null);

  // Anotações
  const [noteBody, setNoteBody] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  // Painel Admin / Master
  const [adminEnrollments, setAdminEnrollments] = useState<any[]>([]);
  const [adminRequests, setAdminRequests] = useState<any[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);

  // Estados Visuais e Filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Heartbeat hooks
  const activeEnrollment = selectedCourse ? enrollments[selectedCourse.id] : null;
  const { activeSeconds, scrollPercent } = useLessonHeartbeat({
    enrollmentId: activeEnrollment?.id,
    lessonId: selectedLesson?.id,
    enabled: !!selectedLesson && !!activeEnrollment && activeLessonTab === "content" && !selectedCourse?.is_mock
  });

  // Local state para cursos mockados
  const [mockActiveSeconds, setMockActiveSeconds] = useState(0);
  const [mockScrollPercent, setMockScrollPercent] = useState(0);

  useEffect(() => {
    if (selectedCourse?.is_mock && selectedLesson && activeLessonTab === "content") {
      setMockActiveSeconds(0);
      const interval = setInterval(() => {
        setMockActiveSeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedCourse, selectedLesson, activeLessonTab]);

  useEffect(() => {
    if (selectedCourse?.is_mock && selectedLesson && activeLessonTab === "content") {
      setMockScrollPercent(0);
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const pct = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 100;
        setMockScrollPercent((prev) => Math.max(prev, Math.min(pct, 100)));
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [selectedCourse, selectedLesson, activeLessonTab]);

  // Carregar dados principais
  const loadInitialData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // 1. Buscar cursos publicados
      const { data: cData, error: cErr } = await supabase
        .from("training_courses" as any)
        .select("*")
        .eq("status", "published")
        .order("sort_order", { ascending: true });

      if (cErr) throw cErr;

      // Mapear cursos mockados para o formato de exibição
      const mappedMockCourses = MOCK_TRAININGS.map(mt => ({
        id: mt.id,
        slug: mt.id,
        title: mt.title,
        subtitle: mt.objective,
        description: mt.description,
        estimated_minutes: parseInt(mt.estimatedTime) || 60,
        status: mt.status,
        sort_order: 100,
        is_mock: true,
        modules: mt.modules,
        prerequisites: mt.prerequisites,
        objective: mt.objective,
        audience: mt.audience
      }));

      const dbCourses = cData || [];
      const dbSlugs = new Set(dbCourses.map((c: any) => c.slug));
      const activeMockCourses = mappedMockCourses.filter(mc => !dbSlugs.has(mc.slug));

      setCourses([...dbCourses, ...activeMockCourses]);

      // 2. Buscar matrículas do usuário
      const { data: eData, error: eErr } = await supabase
        .from("training_enrollments" as any)
        .select("*")
        .eq("user_id", user.id);

      if (eErr) throw eErr;
      const eMap: Record<string, any> = {};
      (eData || []).forEach((e) => {
        eMap[e.course_id] = e;
      });

      // Carregar matrículas mockadas do localStorage
      MOCK_TRAININGS.forEach((mt) => {
        const saved = localStorage.getItem(`dpp_mock_enrollment_${mt.id}`);
        if (saved) {
          eMap[mt.id] = JSON.parse(saved);
        }
      });

      setEnrollments(eMap);

      // 3. Buscar certificados do usuário
      const { data: certData, error: certErr } = await supabase
        .from("training_certificates" as any)
        .select("*")
        .eq("user_id", user.id);

      if (!certErr && certData) {
        setCertificates(certData);
      }
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erro ao carregar treinamentos",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, [user]);

  // Helper para salvar progresso mockado no localStorage
  const saveMockEnrollment = (courseId: string, enrollment: any) => {
    localStorage.setItem(`dpp_mock_enrollment_${courseId}`, JSON.stringify(enrollment));
    setEnrollments(prev => ({ ...prev, [courseId]: enrollment }));
  };

// Encontrar a aula correspondente em MOCK_TRAININGS
const findMockLesson = (courseSlug: string, lessonSlug: string, lessonTitle: string) => {
  const mockCourse = MOCK_TRAININGS.find(c => c.id === courseSlug || (courseSlug === 'secullum-ponto-web-ultimate' && c.id === 'training-007'));
  if (!mockCourse) return null;
  for (const m of mockCourse.modules) {
    const step = m.steps.find(s => s.id === lessonSlug || s.title === lessonTitle);
    if (step) return step;
  }
  return null;
};

  const isModuleLocked = (moduleIndex: number, currentModules: any[], currentLessons: Record<string, any[]>, currentProgress: Record<string, any>) => {
    if (moduleIndex === 0) return false;
    const prevModule = currentModules[moduleIndex - 1];
    if (!prevModule) return false;
    const prevModuleLessons = currentLessons[prevModule.id] || [];
    const prevModuleQuiz = prevModuleLessons.find(l => l.content_type === "modulo_quiz");
    if (!prevModuleQuiz) return false;
    return currentProgress[prevModuleQuiz.id]?.status !== "completed";
  };

  // Carregar módulos e aulas de um curso selecionado
  const loadCourseDetails = async (course: any) => {
    try {
      setLoading(true);
      if (course.is_mock) {
        // Mapear módulos do curso mockado
        const mockModules = (course.modules || []).map((m: any) => ({
          id: m.id,
          course_id: course.id,
          title: m.title,
          description: m.description,
          sort_order: 1,
        }));
        setModules(mockModules);

        // Expandir o primeiro módulo
        if (mockModules.length > 0) {
          setExpandedModules({ [mockModules[0].id]: true });
        }

        // Mapear aulas (steps) para cada módulo
        const lMap: Record<string, any[]> = {};
        const chkDataMap: Record<string, any> = {};

        (course.modules || []).forEach((m: any) => {
          const moduleLessonsList = (m.steps || []).map((s: any, idx: number) => {
            const lessonId = `${m.id}_step_${s.id}`;
            
            // Mapear checklist do módulo na última etapa
            if (idx === m.steps.length - 1 && m.checklist && m.checklist.length > 0) {
              chkDataMap[lessonId] = {
                id: `chk_${m.id}`,
                lesson_id: lessonId,
                training_checklist_items: m.checklist.map((c: string, ci: number) => ({
                  id: `chk_item_${m.id}_${ci}`,
                  title: c,
                  is_required: true,
                }))
              };
            }

            let contentMd = `## ${s.title}\n\n`;
            if (s.id === "t7s1" || s.id === "t7s2") {
              contentMd += `![Painel do Secullum Ponto Web e Configurações de Acesso](photo-treinamento)\n\n`;
            } else if (s.id === "t7s6") {
              contentMd += `![Auditoria e Segurança Operacional do DP](photo-tecnologia)\n\n`;
            } else if (s.id === "t7s3") {
              contentMd += `![Estudo Prático em Duas Abas](photo-campo)\n\n`;
            } else if (s.id === "t7s38") {
              contentMd += `![Posicionamento Correto e Iluminação para Biometria Facial](photo-time)\n\n`;
            } else if (s.id === "t7s16") {
              contentMd += `![Suporte Técnico De Ponto a Ponto](photo-suporte)\n\n`;
            }
            contentMd += `${s.description}${s.importantNote ? `\n\n### Observação importante\n\n${s.importantNote}` : ""}`;

            return {
              id: lessonId,
              module_id: m.id,
              slug: s.id,
              title: s.title,
              content_type: "leitura",
              content_md: contentMd,
              estimated_minutes: 5,
              required_active_seconds: 10,
              required_scroll_percent: 70,
              sort_order: idx + 1,
              is_required: true,
              is_published: true,
              is_mock: true
            };
          });

          // Injetar a aula de questionário ao final de cada módulo
          const quizLessonId = `quiz_${m.id}`;
          moduleLessonsList.push({
            id: quizLessonId,
            module_id: m.id,
            slug: `quiz_${m.id}`,
            title: `Questionário de Fixação — Módulo ${m.title.replace(/Módulo\s*\d+\s*—\s*/gi, "")}`,
            content_type: "modulo_quiz",
            content_md: `Responda a este questionário de 5 perguntas para validar seu aprendizado no módulo de ${m.title} e liberar o próximo módulo.`,
            estimated_minutes: 10,
            required_active_seconds: 0,
            required_scroll_percent: 0,
            sort_order: moduleLessonsList.length + 1,
            is_required: true,
            is_published: true,
            is_mock: true
          });

          lMap[m.id] = moduleLessonsList;
        });

        setLessons(lMap);
        setChecklists(chkDataMap);

        // Carregar progresso mockado do localStorage
        const mockProg = localStorage.getItem(`dpp_mock_progress_${course.id}`);
        if (mockProg) {
          setLessonProgress(JSON.parse(mockProg));
        } else {
          setLessonProgress({});
        }

        // Carregar checklist mockado do localStorage
        const mockChkRes = localStorage.getItem(`dpp_mock_checklist_${course.id}`);
        if (mockChkRes) {
          setChecklistResponses(JSON.parse(mockChkRes));
        } else {
          setChecklistResponses({});
        }
        setLoading(false);
        return;
      }

      // Módulos
      const { data: mData, error: mErr } = await supabase
        .from("training_modules" as any)
        .select("*")
        .eq("course_id", course.id)
        .order("sort_order", { ascending: true });

      if (mErr) throw mErr;
      setModules(mData || []);

      // Expandir primeiro módulo por padrão
      if (mData && mData.length > 0) {
        setExpandedModules({ [mData[0].id]: true });
      }

      // Aulas para cada módulo
      const { data: lData, error: lErr } = await supabase
        .from("training_lessons" as any)
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (lErr) throw lErr;

      const lMap: Record<string, any[]> = {};
      (lData || []).forEach((l) => {
        if (!lMap[l.module_id]) lMap[l.module_id] = [];
        
        // Enriquecer com o conteúdo detalhado mockado mapeado
        const mappedSteps = LESSON_MAPPING[l.slug];
        if (mappedSteps && mappedSteps.length > 0) {
          let combinedContent = `## ${l.title}\n\n${l.subtitle || ""}\n\n`;
          
          // Adicionar imagens ilustrativas específicas baseadas na aula
          if (l.slug === "visao-geral-ambiente") {
            combinedContent += `![Painel do Secullum Ponto Web e Configurações de Acesso](photo-treinamento)\n\n`;
          } else if (l.slug === "responsabilidade-operacional") {
            combinedContent += `![Auditoria e Segurança Operacional do DP](photo-tecnologia)\n\n`;
          } else if (l.slug === "como-praticar-com-sistema-aberto") {
            combinedContent += `![Estudo Prático em Duas Abas](photo-campo)\n\n`;
          } else if (l.slug === "boas-praticas-facial") {
            combinedContent += `![Posicionamento Correto e Iluminação para Biometria Facial](photo-time)\n\n`;
          } else if (l.slug === "erros-comuns") {
            combinedContent += `![Suporte Técnico De Ponto a Ponto](photo-suporte)\n\n`;
          }

          mappedSteps.forEach((mStep) => {
            const step = findMockLesson(mStep.courseId, mStep.stepId, "");
            if (step) {
              combinedContent += `### ${step.title}\n\n${step.description}\n\n`;
              if (step.importantNote) {
                combinedContent += `*Observação importante:* ${step.importantNote}\n\n`;
              }
            }
          });
          l.content_md = combinedContent;
        } else {
          // Fallback se não estiver no mapeamento explícito
          if (!l.content_md) {
            const mockStep = findMockLesson(course.slug, l.slug, l.title);
            if (mockStep) {
              l.content_md = `## ${mockStep.title}\n\n${mockStep.description}${mockStep.importantNote ? `\n\n### Observação importante\n\n${mockStep.importantNote}` : ""}`;
            }
          }
        }
        
        lMap[l.module_id].push(l);
      });

      // Injetar questionário em cada módulo do banco de dados
      (mData || []).forEach((m: any) => {
        const moduleLessons = lMap[m.id] || [];
        const hasQuiz = moduleLessons.some(l => l.content_type === "modulo_quiz");
        if (!hasQuiz) {
          const quizLessonId = `quiz_${m.id}`;
          moduleLessons.push({
            id: quizLessonId,
            module_id: m.id,
            slug: `quiz_${m.id}`,
            title: `Questionário de Fixação — Módulo ${m.title.replace(/Módulo\s*\d+\s*—\s*/gi, "")}`,
            content_type: "modulo_quiz",
            content_md: `Responda a este questionário de 5 perguntas para validar seu aprendizado no módulo de ${m.title} e liberar o próximo módulo.`,
            estimated_minutes: 10,
            required_active_seconds: 0,
            required_scroll_percent: 0,
            sort_order: moduleLessons.length + 1,
            is_required: true,
            is_published: true,
            is_mock: false
          });
          lMap[m.id] = moduleLessons;
        }
      });
      setLessons(lMap);

      // Progresso de aulas se estiver matriculado
      const enrollment = enrollments[course.id];
      if (enrollment) {
        const { data: pData, error: pErr } = await supabase
          .from("training_lesson_progress" as any)
          .select("*")
          .eq("enrollment_id", enrollment.id);

        const pMap: Record<string, any> = {};
        if (!pErr && pData) {
          pData.forEach((p) => {
            pMap[p.lesson_id] = p;
          });
        }

        // Mesclar progresso local (que guarda as conclusões dos quizzes do módulo)
        const mockProg = localStorage.getItem(`dpp_mock_progress_${course.id}`);
        if (mockProg) {
          const parsed = JSON.parse(mockProg);
          Object.keys(parsed).forEach(k => {
            if (k.startsWith("quiz_") || !pMap[k]) {
              pMap[k] = parsed[k];
            }
          });
        }

        setLessonProgress(pMap);

        // Respostas de checklist
        const { data: chkData, error: chkErr } = await supabase
          .from("training_checklist_responses" as any)
          .select("checklist_item_id, checked")
          .eq("enrollment_id", enrollment.id);

        if (!chkErr && chkData) {
          const chkMap: Record<string, boolean> = {};
          chkData.forEach((c) => {
            chkMap[c.checklist_item_id] = c.checked;
          });
          setChecklistResponses(chkMap);
        }
      }

      // Buscar quiz final
      const { data: qData, error: qErr } = await supabase
        .from("training_quizzes" as any)
        .select("id")
        .eq("course_id", course.id)
        .eq("is_final", true)
        .maybeSingle();

      if (!qErr && qData) {
        setFinalQuizId(qData.id);
      } else {
        setFinalQuizId(null);
      }
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erro ao carregar detalhes do curso",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCourse) {
      loadCourseDetails(selectedCourse);
    }
  }, [selectedCourse, enrollments]);

  // Carregar dados de suporte de aula (checklist, anotações, quiz)
  useEffect(() => {
    if (selectedLesson && activeEnrollment) {
      // 1. Carregar Checklists vinculados a esta aula
      const fetchChecklist = async () => {
        const { data, error } = await supabase
          .from("training_checklists" as any)
          .select("*, training_checklist_items(*)")
          .eq("lesson_id", selectedLesson.id)
          .maybeSingle();

        if (!error && data) {
          setChecklists((prev: any) => ({ ...prev, [selectedLesson.id]: data }));
        } else if (selectedCourse) {
          // Fallback para checklist mockado se o curso tem correspondente em MOCK_TRAININGS
          const mockCourse = MOCK_TRAININGS.find(c => c.id === selectedCourse.slug || c.id === selectedCourse.id);
          if (mockCourse) {
            const mockModule = mockCourse.modules.find(m => m.id === selectedLesson.module_id || selectedLesson.id.startsWith(m.id));
            if (mockModule && mockModule.checklist && mockModule.checklist.length > 0) {
              const moduleLessons = lessons[selectedLesson.module_id] || [];
              const readingLessons = moduleLessons.filter(l => l.content_type !== "modulo_quiz");
              const isLastReading = readingLessons.length > 0 && readingLessons[readingLessons.length - 1].id === selectedLesson.id;
              
              if (isLastReading) {
                setChecklists((prev: any) => ({
                  ...prev,
                  [selectedLesson.id]: {
                    id: `chk_${mockModule.id}`,
                    lesson_id: selectedLesson.id,
                    training_checklist_items: mockModule.checklist!.map((c: string, ci: number) => ({
                      id: `chk_item_${mockModule.id}_${ci}`,
                      title: c,
                      is_required: true,
                    }))
                  }
                }));
              }
            }
          }
        }
      };

      // 2. Carregar Anotações do usuário para esta aula
      const fetchNotes = async () => {
        const { data, error } = await supabase
          .from("training_notes" as any)
          .select("body")
          .eq("lesson_id", selectedLesson.id)
          .eq("user_id", user?.id)
          .maybeSingle();

        if (!error && data) {
          setNoteBody(data.body || "");
        } else {
          setNoteBody("");
        }
      };

      fetchChecklist();
      fetchNotes();
      setActiveLessonTab("content");
    }
  }, [selectedLesson, activeEnrollment]);

  // Carregar dados administrativos
  const loadAdminData = async () => {
    setAdminLoading(true);
    try {
      // Buscar todas as matrículas
      const { data: enrollData, error: enrollErr } = await supabase
        .from("training_enrollments" as any)
        .select("*, profiles(full_name, email), companies(name)")
        .order("created_at", { ascending: false });

      if (enrollErr) throw enrollErr;
      setAdminEnrollments(enrollData || []);

      // Buscar solicitações de certificados finais
      const { data: certData, error: certErr } = await supabase
        .from("training_certificates" as any)
        .select("*, profiles(full_name), companies(name)")
        .eq("certificate_type", "final")
        .order("requested_at", { ascending: false });

      if (certErr) throw certErr;
      setAdminRequests(certData || []);
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erro ao carregar dados de gestão",
        description: err.message,
      });
    } finally {
      setAdminLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "admin" && (isAdmin || isGestorMaster)) {
      loadAdminData();
    }
  }, [activeTab]);

  // Matricular usuário em um curso
  const handleEnroll = async (courseId: string) => {
    if (!user) return;
    const course = courses.find(c => c.id === courseId);
    if (course?.is_mock) {
      const mockEnrollment = {
        id: `mock_enrollment_${courseId}`,
        course_id: courseId,
        user_id: user.id,
        status: "in_progress",
        progress_percent: 0,
        started_at: new Date().toISOString(),
      };
      saveMockEnrollment(courseId, mockEnrollment);
      toast({
        title: "Matrícula realizada!",
        description: "Treinamento iniciado localmente.",
      });
      return;
    }
    try {
      const { data, error } = await supabase
        .from("training_enrollments" as any)
        .insert({
          course_id: courseId,
          user_id: user.id,
          company_id: profile?.company_id,
          status: "not_started",
          progress_percent: 0,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Matrícula realizada!",
        description: "Treinamento acessível a partir de agora.",
      });

      // Atualizar local
      setEnrollments((prev) => ({ ...prev, [courseId]: data }));
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erro ao matricular",
        description: err.message,
      });
    }
  };

  // Salvar nota
  const handleSaveNote = async () => {
    if (!user || !selectedLesson) return;
    setSavingNote(true);
    try {
      const { error } = await supabase
        .from("training_notes" as any)
        .upsert(
          {
            user_id: user.id,
            lesson_id: selectedLesson.id,
            body: noteBody,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,lesson_id" } as any
        );

      if (error) throw error;
      toast({ title: "Anotação salva com sucesso!" });
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erro ao salvar anotação",
        description: err.message,
      });
    } finally {
      setSavingNote(false);
    }
  };

  // Preencher itens de checklist
  const handleChecklistItemToggle = async (itemId: string, checked: boolean) => {
    if (selectedCourse?.is_mock) {
      const updated = { ...checklistResponses, [itemId]: checked };
      setChecklistResponses(updated);
      localStorage.setItem(`dpp_mock_checklist_${selectedCourse.id}`, JSON.stringify(updated));
      return;
    }
    if (!activeEnrollment || !user) return;
    try {
      // Salvar a resposta no Supabase
      const { error } = await supabase
        .from("training_checklist_responses" as any)
        .upsert(
          {
            enrollment_id: activeEnrollment.id,
            checklist_item_id: itemId,
            user_id: user.id,
            checked,
            completed_at: checked ? new Date().toISOString() : null,
          },
          { onConflict: "enrollment_id,checklist_item_id" } as any
        );

      if (error) throw error;

      setChecklistResponses((prev) => ({ ...prev, [itemId]: checked }));
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erro ao salvar resposta do checklist",
        description: err.message,
      });
    }
  };

  // Concluir Aula
  const handleCompleteLesson = async () => {
    const isMockOrQuiz = selectedCourse?.is_mock || selectedLesson?.content_type === "modulo_quiz";
    if (isMockOrQuiz && selectedLesson && activeEnrollment && selectedCourse) {
      const newProgress = {
        ...lessonProgress,
        [selectedLesson.id]: {
          status: "completed",
          completed_at: new Date().toISOString(),
        }
      };
      setLessonProgress(newProgress);
      localStorage.setItem(`dpp_mock_progress_${selectedCourse.id}`, JSON.stringify(newProgress));

      // Calcular progresso do curso (incluindo a aula de questionário)
      const totalLessonsList = Object.values(lessons).flat();
      const completedCount = totalLessonsList.filter(l => newProgress[l.id]?.status === "completed").length;
      const progressPercent = totalLessonsList.length > 0 ? (completedCount / totalLessonsList.length) * 100 : 0;

      const updatedEnrollment = {
        ...activeEnrollment,
        progress_percent: progressPercent,
        status: progressPercent >= 100 ? "completed" : "in_progress",
        completed_at: progressPercent >= 100 ? new Date().toISOString() : null,
      };

      if (selectedCourse.is_mock) {
        saveMockEnrollment(selectedCourse.id, updatedEnrollment);
      } else {
        // Se for curso de banco de dados, atualizar a matrícula no Supabase
        await supabase
          .from("training_enrollments" as any)
          .update({
            progress_percent: progressPercent,
            status: progressPercent >= 100 ? "completed" : "in_progress",
            completed_at: progressPercent >= 100 ? new Date().toISOString() : null,
          })
          .eq("id", activeEnrollment.id);

        setEnrollments(prev => ({ ...prev, [selectedCourse.id]: updatedEnrollment }));
      }

      toast({
        title: "Etapa Concluída!",
        description: "Seu progresso foi computado com sucesso.",
      });
      return;
    }
    if (!activeEnrollment || !selectedLesson) return;
    try {
      const { data, error } = await supabase.rpc("training_complete_lesson", {
        _enrollment_id: activeEnrollment.id,
        _lesson_id: selectedLesson.id,
      });

      if (error) throw error;

      toast({
        title: "Aula Concluída!",
        description: "Progresso computado.",
      });

      // Atualizar local
      setLessonProgress((prev) => ({ ...prev, [selectedLesson.id]: data }));

      // Calcular progresso incluindo possíveis quizzes locais concluídos
      const totalLessonsList = Object.values(lessons).flat();
      const newProgress = { ...lessonProgress, [selectedLesson.id]: data };
      const completedCount = totalLessonsList.filter(l => newProgress[l.id]?.status === "completed").length;
      const progressPercent = totalLessonsList.length > 0 ? (completedCount / totalLessonsList.length) * 100 : 0;

      // Atualizar progresso geral de matrículas
      const { data: updatedEnroll, error: enrollErr } = await supabase
        .from("training_enrollments" as any)
        .select("*")
        .eq("id", activeEnrollment.id)
        .single();

      if (!enrollErr && updatedEnroll) {
        setEnrollments((prev) => ({ ...prev, [selectedCourse.id]: updatedEnroll }));
      }
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Requisitos não atingidos",
        description: err.message || "Verifique tempo de leitura e checklists pendentes.",
      });
    }
  };

  // Solicitar Certificado Final
  const handleRequestFinalCertificate = async () => {
    if (!user || !selectedCourse || !activeEnrollment) return;
    try {
      const companyName = profile?.company_id ? "Empresa Vinculada" : "Geral";
      const { error } = await supabase
        .from("training_certificates" as any)
        .insert({
          certificate_type: "final",
          status: "requested",
          course_id: selectedCourse.id,
          enrollment_id: activeEnrollment.id,
          user_id: user.id,
          company_id: profile?.company_id,
          certificate_title: "Certificado de Aptidão Operacional",
          certificate_text: `Certificamos que ${profile?.full_name || "Colaborador"}, vinculado à empresa ${profile?.company_id || "De Ponto a Ponto"}, concluiu o Treinamento Secullum Ponto Web promovido pela De Ponto a Ponto Ltda., demonstrando aptidão operacional para utilizar o sistema de ponto no ambiente da empresa, conforme conteúdo aplicado, checklists práticos e avaliação final.`,
          requested_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast({
        title: "Certificado Solicitado!",
        description: "Aguardando aprovação ou liberação técnica do administrador.",
      });

      // Recarregar certificados
      const { data: certs } = await supabase
        .from("training_certificates" as any)
        .select("*")
        .eq("user_id", user.id);
      if (certs) setCertificates(certs);
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erro ao solicitar certificado",
        description: err.message,
      });
    }
  };

  // Administrador: Aprovar / Emitir Certificado
  const handleApproveCertificate = async (certId: string) => {
    try {
      const { error } = await supabase
        .from("training_certificates" as any)
        .update({
          status: "issued",
          issued_at: new Date().toISOString(),
          approved_at: new Date().toISOString(),
          approved_by: user?.id,
        })
        .eq("id", certId);

      if (error) throw error;
      toast({ title: "Certificado emitido com sucesso!" });
      loadAdminData();
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erro ao aprovar",
        description: err.message,
      });
    }
  };

  // ── PROCESSAR CONTEÚDO MD ──────────────────────────────────────────────────
  const renderSimpleMD = (mdText: string) => {
    if (!mdText) return null;
    const lines = mdText.split("\n");
    let inList = false;
    let listItems: React.ReactNode[] = [];
    const elements: React.ReactNode[] = [];

    const flushList = (key: string | number) => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-5 space-y-1.5 my-3 text-sm text-slate-300">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    const parseInlineStyles = (text: string) => {
      const parts = text.split(/\*\*([^*]+)\*\*/g);
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          return <strong key={index} className="font-bold text-slate-100">{part}</strong>;
        }
        return part;
      });
    };

    const getAssetUrl = (path: string) => {
      const p = path.toLowerCase();
      if (p.includes("photo-campo")) return photoCampo;
      if (p.includes("photo-treinamento")) return photoTreinamento;
      if (p.includes("photo-suporte")) return photoSuporte;
      if (p.includes("photo-tecnologia")) return photoTecnologia;
      if (p.includes("photo-time")) return photoTime;
      if (p.includes("photo-institucional")) return photoInstitucional;
      return path;
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("## ")) {
        flushList(idx);
        elements.push(
          <h2 key={idx} className="text-xl font-bold text-slate-100 mt-6 mb-3 border-b border-border/30 pb-2 flex items-center gap-2">
            {parseInlineStyles(trimmed.replace("## ", ""))}
          </h2>
        );
        return;
      }

      if (trimmed.startsWith("### ")) {
        flushList(idx);
        const headerText = trimmed.replace("### ", "");
        const isDica = headerText.toLowerCase().includes("dica");
        const isNote = headerText.toLowerCase().includes("observação") || headerText.toLowerCase().includes("nota");
        elements.push(
          <h3
            key={idx}
            className={`text-md font-semibold mt-5 mb-2.5 flex items-center gap-1.5 ${
              isDica ? "text-primary font-bold border-l-2 border-primary pl-2" : isNote ? "text-amber-400" : "text-slate-200"
            }`}
          >
            {parseInlineStyles(headerText)}
          </h3>
        );
        return;
      }

      if (trimmed.startsWith("![") && trimmed.includes("](") && trimmed.endsWith(")")) {
        flushList(idx);
        const altMatch = trimmed.match(/!\[(.*?)\]/);
        const urlMatch = trimmed.match(/\((.*?)\)/);
        if (urlMatch) {
          const alt = altMatch ? altMatch[1] : "";
          const url = urlMatch[1];
          elements.push(
            <div key={idx} className="my-6 rounded-xl overflow-hidden border border-border bg-muted/20 p-2 max-w-2xl mx-auto shadow-md">
              <img src={getAssetUrl(url)} alt={alt} className="w-full h-auto rounded-lg object-cover" />
              {alt && <span className="block text-center text-xs text-muted-foreground mt-2 italic">{alt}</span>}
            </div>
          );
          return;
        }
      }

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        inList = true;
        const itemText = trimmed.substring(2);
        listItems.push(
          <li key={`li-${idx}`} className="text-sm text-slate-300 leading-relaxed">
            {parseInlineStyles(itemText)}
          </li>
        );
        return;
      }

      if (trimmed === "") {
        flushList(idx);
        elements.push(<div key={idx} className="h-2" />);
        return;
      }

      flushList(idx);
      const isImportantNote = trimmed.startsWith("*Observação importante:*") || trimmed.startsWith("Observação importante:");
      if (isImportantNote) {
        elements.push(
          <div key={idx} className="my-4 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl text-xs leading-relaxed flex gap-2.5">
            <span className="font-bold shrink-0">⚠️ NOTA:</span>
            <span>{parseInlineStyles(trimmed.replace(/^\*Observação importante:\*\s*|^\s*Observação importante:\s*/i, ""))}</span>
          </div>
        );
      } else {
        elements.push(
          <p key={idx} className="text-sm leading-relaxed text-slate-300 mb-2">
            {parseInlineStyles(trimmed)}
          </p>
        );
      }
    });

    flushList("end");
    return elements;
  };

  // Filtro de cursos
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        !searchQuery ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
  }, [courses, searchQuery]);

  // Validar se o usuário pode acessar a área (pendente ou aprovado)
  if (!isApproved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-card border border-border/50 rounded-2xl max-w-md mx-auto my-12">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-lg font-bold text-foreground mb-2">Acesso Pendente de Aprovação</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Seu cadastro na plataforma De Ponto a Ponto Ltda. ainda está em análise por nossa equipe administrativa. 
          Assim que for aprovado, o acesso aos treinamentos será liberado.
        </p>
      </div>
    );
  }

  // ── TELA DE VISUALIZAÇÃO DE CERTIFICADO EM DESTAQUE ─────────────────────────
  if (selectedCertificateId) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <TreinamentoCertificates
          certificateId={selectedCertificateId}
          onBack={() => setSelectedCertificateId(null)}
        />
      </div>
    );
  }

  // ── VISÃO DO ADMINISTRADOR / MASTER ─────────────────────────────────────────
  if (activeTab === "admin" && (isAdmin || isGestorMaster)) {
    return (
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestão de Treinamentos</h1>
            <p className="text-sm text-muted-foreground">Monitore o progresso dos usuários e gerencie emissões de certificados.</p>
          </div>
          <Button onClick={() => setActiveTab("student")} variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Área do Aluno
          </Button>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-card border border-border/50 rounded-xl">
            <span className="block text-2xl font-bold text-foreground">{adminEnrollments.length}</span>
            <span className="text-xs text-muted-foreground">Total de Matrículas</span>
          </div>
          <div className="p-5 bg-card border border-border/50 rounded-xl">
            <span className="block text-2xl font-bold text-foreground">
              {adminRequests.filter((r) => r.status === "requested").length}
            </span>
            <span className="text-xs text-muted-foreground">Solicitações Pendentes</span>
          </div>
          <div className="p-5 bg-card border border-border/50 rounded-xl">
            <span className="block text-2xl font-bold text-foreground">
              {adminRequests.filter((r) => r.status === "issued").length}
            </span>
            <span className="text-xs text-muted-foreground">Certificados Emitidos</span>
          </div>
        </div>

        {/* Abas e Tabelas */}
        <div className="space-y-6">
          <div className="border-b border-border/50 flex gap-4">
            <h2 className="text-lg font-semibold text-foreground py-2">Lista de Alunos e Progresso</h2>
          </div>

          <div className="bg-card border border-border/50 rounded-xl overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50 bg-muted/40 text-xs font-semibold uppercase text-muted-foreground">
                  <th className="p-4">Aluno</th>
                  <th className="p-4">Empresa</th>
                  <th className="p-4">Curso</th>
                  <th className="p-4">Progresso</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Início</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-border/30">
                {adminEnrollments.map((e) => (
                  <tr key={e.id} className="hover:bg-muted/10">
                    <td className="p-4">
                      <div className="font-semibold text-foreground">{e.profiles?.full_name || "Sem Nome"}</div>
                      <div className="text-xs text-muted-foreground">{e.profiles?.email}</div>
                    </td>
                    <td className="p-4 text-muted-foreground">{e.companies?.name || "Nenhuma"}</td>
                    <td className="p-4 font-medium">Secullum Ponto Web</td>
                    <td className="p-4 w-48">
                      <div className="flex items-center gap-2">
                        <Progress value={Number(e.progress_percent)} className="h-1.5 flex-1" />
                        <span className="font-bold text-xs">{Math.round(e.progress_percent)}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={e.status} />
                    </td>
                    <td className="p-4 text-xs text-muted-foreground">
                      {e.started_at ? new Date(e.started_at).toLocaleDateString("pt-BR") : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Solicitações de Certificado Final</h2>
            <div className="bg-card border border-border/50 rounded-xl overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/40 text-xs font-semibold uppercase text-muted-foreground">
                    <th className="p-4">Aluno</th>
                    <th className="p-4">Empresa</th>
                    <th className="p-4">Código</th>
                    <th className="p-4">Data Solicitação</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Ação</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-border/30">
                  {adminRequests.map((r) => (
                    <tr key={r.id} className="hover:bg-muted/10">
                      <td className="p-4 font-semibold text-foreground">{r.profiles?.full_name || "Sem Nome"}</td>
                      <td className="p-4 text-muted-foreground">{r.companies?.name || "Nenhuma"}</td>
                      <td className="p-4 font-mono text-xs">{r.verification_code}</td>
                      <td className="p-4 text-xs text-muted-foreground">
                        {r.requested_at ? new Date(r.requested_at).toLocaleDateString("pt-BR") : "-"}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="p-4">
                        {r.status === "requested" ? (
                          <Button onClick={() => handleApproveCertificate(r.id)} size="xs" className="bg-emerald-600 hover:bg-emerald-700">
                            Aprovar e Emitir
                          </Button>
                        ) : (
                          <Button onClick={() => setSelectedCertificateId(r.id)} size="xs" variant="outline">
                            Visualizar
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {adminRequests.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">
                        Nenhuma solicitação de certificado encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── TELA DE AULA EM EXECUÇÃO ────────────────────────────────────────────────
  if (selectedLesson && selectedCourse) {
    const isEnrolled = !!enrollments[selectedCourse.id];
    const checklistData = checklists[selectedLesson.id];
    const isLessonComplete = lessonProgress[selectedLesson.id]?.status === "completed";

    // Cálculo das pendências para liberação do botão Concluir
    const currentHeartbeatSeconds = selectedCourse?.is_mock ? mockActiveSeconds : activeSeconds;
    const currentScrollPercent = selectedCourse?.is_mock ? mockScrollPercent : scrollPercent;
    const requiredSeconds = selectedLesson.required_active_seconds || 60;
    const hasEnoughTime = currentHeartbeatSeconds >= requiredSeconds;
    const hasEnoughScroll = currentScrollPercent >= (selectedLesson.required_scroll_percent || 70);

    const checklistItems = checklistData?.training_checklist_items || [];
    const requiredChecklistItems = checklistItems.filter((i: any) => i.is_required);
    const hasCheckedRequiredChecklist = requiredChecklistItems.every((i: any) => checklistResponses[i.id]);

    const canComplete = hasEnoughTime && hasEnoughScroll && hasCheckedRequiredChecklist;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border/50 pb-4">
            <Button
              onClick={() => setSelectedLesson(null)}
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={18} />
            </Button>
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Curso: {selectedCourse.title}
              </span>
              <h1 className="text-xl font-bold text-foreground leading-tight mt-1">{selectedLesson.title}</h1>
              {selectedLesson.subtitle && <p className="text-xs text-muted-foreground mt-0.5">{selectedLesson.subtitle}</p>}
            </div>
          </div>

          {/* Abas */}
          <div className="border-b border-border/50 flex flex-wrap gap-2">
            {selectedLesson.content_type === "modulo_quiz" ? (
              <button
                className="px-4 py-2 text-sm font-semibold border-b-2 border-primary text-primary transition"
              >
                Questionário do Módulo
              </button>
            ) : (
              [
                { id: "content", label: "Conteúdo / Aula" },
                { id: "checklist", label: "Checklist Prático" },
                { id: "notes", label: "Minhas Anotações" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveLessonTab(tab.id as any)}
                  className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
                    activeLessonTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))
            )}
            {selectedLesson.content_type === "avaliacao_final" && (
              <button
                onClick={() => setActiveLessonTab("quiz")}
                className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
                  activeLessonTab === "quiz"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Avaliação Final
              </button>
            )}
          </div>

          {/* Questionário de Módulo */}
          {selectedLesson.content_type === "modulo_quiz" && (
            <div className="p-2 w-full">
              <TreinamentoQuizzes
                enrollmentId={activeEnrollment.id}
                userId={user.id}
                quizId={selectedLesson.slug}
                onSuccess={() => {
                  handleCompleteLesson();
                }}
              />
            </div>
          )}

          {/* Aba Conteúdo */}
          {activeLessonTab === "content" && selectedLesson.content_type !== "modulo_quiz" && (
            <div className="bg-card border border-border/50 rounded-2xl p-6 prose prose-invert max-w-none">
              {/* Informativo de vídeos em breve */}
              <div className="mb-6 p-4 bg-primary/10 border border-primary/20 text-slate-200 rounded-xl text-sm flex items-start gap-3 shadow-sm">
                <HelpCircle className="text-primary mt-0.5 shrink-0" size={18} />
                <div>
                  <span className="font-semibold text-primary block mb-0.5">Vídeos em Breve</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Os vídeos práticos e explicativos deste treinamento estão em produção e serão disponibilizados em breve na plataforma. 
                    Por hora, aproveite o conteúdo escrito detalhado abaixo e execute o checklist prático correspondente para consolidar seu aprendizado.
                  </p>
                </div>
              </div>
              {renderSimpleMD(selectedLesson.content_md)}
            </div>
          )}

          {/* Aba Checklist */}
          {activeLessonTab === "checklist" && (
            <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-border/50 pb-3 mb-4">
                <CheckSquare className="text-primary" size={20} />
                <h3 className="font-bold text-foreground">Checklist Prático do Aluno</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Abra o Secullum em outra aba e confirme a execução prática das etapas abaixo para validar seu aprendizado.
              </p>
              <div className="space-y-3">
                {checklistItems.map((item: any) => {
                  const isChecked = !!checklistResponses[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleChecklistItemToggle(item.id, !isChecked)}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                        isChecked
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
                          : "bg-muted/10 border-border/50 text-muted-foreground hover:bg-muted/20"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // Manipulado pelo clique da div
                        className="mt-1 w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="text-sm font-semibold block">{item.title}</span>
                        {item.description && <span className="text-xs text-muted-foreground block mt-0.5">{item.description}</span>}
                      </div>
                    </div>
                  );
                })}
                {checklistItems.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">Nenhum checklist prático necessário para esta aula.</p>
                )}
              </div>
            </div>
          )}

          {/* Aba Anotações */}
          {activeLessonTab === "notes" && (
            <div className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3 mb-4">
                <h3 className="font-bold text-foreground">Anotações do Aluno</h3>
                <Button onClick={handleSaveNote} disabled={savingNote} size="xs" className="flex items-center gap-2">
                  <Save size={14} />
                  {savingNote ? "Salvando..." : "Salvar"}
                </Button>
              </div>
              <textarea
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                placeholder="Escreva aqui suas observações, dúvidas ou dicas práticas sobre a aula..."
                className="w-full min-h-[200px] p-4 bg-muted/10 border border-border/50 rounded-xl text-foreground text-sm outline-none resize-y"
              />
            </div>
          )}

          {/* Aba Quiz / Avaliação */}
          {activeTab === "student" && activeLessonTab === "quiz" && finalQuizId && (
            <div className="p-2">
              <TreinamentoQuizzes
                enrollmentId={activeEnrollment.id}
                userId={user.id}
                quizId={finalQuizId}
                onSuccess={() => {
                  toast({ title: "Avaliação final concluída!" });
                  loadInitialData();
                }}
              />
            </div>
          )}

          {/* Footer de Conclusão de Aula */}
          {activeLessonTab === "content" && selectedLesson.content_type !== "modulo_quiz" && (
            <div className="bg-card border border-border/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Progresso de Validação */}
              <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className={hasEnoughTime ? "text-emerald-400" : "text-slate-500"} />
                  <span className="text-muted-foreground">Tempo ativo:</span>
                  <span className="font-bold text-foreground">{currentHeartbeatSeconds}s / {requiredSeconds}s</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className={hasEnoughScroll ? "text-emerald-400" : "text-slate-500"} />
                  <span className="text-muted-foreground">Leitura:</span>
                  <span className="font-bold text-foreground">{currentScrollPercent}% / 70%</span>
                </div>
                {requiredChecklistItems.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={14} className={hasCheckedRequiredChecklist ? "text-emerald-400" : "text-slate-500"} />
                    <span className="text-muted-foreground">Checklist:</span>
                    <span className="font-bold text-foreground">
                      {checklistItems.filter((i: any) => checklistResponses[i.id]).length} / {requiredChecklistItems.length}
                    </span>
                  </div>
                )}
              </div>

              {isLessonComplete ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
                  <CheckCircle size={16} />
                  Etapa Concluída
                </div>
              ) : (
                <Button
                  onClick={handleCompleteLesson}
                  disabled={!canComplete}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-2"
                >
                  <CheckCircle size={16} />
                  Concluir Etapa
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Playlist Lateral */}
        <div className="space-y-4">
          <div className="bg-card border border-border/50 rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-foreground text-sm border-b border-border/50 pb-2 flex items-center gap-2">
              <BookOpen size={16} className="text-primary" />
              Conteúdo da Trilha
            </h3>

            <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1">
              {modules.map((m, idx) => {
                const moduleLessons = lessons[m.id] || [];
                const isExpanded = !!expandedModules[m.id];
                const locked = isModuleLocked(idx, modules, lessons, lessonProgress);
                return (
                  <div key={m.id} className="space-y-1">
                    <button
                      onClick={() => {
                        if (locked) {
                          toast({
                            variant: "destructive",
                            title: "Módulo bloqueado",
                            description: "Conclua o questionário do módulo anterior para liberar.",
                          });
                          return;
                        }
                        setExpandedModules((prev) => ({ ...prev, [m.id]: !prev[m.id] }));
                      }}
                      className={`w-full flex items-center justify-between text-left p-2 hover:bg-muted/10 rounded-lg text-xs font-semibold ${
                        locked ? "text-slate-500 cursor-not-allowed opacity-60" : "text-slate-300"
                      }`}
                    >
                      <span className="truncate flex-1 flex items-center gap-1.5">
                        {locked && <Lock size={12} className="text-slate-500 shrink-0" />}
                        Módulo {idx + 1}: {m.title}
                      </span>
                      {!locked && (isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </button>

                    {isExpanded && !locked && (
                      <div className="pl-3 border-l border-border/50 space-y-1 mt-1">
                        {moduleLessons.map((l) => {
                          const isActive = selectedLesson.id === l.id;
                          const isComplete = lessonProgress[l.id]?.status === "completed";
                          return (
                            <button
                              key={l.id}
                              onClick={() => setSelectedLesson(l)}
                              className={`w-full text-left p-2 rounded-md text-xs flex items-center justify-between transition ${
                                isActive
                                  ? "bg-primary/15 text-primary font-semibold"
                                  : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                              }`}
                            >
                              <span className="truncate flex-1">{l.title}</span>
                              {isComplete ? (
                                <CheckCircle size={12} className="text-emerald-400 ml-1.5 shrink-0" />
                              ) : (
                                l.content_type === "modulo_quiz" ? (
                                  <ClipboardList size={12} className="text-slate-500 ml-1.5 shrink-0" />
                                ) : (
                                  <PlayCircle size={12} className="text-slate-500 ml-1.5 shrink-0" />
                                )
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── DETALHES DO CURSO SELECIONADO ───────────────────────────────────────────
  if (selectedCourse) {
    const isEnrolled = !!enrollments[selectedCourse.id];
    const enrollment = enrollments[selectedCourse.id];
    const isCourseComplete = enrollment?.status === "completed" || enrollment?.progress_percent >= 100;
    const finalCert = certificates.find((c) => c.course_id === selectedCourse.id && c.certificate_type === "final");

    return (
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header Curso */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-6">
          <div className="space-y-1">
            <Button
              onClick={() => setSelectedCourse(null)}
              variant="ghost"
              className="p-0 text-muted-foreground hover:text-foreground flex items-center gap-1.5 mb-2"
            >
              <ArrowLeft size={16} />
              Voltar para treinamentos
            </Button>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
              {selectedCourse.title}
            </h1>
            <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">{selectedCourse.description}</p>
          </div>
          <div className="flex items-center gap-2">
            {!isEnrolled ? (
              <Button onClick={() => handleEnroll(selectedCourse.id)} className="bg-primary hover:bg-primary/90">
                Iniciar Treinamento
              </Button>
            ) : (
              <div className="p-4 bg-muted/20 border border-border/50 rounded-xl text-center">
                <span className="text-xs text-muted-foreground block">Seu Progresso</span>
                <span className="text-xl font-bold text-foreground">{Math.round(enrollment.progress_percent)}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Módulos do Curso */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <BookMarked size={18} className="text-primary" />
              Grade de Aprendizado
            </h2>

            <div className="space-y-3">
              {modules.map((m, idx) => {
                const isExpanded = !!expandedModules[m.id];
                const moduleLessons = lessons[m.id] || [];
                const completedCount = moduleLessons.filter((l) => lessonProgress[l.id]?.status === "completed").length;
                const progressPct = moduleLessons.length > 0 ? (completedCount / moduleLessons.length) * 100 : 0;
                const locked = isModuleLocked(idx, modules, lessons, lessonProgress);

                return (
                  <div key={m.id} className="bg-card border border-border/50 rounded-2xl overflow-hidden transition hover:border-border">
                    {/* Cabeçalho do Módulo */}
                    <button
                      onClick={() => {
                        if (locked) {
                          toast({
                            variant: "destructive",
                            title: "Módulo bloqueado",
                            description: "Conclua o questionário do módulo anterior para liberar.",
                          });
                          return;
                        }
                        setExpandedModules((prev) => ({ ...prev, [m.id]: !prev[m.id] }));
                      }}
                      className={`w-full flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 text-left bg-muted/10 border-b border-border/20 gap-4 ${
                        locked ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary shrink-0">
                          {locked ? <Lock size={14} className="text-slate-400" /> : idx + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-100 text-sm">{m.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{m.subtitle || "Sem subtítulo"}</p>
                        </div>
                      </div>

                      {!locked && (
                        <div className="flex items-center gap-4 text-xs font-semibold shrink-0">
                          <div className="text-right">
                            <span className="block text-foreground">
                              {completedCount}/{moduleLessons.length} Aulas
                            </span>
                            <span className="block text-muted-foreground text-[10px] uppercase">
                              {Math.round(progressPct)}% Concluído
                            </span>
                          </div>
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      )}
                    </button>

                    {/* Aulas do Módulo */}
                    {isExpanded && !locked && (
                      <div className="p-4 space-y-2 bg-muted/5 divide-y divide-border/20">
                        {moduleLessons.map((l) => {
                          const isComplete = lessonProgress[l.id]?.status === "completed";
                          return (
                            <div key={l.id} className="flex items-center justify-between p-2.5 text-sm transition hover:bg-muted/10 rounded-lg">
                              <div className="flex items-center gap-2">
                                {isComplete ? (
                                  <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                                ) : (
                                  l.content_type === "modulo_quiz" ? (
                                    <ClipboardList size={16} className="text-slate-500 shrink-0" />
                                  ) : (
                                    <PlayCircle size={16} className="text-slate-500 shrink-0" />
                                  )
                                )}
                                <span className="font-medium text-slate-200">{l.title}</span>
                              </div>
                              {isEnrolled && (
                                <Button
                                  onClick={() => setSelectedLesson(l)}
                                  size="xs"
                                  variant={isComplete ? "outline" : "default"}
                                  className="text-xs shrink-0"
                                >
                                  {isComplete ? "Rever" : (l.content_type === "modulo_quiz" ? "Responder" : "Acessar")}
                                </Button>
                              )}
                            </div>
                          );
                        })}
                        {moduleLessons.length === 0 && (
                          <p className="text-xs text-muted-foreground text-center py-4">Nenhuma aula cadastrada neste módulo.</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lateral Certificado */}
          <div className="space-y-4">
            <div className="bg-card border border-border/50 rounded-2xl p-5 space-y-4 shadow-xl">
              <h3 className="font-bold text-foreground text-sm border-b border-border/50 pb-2 flex items-center gap-2">
                <Award size={16} className="text-primary" />
                Certificado Final
              </h3>

              <div className="bg-muted/20 border border-border/50 rounded-xl p-4 text-center">
                <span className="text-3xl font-serif font-bold text-foreground">
                  {Math.round(enrollment?.progress_percent || 0)}%
                </span>
                <span className="text-xs text-muted-foreground block mt-1">Requisitos de Emissão</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Matrícula Aprovada:</span>
                  <span className="font-bold text-emerald-400">OK</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Aulas Concluídas:</span>
                  <span className={`font-bold ${isCourseComplete ? "text-emerald-400" : "text-amber-400"}`}>
                    {isCourseComplete ? "100%" : "Pendente"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Avaliação Final:</span>
                  <span className={`font-bold ${isCourseComplete ? "text-emerald-400" : "text-amber-400"}`}>
                    {isCourseComplete ? "Aprovado" : "Pendente"}
                  </span>
                </div>
              </div>

              {/* Botão de Solicitação do Certificado */}
              {finalCert ? (
                finalCert.status === "issued" ? (
                  <Button
                    onClick={() => setSelectedCertificateId(finalCert.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  >
                    Visualizar Certificado
                  </Button>
                ) : (
                  <Button disabled className="w-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    Aguardando Emissão
                  </Button>
                )
              ) : (
                <Button
                  onClick={handleRequestFinalCertificate}
                  disabled={!isCourseComplete}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Solicitar Certificado
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── LISTAGEM DE CURSOS ──────────────────────────────────────────────────────
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/50 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">Central de Treinamentos</h1>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Aprenda a configurar e operar o sistema de ponto com trilhas completas de aprendizado, checklists práticos e quizzes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(isGestorMaster || isAdmin) && (
            <Button onClick={() => setActiveTab("admin")} variant="outline" className="flex items-center gap-2">
              <ClipboardList size={16} />
              Painel de Gestão
            </Button>
          )}
        </div>
      </div>

      {/* Busca e Filtros */}
      <div className="flex items-center gap-2 max-w-md bg-card border border-border/50 px-3 py-2 rounded-xl focus-within:border-primary transition">
        <Search size={16} className="text-muted-foreground shrink-0" />
        <Input
          type="text"
          placeholder="Buscar treinamento..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-none focus-visible:ring-0 p-0 h-auto bg-transparent text-sm placeholder:text-muted-foreground"
        />
      </div>

      {/* Grid de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const enroll = enrollments[course.id];
          const progress = enroll ? Number(enroll.progress_percent) : 0;
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col justify-between hover:border-border transition"
            >
              <div>
                <h3 className="font-bold text-slate-100 text-lg mb-2">{course.title}</h3>
                {course.subtitle && <p className="text-xs text-primary font-semibold mb-3">{course.subtitle}</p>}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{course.description}</p>
              </div>

              <div className="space-y-4 mt-auto">
                {enroll ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-muted-foreground">Seu Progresso:</span>
                      <span className="text-foreground">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                ) : (
                  <span className="text-xs bg-slate-500/10 text-slate-400 px-3 py-1 rounded-full font-semibold inline-block border border-slate-500/20">
                    Disponível
                  </span>
                )}

                <Button onClick={() => setSelectedCourse(course)} className="w-full flex items-center justify-center gap-2">
                  Acessar Treinamento
                </Button>
              </div>
            </motion.div>
          );
        })}

        {filteredCourses.length === 0 && (
          <div className="col-span-full text-center py-12 bg-card border border-border/50 rounded-2xl">
            <BookOpen className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-semibold text-foreground">Nenhum treinamento encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}