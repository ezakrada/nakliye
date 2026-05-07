import { getActiveFaqs } from "@/lib/site-server";
import { SectionMark } from "@/components/atlas/SectionMark";

export async function FaqColumn() {
  const items = await getActiveFaqs();
  return (
    <section id="sss" className="relative py-24 lg:py-32">
      <div className="section-x">
        <SectionMark num="08" coord="Soru & Cevap" label="Sıkça Sorulanlar" />

        <h2 className="h-display-tight mb-14 max-w-3xl text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.04]">
          Açık konuşalım.{" "}
          <span className="text-[var(--accent-signal)]">Kısa keselim.</span>
        </h2>

        <div className="mx-auto max-w-3xl">
          {items.map((f, idx) => (
            <div
              key={f.id}
              className="grid grid-cols-[60px_1fr] items-start gap-6 border-t border-[var(--hairline-strong)] py-7 last:border-b last:border-b-[var(--hairline-strong)]"
            >
              <span className="num text-sm font-semibold tracking-[0.08em] text-[var(--accent-signal)]">
                Q.{String(idx + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="h-display text-[clamp(1.2rem,2vw,1.5rem)] tracking-[-0.018em] text-[var(--text-primary)]">
                  {f.q}
                </p>
                <p className="mt-3 text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
