"use client";

import { useEffect, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function useModal() {
  const [open, setOpen] = useState(false);
  return {
    open,
    show: () => setOpen(true),
    close: () => setOpen(false),
  };
}

export function Modal({
  open,
  onClose,
  title,
  children,
  width = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-center justify-center"
          style={{
            paddingTop: "max(48px, 8vh)",
            paddingBottom: "max(32px, 6vh)",
            paddingLeft: "12px",
            paddingRight: "12px",
          }}
        >
          <div
            className="absolute inset-0 bg-[rgba(11,18,32,0.6)] backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ y: 24, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 24, scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex w-full ${width} max-h-full flex-col overflow-hidden rounded-[24px] border border-[var(--hairline-strong)] bg-[var(--bg-paper)] shadow-[0_30px_80px_-20px_rgba(11,18,32,0.45),0_0_0_1px_rgba(255,255,255,0.04)]`}
          >
            {/* mobile drag handle */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-[var(--hairline-emphasis)] opacity-60 sm:hidden"
            />

            <header className="relative flex items-center justify-between border-b border-[var(--hairline)] px-5 pt-5 pb-3 sm:pt-4">
              <h3 className="h-display text-base sm:text-lg">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-paper)] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-mist)]"
              >
                <X size={14} />
              </button>
            </header>
            <div className="modal-scroll-body flex-1 overflow-y-auto overscroll-contain p-5">
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
