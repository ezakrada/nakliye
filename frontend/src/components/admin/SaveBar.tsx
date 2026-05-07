import { ReactNode } from "react";

export function SaveBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-4 z-20 mt-8">
      <div className="flex items-center justify-end gap-2 rounded-2xl border border-[var(--glass-border-strong)] bg-[var(--glass-panel-strong)] p-3 backdrop-blur-2xl">
        {children}
      </div>
    </div>
  );
}
