import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section id="contato" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para evoluir sua operação?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-3">
            Seu ponto precisa apenas registrar horários ou realmente proteger a sua operação?
          </p>
          <p className="text-muted-foreground/70 text-xs md:text-sm max-w-xl mx-auto mb-10">
            Fale com a De Ponto a Ponto LTDA e descubra como unir equipamento, auditoria e suporte
            em uma estrutura mais segura, moderna e eficiente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="mailto:DEPONTOAPONTOCOMERCIAL@GMAIL.COM"
              className="px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all glow-cyan"
            >
              Solicitar proposta
            </a>
            <a
              href="https://wa.me/5521976450726"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full border border-border text-foreground font-medium text-sm hover:border-primary/50 hover:text-primary transition-all"
            >
              Falar no WhatsApp
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div>
              <p className="text-muted-foreground text-[10px] tracking-widest uppercase mb-1">CNPJ</p>
              <p className="text-foreground text-sm font-medium">34.523.710/0001-18</p>
            </div>
            <div>
              <p className="text-muted-foreground text-[10px] tracking-widest uppercase mb-1">E-mail</p>
              <p className="text-foreground text-sm font-medium">DEPONTOAPONTOCOMERCIAL@GMAIL.COM</p>
            </div>
            <div>
              <p className="text-muted-foreground text-[10px] tracking-widest uppercase mb-1">Contato</p>
              <p className="text-foreground text-sm font-medium">(21) 97645-0726 • @DEPONTO</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
