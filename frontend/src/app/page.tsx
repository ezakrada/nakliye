import { SiteShell } from "@/components/layout/SiteShell";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { HeroBento } from "@/components/sections/HeroBento";
import { ServicesDossier } from "@/components/sections/ServicesDossier";
import { HowItWorksAtlas } from "@/components/sections/HowItWorksAtlas";
import { TrustLedger } from "@/components/sections/TrustLedger";
import { FleetElevations } from "@/components/sections/FleetElevations";
import { TestimonialsEditorial } from "@/components/sections/TestimonialsEditorial";
import { AboutKolofon } from "@/components/sections/AboutKolofon";
import { FaqColumn } from "@/components/sections/FaqColumn";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <SiteShell>
      <main className="pb-32 lg:pb-0">
        <HeroSlider />
        <HeroBento />
        <ServicesDossier />
        <HowItWorksAtlas />
        <TrustLedger />
        <FleetElevations />
        <TestimonialsEditorial />
        <AboutKolofon />
        <FaqColumn />
        <ContactSection />
      </main>
    </SiteShell>
  );
}
