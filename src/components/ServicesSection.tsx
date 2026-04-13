import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Controle de Ponto Digital",
    description: "Gestão moderna da jornada com estrutura confiável, visibilidade operacional e aderência às rotinas do RH.",
  },
  {
    num: "02",
    title: "Auditoria Mensal de Jornada",
    description: "Conferência preventiva de registros, apontamentos e inconsistências antes do fechamento da folha.",
  },
  {
    num: "03",
    title: "REP-P Facial",
    description: "Equipamentos com reconhecimento facial para uma operação mais segura, moderna e alinhada ao ambiente corporativo.",
  },
  {
    num: "04",
    title: "Suporte Especializado",
    description: "Atendimento humano e técnico para implantação, manutenção, dúvidas operacionais e evolução da rotina.",
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
            Uma operação mais segura começa com uma estrutura melhor.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Nossa proposta integra equipamento, rotina operacional e inteligência de conferência
            para transformar o controle de ponto em um ativo de gestão.
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
              className="glass rounded-xl p-6 hover:glow-cyan-sm transition-all duration-500 group"
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
