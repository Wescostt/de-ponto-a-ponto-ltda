import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Check, X, ArrowRight, RotateCcw, AlertTriangle, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TreinamentoQuizzesProps {
  enrollmentId: string;
  userId: string;
  quizId: string;
  onSuccess: () => void;
}

interface QuestionOption {
  id: string;
  option_text: string;
  is_correct: boolean;
}

interface Question {
  id: string;
  question: string;
  explanation: string;
  question_type: string;
  points: number;
  options: QuestionOption[];
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  passing_score: number;
  max_attempts: number;
  is_final: boolean;
}

export function TreinamentoQuizzes({ enrollmentId, userId, quizId, onSuccess }: TreinamentoQuizzesProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState<{ score: number; passed: boolean; attemptNumber: number } | null>(null);

  const { toast } = useToast();

  const loadQuizData = async () => {
    setLoading(true);
    try {
      // 1. Buscar quiz
      const { data: qData, error: qErr } = await supabase
        .from("training_quizzes" as any)
        .select("*")
        .eq("id", quizId)
        .maybeSingle();

      if (qErr || !qData) throw new Error("Quiz não encontrado");
      setQuiz(qData as Quiz);

      // 2. Buscar perguntas
      const { data: questData, error: questErr } = await supabase
        .from("training_questions" as any)
        .select("*")
        .eq("quiz_id", quizId)
        .order("sort_order", { ascending: true });

      if (questErr) throw questErr;

      // 3. Buscar opções para cada pergunta
      const questionsWithOpts: Question[] = [];
      for (const question of (questData || [])) {
        const { data: optsData, error: optsErr } = await supabase
          .from("training_question_options" as any)
          .select("*")
          .eq("question_id", question.id)
          .order("sort_order", { ascending: true });

        if (optsErr) throw optsErr;

        questionsWithOpts.push({
          ...question,
          options: optsData || [],
        });
      }
      setQuestions(questionsWithOpts);

      // 4. Buscar tentativas anteriores
      const { data: attData, error: attErr } = await supabase
        .from("training_quiz_attempts" as any)
        .select("*")
        .eq("quiz_id", quizId)
        .eq("user_id", userId)
        .order("attempt_number", { ascending: false });

      if (attErr) throw attErr;
      setAttempts(attData || []);

      if (attData && attData.length > 0) {
        const last = attData[0];
        setLastResult({
          score: last.score,
          passed: last.passed,
          attemptNumber: last.attempt_number,
        });
        if (last.passed) {
          setIsSubmitted(true);
        }
      }
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erro ao carregar questionário",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizData();
  }, [quizId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground">Carregando questionário...</p>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="text-center p-8 bg-card border border-border/50 rounded-xl">
        <AlertTriangle className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
        <p className="font-semibold text-foreground">Nenhuma pergunta cadastrada para este quiz.</p>
      </div>
    );
  }

  const remainingAttempts = quiz.max_attempts - attempts.length;

  const handleOptionSelect = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmitQuiz = async () => {
    // Validar se todas as perguntas foram respondidas
    if (Object.keys(selectedAnswers).length < questions.length) {
      toast({
        variant: "destructive",
        title: "Respostas pendentes",
        description: "Por favor, responda todas as perguntas antes de enviar.",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Calcular a pontuação
      let correctCount = 0;
      const totalPoints = questions.reduce((acc, q) => acc + (q.points || 1), 0);
      let awardedPoints = 0;

      const answersToInsert: any[] = [];

      questions.forEach((q) => {
        const selectedOptId = selectedAnswers[q.id];
        const selectedOpt = q.options.find((o) => o.id === selectedOptId);
        const isCorrect = selectedOpt ? selectedOpt.is_correct : false;

        if (isCorrect) {
          correctCount++;
          awardedPoints += q.points || 1;
        }

        answersToInsert.push({
          question_id: q.id,
          selected_option_id: selectedOptId,
          is_correct: isCorrect,
          points_awarded: isCorrect ? (q.points || 1) : 0,
        });
      });

      const score = Math.round((awardedPoints / totalPoints) * 100);
      const passed = score >= quiz.passing_score;
      const attemptNum = attempts.length + 1;

      // 1. Inserir tentativa
      const { data: attemptData, error: attemptErr } = await supabase
        .from("training_quiz_attempts" as any)
        .insert({
          enrollment_id: enrollmentId,
          quiz_id: quizId,
          user_id: userId,
          attempt_number: attemptNum,
          score,
          passed,
          submitted_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (attemptErr) throw attemptErr;

      // 2. Inserir respostas detalhadas
      const answersWithAttempt = answersToInsert.map((ans) => ({
        ...ans,
        attempt_id: attemptData.id,
      }));

      const { error: ansErr } = await supabase
        .from("training_quiz_answers" as any)
        .insert(answersWithAttempt);

      if (ansErr) throw ansErr;

      // Atualizar local
      setLastResult({ score, passed, attemptNumber: attemptNum });
      setIsSubmitted(true);
      setAttempts((prev) => [attemptData, ...prev]);

      if (passed) {
        toast({
          title: "Parabéns!",
          description: `Você foi aprovado com nota ${score}%.`,
        });
        onSuccess();
      } else {
        toast({
          variant: "destructive",
          title: "Aprovação pendente",
          description: `Você obteve nota ${score}%. A nota mínima é ${quiz.passing_score}%.`,
        });
      }
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erro ao enviar respostas",
        description: err.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setLastResult(null);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
  };

  // ── RENDER RESULTADOS ──────────────────────────────────────────────────────
  if (isSubmitted && lastResult) {
    const isApproved = lastResult.passed;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 text-center bg-card border border-border/50 rounded-2xl max-w-lg mx-auto"
      >
        <div className="flex justify-center mb-6">
          {isApproved ? (
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <GraduationCap size={32} />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center text-destructive-foreground">
              <AlertTriangle size={32} className="text-red-400" />
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2">
          {isApproved ? "Parabéns, você foi aprovado!" : "Nota mínima não atingida"}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          {isApproved
            ? "Você concluiu esta avaliação com sucesso e o progresso foi registrado."
            : `Você atingiu ${lastResult.score}% na tentativa ${lastResult.attemptNumber}. A nota mínima para aprovação é de ${quiz.passing_score}%.`}
        </p>

        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 mb-6 flex justify-around">
          <div>
            <span className="block text-2xl font-bold text-foreground">{lastResult.score}%</span>
            <span className="text-xs text-muted-foreground">Sua Nota</span>
          </div>
          <div className="border-r border-border/50 my-1"></div>
          <div>
            <span className="block text-2xl font-bold text-foreground">{quiz.passing_score}%</span>
            <span className="text-xs text-muted-foreground">Mínimo Exigido</span>
          </div>
          <div className="border-r border-border/50 my-1"></div>
          <div>
            <span className="block text-2xl font-bold text-foreground">
              {attempts.length}/{quiz.max_attempts}
            </span>
            <span className="text-xs text-muted-foreground">Tentativas</span>
          </div>
        </div>

        {!isApproved && remainingAttempts > 0 && (
          <Button onClick={handleRetry} className="w-full flex items-center justify-center gap-2">
            <RotateCcw size={16} />
            Tentar Novamente ({remainingAttempts} restantes)
          </Button>
        )}

        {!isApproved && remainingAttempts <= 0 && (
          <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-red-400 text-sm">
            Limite de tentativas excedido. Entre em contato com o suporte da De Ponto a Ponto para liberar novas tentativas ou revisar o conteúdo.
          </div>
        )}

        {isApproved && (
          <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm">
            Avaliação concluída com sucesso!
          </div>
        )}
      </motion.div>
    );
  }

  // ── RENDER FORMULÁRIO DE PERGUNTAS ─────────────────────────────────────────
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto bg-card border border-border/50 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="px-6 py-4 bg-muted/40 border-b border-border/50 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-foreground">{quiz.title}</h3>
          <p className="text-xs text-muted-foreground">Nota mínima: {quiz.passing_score}%</p>
        </div>
        <span className="text-xs bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full font-semibold">
          Pergunta {currentQuestionIndex + 1} de {questions.length}
        </span>
      </div>

      {/* Question area */}
      <div className="p-6">
        <h4 className="font-semibold text-lg text-foreground mb-6 leading-tight">
          {currentQuestion.question}
        </h4>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedAnswers[currentQuestion.id] === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleOptionSelect(currentQuestion.id, opt.id)}
                className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between group ${
                  isSelected
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-muted/10 border-border/50 text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                }`}
              >
                <span className="text-sm font-medium pr-4">{opt.option_text}</span>
                <span
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? "border-primary bg-primary text-white" : "border-border/60 group-hover:border-foreground"
                  }`}
                >
                  {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-white"></span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="px-6 py-4 bg-muted/20 border-t border-border/50 flex justify-between items-center">
        <Button
          variant="ghost"
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
        >
          Anterior
        </Button>

        {currentQuestionIndex < questions.length - 1 ? (
          <Button
            disabled={!selectedAnswers[currentQuestion.id]}
            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            className="flex items-center gap-2"
          >
            Próxima
            <ArrowRight size={16} />
          </Button>
        ) : (
          <Button
            disabled={submitting || Object.keys(selectedAnswers).length < questions.length}
            onClick={handleSubmitQuiz}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {submitting ? "Enviando..." : "Finalizar Avaliação"}
          </Button>
        )}
      </div>
    </div>
  );
}
