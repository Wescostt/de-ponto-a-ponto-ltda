import { motion } from "framer-motion";
import { Shield, Activity, CheckCircle } from "lucide-react";

const stats = [
  { value: "+30 anos", label: "de experiência no segmento" },
  { value: "REP-P", label: "facial com suporte técnico" },
  { value: "Auditoria", label: "mensal preventiva" },
  { value: "DP/RH", label: "foco real em operação" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Subtle bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary text-xs tracking-[0.3em] uppercase mb-6 font-medium flex items-center gap-2"
            >
              <span className="w-8 h-px bg-primary" />
              Desde 1993 entregando controle com visão técnica e operacional
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
            >
              Sua jornada sob controle inteligente,{" "}
              <span className="text-gradient">com tecnologia, auditoria e segurança jurídica.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-sm md:text-base max-w-xl mb-8 leading-relaxed"
            >
              A De Ponto a Ponto LTDA une terminais REP-P com reconhecimento facial,
              auditoria mensal especializada e suporte consultivo para entregar conformidade,
              previsibilidade e blindagem operacional ao RH e ao Departamento Pessoal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a
                href="#contato"
                className="px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all glow-cyan text-center"
              >
                Solicitar demonstração
              </a>
              <a
                href="#solucoes"
                className="px-7 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:border-primary/50 hover:text-primary transition-all text-center"
              >
                Conhecer soluções
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((s) => (
                <div key={s.value} className="text-center md:text-left">
                  <p className="text-primary font-bold text-lg">{s.value}</p>
                  <p className="text-muted-foreground text-xs">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="glass rounded-2xl p-6 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-semibold text-sm">Painel Operacional</p>
                  <p className="text-muted-foreground text-xs">Conformidade de Jornada</p>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                  Status ativo
                </span>
              </div>

              {/* Audit card */}
              <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="text-primary" size={16} />
                    <div>
                      <p className="text-foreground text-xs font-medium">Auditoria mensal</p>
                      <p className="text-muted-foreground text-[10px]">Em monitoramento</p>
                    </div>
                  </div>
                  <Activity className="text-primary" size={16} />
                </div>
                <div className="w-full h-1.5 bg-border rounded-full overflow-hidden mb-2">
                  <div className="h-full w-4/5 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                </div>
                <p className="text-muted-foreground text-[10px]">Inconsistências tratadas antes do fechamento da folha.</p>
              </div>

              {/* Two info cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                  <p className="text-foreground text-xs font-semibold mb-1">Terminais REP-P</p>
                  <p className="text-primary text-[10px] font-medium mb-1">Facial</p>
                  <p className="text-muted-foreground text-[10px]">Registro moderno, confiável e aderente à rotina corporativa.</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                  <p className="text-foreground text-xs font-semibold mb-1">Suporte operacional</p>
                  <p className="text-primary text-[10px] font-medium mb-1">Especializado</p>
                  <p className="text-muted-foreground text-[10px]">Atendimento humano com visão prática de RH e DP.</p>
                </div>
              </div>

              {/* Strategic layer */}
              <div className="flex items-center gap-3 bg-muted/30 rounded-lg p-3 border border-border/30">
                <CheckCircle className="text-primary shrink-0" size={16} />
                <div>
                  <p className="text-foreground text-xs font-medium">Camada estratégica</p>
                  <p className="text-muted-foreground text-[10px]">Não é apenas ponto registrado. É gestão preventiva da jornada.</p>
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
