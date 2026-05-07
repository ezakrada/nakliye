"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPin, ShieldCheck, Truck, FileText } from "lucide-react";

const easing = [0.65, 0, 0.35, 1] as const;

export function HeroCardStack() {
  return (
    <div className="relative h-[520px] w-full max-w-[460px] mx-auto select-none lg:max-w-none">
      {/* dashed route line drawing across the cards */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 460 520"
        fill="none"
        aria-hidden
      >
        <motion.path
          d="M40 100 C 130 130, 230 220, 320 250 S 420 380, 420 460"
          stroke="var(--accent-terra)"
          strokeWidth="2"
          strokeDasharray="6 8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.65 }}
          transition={{ duration: 1.6, delay: 0.6, ease: easing }}
        />
        <motion.circle
          cx="40"
          cy="100"
          r="6"
          fill="var(--accent-terra)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        />
        <motion.circle
          cx="420"
          cy="460"
          r="6"
          fill="var(--accent-cypress)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 2.0 }}
        />
      </svg>

      {/* card 1 — envanter */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -3.5 }}
        transition={{ duration: 0.8, ease: easing, delay: 0.1 }}
        whileHover={{ y: -8, rotate: -1.5, transition: { duration: 0.3 } }}
        className="absolute left-2 top-3 z-30 w-[78%] rounded-3xl border border-[var(--glass-border-strong)] bg-[var(--glass-panel-strong)] p-5 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_20px_50px_-22px_rgba(31,27,22,0.35)]"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="h-eyebrow">Foto-Envanter</span>
          <span className="chip chip-cypress">Onaylandı</span>
        </div>
        <h3 className="h-display mb-3 text-lg leading-tight text-[var(--text-primary)]">
          Kadıköy 3+1 → Çeşme villa
        </h3>
        <ul className="space-y-2 text-sm">
          {[
            { l: "Yatak odası takımı", v: "2 set" },
            { l: "Çamaşır makinesi", v: "1" },
            { l: "Buzdolabı", v: "1 (no-frost)" },
            { l: "Piyano", v: "1 — özel sandık" },
          ].map((row) => (
            <li
              key={row.l}
              className="flex items-center justify-between gap-2 border-b border-[var(--glass-border)] pb-1.5 last:border-0 last:pb-0"
            >
              <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                <CheckCircle2 size={14} className="text-[var(--accent-cypress)]" />
                {row.l}
              </span>
              <span className="num text-[13px] font-medium text-[var(--text-primary)]">
                {row.v}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* card 2 — canlı takip / map */}
      <motion.div
        initial={{ opacity: 0, y: 32, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 2.5 }}
        transition={{ duration: 0.9, ease: easing, delay: 0.35 }}
        whileHover={{ y: -8, rotate: 0, transition: { duration: 0.3 } }}
        className="absolute right-1 top-[150px] z-20 w-[72%] overflow-hidden rounded-3xl border border-[var(--glass-border-strong)] bg-[var(--glass-panel-strong)] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_22px_55px_-22px_rgba(31,27,22,0.4)]"
      >
        <div className="relative h-32 overflow-hidden bg-[var(--bg-tinted)]">
          {/* topographic-ish svg map */}
          <svg viewBox="0 0 320 130" className="absolute inset-0 h-full w-full">
            {[20, 40, 60, 80, 100, 120].map((y) => (
              <path
                key={y}
                d={`M0 ${y} Q 80 ${y - 6}, 160 ${y} T 320 ${y}`}
                stroke="var(--glass-border-strong)"
                strokeWidth="0.5"
                fill="none"
              />
            ))}
            <motion.path
              d="M30 95 Q 110 55, 180 70 T 290 25"
              stroke="var(--accent-terra)"
              strokeWidth="2"
              strokeDasharray="4 5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 1.0, ease: easing }}
            />
            <motion.circle
              cx="290"
              cy="25"
              r="5"
              fill="var(--accent-terra)"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ duration: 0.8, delay: 2.4 }}
            />
          </svg>
          <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-elevated)] px-2.5 py-1 text-[11px] font-semibold text-[var(--accent-terra)] shadow-sm">
            <Truck size={11} /> Yolda
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="h-eyebrow mb-1">Takip Kodu</p>
              <p className="num text-base font-semibold tracking-wide">EŞ-04812</p>
            </div>
            <div className="text-right">
              <p className="h-eyebrow mb-1">Tahmini Varış</p>
              <p className="num text-base font-semibold">14:42</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <MapPin size={12} className="text-[var(--accent-cypress)]" />
            Bursa • E-90 koridoru • 73 km
          </div>
        </div>
      </motion.div>

      {/* card 3 — sigorta poliçesi */}
      <motion.div
        initial={{ opacity: 0, y: 36, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ duration: 1.0, ease: easing, delay: 0.6 }}
        whileHover={{ y: -8, rotate: 0, transition: { duration: 0.3 } }}
        className="absolute bottom-2 left-6 z-10 w-[68%] rounded-3xl border border-[var(--glass-border-strong)] bg-[var(--glass-panel-strong)] p-4 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_24px_60px_-22px_rgba(31,27,22,0.45)]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-cypress-soft)] text-[var(--accent-cypress)]">
            <ShieldCheck size={18} strokeWidth={1.7} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="h-eyebrow mb-0.5">Sigorta Poliçesi</p>
            <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
              Anadolu Sigorta · 250.000 ₺
            </p>
          </div>
          <FileText size={16} className="text-[var(--text-tertiary)]" />
        </div>
      </motion.div>

      {/* small floating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute -right-2 top-[90px] z-40 hidden rotate-[6deg] rounded-2xl border border-[var(--glass-border-strong)] bg-[var(--bg-elevated)] px-3 py-2 text-xs font-semibold shadow-lg sm:block"
      >
        <span className="num text-[var(--accent-terra)]">14.000+</span> taşıma
      </motion.div>
    </div>
  );
}
