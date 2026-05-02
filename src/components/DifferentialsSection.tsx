import { motion } from "framer-motion";
import { ScanFace, Eye, Headphones, ShieldCheck } from "lucide-react";

const cards = [
  {
    Icon: ScanFace,
    title: "Registro moderno e acessível",
    desc: "Sistema com reconhecimento facial, teclado e recursos digitais para facilitar o registro de ponto com praticidade e segurança.",
  },
  {
    Icon: Eye,
    title: "Presença com mais controle",
    desc: "Visualização clara da operação, com informações úteis para acompanhar equipes, horários e ocorrências em tempo real.",
  },
  {
    Icon: Headphones,
    title: "Tecnologia com suporte humano",
    desc: "A De Ponto a Ponto combina solução moderna com atendimento próximo, implantação orientada e acompanhamento consultivo.",
  },
  {
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
        position: "relative",
        background: "#020617",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── TABLET — metade esquerda, sangra até o topo e base ── */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "55%",
        height: "100%",
        zIndex: 0,
      }}>
        {/* Imagem do tablet */}
        <img
          src="/tab3-deponto.png"
          alt="Secullum Ponto Virtual"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
          }}
        />

        {/* Gradiente direita — funde tablet com fundo do site */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(2,6,23,0.15) 0%, rgba(2,6,23,0.55) 55%, rgba(2,6,23,0.98) 100%)",
        }} />

        {/* Gradiente topo */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(2,6,23,0.5) 0%, transparent 20%, transparent 80%, rgba(2,6,23,0.5) 100%)",
        }} />
      </div>

      {/* Glow azul atrás do tablet */}
      <div style={{
        position: "absolute",
        top: "50%", left: "20%",
        transform: "translate(-50%,-50%)",
        width: "700px", height: "700px",
        background: "radial-gradient(ellipse, rgba(59,130,246,0.10) 0%, transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── CONTEÚDO — lado direito ── */}
      <div style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "96px clamp(24px,5vw,80px)",
        display: "flex",
        justifyContent: "flex-end",
      }}>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ width: "100%", maxWidth: "520px" }}
        >
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <span style={{ display: "block", width: "24px", height: "1px", background: "#3B82F6", flexShrink: 0 }} />
            <span style={{ fontSize: "10px", color: "#3B82F6", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}>Diferenciais</span>
          </div>

          {/* Título */}
          <h2 style={{
            fontSize: "clamp(26px,3vw,42px)",
            fontWeight: 700,
            color: "#F8FAFC",
            lineHeight: 1.18,
            marginBottom: "16px",
          }}>
            Tecnologia que aproxima sua empresa da gestão real.
          </h2>

          {/* Subtítulo */}
          <p style={{
            color: "#64748B",
            fontSize: "14px",
            lineHeight: 1.75,
            marginBottom: "36px",
            maxWidth: "460px",
          }}>
            Com o Ponto Virtual, sua empresa acompanha registros, presença e operações de forma prática, moderna e segura — com suporte próximo, implantação orientada e acompanhamento feito por quem entende do dia a dia do RH.
          </p>

          {/* Cards flutuantes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  borderColor: "rgba(59,130,246,0.35)",
                  boxShadow: "0 0 28px rgba(59,130,246,0.10)",
                }}
                style={{
                  background: "rgba(11,16,32,0.75)",
                  backdropFilter: "blur(20px) saturate(150%)",
                  WebkitBackdropFilter: "blur(20px) saturate(150%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                {/* Ícone */}
                <div style={{
                  width: "38px", height: "38px", borderRadius: "10px", flexShrink: 0,
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: "1px",
                }}>
                  <card.Icon size={17} color="#3B82F6" strokeWidth={1.5} />
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

      {/* Responsividade mobile */}
      <style>{`
        @media (max-width: 768px) {
          #diferenciais {
            min-height: auto !important;
            flex-direction: column !important;
          }
          #diferenciais > div:first-child {
            position: relative !important;
            width: 100% !important;
            height: 280px !important;
          }
          #diferenciais > div:last-child {
            justify-content: flex-start !important;
            padding-top: 32px !important;
          }
          #diferenciais > div:last-child > div {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DifferentialsSection;