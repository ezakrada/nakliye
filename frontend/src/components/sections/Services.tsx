import { getActiveServices } from "@/lib/site-server";
import { ServicesGrid } from "./ServicesGrid";

export async function Services() {
  const items = await getActiveServices();
  return (
    <section id="hizmetler" className="relative py-24 lg:py-32">
      <div className="section-x">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="h-eyebrow">Hizmetlerimiz</span>
          <h2 className="h-display mt-3 text-[clamp(2rem,4vw,2.8rem)] text-[var(--text-primary)]">
            Bir teklif,{" "}
            <span className="italic text-[var(--accent-terra)]">
              {items.length} uzmanlık
            </span>
            .
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Her taşımanın bir karakteri var. Sizinkine en uygun ekibi, aracı ve ambalaj
            yöntemini biz seçiyoruz; siz sadece kahvenizi içiyorsunuz.
          </p>
        </div>
        <ServicesGrid items={items} />
      </div>
    </section>
  );
}
