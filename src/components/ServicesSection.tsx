import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Controle de Ponto Digital",
    description: "Soluções para registro e gestão de jornada com interface moderna, clareza operacional e suporte próximo.",
    icon: "🕐",
  },
  {
    num: "02",
    title: "Auditoria Mensal",
    description: "Acompanhamento preventivo para identificar inconsistências e apoiar um fechamento mais seguro.",
    icon: "🔍",
  },
  {
    num: "03",
    title: "Equipamentos e REP-P Facial",
    description: "Instalação e suporte de equipamentos modernos para uma rotina de marcação mais eficiente e segura.",
    icon: "📱",
  },
  {
    num: "04",
    title: "Treinamento e Suporte",
    description: "Implantação com apoio humano, orientações práticas e acompanhamento real da operação do cliente.",
    icon: "🤝",
  },
];

const ServicesSection = () => {
  return (
    <section id="solucoes" style={{ padding: "112px 0", position: "relative", background: "#020617" }}>
      {/* Abertura para vídeo/animação de fundo */}
      {/* <video className="section-video-bg" autoPlay muted loop playsInline src="/seu-video.mp4" />
          <div className="media-overlay" /> */}

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(24px,5vw,80px)", position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: "640px", marginBottom: "64px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <span style={{ display: "block", width: "24px", height: "1px", background: "#3B82F6", flexShrink: 0 }} />
            <span style={{ fontSize: "10px", color: "#3B82F6", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}>Soluções</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 700, color: "#F8FAFC", lineHeight: 1.2, marginBottom: "16px" }}>
            Controle de jornada com estrutura, acompanhamento e credibilidade.
          </h2>
          <p style={{ color: "#64748B", fontSize: "14px", lineHeight: 1.75 }}>
            A proposta da De Ponto a Ponto vai além do registro. Entregamos uma operação mais segura por meio de tecnologia, processos e presença técnica.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "linear-gradient(180deg, rgba(15,23,42,0.88), rgba(2,6,23,0.96))",
                border: "1px solid rgba(148,163,184,0.10)",
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
                backdropFilter: "blur(18px)",
                transition: "border-color 0.3s, box-shadow 0.3s",
                cursor: "default",
              }}
              whileHover={{ borderColor: "rgba(59,130,246,0.3)", boxShadow: "0 0 32px rgba(59,130,246,0.15), 0 24px 80px rgba(0,0,0,0.4)" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontSize: "28px" }}>{s.icon}</span>
                <span style={{ color: "rgba(59,130,246,0.25)", fontSize: "32px", fontWeight: 800 }}>{s.num}</span>
              </div>
              <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: "16px", marginBottom: "10px", lineHeight: 1.35 }}>{s.title}</h3>
              <p style={{ color: "#64748B", fontSize: "13px", lineHeight: 1.7 }}>{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;