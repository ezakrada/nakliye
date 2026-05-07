import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import type { SiteConfig } from "@/lib/site-server";
import { Logo } from "./Logo";

function InstagramGlyph({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

const cols = [
  {
    title: "HİZMETLER",
    links: [
      { href: "/hizmetler", label: "Tüm dosyalar" },
      { href: "/hizmetler", label: "Evden eve" },
      { href: "/hizmetler", label: "Asansörlü" },
      { href: "/hizmetler", label: "Ofis taşıma" },
      { href: "/hizmetler", label: "Hassas eşya" },
      { href: "/hizmetler", label: "Depolama" },
    ],
  },
  {
    title: "KURUMSAL",
    links: [
      { href: "/hakkimizda", label: "Hakkımızda" },
      { href: "/filomuz", label: "Filomuz" },
      { href: "/yorumlar", label: "Müşterilerimiz" },
      { href: "/iletisim", label: "İletişim" },
    ],
  },
  {
    title: "YARDIM",
    links: [
      { href: "/teklif-al", label: "Rotayı çiz" },
      { href: "/takip", label: "Gönderi takip" },
      { href: "/sss", label: "Sıkça sorulan" },
      { href: "/iletisim", label: "Destek" },
    ],
  },
  {
    title: "YASAL",
    links: [
      { href: "/yasal/kvkk", label: "KVKK aydınlatma" },
      { href: "/yasal/cerez", label: "Çerez politikası" },
      { href: "/yasal/sozlesme", label: "Hizmet sözleşmesi" },
      { href: "/yasal/iletisim-onayi", label: "İletişim izni" },
    ],
  },
] as const;

export function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer className="relative mt-32">
      {/* Atlas CTA strip */}
      <div className="section-x">
        <div
          className="relative -mb-12 overflow-hidden rounded-[20px] border border-[var(--hairline-strong)] bg-[var(--bg-glacier)] p-8 sm:p-12"
        >
          <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_auto]">
            <div>
              <span className="coord">SON BÖLÜM · DAVET</span>
              <h3 className="h-display-tight mt-3 text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05]">
                Bir kahve içiminde{" "}
                <span className="text-[var(--accent-signal)]">rota çizilir.</span>
              </h3>
              <p className="mt-3 max-w-xl text-sm text-[var(--text-secondary)]">
                Kredi kartı yok, kayıt yok. İki şehir adı yazın, dakikalar içinde
                aralık verelim.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/teklif-al" className="btn-signal text-sm">
                ROTAYI ÇİZ →
              </Link>
              <a
                href={config.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm"
              >
                <MessageCircle size={13} /> WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer body */}
      <div
        className="relative pt-24"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-base) 0%, var(--bg-cool) 100%)",
        }}
      >
        <div className="section-x py-12">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
            <div>
              <Logo size={26} />
              <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
                {config.tagline} {config.founded}'ten beri sigortalı, kayıtlı, kapıdan
                kapıya. Komisyoncusuz.
              </p>
              <div className="mt-6 space-y-1.5">
                <a
                  href={`tel:${config.phoneRaw}`}
                  className="flex items-center gap-2.5 rounded-md border border-[var(--hairline-strong)] bg-[var(--bg-paper)] px-3.5 py-2.5 text-sm font-medium hover:border-[var(--accent-signal)]"
                >
                  <Phone size={13} className="text-[var(--accent-signal)]" />
                  <span className="num">{config.phone}</span>
                </a>
                <a
                  href={config.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-md border border-[var(--hairline-strong)] bg-[var(--bg-paper)] px-3.5 py-2.5 text-sm font-medium hover:border-[var(--accent-mint)]"
                >
                  <MessageCircle size={13} className="text-[var(--accent-mint)]" />
                  <span className="num">{config.whatsapp}</span>
                </a>
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-center gap-2.5 rounded-md border border-[var(--hairline-strong)] bg-[var(--bg-paper)] px-3.5 py-2.5 text-sm font-medium hover:border-[var(--accent-signal)]"
                >
                  <Mail size={13} className="text-[var(--text-secondary)]" />
                  {config.email}
                </a>
                <div className="flex items-center gap-2.5 rounded-md border border-[var(--hairline)] bg-[var(--bg-mist)] px-3.5 py-2.5 text-sm">
                  <MapPin size={13} className="text-[var(--text-secondary)]" />
                  <span className="text-[var(--text-secondary)]">
                    {config.address}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {cols.map((col) => (
                <div key={col.title}>
                  <h4 className="coord mb-4">{col.title}</h4>
                  <ul className="space-y-2.5">
                    {col.links.map((l, i) => (
                      <li key={`${l.label}-${i}`}>
                        <Link
                          href={l.href}
                          className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-signal)]"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Cartographer's legend — cheeky touch */}
          <div className="mt-14 rounded-[16px] border border-[var(--hairline-strong)] bg-[var(--bg-paper)] p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="coord">SAYFA AÇIKLAMASI · LEGEND</span>
              <span className="coord">ÖLÇEK 1:1</span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  glyph: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                      <circle cx="6" cy="18" r="2.5" fill="var(--accent-signal)" />
                      <path d="M6 18 Q 12 8, 18 6" stroke="var(--accent-signal)" strokeWidth="1" strokeDasharray="3 2" />
                      <circle cx="18" cy="6" r="2.5" fill="var(--accent-spark)" />
                    </svg>
                  ),
                  label: "Çizilen rota",
                },
                {
                  glyph: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2 L 14 12 L 12 22 L 10 12 Z" fill="currentColor" />
                    </svg>
                  ),
                  label: "Pusula çıkış noktası",
                },
                {
                  glyph: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="0.8">
                      <path d="M0 8 Q 12 4, 24 8 M0 12 Q 12 8, 24 12 M0 16 Q 12 12, 24 16" />
                    </svg>
                  ),
                  label: "Topografik kontur",
                },
                {
                  glyph: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M2 2 L 6 2 L 6 6 M22 2 L 18 2 L 18 6 M2 22 L 6 22 L 6 18 M22 22 L 18 22 L 18 18" />
                    </svg>
                  ),
                  label: "Kayıt kösti (crop)",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-md border border-[var(--hairline)] bg-[var(--bg-mist)] p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center text-[var(--text-primary)]">
                    {row.glyph}
                  </div>
                  <span className="text-xs leading-tight text-[var(--text-secondary)]">
                    {row.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--hairline)] pt-6 text-xs text-[var(--text-tertiary)] sm:flex-row sm:items-center">
            <span className="coord">
              © {new Date().getFullYear()} {config.legal.toUpperCase()} · ISTANBUL
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={config.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--hairline-strong)] bg-[var(--bg-paper)] text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-signal)]"
                aria-label="Instagram"
              >
                <InstagramGlyph size={13} />
              </a>
              {config.trust.licenses.map((l) => (
                <span
                  key={l}
                  className="rounded-md border border-[var(--hairline)] bg-[var(--bg-paper)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em]"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
