import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section id="contato" style={{ padding: "112px 0", position: "relative", background: "#030712", overflow: "hidden" }}>
      {/* Abertura para vídeo/animação de fundo */}
      {/* <video className="section-video-bg" autoPlay muted loop playsInline src="/seu-video-cta.mp4" />
          <div className="media-overlay" /> */}

      {/* Glow de fundo decorativo */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 clamp(24px,5vw,48px)", textAlign: "center", position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
            <span style={{ display: "block", width: "24px", height: "1px", background: "#3B82F6" }} />
            <span style={{ fontSize: "10px", color: "#3B82F6", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}>Contato</span>
            <span style={{ display: "block", width: "24px", height: "1px", background: "#3B82F6" }} />
          </div>

          <h2 style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 700, color: "#F8FAFC", lineHeight: 1.15, marginBottom: "16px" }}>
            Pronto para evoluir sua operação?
          </h2>
          <p style={{ color: "#64748B", fontSize: "15px", lineHeight: 1.75, marginBottom: "8px" }}>
            Uma gestão de ponto forte começa com tecnologia, acompanhamento e confiança.
          </p>
          <p style={{ color: "#475569", fontSize: "13px", lineHeight: 1.75, maxWidth: "540px", margin: "0 auto 40px" }}>
            Fale com a De Ponto a Ponto LTDA para estruturar uma operação mais moderna, segura e profissional para sua empresa.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "56px" }}>
            <a href="mailto:DEPONTOAPONTOCOMERCIAL@GMAIL.COM" style={{
              padding: "14px 28px", borderRadius: "999px",
              background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
              color: "#fff", fontSize: "14px", fontWeight: 700,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.16)",
              boxShadow: "0 0 40px rgba(59,130,246,0.4)",
              transition: "box-shadow 0.2s",
            }}>
              Solicitar proposta
            </a>
            <a href="https://wa.me/5521976450726" target="_blank" rel="noopener noreferrer" style={{
              padding: "14px 28px", borderRadius: "999px",
              background: "rgba(255,255,255,0.04)",
              color: "#CBD5E1", fontSize: "14px", fontWeight: 600,
              textDecoration: "none",
              border: "1px solid rgba(148,163,184,0.18)",
              backdropFilter: "blur(16px)",
              transition: "border-color 0.2s, color 0.2s",
            }}>
              Falar no WhatsApp
            </a>
          </div>

          {/* Dados de contato */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1px",
            background: "rgba(148,163,184,0.08)", borderRadius: "18px", overflow: "hidden",
            border: "1px solid rgba(148,163,184,0.08)",
          }}>
            {[
              { label: "CNPJ", value: "34.523.710/0001-18" },
              { label: "E-mail", value: "DEPONTOAPONTOCOMERCIAL@GMAIL.COM" },
              { label: "Contato", value: "(21) 97645-0726 • @DEPONTO" },
            ].map((info, i) => (
              <div key={i} style={{ background: "#030712", padding: "20px 24px", textAlign: "left" }}>
                <p style={{ color: "#475569", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>{info.label}</p>
                <p style={{ color: "#CBD5E1", fontSize: "13px", fontWeight: 500, wordBreak: "break-all" }}>{info.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;