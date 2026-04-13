import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Controle de Ponto Digital",
    description: "Soluções para registro e gestão de jornada com interface moderna, clareza operacional e suporte próximo.",
  },
  {
    num: "02",
    title: "Auditoria Mensal",
    description: "Acompanhamento preventivo para identificar inconsistências e apoiar um fechamento mais seguro.",
  },
  {
    num: "03",
    title: "Equipamentos e REP-P Facial",
    description: "Instalação e suporte de equipamentos modernos para uma rotina de marcação mais eficiente e segura.",
  },
  {
    num: "04",
    title: "Treinamento e Suporte",
    description: "Implantação com apoio humano, orientações práticas e acompanhamento real da operação do cliente.",
  },
];

const ServicesSection = () => {
  return (
    <section id="solucoes" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Soluções</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Controle de jornada com estrutura, acompanhamento e credibilidade.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A proposta da De Ponto a Ponto vai além do registro. Entregamos uma operação mais segura por meio de tecnologia, processos e presença técnica.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 hover:glow-navy-sm transition-all duration-500 group"
            >
              <span className="text-primary/40 text-3xl font-bold">{s.num}</span>
              <h3 className="text-foreground font-semibold text-lg mt-3 mb-2 group-hover:text-primary transition-colors">
                {s.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
