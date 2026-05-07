"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  Truck,
  Star,
} from "lucide-react";
import { CropMarks } from "@/components/atlas/CropMarks";

const easing = [0.16, 1, 0.3, 1] as const;

const ticker = [
  { time: "07:42", route: "Ataşehir → Çeşme", km: 612, team: 4 },
  { time: "08:15", route: "Beşiktaş → Bodrum", km: 798, team: 5 },
  { time: "09:30", route: "Maslak → Bursa", km: 153, team: 3 },
  { time: "11:05", route: "Şişli → Çankaya", km: 446, team: 4 },
  { time: "13:20", route: "Üsküdar → Sapanca", km: 134, team: 3 },
  { time: "14:42", route: "Levent → Kalamış", km: 24, team: 2 },
];

export function HeroBento() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => (v + 1) % ticker.length), 4000);
    return () => clearInterval(t);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ from, to });
    router.push(`/teklif-al?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      <div className="section-x">
        {/* TR-style trust üst stripi */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--hairline-strong)] pb-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-[var(--text-secondary)]">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[var(--accent-mint)]" />
              <span className="font-medium">Sigortalı &amp; K1 belgeli</span>
            </span>
            <span className="hidden h-3 w-px bg-[var(--hairline-strong)] sm:inline-block" />
            <span className="inline-flex items-center gap-1.5">
              <Star
                size={13}
                className="fill-[var(--accent-spark)] text-[var(--accent-spark)]"
              />
              <span className="font-medium">
                4.9 / 5 — 14.000+ taşıma
              </span>
            </span>
          </div>
          <span className="text-[12px] text-[var(--text-tertiary)]">
            12 yıldır İstanbul'dan tüm Türkiye'ye
          </span>
        </div>

        {/* bento grid */}
        <div className="grid grid-cols-12 grid-rows-[auto_auto] gap-3 lg:gap-4">
          {/* Cell A — başlık + rota */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easing }}
            className="relative col-span-12 row-span-2 flex flex-col justify-between overflow-hidden rounded-[18px] border border-[var(--hairline-strong)] bg-[var(--bg-glacier)] p-6 sm:p-9 lg:col-span-7 lg:p-12"
            style={{ minHeight: "min(680px, 70vh)" }}
          >
            <CropMarks />
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(31,79,217,0.18)] bg-[var(--accent-signal-soft)] px-3 py-1.5">
                <Truck size={13} className="text-[var(--accent-signal)]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal-deep)]">
                  Evden Eve Nakliyat
                </span>
              </div>
              <h1 className="h-display-tight text-[clamp(2.6rem,6.8vw,5rem)] text-[var(--text-primary)]">
                Eşyalarınız bizim için
                <br />
                <span className="text-[var(--accent-signal)]">emanet.</span>
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[var(--text-secondary)]">
                Sigortalı, kayıtlı, kapıdan kapıya — üniformalı ekip, kendi araçlarımız.
                Foto-envanter sonrası{" "}
                <strong className="font-semibold text-[var(--text-primary)]">
                  sabit fiyat
                </strong>
                ; gizli kalem yok, sürpriz fark yok.
              </p>

              {/* TR-style telefon + WhatsApp */}
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href="tel:+905351045443"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-paper)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-signal)] hover:bg-[var(--accent-signal-soft)]"
                >
                  <Phone size={14} className="text-[var(--accent-signal)]" />
                  <span className="num">0535 104 54 43</span>
                </a>
                <a
                  href="https://wa.me/905351045443?text=Merhaba%2C%20teklif%20almak%20istiyorum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-mint)] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  style={{
                    boxShadow: "0 6px 18px -8px rgba(31,157,122,0.55)",
                  }}
                >
                  <MessageCircle size={14} />
                  WhatsApp'tan yaz
                </a>
              </div>
            </div>

            {/* animasyonlu rota çizgisi */}
            <div className="relative mt-8 h-32">
              <svg
                viewBox="0 0 600 120"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
                aria-hidden
              >
                <motion.path
                  d="M20 80 Q 120 30, 220 50 T 420 30 T 580 60"
                  stroke="var(--accent-signal)"
                  strokeWidth="1.25"
                  strokeDasharray="6 5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 1.8, delay: 0.4, ease: easing }}
                />
                <motion.circle
                  cx="20"
                  cy="80"
                  r="5"
                  fill="var(--accent-signal)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                />
                {[
                  { cx: 220, cy: 50 },
                  { cx: 420, cy: 30 },
                ].map((p, i) => (
                  <motion.circle
                    key={i}
                    cx={p.cx}
                    cy={p.cy}
                    r="3"
                    fill="var(--bg-glacier)"
                    stroke="var(--accent-signal)"
                    strokeWidth="1.25"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.0 + i * 0.3 }}
                  />
                ))}
                <motion.circle
                  cx="580"
                  cy="60"
                  r="6"
                  fill="var(--accent-spark)"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                />
              </svg>
              <span className="absolute left-2 bottom-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                İstanbul
              </span>
              <span className="absolute right-2 bottom-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-spark)]">
                Çeşme
              </span>
            </div>

            {/* sayı şeridi */}
            <div className="mt-6 grid grid-cols-2 divide-x divide-[var(--hairline-strong)] border-t border-[var(--hairline-strong)] pt-5 sm:grid-cols-4">
              {[
                { k: "12 yıl", v: "tecrübe" },
                { k: "14.000+", v: "taşıma" },
                { k: "41 il", v: "sefer ağı" },
                { k: "%98", v: "zamanında" },
              ].map((s) => (
                <div key={s.k} className="px-3 first:pl-0 sm:px-4">
                  <p className="num text-[clamp(1rem,2vw,1.4rem)] font-semibold tracking-tight text-[var(--text-primary)]">
                    {s.k}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[var(--text-tertiary)]">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </motion.article>

          {/* Cell B — teklif formu */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easing }}
            className="relative col-span-12 overflow-hidden rounded-[18px] border border-[var(--hairline-strong)] bg-[var(--glass-panel-strong)] backdrop-blur-2xl backdrop-saturate-150 lg:col-span-5"
          >
            <CropMarks />
            <form onSubmit={submit} className="flex h-full flex-col p-6 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="h-display text-base sm:text-lg">
                  Ücretsiz teklif al
                </h2>
                <span className="chip chip-mint">2 dakika</span>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                    Nereden taşınıyorsunuz?
                  </span>
                  <div className="mt-1.5 flex items-center gap-2 border-b border-[var(--hairline-strong)] pb-2 transition-colors focus-within:border-[var(--accent-signal)]">
                    <MapPin size={14} className="text-[var(--accent-signal)]" />
                    <input
                      type="text"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="Örn: Kadıköy, İstanbul"
                      className="flex-1 bg-transparent text-base font-medium outline-none placeholder:font-normal placeholder:text-[var(--text-tertiary)]"
                      required
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                    Nereye taşınıyorsunuz?
                  </span>
                  <div className="mt-1.5 flex items-center gap-2 border-b border-[var(--hairline-strong)] pb-2 transition-colors focus-within:border-[var(--accent-signal)]">
                    <MapPin size={14} className="text-[var(--accent-spark)]" />
                    <input
                      type="text"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="Örn: Çeşme, İzmir"
                      className="flex-1 bg-transparent text-base font-medium outline-none placeholder:font-normal placeholder:text-[var(--text-tertiary)]"
                      required
                    />
                  </div>
                </label>
              </div>

              <div className="mt-auto pt-7">
                <button
                  type="submit"
                  className="btn-signal w-full justify-between text-sm"
                >
                  Hemen fiyat al
                  <ArrowRight size={15} />
                </button>
                <p className="mt-3 text-center text-[11px] text-[var(--text-tertiary)]">
                  Kredi kartı bilgisi istemiyoruz · KVKK uyumlu
                </p>
              </div>
            </form>
          </motion.div>

          {/* Cell C — bugün yolda (canlı sefer panosu) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easing }}
            className="relative col-span-12 overflow-hidden rounded-[18px] border border-[var(--hairline-strong)] bg-[var(--bg-paper)] p-5 sm:col-span-8 lg:col-span-7"
          >
            <CropMarks />
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[13px] font-semibold text-[var(--text-primary)]">
                Bugün yolda
              </h3>
              <span className="flex items-center gap-1.5">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-mint)] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-mint)]" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-mint)]">
                  {ticker.length} aktif sefer
                </span>
              </span>
            </div>
            <div className="relative h-12 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tick}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.5, ease: easing }}
                  className="absolute inset-0 flex items-center gap-4"
                >
                  <span className="num text-[var(--accent-signal)]">
                    {ticker[tick].time}
                  </span>
                  <span className="hidden h-4 w-px bg-[var(--hairline-strong)] sm:inline-block" />
                  <span className="font-semibold text-[var(--text-primary)]">
                    {ticker[tick].route}
                  </span>
                  <span className="hidden h-4 w-px bg-[var(--hairline-strong)] sm:inline-block" />
                  <span className="num text-sm text-[var(--text-secondary)]">
                    {ticker[tick].km} km
                  </span>
                  <span className="hidden h-4 w-px bg-[var(--hairline-strong)] md:inline-block" />
                  <span className="num hidden text-sm text-[var(--text-secondary)] md:inline-block">
                    Ekip {ticker[tick].team}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-3 flex gap-1">
              {ticker.map((_, i) => (
                <span
                  key={i}
                  className={`h-px transition-all duration-500 ${
                    i === tick
                      ? "w-12 bg-[var(--accent-signal)]"
                      : "w-2 bg-[var(--hairline-strong)]"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Cell D — TR güven kartı */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: easing }}
            className="relative col-span-12 overflow-hidden rounded-[18px] border border-[var(--hairline-strong)] bg-[var(--bg-paper)] p-5 sm:col-span-4 lg:col-span-5"
          >
            <CropMarks />
            <h3 className="mb-3 text-[13px] font-semibold text-[var(--text-primary)]">
              12 yıldır güvendesiniz
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="num text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                  14.000+
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--text-tertiary)]">
                  başarılı taşıma
                </p>
              </div>
              <div>
                <p className="num text-2xl font-semibold tracking-tight text-[var(--accent-signal)]">
                  4.9
                  <span className="text-base text-[var(--text-tertiary)]">
                    /5
                  </span>
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--text-tertiary)]">
                  müşteri puanı
                </p>
              </div>
              <div className="col-span-2 mt-1 flex flex-wrap gap-1.5 border-t border-[var(--hairline)] pt-3">
                {["K1 Belgeli", "Anadolu Sigorta", "TOBB Üye"].map((b) => (
                  <span
                    key={b}
                    className="rounded-md border border-[var(--hairline-strong)] bg-[var(--bg-mist)] px-2 py-1 text-[10px] font-semibold text-[var(--text-secondary)]"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* alt aksiyon stripi */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-5 flex flex-col items-start justify-between gap-3 border-t border-[var(--hairline-strong)] pt-5 sm:flex-row sm:items-center"
        >
          <p className="max-w-2xl text-[14px] leading-relaxed text-[var(--text-secondary)]">
            <strong className="font-semibold text-[var(--text-primary)]">
              İstanbul'dan tüm Türkiye'ye
            </strong>{" "}
            evden eve nakliyat — 41 ilde planlı sefer ağı, hassas eşya ekibi,
            depolama imkanı.
          </p>
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent-signal)] hover:underline"
          >
            Tüm hizmetler
            <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
