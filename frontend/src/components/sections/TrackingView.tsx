"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Truck,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

const easing = [0.65, 0, 0.35, 1] as const;

const timeline = [
  { id: "teklif", label: "Teklif onaylandı", at: "12 Mar · 14:20" },
  { id: "hazir", label: "Ekipman hazırlandı", at: "13 Mar · 09:00" },
  { id: "yukleme", label: "Yükleme tamamlandı", at: "13 Mar · 11:45" },
  { id: "yolda", label: "Yolda", at: "13 Mar · 12:30" },
  { id: "teslim", label: "Teslim edildi", at: "—" },
] as const;

const activeStep = 3; // index — yolda

export function TrackingView({ code }: { code: string }) {
  return (
    <div>
      {/* header strip */}
      <div className="mb-6 grid gap-4 rounded-[28px] border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <div>
          <p className="h-eyebrow">Takip kodu</p>
          <p className="num mt-0.5 text-xl font-semibold tracking-wide">{code}</p>
        </div>
        <div className="border-y border-[var(--glass-border)] py-3 sm:border-y-0 sm:border-x sm:px-5">
          <p className="h-eyebrow">Müşteri / güzergah</p>
          <p className="mt-0.5 text-sm font-semibold">
            Selin Aktaş · <span className="text-[var(--text-secondary)]">Kadıköy → Çeşme</span>
          </p>
        </div>
        <div>
          <p className="h-eyebrow">Tahmini varış</p>
          <p className="num mt-0.5 text-xl font-semibold tracking-wide text-[var(--accent-terra)]">
            14:42
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        {/* timeline */}
        <div className="rounded-[28px] border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="h-display text-lg">Durum geçmişi</h3>
            <span className="chip chip-cypress">Yolda</span>
          </div>
          <ol className="relative space-y-6 pl-5">
            <span className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--glass-border-strong)]" />
            {timeline.map((s, idx) => {
              const done = idx < activeStep;
              const active = idx === activeStep;
              return (
                <li key={s.id} className="relative">
                  <span
                    className={`absolute -left-5 top-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full ${
                      done
                        ? "bg-[var(--accent-cypress)] text-white"
                        : active
                          ? "bg-[var(--accent-terra)]"
                          : "border border-[var(--glass-border-strong)] bg-[var(--bg-elevated)]"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 size={11} strokeWidth={2.5} />
                    ) : active ? (
                      <span className="relative inline-flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                      </span>
                    ) : (
                      <Circle size={11} className="text-[var(--text-tertiary)]" />
                    )}
                  </span>
                  <div className="ml-2">
                    <p
                      className={`text-sm font-semibold ${
                        active
                          ? "text-[var(--accent-terra)]"
                          : done
                            ? "text-[var(--text-primary)]"
                            : "text-[var(--text-tertiary)]"
                      }`}
                    >
                      {s.label}
                    </p>
                    <p className="num mt-0.5 text-xs text-[var(--text-tertiary)]">
                      {s.at}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* map */}
        <div className="overflow-hidden rounded-[28px] border border-[var(--glass-border)] bg-[var(--bg-elevated)]">
          <div className="relative aspect-[4/3] w-full bg-[var(--bg-tinted)] sm:aspect-[16/9] lg:aspect-auto lg:h-full">
            <svg viewBox="0 0 600 380" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--bg-tinted)" />
                  <stop offset="100%" stopColor="var(--bg-base)" />
                </linearGradient>
              </defs>
              <rect width="600" height="380" fill="url(#land)" />
              {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((y) => (
                <path
                  key={y}
                  d={`M0 ${y} Q 150 ${y - 8}, 300 ${y} T 600 ${y}`}
                  stroke="rgba(31,27,22,0.06)"
                  strokeWidth="0.7"
                  fill="none"
                />
              ))}
              {/* origin */}
              <circle cx="60" cy="80" r="8" fill="var(--accent-cypress)" />
              <text
                x="78"
                y="85"
                fontSize="13"
                fontFamily="var(--font-sans)"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                Kadıköy
              </text>
              {/* destination */}
              <circle cx="540" cy="280" r="8" fill="var(--accent-terra)" />
              <text
                x="478"
                y="305"
                fontSize="13"
                fontFamily="var(--font-sans)"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                Çeşme
              </text>
              <motion.path
                d="M60 80 Q 220 130, 320 200 T 540 280"
                stroke="var(--accent-terra)"
                strokeWidth="3"
                strokeDasharray="6 8"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 2.0, ease: easing }}
              />
              {/* truck position */}
              <motion.g
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "62%" }}
                transition={{ duration: 1.5, delay: 0.6, ease: easing }}
                style={{
                  offsetPath: 'path("M60 80 Q 220 130, 320 200 T 540 280")',
                  offsetRotate: "auto",
                }}
              >
                <circle r="14" fill="var(--accent-terra)" />
                <circle r="20" fill="var(--accent-terra)" opacity="0.18" />
              </motion.g>
            </svg>
            <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-semibold shadow-md">
              <Truck size={12} className="text-[var(--accent-terra)]" /> Bursa · 73 km
            </div>
          </div>

          {/* driver card */}
          <div className="grid gap-3 border-t border-[var(--glass-border)] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--bg-tinted)] text-[var(--text-secondary)]">
                <span className="h-display text-lg italic" style={{ fontWeight: 600 }}>
                  ME
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold">Murat Erbil</p>
                <p className="num text-xs text-[var(--text-secondary)]">
                  34 ABC 7421 · Çift kabin 22m³
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="tel:+905551112233"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border-strong)] text-[var(--accent-terra)]"
                aria-label="Şoförü ara"
              >
                <Phone size={15} />
              </a>
              <a
                href="https://wa.me/905551112233"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border-strong)] text-[var(--accent-cypress)]"
                aria-label="Şoför WhatsApp"
              >
                <MessageCircle size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* bottom strip */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Stat Icon={ShieldCheck} title="Sigorta" value="Anadolu · 250.000 ₺" />
        <Stat Icon={MapPin} title="Son konum" value="Bursa · E-90, Mar 13 · 13:42" />
        <Stat Icon={Clock} title="Tahmini varış" value="14:42 (49 dk)" />
      </div>
    </div>
  );
}

function Stat({
  Icon,
  title,
  value,
}: {
  Icon: typeof MapPin;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--bg-tinted)] text-[var(--text-secondary)]">
        <Icon size={16} />
      </span>
      <div>
        <p className="h-eyebrow">{title}</p>
        <p className="num text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
