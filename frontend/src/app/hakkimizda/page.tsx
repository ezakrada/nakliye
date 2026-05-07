import { SiteShell } from "@/components/layout/SiteShell";
import { AboutKolofon } from "@/components/sections/AboutKolofon";
import { TrustLedger } from "@/components/sections/TrustLedger";

export const metadata = {
  title: "Hakkımızda",
  description:
    "2014'ten bu yana sigortalı, kayıtlı, kapıdan kapıya nakliyat. On iki yılın özeti.",
};

export default function HakkimizdaPage() {
  return (
    <SiteShell>
      <main className="pt-12 pb-32 lg:pb-20">
        <AboutKolofon />
        <TrustLedger />
      </main>
    </SiteShell>
  );
}
