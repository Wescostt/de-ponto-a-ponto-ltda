import { motion } from "framer-motion";
import photoCampo from "@/assets/photo-campo.png";
import photoTreinamento from "@/assets/photo-treinamento.png";
import photoSuporte from "@/assets/photo-suporte.png";
import photoTecnologia from "@/assets/photo-tecnologia.png";
import photoTime from "@/assets/photo-time.jpeg";
import photoInstitucional from "@/assets/photo-institucional.png";

const experiences = [
  { image: photoCampo, title: "Operação em campo", subtitle: "Instalação, manutenção e presença técnica no cliente", description: "Este bloco reforça que a De Ponto a Ponto não atua apenas como fornecedora de sistema, mas como parceira operacional no ambiente real do cliente." },
  { image: photoTreinamento, title: "Implantação e treinamento", subtitle: "Acompanhamento, apresentação e orientação aos clientes", description: "Mostra proximidade, didática e suporte consultivo durante a implantação e uso do sistema." },
  { image: photoSuporte, title: "Suporte especializado", subtitle: "Equipe preparada para instalação e manutenção" },
  { image: photoTecnologia, title: "Tecnologia aplicada", subtitle: "Solução em funcionamento no ambiente do cliente" },
  { image: photoTime, title: "Time e operação", subtitle: "Pessoas reais por trás da operação e do suporte", description: "Esse bloco humaniza a marca e quebra a percepção de empresa genérica. Ajuda a transmitir confiança, acessibilidade e estrutura." },
  { image: photoInstitucional, title: "Trajetória", subtitle: "História, presença e continuidade no mercado", description: "Imagem institucional que reforça legado, parceiros e tempo de mercado." },
];

const ExperienceSection = () => {
  return (
    <section id="experiencia" style={{ padding: "112px 0", position: "relative", background: "#030712" }}>
      {/* Abertura para vídeo/animação de fundo */}
      {/* <video className="section-video-bg" autoPlay muted loop playsInline src="/seu-video-experiencia.mp4" />
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
            <span style={{ fontSize: "10px", color: "#3B82F6", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}>Experiência real</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 700, color: "#F8FAFC", lineHeight: 1.2, marginBottom: "16px" }}>
            Um site mais forte quando mostra o que a sua empresa realmente faz.
          </h2>
          <p style={{ color: "#64748B", fontSize: "14px", lineHeight: 1.75 }}>
            As imagens abaixo são prova visual de atuação técnica, proximidade com o cliente e vivência prática no segmento.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: "linear-gradient(180deg, rgba(15,23,42,0.88), rgba(2,6,23,0.96))",
                border: "1px solid rgba(148,163,184,0.10)",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
                transition: "border-color 0.3s, transform 0.3s",
              }}
              whileHover={{ borderColor: "rgba(59,130,246,0.25)", y: -4 }}
            >
              <div style={{ overflow: "hidden", position: "relative" }}>
                <motion.img
                  src={exp.image}
                  alt={exp.title}
                  style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,6,23,0.6), transparent)" }} />
              </div>
              <div style={{ padding: "20px 24px 24px" }}>
                <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: "14px", marginBottom: "6px" }}>{exp.title}</h3>
                <p style={{ color: "#3B82F6", fontSize: "12px", marginBottom: exp.description ? "10px" : 0, fontWeight: 500 }}>{exp.subtitle}</p>
                {exp.description && <p style={{ color: "#64748B", fontSize: "12px", lineHeight: 1.65 }}>{exp.description}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;