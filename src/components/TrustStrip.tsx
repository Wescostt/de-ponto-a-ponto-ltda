import { motion } from "framer-motion";

const items = [
  "Estrutura orientada para empresas que exigem rastreabilidade e precisão.",
  "Implantação, equipamentos, acompanhamento e suporte em um só parceiro.",
  "Visão técnica para fechamento sem surpresas e sem improviso.",
  "Solução escalável para operações com uma ou múltiplas unidades.",
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
