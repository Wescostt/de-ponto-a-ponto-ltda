import { motion } from "framer-motion";
import { Timer, Wrench, MonitorDot, BadgeCheck } from "lucide-react";

const capabilities = [
  { title: "Relógios de Ponto", desc: "Equipamentos e soluções adequadas à rotina operacional do cliente.", Icon: Timer },
  { title: "Manutenção Especializada", desc: "Atuação técnica com orientação, implantação e continuidade operacional.", Icon: Wrench },
  { title: "Softwares e Gestão", desc: "Ferramentas para apoiar controle, conferência e rotina administrativa.", Icon: MonitorDot },
  { title: "Crachás e Estrutura", desc: "Itens complementares para fortalecer organização e identidade corporativa.", Icon: BadgeCheck },
];

const AboutSection = () => {
  return (
    <section id="empresa" style={{ padding: "112px 0", position: "relative", background: "#030712" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px", alignItems: "start" }}>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
            <div style={{ display: "flex", gap: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {[{ value: "+30", label: "Anos de experiência" }, { value: "B2B", label: "Foco corporativo" }, { value: "360°", label: "Suporte completo" }].map((stat) => (
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
                whileHover={{ borderColor: "rgba(59,130,246,0.25)", boxShadow: "0 0 24px rgba(59,130,246,0.08)" }}
                style={{
                  background: "linear-gradient(180deg, #0B1020 0%, #060d1f 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "20px", padding: "24px 20px",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
              >
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px",
                }}>
                  <c.Icon size={18} color="#3B82F6" strokeWidth={1.5} />
                </div>
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