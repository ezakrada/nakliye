import { getActiveServices } from "@/lib/site-server";
import { SectionMark } from "@/components/atlas/SectionMark";
import { ServicesDossierClient } from "./ServicesDossierClient";

const ROMAN = ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8."];

const meta: Record<
  string,
  { kapsam: string; sure: string; ekip: string }
> = {
  "Evden Eve": { kapsam: "Tam ev / villa", sure: "1 gün", ekip: "4–6 kişi" },
  "Asansörlü Taşıma": { kapsam: "12. kata kadar", sure: "0.5 gün", ekip: "3 kişi + operatör" },
  "Ofis Taşıma": { kapsam: "≤500 m² ofis", sure: "Hafta sonu / gece", ekip: "5 kişi + IT" },
  "Şehirler Arası": { kapsam: "41 il + güzergah", sure: "1–2 gün", ekip: "4 kişi + sürücü" },
  "Hassas Eşya": { kapsam: "Piyano, antika, sanat", sure: "Eserine göre", ekip: "Müze ekibi" },
  Depolama: { kapsam: "İklim kontrollü", sure: "Aylık esnek", ekip: "Kurye dahil" },
};

export async function ServicesDossier() {
  const items = await getActiveServices();
  return (
    <section id="hizmetler" className="relative py-24 lg:py-32">
      <div className="section-x">
        <SectionMark num="02" coord="6 farklı uzmanlık" label="Hizmetlerimiz" />
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-2 lg:gap-12">
          <h2 className="h-display-tight text-[clamp(2.4rem,5vw,3.8rem)] text-[var(--text-primary)]">
            Her taşınmanın
            <br />
            <span className="text-[var(--accent-signal)]">bir uzmanı var.</span>
          </h2>
          <p className="text-[16px] leading-relaxed text-[var(--text-secondary)] lg:max-w-md">
            Stüdyo daire mi? Villa mı? Piyano mu? Ekibimiz sizinkine en uygun aracı,
            ambalajı ve ekibi seçer — siz sadece kahvenizi içersiniz.
          </p>
        </div>

        <ServicesDossierClient
          items={items.map((s, i) => ({
            id: s.id,
            roman: ROMAN[i] ?? String(i + 1),
            title: s.title,
            desc: s.desc,
            icon: s.icon,
            kapsam: meta[s.title]?.kapsam ?? "—",
            sure: meta[s.title]?.sure ?? "—",
            ekip: meta[s.title]?.ekip ?? "—",
          }))}
        />
      </div>
    </section>
  );
}
