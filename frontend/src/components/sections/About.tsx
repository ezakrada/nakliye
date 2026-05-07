"use client";

import { motion } from "framer-motion";

const milestones = [
  { year: "2013", text: "Bir kamyonla Kadıköy'de başladık." },
  { year: "2016", text: "İlk şehirler arası seferimiz Ankara'ya." },
  { year: "2019", text: "Hassas eşya birimini kurduk." },
  { year: "2022", text: "Anadolu Sigorta ile çerçeve anlaşma." },
  { year: "2025", text: "28 araç, 64 kişi, 41 il." },
];

export function About() {
  return (
    <section id="hakkimizda" className="relative py-24 lg:py-32">
      <div className="section-x">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="relative">
            {/* portrait placeholder — soft gradient + frame */}
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[36px] border border-[var(--glass-border-strong)] bg-[var(--bg-tinted)] shadow-[var(--shadow-pop)]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(201,71,43,0.18) 0%, rgba(14,94,78,0.14) 50%, rgba(31,27,22,0.06) 100%)",
                }}
              />
              <svg
                viewBox="0 0 200 250"
                className="absolute inset-0 h-full w-full"
                fill="none"
                aria-hidden
              >
                {[40, 60, 80, 100, 120, 140, 160, 180, 200, 220].map((y) => (
                  <path
                    key={y}
                    d={`M0 ${y} Q 50 ${y - 4}, 100 ${y} T 200 ${y}`}
                    stroke="rgba(31,27,22,0.06)"
                    strokeWidth="0.6"
                  />
                ))}
              </svg>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-[var(--glass-border-strong)] bg-[var(--glass-panel-strong)] p-4 backdrop-blur-xl">
                <p className="h-eyebrow">Kurucu</p>
                <p
                  className="h-display mt-1 text-xl italic"
                  style={{ fontWeight: 500 }}
                >
                  Mahmut Eren
                </p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  "Eşya, sahibinin emaneti." — 2013'ten bu yana.
                </p>
              </div>
            </div>
          </div>

          <div>
            <span className="h-eyebrow">Hakkımızda</span>
            <h2 className="h-display mt-3 text-[clamp(2rem,4vw,2.8rem)] leading-[1.05]">
              2013'te bir kamyonla başladık,{" "}
              <span className="italic text-[var(--accent-terra)]">
                bugün bir aileyiz.
              </span>
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-[var(--text-secondary)]">
              Eşyam, klasik nakliye sektörünün karşıtı bir hikâye. Komisyoncu yok,
              taşeron yok, gizli ücret yok. Sahanın içinden gelen bir ekibin, eşyanın
              taşındığı kadar emek de taşıyacağına inanmasıyla kuruldu.
            </p>

            <ol className="mt-8 space-y-3">
              {milestones.map((m, idx) => (
                <motion.li
                  key={m.year}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  className="flex items-baseline gap-4 border-b border-[var(--glass-border)] pb-3 last:border-0"
                >
                  <span className="num inline-flex w-16 shrink-0 text-sm font-semibold text-[var(--accent-terra)]">
                    {m.year}
                  </span>
                  <span className="text-[15px] text-[var(--text-primary)]">{m.text}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
