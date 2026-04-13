import { motion } from "framer-motion";
import { ClipboardCheck, ShieldAlert, Headphones, ScanFace } from "lucide-react";

const services = [
  {
    icon: ClipboardCheck,
    title: "Auditoria Mensal",
    description: "Conformidade total e segurança jurídica nos seus registros.",
  },
  {
    icon: ShieldAlert,
    title: "Controle Preventivo",
    description: "Identificação de falhas antes do fechamento da folha.",
  },
  {
    icon: Headphones,
    title: "Suporte DP",
    description: "Atendimento prioritário feito por especialistas reais.",
  },
  {
    icon: ScanFace,
    title: "Equipamentos",
    description: "Venda e suporte de terminais REP-P faciais.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Soluções</p>
          <h2 className="text-3xl md:text-4xl font-display italic font-bold">
            Nossas Soluções
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass rounded-xl p-6 hover:glow-cyan-sm transition-all duration-500 group"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-foreground font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
