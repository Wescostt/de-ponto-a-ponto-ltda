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
      {/* VÍDEO — fundo completo da hero */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center right",
          zIndex: 0,
        }}
        src="/hero-video.mp4"
      />

      {/* Overlay escuro suave sobre o vídeo — mantém legibilidade sem apagar */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.15) 100%)",
          zIndex: 1,
        }}
      />

      {/* CONTEÚDO — glass card flutuando sobre o vídeo */}
      <div
        className="relative w-full"
        style={{
          zIndex: 10,
          paddingTop: "96px",
          paddingBottom: "64px",
          paddingLeft: "clamp(24px, 6vw, 96px)",
          paddingRight: "clamp(24px, 6vw, 96px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Glass panel — esquerda */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            maxWidth: "560px",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
            border: "1px solid rgba(255, 255, 255, 0.10)",
            borderRadius: "24px",
            padding: "40px 40px 36px 40px",
            boxShadow: "0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Brilho sutil no topo do glass */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "40px",
              right: "40px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
              borderRadius: "999px",
            }}
          />

          {/* Label topo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <span
              className="bg-primary"
              style={{ display: "block", width: "24px", height: "1px", flexShrink: 0 }}
            />
            <span
              className="text-primary"
              style={{
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Mais de 30 anos de experiência no controle de jornada
            </span>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            style={{
              fontSize: "clamp(26px, 3.5vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.18,
              color: "#ffffff",
              marginBottom: "18px",
            }}
          >
            Tecnologia e suporte real para uma{" "}
            <span className="text-gradient">gestão de ponto mais segura.</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              fontSize: "13.5px",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.60)",
              marginBottom: "28px",
            }}
          >
            A De Ponto a Ponto LTDA une equipamentos modernos, auditoria mensal,
            implantação especializada e suporte técnico humano para entregar mais
            controle, previsibilidade e segurança operacional ao RH e ao DP.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "32px" }}
          >
            <a
              href="#contato"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              style={{
                padding: "11px 26px",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none",
                display: "inline-block",
                transition: "opacity 0.2s",
              }}
            >
              Solicitar proposta
            </a>
            <a
              href="#experiencia"
              style={{
                padding: "11px 26px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.22)",
                color: "#ffffff",
                fontWeight: 500,
                fontSize: "13px",
                textDecoration: "none",
                display: "inline-block",
                transition: "border-color 0.2s",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              Ver experiência real
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.84 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "4px",
              marginBottom: "24px",
              paddingBottom: "24px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {stats.map((s) => (
              <div key={s.value}>
                <p
                  className="text-primary"
                  style={{ fontWeight: 700, fontSize: "14px", marginBottom: "3px" }}
                >
                  {s.value}
                </p>
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "11px", lineHeight: 1.4 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Cards integrados */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.96, duration: 0.6 }}
            style={{
              backgroundColor: "rgba(0,0,0,0.18)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px",
              padding: "14px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              {[
                { title: "Operação em campo", sub: "Instalação e suporte técnico" },
                { title: "Atendimento consultivo", sub: "Acompanhamento real do cliente" },
              ].map((card) => (
                <div
                  key={card.title}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderRadius: "10px",
                    padding: "13px 14px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p style={{ color: "#ffffff", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>
                    {card.title}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "11px" }}>
                    {card.sub}
                  </p>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "rgba(255,255,255,0.02)",
                borderRadius: "8px",
                padding: "11px 14px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="bg-primary animate-pulse"
                style={{ width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0 }}
              />
              <div>
                <p style={{ color: "#ffffff", fontSize: "12px", fontWeight: 500 }}>
                  Estrutura completa
                </p>
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "11px" }}>
                  Equipamento + implantação + auditoria + suporte
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;