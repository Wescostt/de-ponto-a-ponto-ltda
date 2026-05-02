import { motion } from "framer-motion";
import { useState } from "react";

const steps = [
  { num: 1, label: "Cadastro", desc: "Sua empresa e seus colaboradores são configurados no sistema.", icon: "👤" },
  { num: 2, label: "Reconhecimento facial", desc: "O colaborador registra o ponto com mais segurança e praticidade.", icon: "🤳" },
  { num: 3, label: "Marcação de ponto", desc: "Cada entrada, saída e intervalo fica registrado de forma organizada.", icon: "🕐" },
  { num: 4, label: "Gestão da jornada", desc: "O RH acompanha atrasos, horas extras, faltas e ajustes em um painel claro.", icon: "📊" },
  { num: 5, label: "Relatórios", desc: "Sua empresa acessa dados prontos para conferência, gestão e tomada de decisão.", icon: "📋" },
];

const JourneySection = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section style={{ padding: "112px 0", position: "relative", background: "#020617", overflow: "hidden" }}>
      {/* Abertura para vídeo/animação de fundo */}
      {/* <video className="section-video-bg" autoPlay muted loop playsInline src="/seu-video-jornada.mp4" />
          <div className="media-overlay" /> */}

      {/* Glow decorativo */}
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "400px", background: "radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", position: "relative", zIndex: 10 }}>
        {/* Cabeçalho */}
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

        {/* Pills das etapas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: "48px" }}
        >
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              style={{
                padding: "12px 22px", borderRadius: "999px", cursor: "pointer",
                fontSize: "13px", fontWeight: 500, transition: "all 0.25s",
                background: activeStep === i
                  ? "linear-gradient(135deg, #3B82F6, #2563EB)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
                color: activeStep === i ? "#fff" : "#CBD5E1",
                border: activeStep === i ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.12)",
                boxShadow: activeStep === i ? "0 0 24px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.14)" : "inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {step.label}
            </button>
          ))}
        </motion.div>

        {/* Linha do tempo */}
        <div style={{ position: "relative", marginBottom: "48px" }}>
          {/* Linha pontilhada luminosa */}
          <div style={{ position: "absolute", top: "28px", left: "28px", right: "28px", height: "8px",
            background: "repeating-linear-gradient(90deg, #60A5FA 0px, #60A5FA 4px, transparent 4px, transparent 12px)",
            filter: "drop-shadow(0 0 10px rgba(96,165,250,0.65))", borderRadius: "4px", zIndex: 0 }} />

          <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveStep(i)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", cursor: "pointer", flex: 1 }}
              >
                {/* Ponto da timeline */}
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: activeStep === i
                    ? "radial-gradient(circle, #FFFFFF 0%, #60A5FA 18%, #020617 62%)"
                    : "radial-gradient(circle, #FFFFFF 0%, #94A3B8 14%, #111827 62%)",
                  border: activeStep === i ? "1px solid rgba(96,165,250,0.5)" : "1px solid rgba(148,163,184,0.22)",
                  boxShadow: activeStep === i
                    ? "0 0 24px rgba(96,165,250,0.8), inset 0 0 20px rgba(255,255,255,0.12)"
                    : "none",
                  opacity: activeStep === i ? 1 : 0.5,
                  transition: "all 0.3s",
                  fontSize: "20px",
                }}>
                  {step.icon}
                </div>

                {/* Label */}
                <p style={{
                  fontSize: "11px", fontWeight: activeStep === i ? 600 : 400,
                  color: activeStep === i ? "#60A5FA" : "#64748B",
                  textAlign: "center", lineHeight: 1.4, maxWidth: "80px",
                  transition: "color 0.3s",
                }}>
                  {step.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Card da etapa ativa */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: "linear-gradient(180deg, rgba(15,23,42,0.88), rgba(2,6,23,0.96))",
            border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: "24px", padding: "36px 40px",
            backdropFilter: "blur(18px)",
            boxShadow: "0 0 60px rgba(59,130,246,0.08), 0 24px 80px rgba(0,0,0,0.4)",
            display: "flex", alignItems: "center", gap: "24px",
          }}
        >
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", flexShrink: 0 }}>
            {steps[activeStep].icon}
          </div>
          <div>
            <p style={{ color: "#3B82F6", fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
              Etapa {steps[activeStep].num} de {steps.length}
            </p>
            <h3 style={{ color: "#F8FAFC", fontSize: "20px", fontWeight: 700, marginBottom: "10px" }}>
              {steps[activeStep].label}
            </h3>
            <p style={{ color: "#64748B", fontSize: "14px", lineHeight: 1.75 }}>
              {steps[activeStep].desc}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
