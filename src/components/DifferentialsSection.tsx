import { motion } from "framer-motion";

const diffs = [
  {
    title: "Prevenção antes do fechamento",
    desc: "Identificamos falhas e inconsistências com antecedência para reduzir retrabalho, ruído interno e risco documental.",
  },
  {
    title: "Tecnologia com contexto real de DP",
    desc: "Mais do que software, entregamos acompanhamento alinhado à rotina prática do RH e do Departamento Pessoal.",
  },
  {
    title: "Hardware + processo + suporte",
    desc: "A solução fica completa quando o equipamento, a operação e a revisão caminham juntos.",
  },
  {
    title: "Escalabilidade com padrão",
    desc: "Ideal para empresas que desejam padronizar a jornada entre setores, filiais e múltiplas unidades.",
  },
];

const DifferentialsSection = () => {
  return (
    <section id="diferenciais" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Diferenciais</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Menos improviso. Mais previsibilidade.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A diferença está em tratar o ponto não como uma obrigação isolada,
              mas como parte crítica da governança operacional da empresa.
            </p>
          </motion.div>

          <div className="space-y-5">
            {diffs.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5 hover:border-primary/30 transition-colors"
              >
                <h3 className="text-foreground font-semibold text-sm mb-1">{d.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
