import { motion } from "framer-motion";

const items = [
  "Solução pensada para empresas que precisam de mais rastreabilidade e menos improviso.",
  "Atendimento próximo, técnico e orientado à rotina de RH e DP.",
  "Implantação prática com treinamento e acompanhamento de uso.",
  "Visual moderno, operação confiável e relacionamento humano.",
];

const TrustStrip = () => {
  return (
    <section style={{ padding: "48px 0", borderTop: "1px solid rgba(148,163,184,0.08)", borderBottom: "1px solid rgba(148,163,184,0.08)", background: "rgba(11,16,32,0.5)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
            >
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3B82F6", flexShrink: 0, marginTop: "5px", boxShadow: "0 0 8px rgba(59,130,246,0.6)" }} />
              <p style={{ color: "#64748B", fontSize: "12px", lineHeight: 1.65 }}>{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;