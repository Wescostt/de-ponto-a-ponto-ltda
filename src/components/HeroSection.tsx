import { motion } from "framer-motion";

const stats = [
  { value: "+30 anos", label: "de experiência" },
  { value: "Suporte", label: "humano especializado" },
  { value: "Facial", label: "REP-P e mobilidade" },
  { value: "Auditoria", label: "preventiva mensal" },
];

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      {/* VÍDEO — direita, sem filtros, aparência original */}
      <div
        className="absolute top-0 right-0 h-full"
        style={{ width: "52%", zIndex: 0 }}
      >
        {/* Máscara apenas na borda esquerda para fundir com o preto */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "180px",
            height: "100%",
            background: "linear-gradient(to right, #000000 0%, transparent 100%)",
            zIndex: 2,
          }}
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          src="/hero-video.mp4"
        />
      </div>

      {/* CONTEÚDO — esquerda, bem alinhado */}
      <div
        className="relative w-full"
        style={{
          zIndex: 10,
          paddingTop: "96px",
          paddingBottom: "64px",
          paddingLeft: "clamp(24px, 6vw, 96px)",
          paddingRight: "24px",
        }}
      >
        <div style={{ maxWidth: "540px" }}>

          {/* Label topo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <span
              className="bg-primary"
              style={{ display: "block", width: "28px", height: "1px", flexShrink: 0 }}
            />
            <span
              className="text-primary"
              style={{
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Mais de 30 anos de experiência no controle de jornada
            </span>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Tecnologia e suporte real para uma{" "}
            <span className="text-gradient">gestão de ponto mais segura.</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            style={{
              fontSize: "14px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.65)",
              marginBottom: "28px",
              maxWidth: "480px",
            }}
          >
            A De Ponto a Ponto LTDA une equipamentos modernos, auditoria mensal,
            implantação especializada e suporte técnico humano para entregar mais
            controle, previsibilidade e segurança operacional ao RH e ao DP.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <a
              href="#contato"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              style={{
                padding: "11px 28px",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none",
                transition: "opacity 0.2s",
                display: "inline-block",
              }}
            >
              Solicitar proposta
            </a>
            <a
              href="#experiencia"
              style={{
                padding: "11px 28px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#ffffff",
                fontWeight: 500,
                fontSize: "13px",
                textDecoration: "none",
                transition: "border-color 0.2s",
                display: "inline-block",
              }}
            >
              Ver experiência real
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
              marginBottom: "28px",
              paddingBottom: "28px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {stats.map((s) => (
              <div key={s.value}>
                <p
                  className="text-primary"
                  style={{ fontWeight: 700, fontSize: "15px", marginBottom: "2px" }}
                >
                  {s.value}
                </p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", lineHeight: 1.4 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Cards integrados */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "14px",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "10px",
                  padding: "14px 16px",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p style={{ color: "#ffffff", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                  Operação em campo
                </p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>
                  Instalação e suporte técnico
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "10px",
                  padding: "14px 16px",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p style={{ color: "#ffffff", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                  Atendimento consultivo
                </p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>
                  Acompanhamento real do cliente
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "rgba(255,255,255,0.02)",
                borderRadius: "8px",
                padding: "12px 14px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="bg-primary animate-pulse"
                style={{ width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0 }}
              />
              <div>
                <p style={{ color: "#ffffff", fontSize: "12px", fontWeight: 500 }}>
                  Estrutura completa
                </p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>
                  Equipamento + implantação + auditoria + suporte
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;