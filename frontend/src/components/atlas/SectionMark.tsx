export function SectionMark({
  num,
  coord,
  label,
}: {
  num: string;
  coord: string;
  label: string;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="num text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-signal)]">
        {num}
      </span>
      <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--text-primary)]">
        {label}
      </span>
      <span className="text-[11px] text-[var(--text-tertiary)]">— {coord}</span>
    </div>
  );
}
