import { getApprovedTestimonials } from "@/lib/site-server";
import { SectionMark } from "@/components/atlas/SectionMark";
import { SafeImage } from "@/components/atlas/SafeImage";

export async function TestimonialsEditorial() {
  const items = await getApprovedTestimonials();
  if (items.length === 0) return null;

  return (
    <section id="yorumlar" className="relative py-24 lg:py-32">
      <div className="section-x">
        <SectionMark num="06" coord="14.000+ taşımanın hikayesi" label="Müşteri Yorumları" />

        <div className="space-y-20 lg:space-y-32">
          {items.map((t, idx) => {
            const isOdd = idx % 2 === 1;
            return (
              <article
                key={t.id}
                className={`relative grid items-start gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16 ${
                  isOdd ? "lg:grid-flow-row-dense" : ""
                }`}
              >
                {/* Editorial body */}
                <div className={isOdd ? "lg:col-start-2" : ""}>
                  <span className="coord">
                    NO. {String(idx + 1).padStart(2, "0")} · {t.date.toUpperCase()}
                  </span>
                  <p
                    className="mt-5 max-w-[58ch] text-[clamp(1.25rem,2.4vw,1.85rem)] leading-[1.32] tracking-[-0.018em] text-[var(--text-primary)]"
                    style={{ fontWeight: 400 }}
                  >
                    <span className="float-left mr-3 mt-1 font-mono text-[3.5rem] font-light leading-[0.7] text-[var(--accent-signal)]">
                      {t.text.charAt(0)}
                    </span>
                    {t.text.slice(1)}
                  </p>
                </div>

                {/* Sidebar bio */}
                <aside
                  className={`flex flex-col gap-3 self-end border-t border-[var(--hairline-strong)] pt-5 ${
                    isOdd ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[var(--hairline-emphasis)] bg-[var(--bg-glacier)]">
                      <SafeImage
                        src={`https://i.pravatar.cc/150?img=${(t.id % 70) + 1}`}
                        alt={t.name}
                        fallbackSeed={`avatar-${t.id}`}
                        fallbackW={150}
                        fallbackH={150}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="num text-sm font-semibold tracking-tight text-[var(--text-primary)]">
                        {t.name.toUpperCase()}
                      </p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                        Müşteri · Doğrulanmış
                      </p>
                    </div>
                  </div>
                  <dl className="grid grid-cols-1 gap-2 text-[12px]">
                    <div className="flex justify-between gap-2 border-b border-[var(--hairline)] pb-1.5">
                      <dt className="coord">GÜZERGAH</dt>
                      <dd className="num font-medium">{t.route}</dd>
                    </div>
                    <div className="flex justify-between gap-2 border-b border-[var(--hairline)] pb-1.5">
                      <dt className="coord">PUAN</dt>
                      <dd className="num font-medium">
                        {t.rating.toFixed(1)} / 5.0
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2 pb-1.5">
                      <dt className="coord">DOĞRULAMA</dt>
                      <dd className="num font-medium text-[var(--accent-mint)]">
                        ✓ DOĞRULANDI
                      </dd>
                    </div>
                  </dl>
                </aside>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
