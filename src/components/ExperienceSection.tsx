import { motion } from "framer-motion";
import photoCampo from "@/assets/photo-campo.png";
import photoTreinamento from "@/assets/photo-treinamento.png";
import photoSuporte from "@/assets/photo-suporte.png";
import photoTecnologia from "@/assets/photo-tecnologia.png";
import photoTime from "@/assets/photo-time.jpeg";
import photoInstitucional from "@/assets/photo-institucional.png";

const experiences = [
  {
    image: photoCampo,
    title: "Operação em campo",
    subtitle: "Instalação, manutenção e presença técnica no cliente",
    description: "Este bloco reforça que a De Ponto a Ponto não atua apenas como fornecedora de sistema, mas como parceira operacional no ambiente real do cliente.",
  },
  {
    image: photoTreinamento,
    title: "Implantação e treinamento",
    subtitle: "Acompanhamento, apresentação e orientação aos clientes",
    description: "Mostra proximidade, didática e suporte consultivo durante a implantação e uso do sistema.",
  },
  {
    image: photoSuporte,
    title: "Suporte especializado",
    subtitle: "Equipe preparada para instalação e manutenção",
  },
  {
    image: photoTecnologia,
    title: "Tecnologia aplicada",
    subtitle: "Solução em funcionamento no ambiente do cliente",
  },
  {
    image: photoTime,
    title: "Time e operação",
    subtitle: "Pessoas reais por trás da operação e do suporte",
    description: "Esse bloco humaniza a marca e quebra a percepção de empresa genérica. Ajuda a transmitir confiança, acessibilidade e estrutura.",
  },
  {
    image: photoInstitucional,
    title: "Trajetória",
    subtitle: "História, presença e continuidade no mercado",
    description: "Imagem institucional que reforça legado, parceiros e tempo de mercado.",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experiencia" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-16"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">Experiência real</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Um site mais forte quando mostra o que a sua empresa realmente faz.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            As imagens abaixo são prova visual de atuação técnica, proximidade com o cliente e vivência prática no segmento.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl overflow-hidden group hover:glow-navy-sm transition-all duration-500"
            >
              <div className="overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5">
                <h3 className="text-foreground font-semibold text-sm mb-1">{exp.title}</h3>
                <p className="text-primary text-xs mb-2">{exp.subtitle}</p>
                {exp.description && (
                  <p className="text-muted-foreground text-xs leading-relaxed">{exp.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
