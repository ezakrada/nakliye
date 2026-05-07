"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export type FaqItem = { id: number; q: string; a: string };

export function FaqClient({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(items[0]?.id ?? null);
  return (
    <div className="mx-auto max-w-3xl">
      {items.map((f) => {
        const isOpen = open === f.id;
        return (
          <div key={f.id} className="border-b border-[var(--glass-border)] last:border-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : f.id)}
              className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--accent-terra)]"
            >
              <span className="text-[16px] font-semibold text-[var(--text-primary)] transition-colors">
                {f.q}
              </span>
              <span
                className={`mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--glass-border-strong)] bg-[var(--bg-elevated)] transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              >
                <Plus size={14} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-12 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    {f.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
