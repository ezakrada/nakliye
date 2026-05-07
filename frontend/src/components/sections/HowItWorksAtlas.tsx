"use client";

import { motion } from "framer-motion";
import { SectionMark } from "@/components/atlas/SectionMark";

const stops = [
  {
    n: "01",
    name: "KEŞİF",
    desc: "Görüntülü görüşme veya yerinde ekspertiz. Eşya envanteri, kat farkı, hassasiyet notları.",
    duration: "1 gün",
  },
  {
    n: "02",
    name: "PLAN",
    desc: "Sabit fiyat, ekip seçimi, araç ataması, sigorta poliçesi. Tek belge, tek imza.",
    duration: "2 saat",
  },
  {
    n: "03",
    name: "PAKETLEME",
    desc: "Üniformalı ekip, kayıtlı malzeme. Cam ve antika için özel sandık.",
    duration: "3–6 saat",
  },
  {
    n: "04",
    name: "NAKİL",
    desc: "GPS takipli kamyon, rota dışı durmama prosedürü, 24/7 ulaşılabilir koordinatör.",
    duration: "Aynı gün",
  },
  {
    n: "05",
    name: "YERLEŞİM",
    desc: "Açma, montaj, yerleştirme. Kapatılan tutanak ve fotoğraflı teslim raporu.",
    duration: "2–4 saat",
  },
];

export function HowItWorksAtlas() {
  return (
    <section id="nasil" className="relative py-24 lg:py-32">
      <div className="section-x">
        <SectionMark num="03" coord="5 adımda kapıdan kapıya" label="Nasıl Çalışır" />
        <h2 className="h-display-tight mb-14 text-[clamp(2.4rem,5vw,3.8rem)]">
          Aramaktan teslime —
          <br />
          <span className="text-[var(--accent-signal)]">5 adım yeter.</span>
        </h2>

        {/* desktop horizontal track */}
        <div className="relative -mx-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:overflow-visible lg:px-0">
          <div className="grid auto-cols-[78%] grid-flow-col gap-4 sm:auto-cols-[44%] md:auto-cols-[30%] lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-5">
            {stops.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-full flex-col rounded-[16px] border border-[var(--hairline-strong)] bg-[var(--bg-paper)] p-5"
              >
                {/* upper coord */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="num text-2xl font-semibold text-[var(--text-primary)]">
                    {s.n}
                  </span>
                  <span className="coord">{s.duration}</span>
                </div>
                <h3 className="h-display text-lg tracking-[-0.02em] text-[var(--text-primary)]">
                  {s.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {s.desc}
                </p>

                {/* tick on bottom — route passes through */}
                <div className="relative mt-5 h-3 border-t border-[var(--hairline-strong)]">
                  <span
                    className="absolute -top-1 left-0 h-2 w-2 rounded-full"
                    style={{
                      background: i === 0 ? "var(--accent-signal)" : "var(--bg-paper)",
                      border: "1px solid var(--accent-signal)",
                    }}
                  />
                  {i === stops.length - 1 ? (
                    <span className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-[var(--accent-spark)]" />
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
