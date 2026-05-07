"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Building2,
  PackageOpen,
  Calendar,
  User,
  MapPin,
  Loader2,
  CheckCircle2,
  Truck,
  Copy,
} from "lucide-react";

type FormState = {
  fromCity: string;
  fromDistrict: string;
  fromFloor: string;
  fromElevator: boolean;
  toCity: string;
  toDistrict: string;
  toFloor: string;
  toElevator: boolean;
  homeType: string;
  items: string[];
  date: string;
  timeWindow: string;
  packing: boolean;
  assembly: boolean;
  insurance: string;
  storage: number;
  fullName: string;
  phone: string;
  email: string;
  kvkk: boolean;
  marketing: boolean;
};

const initial: FormState = {
  fromCity: "",
  fromDistrict: "",
  fromFloor: "0",
  fromElevator: true,
  toCity: "",
  toDistrict: "",
  toFloor: "0",
  toElevator: true,
  homeType: "2+1",
  items: [],
  date: (() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 10);
  })(),
  timeWindow: "ogleden-once",
  packing: true,
  assembly: true,
  insurance: "standart",
  storage: 0,
  fullName: "",
  phone: "",
  email: "",
  kvkk: false,
  marketing: false,
};

const inventoryByType: Record<string, string[]> = {
  "1+1": [
    "Yatak odası takımı",
    "Kanepe / koltuk",
    "Yemek masası",
    "Buzdolabı",
    "Çamaşır makinesi",
    "TV ünitesi",
    "Gardırop",
    "Kütüphane",
    "Bulaşık makinesi",
  ],
  "2+1": [
    "Yatak odası takımı (2)",
    "Kanepe / koltuk takımı",
    "Yemek masası + sandalye",
    "Buzdolabı",
    "Çamaşır makinesi",
    "Kurutma makinesi",
    "Bulaşık makinesi",
    "Fırın / ankastre",
    "Gardırop (2)",
    "Kütüphane",
    "Çocuk odası takımı",
    "Çalışma masası",
  ],
  "3+1": [
    "Yatak odası takımı (3)",
    "Salon takımı",
    "Yemek odası takımı",
    "Buzdolabı (büyük)",
    "Derin dondurucu",
    "Çamaşır + Kurutma",
    "Bulaşık makinesi",
    "Klima (split)",
    "Kütüphane / vitrin",
    "Piyano",
    "Kasa",
    "Akvaryum",
  ],
  "4+1": [
    "Yatak odası takımı (4)",
    "Salon + tv ünitesi",
    "Yemek odası takımı",
    "Konsol / şifonyer",
    "Buzdolabı (Side-by-side)",
    "Çamaşır + Kurutma",
    "Klima (3 split)",
    "Şömine aksesuar",
    "Piyano / kuyruklu piyano",
    "Tablo / sanat eseri",
    "Kasa",
    "Antika koleksiyonu",
  ],
  Villa: [
    "Yatak odası takımları (5+)",
    "Bahçe mobilyası",
    "Çift salon takımı",
    "Tüm beyaz eşya",
    "Klimalar (4+)",
    "Piyano / kuyruklu",
    "Tablo / heykel koleksiyonu",
    "Şarap dolabı",
    "Antika eşya",
    "Kasa",
    "Çamaşır odası ekipmanı",
  ],
  Ofis: [
    "Çalışma masaları",
    "Ofis koltukları",
    "Toplantı masası",
    "Sunucu / Network kabini",
    "Yazıcı / fotokopi",
    "Klima (split)",
    "Mutfak ekipmanı",
    "Dolaplar",
    "Sehpa / vitrin",
    "Tablo / dekor",
  ],
};

const steps = [
  { id: 1, label: "Güzergah", Icon: MapPin },
  { id: 2, label: "Eşya envanteri", Icon: PackageOpen },
  { id: 3, label: "Tarih & ekstralar", Icon: Calendar },
  { id: 4, label: "İletişim", Icon: User },
] as const;

type Pricing = {
  base: Record<string, number>;
  perKm: number;
  floorSurcharge: number;
  extras: Record<string, number>;
  seasonMultipliers: Record<string, number>;
};

export function QuoteWizard({ pricing }: { pricing?: Pricing }) {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ code: string; min: number; max: number } | null>(null);

  useEffect(() => {
    const fromCity = params?.get("from") || "";
    const toCity = params?.get("to") || "";
    const date = params?.get("date") || initial.date;
    const homeType = params?.get("type") || initial.homeType;
    setData((d) => ({ ...d, fromCity, toCity, date, homeType }));
  }, [params]);

  const setField = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const toggleItem = (item: string) =>
    setData((d) => ({
      ...d,
      items: d.items.includes(item)
        ? d.items.filter((i) => i !== item)
        : [...d.items, item],
    }));

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    setSubmitting(true);
    try {
      const r = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          itemCount: data.items.length,
        }),
      });
      const j = await r.json();
      if (j.ok) {
        setResult({ code: j.code, min: j.min, max: j.max });
      } else {
        const fallback: Pricing = pricing ?? {
          base: { "1+1": 4500, "2+1": 7500, "3+1": 11500, "4+1": 15500, Villa: 22000, Ofis: 9500 },
          perKm: 14,
          floorSurcharge: 350,
          extras: { packing: 800, assembly: 600, insuranceEk: 700, insurancePremium: 1500, storagePerDay: 350 },
          seasonMultipliers: { yaz: 1.1, bahar: 1.0, kis: 0.92 },
        };
        const base = fallback.base[data.homeType] ?? 7500;
        const ins = data.insurance === "premium" ? fallback.extras.insurancePremium : data.insurance === "ek" ? fallback.extras.insuranceEk : 0;
        const extras = (data.packing ? fallback.extras.packing : 0) + (data.assembly ? fallback.extras.assembly : 0) + ins + data.storage * fallback.extras.storagePerDay;
        const total = base + data.items.length * 120 + extras;
        setResult({
          code: `EŞ-${String(Math.floor(10000 + Math.random() * 89999))}`,
          min: Math.floor(total * 0.92),
          max: Math.floor(total * 1.08),
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inventory = inventoryByType[data.homeType] || inventoryByType["2+1"];

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-10 overflow-hidden rounded-[36px] border border-[var(--glass-border-strong)] bg-[var(--bg-elevated)] p-8 text-center sm:p-12 shadow-[var(--shadow-pop)]"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-cypress-soft)] text-[var(--accent-cypress)]">
          <CheckCircle2 size={28} />
        </div>
        <h2 className="h-display mt-5 text-[clamp(1.6rem,3.2vw,2.2rem)]">
          Teklifiniz hazır.
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          Aşağıdaki tahmini aralık, foto-envanter sonrası kesin fiyata dönecek.
        </p>

        <div className="mx-auto mt-7 max-w-md rounded-3xl bg-[var(--bg-base)] p-6">
          <p className="h-eyebrow">Tahmini fiyat aralığı</p>
          <p
            className="num mt-1 text-[clamp(1.6rem,4vw,2.4rem)] font-semibold tracking-tight"
            style={{ fontWeight: 600 }}
          >
            {result.min.toLocaleString("tr-TR")} ₺ –{" "}
            {result.max.toLocaleString("tr-TR")} ₺
          </p>
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] px-4 py-3 text-left">
            <div>
              <p className="h-eyebrow">Takip kodu</p>
              <p className="num text-lg font-semibold">{result.code}</p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(result.code)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-border)] text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-terra)]"
              aria-label="Kodu kopyala"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>

        <div className="mx-auto mt-7 flex max-w-md flex-col gap-2 sm:flex-row">
          <a
            href={`/takip/${result.code}`}
            className="btn-terra w-full justify-center"
          >
            <Truck size={16} /> Gönderiyi takip et
          </a>
          <a
            href="https://wa.me/905351045443?text=Teklifim%20hakkında%20sorum%20var:%20"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full justify-center"
          >
            WhatsApp ile sor
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mt-10">
      {/* progress bar */}
      <div className="mb-8 grid grid-cols-4 gap-2">
        {steps.map((s) => {
          const active = step >= s.id;
          const done = step > s.id;
          return (
            <div key={s.id} className="flex flex-col items-center">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-tinted)]">
                <motion.div
                  initial={false}
                  animate={{ width: active ? "100%" : "0%" }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-[var(--accent-terra)]"
                />
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-secondary)] sm:text-xs">
                {done ? (
                  <Check size={12} className="text-[var(--accent-cypress)]" />
                ) : (
                  <s.Icon size={12} />
                )}
                <span className={active ? "text-[var(--text-primary)]" : ""}>
                  {s.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* card */}
      <div className="overflow-hidden rounded-[36px] border border-[var(--glass-border-strong)] bg-[var(--bg-elevated)] p-6 sm:p-10 shadow-[var(--shadow-card)]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="h-display text-2xl">Güzergah ve kat bilgileri</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="h-eyebrow mb-2 block">Çıkış adresi</label>
                  <input
                    className="field-base"
                    placeholder="İl"
                    value={data.fromCity}
                    onChange={(e) => setField("fromCity", e.target.value)}
                  />
                  <input
                    className="field-base mt-2"
                    placeholder="İlçe / mahalle"
                    value={data.fromDistrict}
                    onChange={(e) => setField("fromDistrict", e.target.value)}
                  />
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      className="field-base"
                      placeholder="Kat"
                      value={data.fromFloor}
                      onChange={(e) => setField("fromFloor", e.target.value)}
                    />
                    <label className="flex items-center gap-2 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-base)] px-3 text-sm">
                      <input
                        type="checkbox"
                        checked={data.fromElevator}
                        onChange={(e) => setField("fromElevator", e.target.checked)}
                        className="h-4 w-4 accent-[var(--accent-terra)]"
                      />
                      Asansör var
                    </label>
                  </div>
                </div>
                <div>
                  <label className="h-eyebrow mb-2 block">Varış adresi</label>
                  <input
                    className="field-base"
                    placeholder="İl"
                    value={data.toCity}
                    onChange={(e) => setField("toCity", e.target.value)}
                  />
                  <input
                    className="field-base mt-2"
                    placeholder="İlçe / mahalle"
                    value={data.toDistrict}
                    onChange={(e) => setField("toDistrict", e.target.value)}
                  />
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      className="field-base"
                      placeholder="Kat"
                      value={data.toFloor}
                      onChange={(e) => setField("toFloor", e.target.value)}
                    />
                    <label className="flex items-center gap-2 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-base)] px-3 text-sm">
                      <input
                        type="checkbox"
                        checked={data.toElevator}
                        onChange={(e) => setField("toElevator", e.target.checked)}
                        className="h-4 w-4 accent-[var(--accent-terra)]"
                      />
                      Asansör var
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="h-eyebrow mb-2 block">Ev tipi</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(inventoryByType).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setField("homeType", t)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        data.homeType === t
                          ? "bg-[var(--accent-terra)] text-white shadow-[0_4px_14px_-4px_rgba(201,71,43,0.5)]"
                          : "bg-[var(--bg-base)] text-[var(--text-secondary)] hover:bg-[var(--bg-tinted)]"
                      }`}
                    >
                      {t === "Ofis" ? <Building2 size={12} className="inline mr-1" /> : null}
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h3 className="h-display text-2xl">Eşya envanteri</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Hangi büyük eşyalar var? Hepsini seçmenize gerek yok — yaklaşık fikir
                  yeterli, foto-envanterde detaylanır.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {inventory.map((item) => {
                  const checked = data.items.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleItem(item)}
                      className={`flex items-center gap-2 rounded-2xl border px-3 py-3 text-left text-sm transition-all ${
                        checked
                          ? "border-[var(--accent-terra)] bg-[var(--accent-terra-soft)] text-[var(--accent-terra-deep)]"
                          : "border-[var(--glass-border)] bg-[var(--bg-base)] text-[var(--text-secondary)] hover:border-[var(--glass-border-strong)]"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                          checked
                            ? "border-[var(--accent-terra)] bg-[var(--accent-terra)] text-white"
                            : "border-[var(--glass-border-strong)]"
                        }`}
                      >
                        {checked ? <Check size={12} /> : null}
                      </span>
                      {item}
                    </button>
                  );
                })}
              </div>
              <p className="rounded-2xl border border-dashed border-[var(--glass-border-strong)] bg-[var(--bg-base)] px-4 py-3 text-xs text-[var(--text-tertiary)]">
                💡 İsterseniz Adım 4'ten sonra WhatsApp'tan fotoğraf gönderin — ekibimiz
                envanteri sizin yerinize çıkarsın.
              </p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="h-display text-2xl">Tarih ve ek hizmetler</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="h-eyebrow mb-2 block">Taşınma tarihi</label>
                  <input
                    type="date"
                    className="field-base"
                    value={data.date}
                    onChange={(e) => setField("date", e.target.value)}
                  />
                </div>
                <div>
                  <label className="h-eyebrow mb-2 block">Saat aralığı</label>
                  <select
                    className="field-base"
                    value={data.timeWindow}
                    onChange={(e) => setField("timeWindow", e.target.value)}
                  >
                    <option value="sabah">Sabah (07:00 — 11:00)</option>
                    <option value="ogleden-once">Öğleden önce (09:00 — 13:00)</option>
                    <option value="ogleden-sonra">Öğleden sonra (13:00 — 17:00)</option>
                    <option value="aksam">Akşam (16:00 — 20:00)</option>
                    <option value="gece">Gece (22:00 — 06:00) +%15</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Toggle
                  label="Ambalaj hizmeti"
                  desc="Cam eşya, tablo, mutfak — biz toplayalım"
                  checked={data.packing}
                  onChange={(v) => setField("packing", v)}
                />
                <Toggle
                  label="Montaj-Demontaj"
                  desc="Yatak, gardırop, mutfak — söküp kuralım"
                  checked={data.assembly}
                  onChange={(v) => setField("assembly", v)}
                />
              </div>

              <div>
                <label className="h-eyebrow mb-2 block">Sigorta paketi</label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {[
                    { v: "standart", t: "Standart", s: "Dahil — 250.000 ₺" },
                    { v: "ek", t: "Ek güvence", s: "+700 ₺ — 500.000 ₺" },
                    { v: "premium", t: "Premium", s: "+1.500 ₺ — 1M ₺ + cam" },
                  ].map((opt) => (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => setField("insurance", opt.v)}
                      className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                        data.insurance === opt.v
                          ? "border-[var(--accent-cypress)] bg-[var(--accent-cypress-soft)] text-[var(--accent-cypress)]"
                          : "border-[var(--glass-border)] bg-[var(--bg-base)]"
                      }`}
                    >
                      <p className="text-sm font-semibold">{opt.t}</p>
                      <p className="num mt-0.5 text-xs">{opt.s}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="h-eyebrow mb-2 block">
                  Depolama (gün) — eşyalarınız yeni ev hazır olana kadar
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={60}
                    step={1}
                    value={data.storage}
                    onChange={(e) => setField("storage", Number(e.target.value))}
                    className="flex-1 accent-[var(--accent-terra)]"
                  />
                  <span className="num w-16 rounded-full bg-[var(--bg-tinted)] px-3 py-1.5 text-center text-sm font-semibold">
                    {data.storage} gün
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="h-display text-2xl">İletişim ve onay</h3>

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  className="field-base"
                  placeholder="Ad Soyad"
                  value={data.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                />
                <input
                  required
                  type="tel"
                  className="field-base"
                  placeholder="Telefon (+90...)"
                  value={data.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                />
              </div>
              <input
                type="email"
                className="field-base"
                placeholder="E-posta"
                value={data.email}
                onChange={(e) => setField("email", e.target.value)}
              />

              <div className="space-y-3 rounded-2xl bg-[var(--bg-base)] p-4">
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={data.kvkk}
                    onChange={(e) => setField("kvkk", e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[var(--accent-terra)]"
                  />
                  <span className="text-[var(--text-secondary)]">
                    <a href="/yasal/kvkk" className="font-semibold text-[var(--text-primary)] underline">
                      KVKK aydınlatma metnini
                    </a>{" "}
                    okudum, kişisel verilerimin teklif amacıyla işlenmesine onay
                    veriyorum.
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={data.marketing}
                    onChange={(e) => setField("marketing", e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[var(--accent-terra)]"
                  />
                  <span className="text-[var(--text-secondary)]">
                    Eşyam'dan kampanya, indirim ve hizmet bilgileri almak istiyorum.
                  </span>
                </label>
              </div>

              <Summary data={data} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between border-t border-[var(--glass-border)] pt-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] disabled:opacity-40"
          >
            <ArrowLeft size={14} /> Geri
          </button>
          {step < 4 ? (
            <button type="button" onClick={next} className="btn-terra">
              Devam et <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={!data.kvkk || !data.fullName || !data.phone || submitting}
              className="btn-terra disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Hesaplıyoruz…
                </>
              ) : (
                <>
                  Teklifi al <ArrowRight size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
        checked
          ? "border-[var(--accent-terra)] bg-[var(--accent-terra-soft)]"
          : "border-[var(--glass-border)] bg-[var(--bg-base)]"
      }`}
    >
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-[var(--accent-terra)]" : "bg-[var(--glass-border-strong)]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </span>
      <span>
        <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
        <p className="text-xs text-[var(--text-secondary)]">{desc}</p>
      </span>
    </button>
  );
}

function Summary({ data }: { data: FormState }) {
  return (
    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-base)] p-4">
      <p className="h-eyebrow mb-3">Özet</p>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-[var(--text-tertiary)]">Güzergah</dt>
        <dd className="text-right font-medium">
          {data.fromCity || "—"} → {data.toCity || "—"}
        </dd>
        <dt className="text-[var(--text-tertiary)]">Ev tipi</dt>
        <dd className="text-right font-medium">{data.homeType}</dd>
        <dt className="text-[var(--text-tertiary)]">Tarih</dt>
        <dd className="num text-right font-medium">{data.date}</dd>
        <dt className="text-[var(--text-tertiary)]">Eşya kalemi</dt>
        <dd className="num text-right font-medium">{data.items.length} adet</dd>
        <dt className="text-[var(--text-tertiary)]">Sigorta</dt>
        <dd className="text-right font-medium capitalize">{data.insurance}</dd>
        <dt className="text-[var(--text-tertiary)]">Depolama</dt>
        <dd className="num text-right font-medium">{data.storage} gün</dd>
      </dl>
    </div>
  );
}
