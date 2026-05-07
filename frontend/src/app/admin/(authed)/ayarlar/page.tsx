import { readDb } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { saveSettings, resetDemo } from "@/app/admin/actions";
import { SaveBar } from "@/components/admin/SaveBar";
import { Save, RotateCw } from "lucide-react";

export default async function AyarlarPage() {
  const db = await readDb();
  const s = db.settings;
  return (
    <form action={saveSettings}>
      <PageHeader
        eyebrow="Ayarlar"
        title="Site ayarları"
        desc="Buradaki bilgiler header, footer ve iletişim sayfasında kullanılır."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-6">
          <h2 className="h-display mb-4 text-lg">Genel</h2>
          <div className="space-y-3">
            <Field name="siteName" label="Site adı" defaultValue={s.siteName} />
            <Field name="phone" label="Telefon" defaultValue={s.phone} />
            <Field name="whatsapp" label="WhatsApp (E.164: +90...)" defaultValue={s.whatsapp} />
            <Field name="email" label="E-posta" type="email" defaultValue={s.email} />
            <Field name="address" label="Adres" defaultValue={s.address} />
            <Field name="hours" label="Çalışma saatleri" defaultValue={s.hours} />
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-6">
            <h2 className="h-display mb-4 text-lg">Sigorta & yasal</h2>
            <div className="space-y-3">
              <Field name="insurer" label="Sigorta şirketi" defaultValue={s.insurer} />
              <Field name="kvkkEmail" label="KVKK e-posta" type="email" defaultValue={s.kvkkEmail} />
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-6">
            <h2 className="h-display mb-1 text-lg">Tema</h2>
            <p className="mb-4 text-xs text-[var(--text-secondary)]">
              Seçtiğiniz tema tüm public sayfalara — header, hero, kartlar, butonlar — anında uygulanır.
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {[
                {
                  v: "lumen",
                  label: "Lumen",
                  desc: "Soğuk beyaz · signal mavi",
                  swatch: ["#fafaf7", "#1f4fd9", "#d87c3a"],
                },
                {
                  v: "forest",
                  label: "Forest",
                  desc: "Soğuk beyaz · servi yeşili",
                  swatch: ["#f8faf7", "#1f7a4e", "#d87c3a"],
                },
                {
                  v: "coral",
                  label: "Coral",
                  desc: "Sıcak krem · burnt orange",
                  swatch: ["#faf6f0", "#d04b1f", "#c8a55b"],
                },
                {
                  v: "navy",
                  label: "Navy",
                  desc: "Lacivert blueprint · brass",
                  swatch: ["#0c1426", "#6c95ff", "#f0c060"],
                },
                {
                  v: "dark",
                  label: "Graphite",
                  desc: "Grafit · gece modu",
                  swatch: ["#0c0f14", "#5b82ff", "#e8a064"],
                },
              ].map((t) => {
                const active = s.theme === t.v;
                return (
                  <label
                    key={t.v}
                    className={`relative block cursor-pointer overflow-hidden rounded-2xl border p-3 transition-all ${
                      active
                        ? "border-[var(--accent-terra)] bg-[var(--accent-terra-soft)] shadow-[0_8px_24px_-12px_rgba(31,79,217,0.25)]"
                        : "border-[var(--glass-border)] bg-[var(--bg-tinted)] hover:border-[var(--glass-border-strong)] hover:bg-[var(--bg-elevated)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value={t.v}
                      defaultChecked={active}
                      className="sr-only"
                    />
                    {/* swatch row — 3 mini chips showing palette */}
                    <div className="mb-2.5 flex h-10 overflow-hidden rounded-xl border border-[var(--glass-border)]">
                      {t.swatch.map((c, i) => (
                        <span
                          key={i}
                          className="flex-1"
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                    <p className="text-sm font-semibold">{t.label}</p>
                    <p className="mt-0.5 text-[11px] leading-tight text-[var(--text-secondary)]">
                      {t.desc}
                    </p>
                    {active ? (
                      <span className="absolute right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-terra)] text-white">
                        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M3 8l3 3 7-7" />
                        </svg>
                      </span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </div>

          <DemoResetCard />
        </div>
      </div>

      <SaveBar>
        <button type="submit" className="btn-terra text-sm">
          <Save size={14} /> Değişiklikleri kaydet
        </button>
      </SaveBar>
    </form>
  );
}

function Field({
  name,
  label,
  defaultValue,
  type = "text",
}: {
  name: string;
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="h-eyebrow">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="field-base mt-1.5"
      />
    </label>
  );
}

function DemoResetCard() {
  return (
    <form
      action={resetDemo}
      className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-6"
    >
      <h2 className="h-display mb-4 text-lg">Demo modu</h2>
      <div className="rounded-xl bg-[var(--bg-tinted)] p-4 text-sm">
        <p className="font-medium">
          Otomatik veri sıfırlama:{" "}
          <span className="text-[var(--accent-cypress)]">Açık</span>
        </p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">
          Her 30 dakikada cron ile, çıkış yapıldığında ise el ile reset alınabilir.
        </p>
      </div>
      <button
        type="submit"
        className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-[var(--glass-border-strong)] bg-[var(--bg-base)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-tinted)]"
      >
        <RotateCw size={14} /> Şimdi seed snapshot'a sıfırla
      </button>
    </form>
  );
}
