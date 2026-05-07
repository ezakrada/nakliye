"use client";

import { motion } from "framer-motion";
import { Truck, Boxes, ShieldCheck, Sparkles } from "lucide-react";

const trucks = [
  {
    name: "Panelvan",
    code: "PV-1.5T",
    capacity: "8 m³",
    use: "Bekar / 1+0 / öğrenci",
    plates: 6,
    Icon: Boxes,
  },
  {
    name: "Tek Kabin",
    code: "10m³",
    capacity: "10–12 m³",
    use: "1+1, 2+1 ev",
    plates: 12,
    Icon: Truck,
  },
  {
    name: "Çift Kabin",
    code: "22m³",
    capacity: "20–24 m³",
    use: "3+1 ev, küçük ofis",
    plates: 8,
    Icon: Truck,
  },
  {
    name: "Hassas Eşya",
    code: "Premium",
    capacity: "16 m³ · iklimli",
    use: "Piyano, antika, sanat",
    plates: 2,
    Icon: ShieldCheck,
  },
] as const;

export function Fleet() {
  return (
    <section id="filo" className="relative py-24 lg:py-32">
      <div className="section-x">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <span className="h-eyebrow">Filomuz</span>
            <h2 className="h-display mt-3 text-[clamp(2rem,4vw,2.8rem)]">
              28 araç, hepsi{" "}
              <span className="italic text-[var(--accent-cypress)]">bizim</span>.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Hiçbir taşıma taşeronlanmaz. Her aracın kayıtlı sürücüsü, periyodik bakım
              dosyası ve K1 yetki belgesi vardır.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--accent-cypress-soft)] px-4 py-2 text-sm font-medium text-[var(--accent-cypress)]">
            <Sparkles size={14} />
            Tamamen kendi filomuz
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trucks.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.25, 1, 0.3, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border border-[var(--glass-border)] bg-[var(--glass-panel-strong)] p-5 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-pop)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="h-eyebrow">{t.code}</span>
                  <h3 className="h-display mt-1 text-xl">{t.name}</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-tinted)] text-[var(--text-secondary)] transition-colors duration-300 group-hover:bg-[var(--accent-terra-soft)] group-hover:text-[var(--accent-terra)]">
                  <t.Icon size={22} strokeWidth={1.5} />
                </div>
              </div>
              <p className="mt-5 text-sm text-[var(--text-secondary)]">{t.use}</p>
              <div className="mt-5 flex items-center justify-between border-t border-[var(--glass-border)] pt-4">
                <div>
                  <p className="h-eyebrow">Kapasite</p>
                  <p className="num text-sm font-semibold">{t.capacity}</p>
                </div>
                <div className="text-right">
                  <p className="h-eyebrow">Plaka</p>
                  <p className="num text-sm font-semibold">×{t.plates}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
