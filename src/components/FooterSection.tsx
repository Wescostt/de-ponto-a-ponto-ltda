import { Mail, Phone } from "lucide-react";
import { SiInstagram } from "@icons-pack/react-simple-icons";

const FooterSection = () => {
  return (
    <footer id="contato" className="border-t border-border/40 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">DP</span>
              </div>
              <span className="font-semibold text-foreground">De Ponto a Ponto</span>
            </div>
            <p className="text-muted-foreground text-xs">
              CNPJ: 34.523.710/0001-18 | Todos os direitos reservados.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <a
              href="mailto:DEPONTOAPONTOCOMERCIAL@GMAIL.COM"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={16} />
              DEPONTOAPONTOCOMERCIAL@GMAIL.COM
            </a>
            <a
              href="https://instagram.com/DEPONTO"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram size={16} />
              @DEPONTO
            </a>
            <a
              href="tel:+5521976450726"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone size={16} />
              (21) 97645-0726
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/30 text-center">
          <p className="text-muted-foreground/50 text-xs tracking-widest uppercase">
            Design Moderno &amp; Herança de Sucesso
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
