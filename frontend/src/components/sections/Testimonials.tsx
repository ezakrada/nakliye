import { getApprovedTestimonials } from "@/lib/site-server";
import { TestimonialsClient } from "./TestimonialsClient";

export async function Testimonials() {
  const items = await getApprovedTestimonials();
  return (
    <section id="yorumlar" className="relative py-24 lg:py-32">
      <div className="section-x">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="h-eyebrow">Müşterilerimiz</span>
          <h2 className="h-display mt-3 text-[clamp(2rem,4vw,2.8rem)]">
            <span className="italic text-[var(--accent-terra)]">14.000</span>+ ev,
            binlerce hikâye.
          </h2>
        </div>
        <TestimonialsClient items={items} />
      </div>
    </section>
  );
}
