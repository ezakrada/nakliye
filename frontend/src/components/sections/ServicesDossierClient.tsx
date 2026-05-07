"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Home,
  Building2,
  MoveVertical,
  Truck,
  Music,
  PackageOpen,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Building2,
  MoveVertical,
  Truck,
  Music,
  PackageOpen,
};

export type DossierItem = {
  id: number;
  roman: string;
  title: string;
  desc: string;
  icon: string;
  kapsam: string;
  sure: string;
  ekip: string;
};

export function ServicesDossierClient({ items }: { items: DossierItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-1 md:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => {
        const Icon = ICON_MAP[s.icon] ?? Home;
        const accent = i % 2 === 0 ? "signal" : "mint";
        return (
          <motion.a
            key={s.id}
            href="/teklif-al"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col gap-5 border-t border-[var(--hairline-strong)] py-8 transition-colors hover:bg-[var(--bg-mist)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="num text-[clamp(2.5rem,4vw,3.4rem)] font-light leading-none text-[var(--text-primary)]">
                  {s.roman}.
                </span>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    accent === "signal"
                      ? "bg-[var(--accent-signal-soft)] text-[var(--accent-signal-deep)]"
                      : "bg-[rgba(31,157,122,0.10)] text-[var(--accent-mint)]"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.6} />
                </span>
              </div>
              <ArrowUpRight
                size={14}
                className="mt-2 text-[var(--text-tertiary)] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-signal)] group-hover:opacity-100"
              />
            </div>
            <h3 className="h-display text-[clamp(1.4rem,2.4vw,1.8rem)] text-[var(--text-primary)]">
              {s.title}
            </h3>
            <p className="text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
              {s.desc}
            </p>
            <dl className="mt-1 grid grid-cols-3 gap-3 border-t border-[var(--hairline)] pt-3 text-[11px]">
              {[
                { k: "Kapsam", v: s.kapsam },
                { k: "Süre", v: s.sure },
                { k: "Ekip", v: s.ekip },
              ].map((row) => (
                <div key={row.k}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                    {row.k}
                  </dt>
                  <dd className="num mt-1 text-[12.5px] font-medium text-[var(--text-primary)]">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
            <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-signal)] opacity-70 transition-opacity group-hover:opacity-100">
              Detayları gör
              <ArrowUpRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
