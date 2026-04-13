import { motion } from "framer-motion";

const diffs = [
  {
    title: "Empresa com rosto e presença",
    desc: "As imagens mostram equipe, cliente, suporte e implantação real, o que gera mais confiança.",
  },
  {
    title: "Tecnologia com proximidade humana",
    desc: "O site transmite inovação sem perder o caráter acessível, consultivo e profissional.",
  },
  {
    title: "Visual claro e mais premium",
    desc: "O fundo mais claro amplia percepção de qualidade, limpeza e sofisticação corporativa.",
  },
  {
    title: "Marca mais confiável",
    desc: "A combinação entre estrutura visual e imagens reais posiciona a empresa acima de um fornecedor comum.",
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
              Menos aparência genérica. Mais verdade operacional.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              O que diferencia sua marca é mostrar que existe atendimento, estrutura, histórico e acompanhamento de verdade.
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
