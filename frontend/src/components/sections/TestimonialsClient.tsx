"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export type Review = {
  id: number;
  name: string;
  route: string;
  date: string;
  rating: number;
  text: string;
};

export function TestimonialsClient({ items }: { items: Review[] }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0">
      <div className="grid auto-cols-[88%] grid-flow-col gap-5 sm:auto-cols-[60%] md:auto-cols-[44%] lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-3">
        {items.map((r, idx) => (
          <motion.figure
            key={r.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
            className="flex flex-col rounded-[28px] border border-[var(--glass-border)] bg-[var(--glass-panel-strong)] p-6 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-pop)]"
          >
            <div className="mb-3 flex items-center gap-1">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-[var(--accent-honey)] text-[var(--accent-honey)]"
                />
              ))}
            </div>
            <blockquote
              className="h-display flex-1 text-[1.1rem] leading-snug text-[var(--text-primary)]"
              style={{ fontWeight: 400 }}
            >
              <span className="text-[var(--accent-terra)]">“</span>
              {r.text}
              <span className="text-[var(--accent-terra)]">”</span>
            </blockquote>
            <figcaption className="mt-5 flex items-end justify-between gap-3 border-t border-[var(--glass-border)] pt-4">
              <div>
                <p className="h-display text-base italic" style={{ fontWeight: 500 }}>
                  {r.name}
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">{r.route}</p>
              </div>
              <span className="num text-xs text-[var(--text-tertiary)]">{r.date}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
