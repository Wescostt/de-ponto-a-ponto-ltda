import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseLessonHeartbeatProps {
  enrollmentId: string | undefined;
  lessonId: string | undefined;
  enabled: boolean;
}

export function useLessonHeartbeat({ enrollmentId, lessonId, enabled }: UseLessonHeartbeatProps) {
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const lastHeartbeatTimeRef = useRef<number>(Date.now());
  const activeSecondsRef = useRef<number>(0);
  const scrollPercentRef = useRef<number>(0);

  // Sincroniza refs para que os event listeners leiam os estados corretos
  useEffect(() => {
    activeSecondsRef.current = activeSeconds;
  }, [activeSeconds]);

  useEffect(() => {
    scrollPercentRef.current = scrollPercent;
  }, [scrollPercent]);

  // Monitora rolagem (scroll)
  useEffect(() => {
    if (!enabled || !lessonId) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 100;
      if (pct > scrollPercentRef.current) {
        setScrollPercent(Math.min(pct, 100));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Execução inicial
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enabled, lessonId]);

  // Heartbeat em intervalos de 15 segundos
  useEffect(() => {
    if (!enabled || !enrollmentId || !lessonId) {
      setActiveSeconds(0);
      setScrollPercent(0);
      return;
    }

    // Busca o progresso inicial no banco
    const fetchProgress = async () => {
      const { data, error } = await supabase
        .from("training_lesson_progress" as any)
        .select("active_seconds, scroll_percent")
        .eq("enrollment_id", enrollmentId)
        .eq("lesson_id", lessonId)
        .maybeSingle();

      if (data && !error) {
        setActiveSeconds((data as any).active_seconds || 0);
        setScrollPercent((data as any).scroll_percent || 0);
      }
    };
    fetchProgress();

    let isTabFocused = true;

    const handleFocus = () => {
      isTabFocused = true;
      lastHeartbeatTimeRef.current = Date.now();
    };

    const handleBlur = () => {
      isTabFocused = false;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        isTabFocused = true;
        lastHeartbeatTimeRef.current = Date.now();
      } else {
        isTabFocused = false;
      }
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const interval = setInterval(async () => {
      if (!isTabFocused || document.visibilityState !== "visible") return;

      const now = Date.now();
      const deltaSeconds = Math.round((now - lastHeartbeatTimeRef.current) / 1000);
      lastHeartbeatTimeRef.current = now;

      if (deltaSeconds <= 0) return;

      const currentScroll = scrollPercentRef.current;
      const currentPosition = Math.round(window.pageYOffset || document.documentElement.scrollTop);

      try {
        const { data, error } = await supabase.rpc("training_record_lesson_heartbeat" as any, {
          _enrollment_id: enrollmentId,
          _lesson_id: lessonId,
          _active_seconds_delta: deltaSeconds,
          _scroll_percent: currentScroll,
          _last_position: currentPosition,
        });

        if (!error && data) {
          setActiveSeconds((data as any).active_seconds);
          setScrollPercent((data as any).scroll_percent);
        }
      } catch (err) {
        console.error("Erro ao enviar heartbeat:", err);
      }
    }, 15000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, enrollmentId, lessonId]);

  return { activeSeconds, scrollPercent };
}
