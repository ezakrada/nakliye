"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Truck, ArrowRight } from "lucide-react";

export default function TakipPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    router.push(`/takip/${encodeURIComponent(code.trim().toUpperCase())}`);
  };

  return (
    <main className="relative min-h-dvh pt-32 pb-32 lg:pt-40 lg:pb-20">
      <div className="section-x">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--glass-border-strong)] bg-[var(--bg-elevated)] text-[var(--accent-terra)] shadow-[var(--shadow-card)]">
            <Truck size={26} strokeWidth={1.5} />
          </div>
          <span className="h-eyebrow mt-6 inline-block">Gönderi Takip</span>
          <h1 className="h-display mt-3 text-[clamp(2rem,4vw,2.8rem)]">
            Eşyalarınız <span className="italic text-[var(--accent-terra)]">şu an</span> nerede?
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Teklifinizle birlikte aldığınız 5 haneli takip kodunu girin.
          </p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-3xl border border-[var(--glass-border-strong)] bg-[var(--bg-elevated)] px-4 py-3 transition-shadow focus-within:shadow-[0_0_0_3px_rgba(201,71,43,0.18)]">
              <Search size={18} className="text-[var(--text-tertiary)]" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="EŞ-12345"
                className="num flex-1 bg-transparent text-base font-semibold uppercase tracking-wide outline-none placeholder:text-[var(--text-tertiary)]"
                autoFocus
              />
            </label>
            <button type="submit" className="btn-terra justify-center">
              Takibi başlat <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
