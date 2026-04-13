import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "A auditoria resolve passivos trabalhistas retroativos?",
    a: "Nossa auditoria foca na prevenção. Detectamos erros no mês corrente para que sua folha feche perfeita, evitando que novos passivos sejam criados. Para questões retroativas, oferecemos consultoria especializada.",
  },
  {
    q: "Qual a garantia dos equipamentos faciais?",
    a: "Nossos terminais REP-P possuem garantia de fábrica e oferecemos contratos de manutenção preventiva e corretiva com nossa equipe especializada para garantir operação 24/7.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Dúvidas</p>
          <h2 className="text-3xl md:text-4xl font-display italic font-bold">
            Perguntas Frequentes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass rounded-xl px-6 border-border/50"
              >
                <AccordionTrigger className="text-foreground text-left font-medium hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
