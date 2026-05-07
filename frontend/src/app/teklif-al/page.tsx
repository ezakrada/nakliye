import { Suspense } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { QuoteWizard } from "@/components/forms/QuoteWizard";
import { getPricing } from "@/lib/site-server";

export const metadata = {
  title: "Ücretsiz teklif al",
  description:
    "Saniyeler içinde fiyat aralığı; foto-envanter sonrası kesin fiyat. Eşyam ile evden eve nakliyat teklifi.",
};

export default async function TeklifAlPage() {
  const pricing = await getPricing();
  return (
    <SiteShell>
      <main className="relative min-h-dvh pt-24 pb-32 lg:pt-32 lg:pb-20">
        <div className="section-x">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="h-eyebrow">Teklif</span>
              <h1 className="h-display mt-3 text-[clamp(2rem,4vw,2.8rem)]">
                4 adımda{" "}
                <span className="italic text-[var(--accent-terra)]">sabit</span> fiyat.
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Kredi kartı istemiyoruz. KVKK uyumlu — bilgileriniz sadece taşıma için.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="mt-10 h-[480px] animate-pulse rounded-[36px] bg-[var(--bg-tinted)]" />
              }
            >
              <QuoteWizard pricing={pricing} />
            </Suspense>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
