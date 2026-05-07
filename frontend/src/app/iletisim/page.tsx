import { SiteShell } from "@/components/layout/SiteShell";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata = {
  title: "İletişim",
  description: "Eşyam Nakliyat — telefon, WhatsApp, e-posta. Aynı gün dönüş.",
};

export default function IletisimPage() {
  return (
    <SiteShell>
      <main className="pt-20 pb-32 lg:pt-28">
        <ContactSection />
      </main>
    </SiteShell>
  );
}
