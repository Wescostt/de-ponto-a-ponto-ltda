import { motion } from "framer-motion";
import { ScanFace, Eye, Headphones, ShieldCheck } from "lucide-react";

const cards = [
  {
    num: 1,
    Icon: ScanFace,
    title: "Registro moderno e acessível",
    desc: "Sistema com reconhecimento facial, teclado e recursos digitais para facilitar o registro de ponto com praticidade e segurança.",
  },
  {
    num: 2,
    Icon: Eye,
    title: "Presença com mais controle",
    desc: "Visualização clara da operação, com informações úteis para acompanhar equipes, horários e ocorrências em tempo real.",
  },
  {
    num: 3,
    Icon: Headphones,
    title: "Tecnologia com suporte humano",
    desc: "A De Ponto a Ponto combina solução moderna com atendimento próximo, implantação orientada e acompanhamento consultivo.",
  },
  {
    num: 4,
    Icon: ShieldCheck,
    title: "Mais confiança para o RH",
    desc: "Uma estrutura visual e operacional pensada para reduzir dúvidas, organizar processos e dar mais segurança à gestão de ponto.",
  },
];

const DifferentialsSection = () => {
  return (
    <section
      id="diferenciais"
      style={{
        padding: "112px 0",
        position: "relative",
        background: "#020617",
        overflow: "hidden",
      }}
    >
      {/* Glow azul de fundo */}
      <div style={{
        position: "absolute", top: "50%", left: "25%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "600px",
        background: "radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        padding: "0 clamp(24px,5vw,80px)",
        position: "relative", zIndex: 10,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "48px",
        alignItems: "center",
      }}
        className="differentials-grid"
      >
        {/* COLUNA ESQUERDA — Tablet */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {/* Glow atrás do tablet */}
          <div style={{
            position: "absolute", inset: "-20%",
            background: "radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />

          <img
            src="/tab3-deponto.png"
            alt="Secullum Ponto Virtual — tablet corporativo"
            style={{
              width: "100%",
              maxWidth: "580px",
              display: "block",
              position: "relative",
              zIndex: 1,
              filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(59,130,246,0.15))",
            }}
          />
        </motion.div>

        {/* COLUNA DIREITA — Cards */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ display: "flex", flexDirection: "column", gap: "0" }}
        >
          {/* Header */}
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <span style={{ display: "block", width: "24px", height: "1px", background: "#3B82F6", flexShrink: 0 }} />
              <span style={{ fontSize: "10px", color: "#3B82F6", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}>Diferenciais</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, color: "#F8FAFC", lineHeight: 1.2, marginBottom: "12px" }}>
              Tecnologia que aproxima sua empresa da gestão real.
            </h2>
            <p style={{ color: "#64748B", fontSize: "13px", lineHeight: 1.75 }}>
              Com o Ponto Virtual, sua empresa acompanha registros, presença e operações de forma prática, moderna e segura — com suporte próximo e implantação feita por quem entende do dia a dia do RH.
            </p>
          </div>

          {/* Cards flutuantes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor: "rgba(59,130,246,0.3)", boxShadow: "0 0 24px rgba(59,130,246,0.08)" }}
                style={{
                  background: "linear-gradient(180deg, #0B1020 0%, #060d1f 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px",
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                {/* Número circular */}
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: "1px",
                }}>
                  <card.Icon size={16} color="#3B82F6" strokeWidth={1.5} />
                </div>

                <div>
                  <p style={{ color: "#F8FAFC", fontSize: "13px", fontWeight: 600, marginBottom: "5px", lineHeight: 1.35 }}>
                    {card.title}
                  </p>
                  <p style={{ color: "#64748B", fontSize: "12px", lineHeight: 1.65 }}>
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Responsividade mobile via style tag inline */}
      <style>{`
        @media (max-width: 768px) {
          .differentials-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DifferentialsSection;