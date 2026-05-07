import { getActiveFaqs } from "@/lib/site-server";
import { FaqClient } from "./FaqClient";

export async function Faq() {
  const items = await getActiveFaqs();
  return (
    <section id="sss" className="relative py-24 lg:py-32">
      <div className="section-x">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="h-eyebrow">Sıkça Sorulanlar</span>
          <h2 className="h-display mt-3 text-[clamp(2rem,4vw,2.8rem)]">
            Açık konuşalım,{" "}
            <span className="italic text-[var(--accent-terra)]">kısa keselim</span>.
          </h2>
        </div>
        <FaqClient items={items} />
      </div>
    </section>
  );
}
