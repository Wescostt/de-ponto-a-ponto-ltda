import { motion } from "framer-motion";
import repTerminal from "@/assets/rep-terminal.png";

const tags = ["Relógios de Ponto", "Manutenção Especializada", "Softwares", "Crachás Personalizados"];

const AboutSection = () => {
  return (
    <section id="empresa" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-2xl blur-2xl" />
              <img
                src={repTerminal}
                alt="Terminal REP-P de reconhecimento facial"
                loading="lazy"
                width={800}
                height={800}
                className="relative w-full max-w-sm animate-float"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Sobre</p>
            <h2 className="text-3xl md:text-4xl font-display italic font-bold mb-6">
              Quem Somos?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              A <span className="text-foreground font-medium">De Ponto a Ponto LTDA</span> é uma empresa dedicada a desenvolver todo o controle interno de seu estabelecimento. Com um legado de mais de três décadas, unimos nossa vasta experiência às demandas tecnológicas modernas (REP-P, reconhecimento facial).
            </p>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-xs font-medium glass text-primary border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
