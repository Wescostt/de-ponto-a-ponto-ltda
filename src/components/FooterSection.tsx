import logo from "/logo-deponto.png";

const FooterSection = () => {
  return (
    <footer style={{ borderTop: "1px solid rgba(148,163,184,0.08)", background: "#020617" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px clamp(24px,5vw,80px) 32px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px", marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src={logo} alt="De Ponto a Ponto" style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(59,130,246,0.25)" }} />
            <div>
              <p style={{ color: "#F8FAFC", fontSize: "13px", fontWeight: 600 }}>De Ponto a Ponto LTDA</p>
              <p style={{ color: "#475569", fontSize: "11px" }}>CNPJ 34.523.710/0001-18</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {["#solucoes", "#experiencia", "#empresa", "#faq", "#contato"].map((href, i) => (
              <a key={href} href={href} style={{ color: "#475569", fontSize: "12px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = "#3B82F6"}
                onMouseLeave={e => (e.target as HTMLElement).style.color = "#475569"}
              >
                {["Soluções", "Experiência real", "Empresa", "FAQ", "Contato"][i]}
              </a>
            ))}
          </div>
        </div>

        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(148,163,184,0.08), transparent)", marginBottom: "24px" }} />

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <p style={{ color: "#334155", fontSize: "11px" }}>
            © De Ponto a Ponto LTDA — Todos os direitos reservados.
          </p>
          <p style={{ color: "#1E293B", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Design corporativo com mais clareza, proximidade e credibilidade.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;