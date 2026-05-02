import { motion } from "framer-motion";

const diffs = [
  { title: "Empresa com rosto e presença", desc: "As imagens mostram equipe, cliente, suporte e implantação real, o que gera mais confiança." },
  { title: "Tecnologia com proximidade humana", desc: "O site transmite inovação sem perder o caráter acessível, consultivo e profissional." },
  { title: "Visual claro e mais premium", desc: "O fundo mais claro amplia percepção de qualidade, limpeza e sofisticação corporativa." },
  { title: "Marca mais confiável", desc: "A combinação entre estrutura visual e imagens reais posiciona a empresa acima de um fornecedor comum." },
];

const DifferentialsSection = () => {
  return (
    <section id="diferenciais" style={{ padding: "112px 0", position: "relative", background: "#020617" }}>
      {/* Abertura para vídeo/animação de fundo */}
      {/* <video className="section-video-bg" autoPlay muted loop playsInline src="/seu-video-diferenciais.mp4" />
          <div className="media-overlay" /> */}

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px", alignItems: "start" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <span style={{ display: "block", width: "24px", height: "1px", background: "#3B82F6", flexShrink: 0 }} />
              <span style={{ fontSize: "10px", color: "#3B82F6", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}>Diferenciais</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 700, color: "#F8FAFC", lineHeight: 1.2, marginBottom: "16px" }}>
              Menos aparência genérica. Mais verdade operacional.
            </h2>
            <p style={{ color: "#64748B", fontSize: "14px", lineHeight: 1.75 }}>
              O que diferencia sua marca é mostrar que existe atendimento, estrutura, histórico e acompanhamento de verdade.
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {diffs.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "linear-gradient(180deg, rgba(15,23,42,0.7), rgba(2,6,23,0.85))",
                  border: "1px solid rgba(148,163,184,0.10)",
                  borderRadius: "18px",
                  padding: "20px 24px",
                  backdropFilter: "blur(18px)",
                  transition: "border-color 0.3s",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
                whileHover={{ borderColor: "rgba(59,130,246,0.25)" }}
              >
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                  <span style={{ color: "#3B82F6", fontSize: "13px", fontWeight: 700 }}>{i + 1}</span>
                </div>
                <div>
                  <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: "14px", marginBottom: "6px" }}>{d.title}</h3>
                  <p style={{ color: "#64748B", fontSize: "13px", lineHeight: 1.65 }}>{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;