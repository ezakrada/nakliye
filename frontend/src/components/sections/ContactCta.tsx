"use client";

import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import type { SiteConfig } from "@/lib/site-server";
import { SectionMark } from "@/components/atlas/SectionMark";

export function ContactCta({ config }: { config: SiteConfig }) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          subject: formData.get("subject"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      setSent(true);
      e.currentTarget.reset();
      setTimeout(() => setSent(false), 5000);
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="iletisim" className="relative py-24 lg:py-32">
      <div className="section-x">
        <SectionMark num="09" coord="7 / 24 ulaşılabilir" label="Bize Ulaşın" />

        <div className="overflow-hidden rounded-[20px] border border-[var(--hairline-strong)] bg-[var(--bg-paper)]">
          <div className="grid lg:grid-cols-[1.2fr_1fr]">
            <div className="border-b border-[var(--hairline-strong)] p-8 sm:p-12 lg:border-b-0 lg:border-r">
              <h2 className="h-display-tight text-[clamp(1.8rem,3.6vw,2.6rem)] leading-[1.05]">
                Soru var, telaş yok.
                <br />
                <span className="text-[var(--accent-signal)]">Aynı gün dönüş.</span>
              </h2>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">
                Bayram, hafta sonu, gece — değişmez. Bir saat içinde cevap.
              </p>

              <form onSubmit={submit} className="mt-7 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input required type="text" name="name" placeholder="Ad Soyad" className="field-base" />
                  <input required type="tel" name="phone" placeholder="Telefon" className="field-base" />
                </div>
                <input type="email" name="email" placeholder="E-posta (opsiyonel)" className="field-base" />
                <textarea name="subject" rows={4} placeholder="Mesajınız — taşınacağınız ev, tarih, özel notlar..." className="field-base resize-none" />
                <label className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                  <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[var(--accent-signal)]" />
                  <span>
                    KVKK aydınlatma metnini okudum, mesajımın iletişim amacıyla işlenmesine onay veriyorum.
                  </span>
                </label>
                <button type="submit" disabled={submitting} className="btn-signal mt-2 w-full justify-center disabled:opacity-60">
                  {submitting ? "GÖNDERİLİYOR…" : "MESAJI GÖNDER"}
                  <ArrowRight size={15} />
                </button>
                {sent ? (
                  <p className="num text-center text-sm font-medium text-[var(--accent-mint)]">
                    ✓ ALINDI — bir saat içinde dönüş.
                  </p>
                ) : null}
              </form>
            </div>

            <div className="bg-[var(--bg-glacier)] p-8 sm:p-12">
              <ul className="space-y-6">
                <li>
                  <p className="coord">ÇAĞRI MERKEZİ</p>
                  <a href={`tel:${config.phoneRaw}`} className="num mt-1 block text-lg font-semibold tracking-tight">
                    {config.phone}
                  </a>
                  <p className="num mt-0.5 text-[11px] text-[var(--text-tertiary)]">
                    {config.hours}
                  </p>
                </li>
                <li className="border-t border-[var(--hairline)] pt-5">
                  <p className="coord">WHATSAPP</p>
                  <a
                    href={config.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="num mt-1 block text-lg font-semibold tracking-tight text-[var(--accent-mint)]"
                  >
                    {config.whatsapp}
                  </a>
                  <p className="num mt-0.5 text-[11px] text-[var(--text-tertiary)]">
                    foto-envanter için en hızlı kanal
                  </p>
                </li>
                <li className="border-t border-[var(--hairline)] pt-5">
                  <p className="coord">E-POSTA</p>
                  <a href={`mailto:${config.email}`} className="num mt-1 block text-base font-semibold tracking-tight">
                    {config.email}
                  </a>
                </li>
                <li className="border-t border-[var(--hairline)] pt-5">
                  <p className="coord">MERKEZ</p>
                  <p className="mt-1 text-sm font-semibold">{config.address}</p>
                  <p className="num mt-0.5 text-[11px] text-[var(--text-tertiary)]">
                    41.0082° N · 28.9784° E
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
