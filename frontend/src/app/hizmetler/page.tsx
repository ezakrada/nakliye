import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { ServicesDossier } from "@/components/sections/ServicesDossier";
import { HowItWorksAtlas } from "@/components/sections/HowItWorksAtlas";

export const metadata = {
  title: "Hizmetlerimiz",
  description:
    "Evden eve, asansörlü, ofis, şehirler arası, hassas eşya ve depolama — Eşyam'ın 6 dosyası.",
};

export default function HizmetlerPage() {
  return (
    <SiteShell>
      <main className="pb-32 lg:pb-20">
        <section className="relative pt-28 pb-8 lg:pt-36">
          <div className="section-x">
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-[var(--hairline-strong)] pb-3">
              <span className="coord">/HIZMETLER · DOSYALAR</span>
              <span className="coord">§ 02</span>
            </div>
            <div className="grid items-end gap-8 lg:grid-cols-[2fr_1fr]">
              <h1 className="h-display-tight text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.98]">
                Altı uzmanlık, tek dosya.{" "}
                <span className="text-[var(--accent-signal)]">
                  Karakterine göre seçilir.
                </span>
              </h1>
              <p className="text-[16px] leading-relaxed text-[var(--text-secondary)] lg:max-w-md lg:text-right">
                Her dosyanın kendi tempo, ekibi ve aracı vardır. Dosyayı açın,
                sayfayı çevirin.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/teklif-al" className="btn-signal text-sm">
                ROTAYI ÇİZ <ArrowRight size={14} />
              </Link>
              <Link href="/iletisim" className="btn-ghost text-sm">
                Sorum var
              </Link>
            </div>
          </div>
        </section>
        <ServicesDossier />
        <HowItWorksAtlas />
      </main>
    </SiteShell>
  );
}
