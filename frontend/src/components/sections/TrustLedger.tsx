import { SectionMark } from "@/components/atlas/SectionMark";

const ledger = [
  { initials: "S.A.", route: "Kadıköy → Çeşme", year: "2025" },
  { initials: "M.D.", route: "Beşiktaş → Bodrum", year: "2025" },
  { initials: "A.B.", route: "Maslak → Bursa", year: "2025" },
  { initials: "F.K.", route: "Ataşehir → Ankara", year: "2024" },
  { initials: "O.T.", route: "Levent → Kalamış", year: "2024" },
  { initials: "D.A.", route: "Üsküdar → Sapanca", year: "2024" },
  { initials: "E.K.", route: "Bebek → Bodrum", year: "2024" },
  { initials: "M.A.", route: "Şişli → Çankaya", year: "2024" },
];

export function TrustLedger() {
  return (
    <section id="guvence" className="relative py-24 lg:py-32">
      <div className="section-x">
        <SectionMark num="04" coord="14.000+ taşıma · 0 kayıp" label="Güvenceniz" />

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <ul className="space-y-0">
              {ledger.map((row, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[auto_1fr_auto] items-baseline gap-3 border-b border-[var(--hairline)] py-3 last:border-b-0"
                >
                  <span className="num text-sm font-semibold text-[var(--text-primary)]">
                    {row.initials}
                  </span>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {row.route}
                  </span>
                  <span className="num text-xs text-[var(--text-tertiary)]">
                    {row.year}
                  </span>
                </li>
              ))}
            </ul>
            <p className="coord mt-6">
              + 13.992 KAYIT DAHA / 12 YIL
            </p>
          </div>

          <div className="relative">
            {/* contour lines bg */}
            <svg
              viewBox="0 0 600 320"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
              fill="none"
              aria-hidden
            >
              {Array.from({ length: 14 }).map((_, i) => (
                <path
                  key={i}
                  d={`M 0 ${30 + i * 20} Q 150 ${10 + i * 20}, 300 ${30 + i * 20} T 600 ${30 + i * 20}`}
                  stroke="var(--text-primary)"
                  strokeWidth="0.6"
                />
              ))}
            </svg>
            <div className="relative pl-2">
              <p className="h-display-tight text-[clamp(1.6rem,3.2vw,2.4rem)] leading-[1.15] text-[var(--text-primary)]">
                "Bu işin sırrı kamyon değil — kamyona kimin baktığıdır.
                <br />
                <span className="text-[var(--accent-signal)]">
                  On iki yıldır aynı 64 isim.
                </span>
                "
              </p>
              <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[var(--hairline-strong)] pt-6 sm:grid-cols-4">
                {[
                  { k: "%98", v: "ZAMANINDA TESLİM" },
                  { k: "0", v: "KAYIP / 4 YIL" },
                  { k: "250.000 ₺", v: "POLİÇE STANDARDI" },
                  { k: "K1", v: "YETKİ BELGESİ" },
                ].map((m) => (
                  <div key={m.v}>
                    <p className="num text-lg font-semibold text-[var(--text-primary)]">
                      {m.k}
                    </p>
                    <p className="coord mt-1">{m.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
