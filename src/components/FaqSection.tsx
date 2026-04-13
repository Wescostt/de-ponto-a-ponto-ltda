import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "A auditoria mensal corrige passivos antigos?",
    a: "A auditoria mensal atua de forma preventiva, reduzindo falhas recorrentes e melhorando a qualidade do fechamento atual. Em situações retroativas, o ideal é tratar o histórico com uma abordagem específica e documentada.",
  },
  {
    q: "O reconhecimento facial substitui uma rotina de conferência?",
    a: "Não completamente. O equipamento fortalece a captura e a confiabilidade do registro, mas a maturidade operacional vem da combinação entre tecnologia, revisão e acompanhamento.",
  },
  {
    q: "Essa solução atende empresas com várias unidades?",
    a: "Sim. A estrutura é adequada para operações que precisam de padronização, escalabilidade e maior visibilidade sobre a jornada em diferentes frentes.",
  },
  {
    q: "Vocês atuam apenas com software?",
    a: "Não. Nossa atuação integra equipamentos REP-P, suporte técnico, rotina operacional e auditoria mensal para uma entrega mais completa.",
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
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold">Perguntas frequentes</h2>
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
                <AccordionTrigger className="text-foreground text-left font-medium text-sm hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
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
