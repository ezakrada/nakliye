"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, MessageCircle, X, Compass, ArrowRight, MapPin, Mail, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteConfig } from "@/lib/site-server";
import { Logo } from "./Logo";

export function Header({ config }: { config: SiteConfig }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-5">
        <div
          className={`pointer-events-auto mx-auto flex w-full max-w-[1180px] items-center gap-2 transition-all duration-300 ${
            scrolled ? "py-1" : "py-2"
          }`}
        >
          {/* MOBILE hamburger sola */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Menüyü aç"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--glass-panel-strong)] text-[var(--text-primary)] backdrop-blur-2xl lg:hidden"
          >
            <Menu size={18} strokeWidth={1.7} />
          </button>

          {/* Brand pill — atlas style with coord readout */}
          <Link
            href="/"
            className="group relative flex items-center gap-2.5 overflow-hidden rounded-l-[24px] rounded-r-[12px] border border-[var(--hairline-strong)] bg-[var(--glass-panel-strong)] py-2 pl-3.5 pr-3 backdrop-blur-2xl transition-shadow hover:shadow-[var(--shadow-card)]"
            aria-label={`${config.name} — anasayfa`}
          >
            <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-mint)] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-mint)]" />
            </span>
            <Logo size={16} showDot={false} />
            <span className="hidden border-l border-[var(--hairline-strong)] pl-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)] sm:inline">
              <span className="num">41.0082</span>° N
            </span>
          </Link>

          {/* DESKTOP center menu */}
          <nav className="ml-3 hidden flex-1 items-center justify-center gap-0.5 rounded-full border border-[var(--hairline)] bg-[var(--glass-panel)] px-1.5 py-1.5 backdrop-blur-xl lg:flex">
            {config.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-mist)] hover:text-[var(--text-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* MOBILE spacer — sağ üst boş (ezar pill için) */}
          <div className="flex-1 lg:hidden" />

          {/* DESKTOP right cluster */}
          <div className="hidden items-center gap-1.5 lg:flex">
            <a
              href={`tel:${config.phoneRaw}`}
              aria-label="Bizi arayın"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--glass-panel)] text-[var(--text-primary)] backdrop-blur transition-colors hover:bg-[var(--glass-panel-strong)]"
            >
              <Phone size={14} strokeWidth={1.7} />
            </a>
            <a
              href={config.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--glass-panel)] text-[var(--text-primary)] backdrop-blur transition-colors hover:bg-[var(--glass-panel-strong)]"
            >
              <MessageCircle size={14} strokeWidth={1.7} />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[var(--accent-mint)] ring-2 ring-[var(--bg-base)]" />
            </a>
            <Link href="/teklif-al" className="btn-signal ml-1 px-4 py-2 text-[13px]">
              ROTAYI ÇİZ
            </Link>
          </div>
        </div>
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
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 left-0 flex w-[92%] max-w-sm flex-col overflow-hidden border-r border-[var(--hairline-strong)] bg-[var(--bg-paper)] shadow-[var(--shadow-elevation)]"
            >
              {/* HEADER — coord stamp + close */}
              <div className="relative px-5 pt-5 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="relative inline-flex h-1.5 w-1.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-mint)] opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-mint)]" />
                    </span>
                    <Logo size={18} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Menüyü kapat"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-paper)] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-mist)]"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-y border-[var(--hairline-strong)] py-2">
                  <span className="coord">ATLAS CONCIERGE</span>
                  <span className="coord">41.0082° N · 28.9784° E</span>
                </div>
              </div>

              {/* NAV — Bölümler */}
              <nav className="flex-1 overflow-y-auto px-3 pb-3">
                <div className="flex items-center justify-between px-2 pb-3 pt-1">
                  <span className="coord">BÖLÜMLER</span>
                  <span className="coord">{config.nav.length}</span>
                </div>
                {config.nav.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-4 rounded-lg border border-transparent px-3 py-3 transition-colors hover:border-[var(--hairline)] hover:bg-[var(--bg-mist)]"
                  >
                    <span className="num w-7 text-[11px] font-medium tracking-[0.12em] text-[var(--text-tertiary)] group-hover:text-[var(--accent-signal)]">
                      §{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[15px] font-medium text-[var(--text-primary)]">
                      {item.label}
                    </span>
                    <ArrowRight
                      size={13}
                      className="text-[var(--text-tertiary)] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                ))}

                {/* Hızlı eylemler */}
                <div className="mt-5 border-t border-[var(--hairline-strong)] px-2 pt-4">
                  <span className="coord block pb-3">HIZLI EYLEM</span>
                  <Link
                    href="/teklif-al"
                    onClick={() => setOpen(false)}
                    className="btn-signal w-full text-[13px]"
                  >
                    <Compass size={14} /> ROTAYI ÇİZ
                  </Link>
                  <Link
                    href="/takip"
                    onClick={() => setOpen(false)}
                    className="btn-ghost mt-2 w-full text-[13px]"
                  >
                    <MapPin size={13} /> Gönderi Takip
                  </Link>
                </div>

                {/* İletişim mini-kartlar */}
                <div className="mt-5 border-t border-[var(--hairline-strong)] px-2 pt-4">
                  <span className="coord block pb-3">İLETİŞİM</span>
                  <div className="space-y-1.5">
                    <a
                      href={`tel:${config.phoneRaw}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg border border-[var(--hairline-strong)] bg-[var(--bg-paper)] px-3.5 py-2.5 transition-colors hover:border-[var(--accent-signal)]"
                    >
                      <Phone size={13} className="text-[var(--accent-signal)]" />
                      <div className="flex-1">
                        <p className="coord text-[10px]">ÇAĞRI MERKEZİ</p>
                        <p className="num text-[13px] font-semibold text-[var(--text-primary)]">
                          {config.phone}
                        </p>
                      </div>
                    </a>
                    <a
                      href={config.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg border border-[var(--hairline-strong)] bg-[var(--bg-paper)] px-3.5 py-2.5 transition-colors hover:border-[var(--accent-mint)]"
                    >
                      <MessageCircle size={13} className="text-[var(--accent-mint)]" />
                      <div className="flex-1">
                        <p className="coord text-[10px]">WHATSAPP</p>
                        <p className="num text-[13px] font-semibold text-[var(--text-primary)]">
                          {config.whatsapp}
                        </p>
                      </div>
                    </a>
                    <a
                      href={`mailto:${config.email}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-lg border border-[var(--hairline-strong)] bg-[var(--bg-paper)] px-3.5 py-2.5 transition-colors hover:border-[var(--accent-signal)]"
                    >
                      <Mail size={13} className="text-[var(--text-secondary)]" />
                      <div className="flex-1">
                        <p className="coord text-[10px]">E-POSTA</p>
                        <p className="text-[13px] font-medium text-[var(--text-primary)]">
                          {config.email}
                        </p>
                      </div>
                    </a>
                    <div className="flex items-start gap-3 rounded-lg border border-[var(--hairline)] bg-[var(--bg-mist)] px-3.5 py-2.5">
                      <Clock size={13} className="mt-0.5 text-[var(--text-secondary)]" />
                      <div className="flex-1">
                        <p className="coord text-[10px]">ÇALIŞMA SAATLERİ</p>
                        <p className="text-[12px] font-medium leading-snug text-[var(--text-secondary)]">
                          {config.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>

              {/* FOOTER — coordinate stamp */}
              <div className="relative border-t border-[var(--hairline-strong)] bg-[var(--bg-cool)] px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="coord">© 2014—2026 EŞYAM</span>
                  <span className="coord">İSTANBUL · 41.0082° N</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

