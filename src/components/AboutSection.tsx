import { motion } from "framer-motion";

const capabilities = [
  { title: "Relógios de Ponto", desc: "Soluções modernas para registro de jornada com desempenho corporativo." },
  { title: "Manutenção Especializada", desc: "Atuação técnica preventiva e corretiva para continuidade operacional." },
  { title: "Softwares", desc: "Ferramentas para acompanhamento, tratamento e gestão da jornada." },
  { title: "Crachás e Estrutura", desc: "Itens complementares para padronização e organização do ambiente corporativo." },
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
              Tradição operacional com visão de futuro.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              A De Ponto a Ponto LTDA atua no desenvolvimento e suporte de soluções para gestão de jornada,
              combinando experiência de mercado, equipamentos modernos e acompanhamento estratégico.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nosso foco é oferecer ao cliente uma estrutura sólida para controle interno, conformidade documental,
              redução de inconsistências e maior segurança no processo de fechamento.
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
                className="glass rounded-xl p-5 hover:glow-cyan-sm transition-all duration-500"
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
