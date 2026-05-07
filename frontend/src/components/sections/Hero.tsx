"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeroQuoteForm } from "./HeroQuoteForm";
import { HeroCardStack } from "./HeroCardStack";

const slides = [
  {
    eyebrow: "Sigortalı · Kayıtlı · Kapıdan kapıya",
    headline: "Eve dönmek değil — eve taşınmak.",
    sub: "Sigortalı, kayıtlı, profesyonel ekiple kapıdan kapıya. Foto-envanter ile sabit fiyat, sürpriz fark yok.",
  },
  {
    eyebrow: "41 ilde planlı sefer ağı",
    headline: "İstanbul'dan İzmir'e, çay soğumadan.",
    sub: "Eşyalarınız bir gün önce sayılır, ertesi gün yerine yerleşir. Tek yön sefer indirimi dahil.",
  },
  {
    eyebrow: "Hassas eşya ekibi",
    headline: "Piyanonuz bile huzurla taşınır.",
    sub: "Müzelerle çalışan ekip, özel sandık imalatı, ek sigorta — hepsi tek teklif içinde.",
  },
];

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      <div className="section-x">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* left column */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.3, 1] }}
              >
                <span className="h-eyebrow inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-terra)]" />
                  {slides[i].eyebrow}
                </span>
                <h1 className="h-display mt-4 text-[clamp(2.5rem,6.4vw,4.4rem)] text-[var(--text-primary)]">
                  {slides[i].headline.split("—").map((part, idx, arr) => (
                    <span key={idx}>
                      {idx === 0 ? (
                        part
                      ) : (
                        <>
                          <span className="text-[var(--accent-terra)]">—</span>
                          <span className="italic" style={{ fontWeight: 500 }}>
                            {part}
                          </span>
                        </>
                      )}
                      {idx < arr.length - 1 ? "" : null}
                    </span>
                  ))}
                </h1>
                <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--text-secondary)]">
                  {slides[i].sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* slide controls */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setI((v) => (v - 1 + slides.length) % slides.length)}
                aria-label="Önceki slayt"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-border-strong)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Slayt ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === i
                        ? "w-8 bg-[var(--accent-terra)]"
                        : "w-1.5 bg-[var(--glass-border-strong)] hover:bg-[var(--text-tertiary)]"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setI((v) => (v + 1) % slides.length)}
                aria-label="Sonraki slayt"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-border-strong)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* quote form */}
            <div className="mt-8">
              <HeroQuoteForm />
            </div>

            {/* trust strip */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--text-secondary)]">
              <span className="inline-flex items-center gap-1.5">
                <span className="num font-semibold text-[var(--text-primary)]">14.000+</span>
                taşıma
              </span>
              <span className="h-3 w-px bg-[var(--glass-border-strong)]" />
              <span className="inline-flex items-center gap-1.5">
                <span className="num font-semibold text-[var(--text-primary)]">%98</span>
                zamanında teslim
              </span>
              <span className="h-3 w-px bg-[var(--glass-border-strong)]" />
              <span className="inline-flex items-center gap-1.5">
                <span className="num font-semibold text-[var(--text-primary)]">41</span>
                ilde sefer ağı
              </span>
            </div>
          </div>

          {/* right column — card stack */}
          <div className="relative">
            <HeroCardStack />
          </div>
        </div>
      </div>
    </section>
  );
}
