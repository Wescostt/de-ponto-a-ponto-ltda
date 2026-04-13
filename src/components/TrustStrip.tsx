import { motion } from "framer-motion";

const items = [
  "Solução pensada para empresas que precisam de mais rastreabilidade e menos improviso.",
  "Atendimento próximo, técnico e orientado à rotina de RH e DP.",
  "Implantação prática com treinamento e acompanhamento de uso.",
  "Visual moderno, operação confiável e relacionamento humano.",
];

const TrustStrip = () => {
  return (
    <section className="py-12 border-y border-border/30">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-muted-foreground text-xs leading-relaxed text-center lg:text-left"
            >
              {item}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
