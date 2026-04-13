import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import ServicesSection from "@/components/ServicesSection";
import ExperienceSection from "@/components/ExperienceSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import AboutSection from "@/components/AboutSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <ServicesSection />
      <ExperienceSection />
      <DifferentialsSection />
      <AboutSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
};

export default Index;
