import { SafeImage } from "@/components/atlas/SafeImage";

const photos = [
  {
    src: "https://images.pexels.com/photos/4506270/pexels-photo-4506270.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop",
    label: "Üniformalı ekip",
    seed: "team",
  },
  {
    src: "https://images.pexels.com/photos/7464705/pexels-photo-7464705.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop",
    label: "Hassas paketleme",
    seed: "pack",
  },
  {
    src: "https://images.pexels.com/photos/4392040/pexels-photo-4392040.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop",
    label: "Kapıdan kapıya",
    seed: "door",
  },
  {
    src: "https://images.pexels.com/photos/4392027/pexels-photo-4392027.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop",
    label: "Saha operasyonu",
    seed: "ops",
  },
];

export function PhotoStrip() {
  return (
    <section className="relative py-16 lg:py-20">
      <div className="section-x">
        <div className="mb-8 flex flex-col items-baseline justify-between gap-2 sm:flex-row">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-signal)]">
            Sahadan kareler
          </span>
          <span className="text-[12px] text-[var(--text-tertiary)]">
            Her hafta yeni binlerce taşıma · 41 il ağı
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {photos.map((p, i) => (
            <figure
              key={i}
              className="group relative aspect-[4/5] overflow-hidden rounded-[16px] border border-[var(--hairline-strong)] bg-[var(--bg-mist)]"
            >
              <SafeImage
                src={p.src}
                alt={p.label}
                fallbackSeed={p.seed}
                fallbackW={600}
                fallbackH={750}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.72)] via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 left-3 right-3 text-[11px] font-semibold tracking-[0.08em] text-white drop-shadow-md">
                {p.label}
              </figcaption>
              <span className="num absolute right-3 top-3 rounded-md border border-white/30 bg-white/85 px-2 py-1 text-[9px] font-bold tracking-[0.14em] text-[var(--text-primary)] backdrop-blur">
                #{String(i + 1).padStart(2, "0")}
              </span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
