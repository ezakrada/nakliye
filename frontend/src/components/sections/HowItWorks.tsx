"use client";

import { motion } from "framer-motion";
import { Calculator, ClipboardList, Truck } from "lucide-react";

const steps = [
  {
    Icon: Calculator,
    title: "Teklif",
    desc: "Saniyeler içinde fiyat aralığı; foto-envanter sonrası kesin fiyat. Kredi kartınız istenmez.",
    time: "2 dk",
  },
  {
    Icon: ClipboardList,
    title: "Ekspertiz",
    desc: "Görüntülü görüşme veya yerinde ziyaret — kat farkı, asansör, hassas eşya not alınır.",
    time: "1 gün",
  },
  {
    Icon: Truck,
    title: "Taşıma",
    desc: "Üniformalı ekip, kayıtlı kamyon. Yükleme + yol + boşaltma — siz başında olmasanız da.",
    time: "Aynı gün",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="nasil" className="relative py-24 lg:py-32">
      <div className="section-x">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="h-eyebrow">Nasıl Çalışır</span>
          <h2 className="h-display mt-3 text-[clamp(2rem,4vw,2.8rem)]">
            Üç adım, <span className="italic text-[var(--accent-terra)]">bir gün</span> içinde.
          </h2>
        </div>

        <div className="relative">
          {/* dashed connector — desktop only */}
          <svg
            className="pointer-events-none absolute left-[16%] right-[16%] top-12 hidden h-2 lg:block"
            viewBox="0 0 800 8"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.line
              x1="0"
              y1="4"
              x2="800"
              y2="4"
              stroke="var(--accent-terra)"
              strokeWidth="2"
              strokeDasharray="6 8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
            />
          </svg>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.25, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-[var(--glass-border-strong)] bg-[var(--bg-elevated)] shadow-[var(--shadow-card)]">
                    <s.Icon size={26} strokeWidth={1.6} className="text-[var(--accent-terra)]" />
                    <span className="num absolute -right-1 -top-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-deep)] text-xs font-semibold text-[var(--text-on-deep)]">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="h-display text-2xl text-[var(--text-primary)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[280px] text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    {s.desc}
                  </p>
                  <span className="num mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-tinted)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                    ⏱ {s.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
