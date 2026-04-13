import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Vocês apenas vendem o sistema?",
    a: "Não. A proposta da De Ponto a Ponto envolve tecnologia, implantação, suporte, acompanhamento e experiência prática no segmento.",
  },
  {
    q: "A empresa também realiza suporte em campo?",
    a: "Sim. A atuação inclui instalação, manutenção, suporte técnico e acompanhamento conforme a necessidade operacional do cliente.",
  },
  {
    q: "Há apoio na implantação e treinamento?",
    a: "Sim. O objetivo é garantir que o cliente tenha clareza no uso da solução, com suporte humano e orientação adequada.",
  },
  {
    q: "Por que mostrar fotos reais da operação no site?",
    a: "Porque isso aumenta credibilidade, reforça autenticidade e diferencia a marca de concorrentes com comunicação genérica.",
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
