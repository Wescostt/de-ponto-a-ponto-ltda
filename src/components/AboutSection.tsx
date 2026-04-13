import { motion } from "framer-motion";

const capabilities = [
  { title: "Relógios de Ponto", desc: "Equipamentos e soluções adequadas à rotina operacional do cliente." },
  { title: "Manutenção Especializada", desc: "Atuação técnica com orientação, implantação e continuidade operacional." },
  { title: "Softwares e Gestão", desc: "Ferramentas para apoiar controle, conferência e rotina administrativa." },
  { title: "Crachás e Estrutura", desc: "Itens complementares para fortalecer organização e identidade corporativa." },
];

const AboutSection = () => {
  return (
    <section id="empresa" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Quem somos</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tradição no segmento com evolução constante.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              A De Ponto a Ponto LTDA atua no controle interno e na gestão de jornada das empresas,
              combinando experiência de mercado, tecnologia, suporte técnico e acompanhamento prático da operação.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nossa missão é entregar mais organização, previsibilidade e segurança por meio de uma estrutura confiável,
              moderna e próxima da realidade de cada cliente.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {capabilities.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5 hover:glow-navy-sm transition-all duration-500"
              >
                <h3 className="text-foreground font-semibold text-sm mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
