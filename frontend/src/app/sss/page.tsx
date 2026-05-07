import { Phone, MessageCircle } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { FaqColumn } from "@/components/sections/FaqColumn";
import { getSiteConfig } from "@/lib/site-server";

export const metadata = {
  title: "Sıkça Sorulanlar",
  description: "Eşyam Nakliyat hakkında en çok sorulan sorular ve net cevaplar.",
};

export default async function SssPage() {
  const config = await getSiteConfig();
  return (
    <SiteShell>
      <main className="pb-32 lg:pb-20">
        <section className="relative pt-28 pb-8 lg:pt-36">
          <div className="section-x">
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-[var(--hairline-strong)] pb-3">
              <span className="coord">/SIKCA SORULAN · SUTUN</span>
              <span className="coord">§ 08</span>
            </div>
            <div className="grid items-end gap-8 lg:grid-cols-[2fr_1fr]">
              <h1 className="h-display-tight text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.98]">
                Açık konuşalım.{" "}
                <span className="text-[var(--accent-signal)]">Kısa keselim.</span>
              </h1>
              <p className="text-[16px] leading-relaxed text-[var(--text-secondary)] lg:max-w-md lg:text-right">
                Cevabını burada bulamadığınız her şey için telefon ve WhatsApp
                hep açık.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={`tel:${config.phoneRaw}`} className="btn-ghost text-sm">
                <Phone size={13} /> {config.phone}
              </a>
              <a
                href={config.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-mint text-sm"
              >
                <MessageCircle size={13} /> WHATSAPP
              </a>
            </div>
          </div>
        </section>
        <FaqColumn />
      </main>
    </SiteShell>
  );
}
