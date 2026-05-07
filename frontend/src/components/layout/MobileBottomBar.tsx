"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone, MessageCircle, Compass } from "lucide-react";
import type { SiteConfig } from "@/lib/site-server";

export function MobileBottomBar({ config }: { config: SiteConfig }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) setHidden(false);
      else if (y > lastY + 8) setHidden(true);
      else if (y < lastY - 8) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`bottom-cta fixed inset-x-3 bottom-3 z-40 lg:hidden transition-transform duration-300 ${
        hidden ? "translate-y-[140%]" : "translate-y-0"
      }`}
    >
      <div className="grid grid-cols-[1fr_1fr_1.5fr] divide-x divide-[var(--hairline-strong)] overflow-hidden rounded-full border border-[var(--hairline-strong)] bg-[var(--glass-panel-strong)] backdrop-blur-2xl backdrop-saturate-150 shadow-[var(--shadow-pop)]">
        <a
          href={`tel:${config.phoneRaw}`}
          className="flex items-center justify-center gap-1.5 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]"
        >
          <Phone size={14} strokeWidth={2} />
          ARA
        </a>
        <a
          href={config.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-mint)]"
        >
          <MessageCircle size={14} strokeWidth={2} />
          WHATSAPP
        </a>
        <Link
          href="/teklif-al"
          className="flex items-center justify-center gap-1.5 bg-[var(--accent-signal)] py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-white"
        >
          <Compass size={14} strokeWidth={2} />
          ROTAYI ÇİZ
        </Link>
      </div>
    </div>
  );
}
