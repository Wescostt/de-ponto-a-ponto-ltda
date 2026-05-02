import { motion } from "framer-motion";
import { Clock, Search, Scan, Users } from "lucide-react";

const services = [
  {
    num: "01",
    title: "Controle de Ponto Digital",
    description: "Soluções para registro e gestão de jornada com interface moderna, clareza operacional e suporte próximo.",
    Icon: Clock,
  },
  {
    num: "02",
    title: "Auditoria Mensal",
    description: "Acompanhamento preventivo para identificar inconsistências e apoiar um fechamento mais seguro.",
    Icon: Search,
  },
  {
    num: "03",
    title: "Equipamentos e REP-P Facial",
    description: "Instalação e suporte de equipamentos modernos para uma rotina de marcação mais eficiente e segura.",
    Icon: Scan,
  },
  {
    num: "04",
    title: "Treinamento e Suporte",
    description: "Implantação com apoio humano, orientações práticas e acompanhamento real da operação do cliente.",
    Icon: Users,
  },
];

const ServicesSection = () => {
  return (
    <section id="solucoes" style={{ padding: "112px 0", position: "relative", background: "#020617" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" }}>
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
              whileHover={{ borderColor: "rgba(59,130,246,0.3)", boxShadow: "0 0 32px rgba(59,130,246,0.12), 0 24px 80px rgba(0,0,0,0.4)" }}
              style={{
                background: "linear-gradient(180deg, #0B1020 0%, #060d1f 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
                transition: "border-color 0.3s, box-shadow 0.3s",
                cursor: "default",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <s.Icon size={20} color="#3B82F6" strokeWidth={1.5} />
                </div>
                <span style={{ color: "rgba(59,130,246,0.2)", fontSize: "28px", fontWeight: 800 }}>{s.num}</span>
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