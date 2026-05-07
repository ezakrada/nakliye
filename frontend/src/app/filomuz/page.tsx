import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { FleetElevations } from "@/components/sections/FleetElevations";
import { TrustLedger } from "@/components/sections/TrustLedger";

export const metadata = {
  title: "Filomuz",
  description: "28 araç, hepsi bizim. Panelvan'dan hassas eşya kamyonuna, kayıtlı sürücüyle.",
};

export default function FilomuzPage() {
  return (
    <SiteShell>
      <main className="pb-32 lg:pb-20">
        <section className="relative pt-28 pb-8 lg:pt-36">
          <div className="section-x">
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-[var(--hairline-strong)] pb-3">
              <span className="coord">/FILOMUZ · 28 ARAÇ</span>
              <span className="coord">§ 05</span>
            </div>
            <div className="grid items-end gap-8 lg:grid-cols-[2fr_1fr]">
              <h1 className="h-display-tight text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.98]">
                Hiçbir şasi kiralık değil.{" "}
                <span className="text-[var(--accent-signal)]">Hepsi bizim.</span>
              </h1>
              <p className="text-[16px] leading-relaxed text-[var(--text-secondary)] lg:max-w-md lg:text-right">
                28 araç, dört sınıf. Her birinin kayıtlı sürücüsü, periyodik bakım
                dosyası ve K1 yetki belgesi vardır.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/teklif-al" className="btn-signal text-sm">
                FILOYA UYGUN TEKLİF <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
        <FleetElevations />
        <TrustLedger />
      </main>
    </SiteShell>
  );
}
