import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Vocês apenas vendem o sistema?", a: "Não. A proposta da De Ponto a Ponto envolve tecnologia, implantação, suporte, acompanhamento e experiência prática no segmento." },
  { q: "A empresa também realiza suporte em campo?", a: "Sim. A atuação inclui instalação, manutenção, suporte técnico e acompanhamento conforme a necessidade operacional do cliente." },
  { q: "Há apoio na implantação e treinamento?", a: "Sim. O objetivo é garantir que o cliente tenha clareza no uso da solução, com suporte humano e orientação adequada." },
  { q: "Por que mostrar fotos reais da operação no site?", a: "Porque isso aumenta credibilidade, reforça autenticidade e diferencia a marca de concorrentes com comunicação genérica." },
];

const FaqItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      style={{
        background: "linear-gradient(180deg, rgba(15,23,42,0.7), rgba(2,6,23,0.85))",
        border: `1px solid ${open ? "rgba(59,130,246,0.25)" : "rgba(148,163,184,0.10)"}`,
        borderRadius: "18px",
        overflow: "hidden",
        transition: "border-color 0.3s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px", background: "none", border: "none", cursor: "pointer",
          textAlign: "left", gap: "16px",
        }}
      >
        <span style={{ color: "#F8FAFC", fontSize: "14px", fontWeight: 500, lineHeight: 1.4 }}>{faq.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0 }}>
          <ChevronDown size={18} color={open ? "#3B82F6" : "#64748B"} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <p style={{ color: "#64748B", fontSize: "13px", lineHeight: 1.75, padding: "0 24px 20px" }}>{faq.a}</p>
      </motion.div>
    </motion.div>
  );
};

const FaqSection = () => {
  return (
    <section id="faq" style={{ padding: "112px 0", position: "relative", background: "#020617" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 clamp(24px,5vw,48px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "14px" }}>
            <span style={{ display: "block", width: "24px", height: "1px", background: "#3B82F6" }} />
            <span style={{ fontSize: "10px", color: "#3B82F6", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}>FAQ</span>
            <span style={{ display: "block", width: "24px", height: "1px", background: "#3B82F6" }} />
          </div>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 700, color: "#F8FAFC", lineHeight: 1.2 }}>
            Perguntas frequentes
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {faqs.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;