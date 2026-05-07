import { motion } from "framer-motion";
import { useRef, useState } from "react";

const VideoShowcase = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#020617", paddingTop: "80px", paddingBottom: "80px" }}
    >
      {/* Divisor superior suave */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "clamp(24px, 5vw, 80px)",
          paddingRight: "clamp(24px, 5vw, 80px)",
        }}
      >
        {/* Cabeçalho da seção */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "40px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <span
              className="bg-primary"
              style={{ display: "block", width: "24px", height: "1px", flexShrink: 0 }}
            />
            <span
              className="text-primary"
              style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}
            >
              Veja em funcionamento
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 3vw, 38px)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              maxWidth: "560px",
            }}
          >
            Gestão de ponto moderna,{" "}
            <span className="text-gradient">do equipamento ao relatório.</span>
          </h2>
        </motion.div>

        {/* Container do vídeo */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{ position: "relative" }}
        >
          {/* Moldura glass */}
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
              background: "#0B1020",
            }}
          >
            {/* Brilho sutil no topo da moldura */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "15%",
                right: "15%",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                zIndex: 2,
              }}
            />

            {/* Vídeo */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                display: "block",
                aspectRatio: "16/9",
                objectFit: "cover",
              }}
              src="/calculos-deponto.mp4"
            />

            {/* Overlay gradiente inferior suave */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "120px",
                background: "linear-gradient(to top, rgba(2,6,23,0.5), transparent)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />

            {/* Botão play/pause */}
            <button
              onClick={togglePlay}
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                zIndex: 3,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>
          </div>

          {/* Reflexo/glow abaixo do vídeo */}
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "10%",
              right: "10%",
              height: "40px",
              background: "radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)",
              filter: "blur(8px)",
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* Destaques abaixo do vídeo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            marginTop: "48px",
            backgroundColor: "rgba(255,255,255,0.06)",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {[
            {
              icon: "⚡",
              title: "Implantação rápida",
              desc: "Equipamento instalado e funcionando em até 48h após a contratação.",
            },
            {
              icon: "🔍",
              title: "Auditoria mensal",
              desc: "Relatórios preventivos que identificam inconsistências antes que virem problemas.",
            },
            {
              icon: "🤝",
              title: "Suporte humano",
              desc: "Atendimento consultivo real, com especialistas que conhecem sua operação.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#030712",
                padding: "28px 24px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div style={{ fontSize: "22px", marginBottom: "12px" }}>{item.icon}</div>
              <p style={{ color: "#ffffff", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                {item.title}
              </p>
              <p style={{ color: "rgba(255,255,255,0.40)", fontSize: "12px", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Divisor inferior suave */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />
    </section>
  );
};

export default VideoShowcase;
