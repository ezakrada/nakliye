import { SectionMark } from "@/components/atlas/SectionMark";
import { SafeImage } from "@/components/atlas/SafeImage";

const fleet = [
  {
    name: "MERCEDES SPRINTER 519",
    code: "PV-1.5T",
    cap: "8 m³",
    use: "Bekar / öğrenci / küçük taşıma",
    plates: 6,
    yard: "İSTANBUL-04",
    photo:
      "https://images.pexels.com/photos/4392040/pexels-photo-4392040.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop",
  },
  {
    name: "MERCEDES ATEGO 822",
    code: "TK-10",
    cap: "10–12 m³",
    use: "1+1 / 2+1 ev",
    plates: 12,
    yard: "İSTANBUL-12",
    photo:
      "https://images.pexels.com/photos/7464705/pexels-photo-7464705.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop",
  },
  {
    name: "MERCEDES ATEGO 1224",
    code: "ÇK-22",
    cap: "20–24 m³",
    use: "3+1 ev / küçük ofis",
    plates: 8,
    yard: "İSTANBUL-22",
    photo:
      "https://images.pexels.com/photos/4392027/pexels-photo-4392027.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop",
  },
  {
    name: "ISUZU NPR PRO",
    code: "HE-PRM",
    cap: "16 m³ · iklimli",
    use: "Piyano · antika · sanat",
    plates: 2,
    yard: "İSTANBUL-PRM",
    photo:
      "https://images.pexels.com/photos/4506270/pexels-photo-4506270.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop",
  },
];

function TruckGlyph({ size = "lg" }: { size?: "sm" | "lg" }) {
  return (
    <svg
      viewBox="0 0 200 90"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* cab */}
      <path d="M10 70 L 10 38 L 32 38 L 38 26 L 60 26 L 60 70 Z" />
      <rect x="38" y="32" width="18" height="20" />
      {/* trailer */}
      <rect x="62" y="22" width="118" height="48" />
      {/* details */}
      <line x1="62" y1="35" x2="180" y2="35" />
      <line x1="78" y1="22" x2="78" y2="70" />
      <line x1="100" y1="22" x2="100" y2="70" />
      <line x1="122" y1="22" x2="122" y2="70" />
      <line x1="144" y1="22" x2="144" y2="70" />
      <line x1="166" y1="22" x2="166" y2="70" />
      {/* wheels */}
      <circle cx="28" cy="74" r="7" fill="currentColor" />
      <circle cx="86" cy="74" r="7" fill="currentColor" />
      <circle cx="160" cy="74" r="7" fill="currentColor" />
      <circle cx="28" cy="74" r="3" fill="var(--bg-paper)" />
      <circle cx="86" cy="74" r="3" fill="var(--bg-paper)" />
      <circle cx="160" cy="74" r="3" fill="var(--bg-paper)" />
      {/* baseline */}
      <line x1="0" y1="83" x2="200" y2="83" strokeDasharray="2 3" />
    </svg>
  );
}

export function FleetElevations() {
  return (
    <section id="filo" className="relative py-24 lg:py-32">
      <div className="section-x">
        <SectionMark num="05" coord="28 araç · 4 sınıf" label="Araç Filomuz" />

        <div className="mb-14 flex flex-col items-end justify-between gap-4 lg:flex-row lg:items-end">
          <h2 className="h-display-tight max-w-2xl text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.04]">
            Taşeron yok,
            <br />
            <span className="text-[var(--accent-signal)]">hepsi bizim.</span>
          </h2>
          <p className="max-w-md text-[15px] leading-relaxed text-[var(--text-secondary)] lg:text-right">
            28 araç, 4 sınıf, tek bakım dosyası. Her şasiye düşen aynı kayıt: K1 yetki
            belgesi, periyodik servis, GPS imzası.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fleet.map((v, i) => (
            <article
              key={v.code}
              className="group flex flex-col overflow-hidden rounded-[18px] border border-[var(--hairline-strong)] bg-[var(--bg-paper)] transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              {/* Real photo header (16:9) */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--bg-mist)]">
                <SafeImage
                  src={v.photo}
                  alt={v.name}
                  fallbackSeed={v.code}
                  fallbackW={800}
                  fallbackH={450}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient shade for legibility of overlay text */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.55)] via-transparent to-transparent" />
                {/* Vehicle code chip top-left */}
                <span className="num absolute left-3 top-3 rounded-md border border-white/30 bg-white/85 px-2 py-1 text-[10px] font-bold tracking-[0.14em] text-[var(--text-primary)] backdrop-blur">
                  PL · {String(i + 1).padStart(2, "0")}
                </span>
                {/* Plate count badge top-right */}
                <span className="num absolute right-3 top-3 rounded-md bg-[var(--accent-signal)] px-2 py-1 text-[10px] font-bold tracking-[0.04em] text-white">
                  ×{v.plates}
                </span>
                {/* Code stripe bottom-left */}
                <span className="absolute bottom-3 left-3 text-[10px] font-bold tracking-[0.14em] text-white drop-shadow-md">
                  {v.code}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="num text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
                  {v.name}
                </h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
                  {v.use}
                </p>
                <div className="mt-auto grid grid-cols-3 gap-2 border-t border-[var(--hairline)] pt-4 text-[12px]">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                      Kapasite
                    </p>
                    <p className="num mt-0.5 font-semibold">{v.cap}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                      Şasi
                    </p>
                    <p className="num mt-0.5 font-semibold">×{v.plates}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                      Depo
                    </p>
                    <p className="num mt-0.5 font-semibold">{v.yard}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
