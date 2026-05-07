"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/atlas/SafeImage";

export type Slide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
};

const easing = [0.16, 1, 0.3, 1] as const;

function SlideCard({
  slide,
  index,
  variant,
}: {
  slide: Slide;
  index: number;
  variant: "big" | "small";
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slide.id}
        initial={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
        transition={{ duration: 0.7, ease: easing }}
        className="absolute inset-0"
      >
        <SafeImage
          src={slide.image}
          alt={slide.title}
          fallbackSeed={`slide-${slide.id}`}
          fallbackW={1200}
          fallbackH={variant === "big" ? 900 : 700}
          className="h-full w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,18,32,0) 30%, rgba(11,18,32,0.55) 75%, rgba(11,18,32,0.85) 100%)",
          }}
        />
        <div
          className={`absolute left-0 right-0 bottom-0 flex flex-col gap-2 p-4 sm:p-6 ${
            variant === "big" ? "md:p-8" : ""
          }`}
        >
          <span className="num inline-flex w-fit rounded-md border border-white/30 bg-white/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
            {String(index + 1).padStart(2, "0")} / Eşyam
          </span>
          <h3
            className={`h-display-tight text-white drop-shadow-md ${
              variant === "big"
                ? "text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.05]"
                : "text-[clamp(1.05rem,2vw,1.4rem)] leading-tight"
            }`}
          >
            {slide.title}
          </h3>
          <p
            className={`text-white/85 drop-shadow ${
              variant === "big" ? "text-[14px] sm:text-[15px]" : "text-[12px] sm:text-[13px]"
            }`}
          >
            {slide.subtitle}
          </p>
          {slide.ctaText && slide.ctaLink ? (
            <a
              href={slide.ctaLink}
              className={`group mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-white text-[var(--text-primary)] transition-transform hover:-translate-y-0.5 ${
                variant === "big"
                  ? "px-4 py-2 text-[13px] font-semibold sm:px-5 sm:py-2.5 sm:text-[14px]"
                  : "px-3 py-1.5 text-[12px] font-semibold"
              }`}
            >
              {slide.ctaText}
              <ArrowRight
                size={variant === "big" ? 14 : 12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          ) : null}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function HeroSliderClient({ slides }: { slides: Slide[] }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setTick((v) => v + 1), 4500);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides.length) return null;

  // Map 3 slot positions, each shows slides[(tick + offset) % slides.length]
  const slotIndices = [0, 1, 2].map((offset) =>
    slides.length > 0 ? (tick + offset) % slides.length : 0,
  );
  const big = slides[slotIndices[0]];
  const top = slides[slotIndices[1]];
  const bot = slides[slotIndices[2]];

  return (
    <section className="relative pt-24 pb-2 lg:pt-28">
      <div className="section-x">
        {/* Üst label */}
        <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-signal)]">
            Eşyam Galerisi
          </span>
          <div className="flex items-center gap-1">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-1 transition-all duration-500 ${
                  i === slotIndices[0]
                    ? "w-8 rounded-full bg-[var(--accent-signal)]"
                    : "w-1 rounded-full bg-[var(--hairline-strong)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bento: mobil tek slide, masaüstü 1 büyük + 2 dikey */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.4fr_1fr] lg:gap-4">
          {/* SOL — büyük kare (mobile: ilk ve tek) */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] border border-[var(--hairline-strong)] bg-[var(--bg-mist)] sm:aspect-[5/4] lg:aspect-[5/4]">
            {big ? <SlideCard slide={big} index={slotIndices[0]} variant="big" /> : null}
          </div>

          {/* SAĞ — 2 stacked rectangle (sadece sm+ ekranda) */}
          <div className="hidden flex-col gap-3 lg:flex lg:gap-4">
            <div className="relative flex-1 overflow-hidden rounded-[18px] border border-[var(--hairline-strong)] bg-[var(--bg-mist)]">
              {top ? <SlideCard slide={top} index={slotIndices[1]} variant="small" /> : null}
            </div>
            <div className="relative flex-1 overflow-hidden rounded-[18px] border border-[var(--hairline-strong)] bg-[var(--bg-mist)]">
              {bot ? <SlideCard slide={bot} index={slotIndices[2]} variant="small" /> : null}
            </div>
          </div>

          {/* MOBILE: alt 2 slot — daha kısa, yan yana */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] border border-[var(--hairline-strong)] bg-[var(--bg-mist)]">
              {top ? <SlideCard slide={top} index={slotIndices[1]} variant="small" /> : null}
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] border border-[var(--hairline-strong)] bg-[var(--bg-mist)]">
              {bot ? <SlideCard slide={bot} index={slotIndices[2]} variant="small" /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
