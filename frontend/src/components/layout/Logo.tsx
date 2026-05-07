import { cn } from "@/lib/cn";

/**
 * Atlas-style mark: lowercase "eşyam" + tiny coordinate dot.
 * Uses Geist (sans) — no italic, just a precise grotesk.
 */
export function Logo({
  className,
  showDot = true,
  size = 18,
}: {
  className?: string;
  showDot?: boolean;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-0 leading-none tracking-[-0.04em] text-[var(--text-primary)]",
        className,
      )}
      style={{
        fontSize: size,
        fontFamily: "var(--font-display)",
        fontWeight: 600,
      }}
      aria-label="Eşyam"
    >
      e
      <span className="relative inline-block">
        ş
        {showDot ? (
          <span
            aria-hidden
            className="absolute -top-[0.42em] left-1/2 block h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[var(--accent-signal)] shadow-[0_0_0_2px_var(--bg-base)]"
          />
        ) : null}
      </span>
      yam
    </span>
  );
}
