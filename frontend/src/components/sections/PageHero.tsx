import { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  highlight,
  desc,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  desc?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-24 pb-12 lg:pt-36 lg:pb-16">
      <div className="section-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="h-eyebrow inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-terra)]" />
            {eyebrow}
          </span>
          <h1 className="h-display mt-4 text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.04]">
            {title}
            {highlight ? (
              <>
                {" "}
                <span className="italic text-[var(--accent-terra)]">{highlight}</span>
              </>
            ) : null}
          </h1>
          {desc ? (
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[var(--text-secondary)]">
              {desc}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
