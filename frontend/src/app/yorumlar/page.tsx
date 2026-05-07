import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { TestimonialsEditorial } from "@/components/sections/TestimonialsEditorial";

export const metadata = {
  title: "Müşterilerimiz",
  description: "14.000+ ev, binlerce mektup. Doğrulanmış müşteri yorumları.",
};

export default function YorumlarPage() {
  return (
    <SiteShell>
      <main className="pb-32 lg:pb-20">
        <section className="relative pt-28 pb-8 lg:pt-36">
          <div className="section-x">
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-[var(--hairline-strong)] pb-3">
              <span className="coord">/MUSTERILERIMIZ · 14.000+</span>
              <span className="coord">§ 06</span>
            </div>
            <div className="grid items-end gap-8 lg:grid-cols-[2fr_1fr]">
              <h1 className="h-display-tight text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.98]">
                On dört bin ev,{" "}
                <span className="text-[var(--accent-signal)]">binlerce mektup.</span>
              </h1>
              <p className="text-[16px] leading-relaxed text-[var(--text-secondary)] lg:max-w-md lg:text-right">
                Doğrulanmış. Hepsi taşıma sonrası WhatsApp davetiyle, isimleriyle
                yazıldı. Sektörel ortalama: %62. Bizim: %96.
              </p>
            </div>
            <div className="mt-7">
              <Link href="/teklif-al" className="btn-signal text-sm">
                SIRAYA KATILIN <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
        <TestimonialsEditorial />
      </main>
    </SiteShell>
  );
}
