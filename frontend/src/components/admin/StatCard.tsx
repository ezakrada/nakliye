import { ReactNode } from "react";

export function StatCard({
  label,
  value,
  delta,
  icon,
  tone = "neutral",
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: ReactNode;
  tone?: "neutral" | "terra" | "cypress" | "honey";
}) {
  const toneClass = {
    neutral: "bg-[var(--bg-tinted)] text-[var(--text-secondary)]",
    terra: "bg-[var(--accent-terra-soft)] text-[var(--accent-terra-deep)]",
    cypress: "bg-[var(--accent-cypress-soft)] text-[var(--accent-cypress)]",
    honey: "bg-[rgba(198,139,46,0.14)] text-[var(--accent-honey)]",
  }[tone];

  return (
    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="h-eyebrow">{label}</p>
          <p
            className="num mt-2 text-[clamp(1.4rem,2.6vw,1.8rem)] font-semibold tracking-tight"
            style={{ fontWeight: 600 }}
          >
            {value}
          </p>
          {delta ? (
            <p className="mt-1 text-xs font-medium text-[var(--text-secondary)]">
              {delta}
            </p>
          ) : null}
        </div>
        {icon ? (
          <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${toneClass}`}>
            {icon}
          </span>
        ) : null}
      </div>
    </div>
  );
}
