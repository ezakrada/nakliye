"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, CalendarDays, Home } from "lucide-react";

const homeTypes = ["1+1", "2+1", "3+1", "4+1", "Villa", "Ofis"];

export function HeroQuoteForm() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 10);
  });
  const [type, setType] = useState("2+1");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ from, to, date, type });
    router.push(`/teklif-al?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className="relative w-full rounded-[28px] border border-[var(--glass-border-strong)] bg-[var(--glass-panel-strong)] p-2.5 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_24px_60px_-26px_rgba(31,27,22,0.34)]"
    >
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto]">
        <label className="flex items-center gap-3 rounded-3xl bg-[var(--bg-elevated)] px-4 py-3 transition-shadow focus-within:shadow-[0_0_0_3px_rgba(201,71,43,0.18)]">
          <MapPin size={16} className="shrink-0 text-[var(--accent-terra)]" />
          <span className="flex flex-1 flex-col">
            <span className="h-eyebrow">Nereden</span>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Kadıköy, İstanbul"
              className="mt-0.5 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--text-tertiary)]"
              required
            />
          </span>
        </label>
        <label className="flex items-center gap-3 rounded-3xl bg-[var(--bg-elevated)] px-4 py-3 transition-shadow focus-within:shadow-[0_0_0_3px_rgba(201,71,43,0.18)]">
          <MapPin size={16} className="shrink-0 text-[var(--accent-cypress)]" />
          <span className="flex flex-1 flex-col">
            <span className="h-eyebrow">Nereye</span>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Çeşme, İzmir"
              className="mt-0.5 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--text-tertiary)]"
              required
            />
          </span>
        </label>
        <label className="flex items-center gap-3 rounded-3xl bg-[var(--bg-elevated)] px-4 py-3 transition-shadow focus-within:shadow-[0_0_0_3px_rgba(201,71,43,0.18)]">
          <CalendarDays size={16} className="shrink-0 text-[var(--text-secondary)]" />
          <span className="flex flex-1 flex-col">
            <span className="h-eyebrow">Tarih</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-0.5 bg-transparent text-sm font-medium outline-none"
              required
            />
          </span>
        </label>
        <label className="flex items-center gap-3 rounded-3xl bg-[var(--bg-elevated)] px-4 py-3 transition-shadow focus-within:shadow-[0_0_0_3px_rgba(201,71,43,0.18)]">
          <Home size={16} className="shrink-0 text-[var(--text-secondary)]" />
          <span className="flex flex-1 flex-col">
            <span className="h-eyebrow">Ev tipi</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="-mx-1 mt-0.5 bg-transparent text-sm font-medium outline-none"
            >
              {homeTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>

      {/* mobile: full-width submit under fields */}
      <div className="sm:hidden">
        <button
          type="submit"
          className="btn-terra mt-2.5 w-full justify-center py-3.5 text-[15px]"
        >
          Saniyeler içinde fiyat al
          <ArrowRight size={16} />
        </button>
      </div>

      {/* desktop: footer strip with KVKK note + button */}
      <div className="mt-3 hidden items-center justify-between gap-3 px-2 text-xs text-[var(--text-tertiary)] sm:flex">
        <span className="whitespace-nowrap">
          ✦ Sabit fiyat — sürpriz fark yok &nbsp;·&nbsp; KVKK uyumlu
        </span>
        <button
          type="submit"
          className="btn-terra whitespace-nowrap px-5 py-2.5 text-sm"
        >
          Saniyeler içinde fiyat al
          <ArrowRight size={15} />
        </button>
      </div>
    </form>
  );
}
