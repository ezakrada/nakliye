"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  LayoutDashboard,
  FileText,
  Truck,
  Users2,
  Tags,
  Type,
  MessageSquare,
  Settings,
  Sparkles,
  LogOut,
  Image as ImageIcon,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  FileText,
  Truck,
  Users2,
  Tags,
  Type,
  MessageSquare,
  Settings,
  Sparkles,
  ImageIcon,
};

export function AdminMobileNav({
  navItems,
  userName,
  logoutAction,
}: {
  navItems: Array<{ href: string; label: string; icon: string }>;
  userName: string;
  logoutAction: () => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--hairline-strong)] bg-[var(--bg-paper)] px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Logo size={18} />
          <span className="rounded-full border border-[rgba(31,79,217,0.2)] bg-[var(--accent-signal-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-signal-deep)]">
            Yönetim
          </span>
        </div>
        <button
          type="button"
          aria-label="Menü"
          onClick={() => setOpen(true)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-paper)] text-[var(--text-primary)]"
        >
          <Menu size={15} strokeWidth={1.7} />
        </button>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-[rgba(11,18,32,0.65)] backdrop-blur-md"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 right-0 flex w-[92%] max-w-sm flex-col overflow-hidden border-l border-[var(--hairline-strong)] bg-[var(--bg-paper)] shadow-[var(--shadow-elevation)]"
            >
              {/* HEADER */}
              <div className="px-5 pt-5 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Logo size={18} />
                    <span className="rounded-full border border-[rgba(31,79,217,0.2)] bg-[var(--accent-signal-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-signal-deep)]">
                      Yönetim
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Kapat"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-paper)] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-mist)]"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-y border-[var(--hairline-strong)] py-2">
                  <span className="coord">YÖNETİM PANELİ</span>
                  <span className="coord">{navItems.length} MODÜL</span>
                </div>
              </div>

              {/* NAV */}
              <nav className="flex-1 overflow-y-auto px-3 pb-4">
                <span className="coord block px-2 pb-3 pt-1">MODÜLLER</span>
                {navItems.map((item, i) => {
                  const Icon = ICON_MAP[item.icon] ?? LayoutDashboard;
                  const active =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center gap-3 rounded-lg border border-transparent px-3 py-3 transition-all ${
                        active
                          ? "border-[var(--accent-signal)] bg-[var(--accent-signal-soft)] text-[var(--accent-signal-deep)]"
                          : "text-[var(--text-primary)] hover:border-[var(--hairline)] hover:bg-[var(--bg-mist)]"
                      }`}
                    >
                      <span
                        className={`num w-7 text-[10px] font-medium tracking-[0.12em] ${
                          active
                            ? "text-[var(--accent-signal)]"
                            : "text-[var(--text-tertiary)]"
                        }`}
                      >
                        §{String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon
                        size={15}
                        strokeWidth={1.6}
                        className={
                          active
                            ? "text-[var(--accent-signal)]"
                            : "text-[var(--text-secondary)]"
                        }
                      />
                      <span className="flex-1 text-[15px] font-medium">
                        {item.label}
                      </span>
                      <ChevronRight
                        size={13}
                        className={
                          active
                            ? "opacity-90"
                            : "opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60"
                        }
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* FOOTER */}
              <div className="border-t border-[var(--hairline-strong)] bg-[var(--bg-cool)] px-4 py-4">
                <div className="mb-3 rounded-lg border border-[var(--hairline-strong)] bg-[var(--bg-paper)] px-3 py-2.5">
                  <p className="coord text-[10px]">GİRİŞ YAPAN</p>
                  <p className="num truncate text-sm font-semibold">{userName}</p>
                </div>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--hairline-strong)] bg-[var(--bg-paper)] py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--danger)] hover:text-[var(--danger)]"
                  >
                    <LogOut size={13} /> Çıkış yap
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
