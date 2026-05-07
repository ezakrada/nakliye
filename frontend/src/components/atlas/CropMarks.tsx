export function CropMarks({ className = "" }: { className?: string }) {
  return (
    <span className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-[var(--hairline-emphasis)]" />
      <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-[var(--hairline-emphasis)]" />
      <span className="absolute left-3 bottom-3 h-3 w-3 border-l border-b border-[var(--hairline-emphasis)]" />
      <span className="absolute right-3 bottom-3 h-3 w-3 border-r border-b border-[var(--hairline-emphasis)]" />
    </span>
  );
}
