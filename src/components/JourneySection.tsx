import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { UserPlus, ScanFace, ClipboardCheck, LayoutDashboard, FileBarChart2 } from "lucide-react";

const steps = [
  { num: 1, label: "Cadastro", desc: "Sua empresa e seus colaboradores são configurados no sistema.", Icon: UserPlus },
  { num: 2, label: "Reconhecimento facial", desc: "O colaborador registra o ponto com mais segurança e praticidade.", Icon: ScanFace },
  { num: 3, label: "Marcação de ponto", desc: "Cada entrada, saída e intervalo fica registrado de forma organizada.", Icon: ClipboardCheck },
  { num: 4, label: "Gestão da jornada", desc: "O RH acompanha atrasos, horas extras, faltas e ajustes em um painel claro.", Icon: LayoutDashboard },
  { num: 5, label: "Relatórios", desc: "Sua empresa acessa dados prontos para conferência, gestão e tomada de decisão.", Icon: FileBarChart2 },
];

const JourneySection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [ledKey, setLedKey] = useState(0); // muda a cada clique para re-triggar animação

  const handleStep = (i: number) => {
    setActiveStep(i);
    setLedKey((k) => k + 1); // reinicia o efeito LED
  };

  return (
    <section style={{ padding: "112px 0", position: "relative", background: "#030712", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "400px", background: "radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", position: "relative", zIndex: 10 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "14px" }}>
            <span style={{ display: "block", width: "24px", height: "1px", background: "#3B82F6" }} />
            <span style={{ fontSize: "10px", color: "#3B82F6", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}>Como funciona</span>
            <span style={{ display: "block", width: "24px", height: "1px", background: "#3B82F6" }} />
          </div>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, color: "#F8FAFC", lineHeight: 1.15, marginBottom: "16px" }}>
            Uma jornada simples,{" "}
            <span style={{ background: "linear-gradient(135deg, #60A5FA, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              do registro ao relatório
            </span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "15px", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto" }}>
            Você não precisa mais lidar com ponto confuso, marcações esquecidas ou planilhas difíceis de conferir.
            Com a De Ponto a Ponto, cada etapa fica clara, segura e fácil de acompanhar.
          </p>
        </motion.div>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "48px" }}
        >
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => handleStep(i)}
              style={{
                padding: "10px 20px", borderRadius: "999px", cursor: "pointer",
                fontSize: "13px", fontWeight: 500, transition: "all 0.25s",
                background: activeStep === i ? "linear-gradient(135deg, #3B82F6, #2563EB)" : "rgba(255,255,255,0.04)",
                color: activeStep === i ? "#fff" : "#94A3B8",
                border: activeStep === i ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: activeStep === i ? "0 0 20px rgba(59,130,246,0.35)" : "none",
              }}
            >
              {step.label}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative", marginBottom: "40px" }}>
          <div style={{
            position: "absolute", top: "28px", left: "5%", right: "5%", height: "2px",
            background: "repeating-linear-gradient(90deg, #3B82F6 0px, #3B82F6 6px, transparent 6px, transparent 14px)",
            filter: "drop-shadow(0 0 6px rgba(59,130,246,0.5))", zIndex: 0,
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <motion.div
                  key={i}
                  onClick={() => handleStep(i)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", cursor: "pointer", flex: 1 }}
                >
                  <div style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: isActive ? "linear-gradient(135deg, #1d4ed8, #3B82F6)" : "#0B1020",
                    border: isActive ? "1px solid rgba(96,165,250,0.5)" : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: isActive ? "0 0 24px rgba(59,130,246,0.6)" : "none",
                    opacity: isActive ? 1 : 0.55,
                    transition: "all 0.3s",
                  }}>
                    <step.Icon size={22} color={isActive ? "#fff" : "#64748B"} strokeWidth={1.5} />
                  </div>
                  <p style={{
                    fontSize: "11px", fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#60A5FA" : "#64748B",
                    textAlign: "center", lineHeight: 1.4, maxWidth: "80px",
                    transition: "color 0.3s",
                  }}>
                    {step.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Card com LED pulsante */}
        <div style={{ position: "relative" }}>

          {/* ── LED sweep — dispara a cada clique ─────────────────────────── */}
          <AnimatePresence>
            <motion.div
              key={`led-${ledKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, times: [0, 0.1, 0.7, 1], ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "20px",
                pointerEvents: "none",
                zIndex: 0,
                // Glow externo — borda inteira brilha
                boxShadow:
                  "0 0 0 1px rgba(59,130,246,0.55), " +
                  "0 0 18px 2px rgba(59,130,246,0.45), " +
                  "0 0 45px 8px rgba(59,130,246,0.18)",
              }}
            />
          </AnimatePresence>

          {/* ── Faixa LED superior (corre da esquerda p/ direita) ─────────── */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: "1px", borderRadius: "20px 20px 0 0",
            overflow: "hidden", zIndex: 1, pointerEvents: "none",
          }}>
            <AnimatePresence>
              <motion.div
                key={`sweep-${ledKey}`}
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: ["−100%", "0%", "100%"], opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.9) 50%, transparent 100%)",
                  filter: "blur(1px)",
                }}
              />
            </AnimatePresence>
          </div>

          {/* ── Card ativo ─────────────────────────────────────────────────── */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "relative", zIndex: 2,
              background: "linear-gradient(180deg, #0B1020 0%, #060d1f 100%)",
              border: "1px solid rgba(59,130,246,0.18)",
              borderRadius: "20px", padding: "32px 36px",
              boxShadow: "0 0 40px rgba(59,130,246,0.06), 0 24px 80px rgba(0,0,0,0.4)",
              display: "flex", alignItems: "center", gap: "24px",
            }}
          >
            <div style={{
              width: "60px", height: "60px", borderRadius: "16px", flexShrink: 0,
              background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {(() => { const Icon = steps[activeStep].Icon; return <Icon size={26} color="#3B82F6" strokeWidth={1.5} />; })()}
            </div>
            <div>
              <p style={{ color: "#3B82F6", fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
                Etapa {steps[activeStep].num} de {steps.length}
              </p>
              <h3 style={{ color: "#F8FAFC", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
                {steps[activeStep].label}
              </h3>
              <p style={{ color: "#64748B", fontSize: "14px", lineHeight: 1.75 }}>
                {steps[activeStep].desc}
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default JourneySection;
