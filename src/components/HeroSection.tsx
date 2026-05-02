import { motion } from "framer-motion";

const stats = [
  { value: "+30 anos", label: "de experiência" },
  { value: "Suporte", label: "humano especializado" },
  { value: "Facial", label: "REP-P e mobilidade" },
  { value: "Auditoria", label: "preventiva mensal" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0" src="/hero-video.mp4" />
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-secondary/20 z-10" />
      <div className="relative z-20 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-primary text-xs tracking-[0.3em] uppercase mb-6 font-medium flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Mais de 30 anos de experiência no controle de jornada
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
              Tecnologia e suporte real para uma{" "}
              <span className="text-gradient">gestão de ponto mais segura.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-white/80 text-sm md:text-base max-w-xl mb-8 leading-relaxed">
              A De Ponto a Ponto LTDA une equipamentos modernos, auditoria mensal, implantação especializada e suporte técnico humano para entregar mais controle, previsibilidade e segurança operacional ao RH e ao DP.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#contato" className="px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all text-center">Solicitar proposta</a>
              <a href="#experiencia" className="px-7 py-3 rounded-full border border-white/40 text-white font-medium text-sm hover:border-primary/50 hover:text-primary transition-all text-center">Ver experiência real</a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.value} className="text-center md:text-left">
                  <p className="text-primary font-bold text-lg">{s.value}</p>
                  <p className="text-white/60 text-xs">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="hidden lg:block">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="rounded-xl overflow-hidden">
                <video autoPlay muted loop playsInline className="w-full h-56 object-cover rounded-xl" src="/hero-video.mp4" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <p className="text-white text-xs font-semibold mb-1">Operação em campo</p>
                  <p className="text-white/60 text-[10px]">Instalação e suporte técnico</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <p className="text-white text-xs font-semibold mb-1">Atendimento consultivo</p>
                  <p className="text-white/60 text-[10px]">Acompanhamento real do cliente</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div>
                  <p className="text-white text-xs font-medium">Estrutura completa</p>
                  <p className="text-white/60 text-[10px]">Equipamento + implantação + auditoria + suporte</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
