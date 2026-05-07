import { readDb } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { savePricing } from "@/app/admin/actions";
import { SaveBar } from "@/components/admin/SaveBar";
import { Save } from "lucide-react";

export default async function FiyatlandirmaPage() {
  const db = await readDb();
  const p = db.pricing;

  return (
    <form action={savePricing}>
      <PageHeader
        eyebrow="Fiyatlandırma"
        title="Baz fiyatlar ve çarpanlar"
        desc="Buradaki değerler online teklif formunda anında uygulanır."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-6">
          <h2 className="h-display mb-4 text-lg">Ev tipi → baz fiyat</h2>
          <ul className="space-y-2.5">
            {Object.entries(p.base).map(([k, v]) => (
              <li
                key={k}
                className="flex items-center justify-between rounded-xl bg-[var(--bg-tinted)] px-4 py-3"
              >
                <span className="text-sm font-medium">{k}</span>
                <div className="flex items-center gap-2">
                  <input
                    name={`base_${k}`}
                    type="number"
                    defaultValue={v}
                    className="num w-32 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-elevated)] px-3 py-1.5 text-right text-sm font-semibold"
                  />
                  <span className="num text-xs text-[var(--text-tertiary)]">₺</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-6">
            <h2 className="h-display mb-4 text-lg">Yol & kat farkı</h2>
            <div className="space-y-3">
              <PricingField name="perKm" label="Km başına" defaultValue={p.perKm} suffix="₺/km" />
              <PricingField
                name="floorSurcharge"
                label="Kat farkı (asansörsüz)"
                defaultValue={p.floorSurcharge}
                suffix="₺/kat"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-6">
            <h2 className="h-display mb-4 text-lg">Ek hizmetler</h2>
            <div className="space-y-3">
              <PricingField name="ex_packing" label="Ambalaj hizmeti" defaultValue={p.extras.packing} suffix="₺" />
              <PricingField name="ex_assembly" label="Montaj-Demontaj" defaultValue={p.extras.assembly} suffix="₺" />
              <PricingField name="ex_insuranceEk" label="Sigorta — ek" defaultValue={p.extras.insuranceEk} suffix="₺" />
              <PricingField name="ex_insurancePremium" label="Sigorta — premium" defaultValue={p.extras.insurancePremium} suffix="₺" />
              <PricingField name="ex_storagePerDay" label="Depolama / gün" defaultValue={p.extras.storagePerDay} suffix="₺" />
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-6">
            <h2 className="h-display mb-4 text-lg">Sezonsal çarpan</h2>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(p.seasonMultipliers).map(([k, v]) => (
                <div key={k} className="rounded-xl bg-[var(--bg-tinted)] p-3 text-center">
                  <p className="h-eyebrow capitalize">{k}</p>
                  <input
                    name={`season_${k}`}
                    type="number"
                    step="0.01"
                    defaultValue={v}
                    className="num mt-2 w-full rounded-lg border border-[var(--glass-border)] bg-[var(--bg-elevated)] px-2 py-1.5 text-center text-base font-semibold"
                  />
                </div>
              ))}
            </div>
          </div>
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

function PricingField({
  name,
  label,
  defaultValue,
  suffix,
}: {
  name: string;
  label: string;
  defaultValue: number;
  suffix?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[var(--bg-tinted)] px-4 py-3">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <input
          name={name}
          type="number"
          step="0.01"
          defaultValue={defaultValue}
          className="num w-28 rounded-lg border border-[var(--glass-border)] bg-[var(--bg-elevated)] px-3 py-1.5 text-right text-sm font-semibold"
        />
        {suffix ? <span className="num text-xs text-[var(--text-tertiary)]">{suffix}</span> : null}
      </div>
    </div>
  );
}
