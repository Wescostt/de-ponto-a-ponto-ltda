import { motion } from "framer-motion";

const capabilities = [
  { title: "Relógios de Ponto", desc: "Equipamentos e soluções adequadas à rotina operacional do cliente.", icon: "🕐" },
  { title: "Manutenção Especializada", desc: "Atuação técnica com orientação, implantação e continuidade operacional.", icon: "🔧" },
  { title: "Softwares e Gestão", desc: "Ferramentas para apoiar controle, conferência e rotina administrativa.", icon: "💻" },
  { title: "Crachás e Estrutura", desc: "Itens complementares para fortalecer organização e identidade corporativa.", icon: "🪪" },
];

const AboutSection = () => {
  return (
    <section id="empresa" style={{ padding: "112px 0", position: "relative", background: "#030712" }}>
      {/* Abertura para vídeo/animação de fundo */}
      {/* <video className="section-video-bg" autoPlay muted loop playsInline src="/seu-video-empresa.mp4" />
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
              <span style={{ fontSize: "10px", color: "#3B82F6", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}>Quem somos</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 700, color: "#F8FAFC", lineHeight: 1.2, marginBottom: "24px" }}>
              Tradição no segmento com evolução constante.
            </h2>
            <p style={{ color: "#64748B", fontSize: "14px", lineHeight: 1.8, marginBottom: "16px" }}>
              A De Ponto a Ponto LTDA atua no controle interno e na gestão de jornada das empresas,
              combinando experiência de mercado, tecnologia, suporte técnico e acompanhamento prático da operação.
            </p>
            <p style={{ color: "#64748B", fontSize: "14px", lineHeight: 1.8, marginBottom: "32px" }}>
              Nossa missão é entregar mais organização, previsibilidade e segurança por meio de uma estrutura confiável,
              moderna e próxima da realidade de cada cliente.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: "32px", paddingTop: "24px", borderTop: "1px solid rgba(148,163,184,0.08)" }}>
              {[
                { value: "+30", label: "Anos de experiência" },
                { value: "B2B", label: "Foco corporativo" },
                { value: "360°", label: "Suporte completo" },
              ].map((stat) => (
                <div key={stat.value}>
                  <p style={{ color: "#3B82F6", fontWeight: 800, fontSize: "22px", marginBottom: "4px" }}>{stat.value}</p>
                  <p style={{ color: "#64748B", fontSize: "11px" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {capabilities.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "linear-gradient(180deg, rgba(15,23,42,0.88), rgba(2,6,23,0.96))",
                  border: "1px solid rgba(148,163,184,0.10)",
                  borderRadius: "20px",
                  padding: "24px 20px",
                  backdropFilter: "blur(18px)",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                whileHover={{ borderColor: "rgba(59,130,246,0.25)", boxShadow: "0 0 24px rgba(59,130,246,0.1)" }}
              >
                <div style={{ fontSize: "24px", marginBottom: "12px" }}>{c.icon}</div>
                <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: "13px", marginBottom: "8px", lineHeight: 1.35 }}>{c.title}</h3>
                <p style={{ color: "#64748B", fontSize: "12px", lineHeight: 1.65 }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;