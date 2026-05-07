"use client";

import { motion } from "framer-motion";
import {
  Home,
  MoveVertical,
  Building2,
  Truck,
  Music,
  PackageOpen,
  ArrowUpRight,
  Box,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  MoveVertical,
  Building2,
  Truck,
  Music,
  PackageOpen,
  Box,
  ShieldCheck,
  Sparkles,
};

export type ServiceItem = {
  id: number;
  title: string;
  icon: string;
  desc: string;
};

export function ServicesGrid({ items }: { items: ServiceItem[] }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-2 left-1/3 hidden w-px bg-[var(--glass-border-strong)] lg:block" />
      <div className="pointer-events-none absolute inset-y-2 left-2/3 hidden w-px bg-[var(--glass-border-strong)] lg:block" />
      <div className="pointer-events-none absolute inset-x-2 top-1/2 hidden h-px bg-[var(--glass-border-strong)] lg:block" />

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((s, idx) => {
          const Icon = ICON_MAP[s.icon] ?? Home;
          const accent = idx % 2 === 0 ? "terra" : "cypress";
          return (
            <motion.a
              key={s.id}
              href="/teklif-al"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.25, 1, 0.3, 1] }}
              className="group relative flex flex-col gap-4 rounded-[28px] border border-[var(--glass-border)] bg-[var(--glass-panel)] p-6 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--glass-panel-strong)] hover:shadow-[var(--shadow-pop)]"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  accent === "terra"
                    ? "bg-[var(--accent-terra-soft)] text-[var(--accent-terra-deep)]"
                    : "bg-[var(--accent-cypress-soft)] text-[var(--accent-cypress)]"
                } transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
              >
                <Icon size={20} strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="h-display text-[1.5rem] leading-tight text-[var(--text-primary)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  {s.desc}
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent-terra)]">
                Detaylar
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
