import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "/logo-deponto.png";

const navLinks = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Experiência real", href: "#experiencia" },
  { label: "Empresa", href: "#empresa" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled
          ? "linear-gradient(180deg, rgba(2,6,23,0.95), rgba(2,6,23,0.88))"
          : "linear-gradient(180deg, rgba(2,6,23,0.8), rgba(2,6,23,0.6))",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        borderBottom: scrolled ? "1px solid rgba(148,163,184,0.10)" : "1px solid transparent",
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.35)" : "none",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <img src={logo} alt="De Ponto a Ponto" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid rgba(59,130,246,0.3)" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 700, color: "#F8FAFC", fontSize: "13px", letterSpacing: "0.02em" }}>De Ponto a Ponto LTDA</span>
            <span style={{ fontSize: "10px", color: "#64748B", letterSpacing: "0.04em" }}>Tecnologia, auditoria e gestão segura da jornada</span>
          </div>
        </a>

        <div style={{ display: "none", gap: "32px" }} className="lg-flex-hidden">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} style={{ fontSize: "13px", color: "#94A3B8", textDecoration: "none", transition: "color 0.2s", fontWeight: 500 }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "#3B82F6"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "#94A3B8"}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href="/portal" style={{
            padding: "8px 18px", borderRadius: "999px", fontSize: "13px",
            color: "#CBD5E1", border: "1px solid rgba(148,163,184,0.2)",
            textDecoration: "none", transition: "all 0.2s", fontWeight: 500,
            background: "rgba(255,255,255,0.03)",
          }}>
            Portal do cliente
          </a>
          <a href="#contato" style={{
            padding: "9px 20px", borderRadius: "999px",
            background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
            color: "#fff", fontSize: "13px", fontWeight: 700,
            textDecoration: "none", transition: "all 0.2s",
            border: "1px solid rgba(255,255,255,0.16)",
            boxShadow: "0 0 24px rgba(59,130,246,0.35)",
          }}>
            Falar com especialista
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden"
          style={{ background: "none", border: "none", color: "#F8FAFC", cursor: "pointer", padding: "4px" }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              overflow: "hidden",
              background: "rgba(2,6,23,0.97)",
              borderTop: "1px solid rgba(148,163,184,0.08)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "16px 24px 20px" }}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)}
                  style={{ fontSize: "14px", color: "#94A3B8", textDecoration: "none", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "color 0.2s" }}>
                  {link.label}
                </a>
              ))}
              <a href="#contato" onClick={() => setOpen(false)} style={{
                marginTop: "12px", padding: "12px", borderRadius: "999px", textAlign: "center",
                background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                color: "#fff", fontSize: "13px", fontWeight: 700, textDecoration: "none",
                boxShadow: "0 0 20px rgba(59,130,246,0.3)",
              }}>
                Falar com especialista
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;