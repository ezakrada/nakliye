import { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  desc,
  actions,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <span className="h-eyebrow">{eyebrow}</span> : null}
        <h1 className="h-display mt-1 text-[clamp(1.6rem,3vw,2.2rem)]">{title}</h1>
        {desc ? (
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{desc}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 gap-2">{actions}</div> : null}
    </div>
  );
}
