"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"lumen" | "dark">("lumen");

  useEffect(() => {
    const t = (document.documentElement.getAttribute("data-theme") as
      | "lumen"
      | "dark"
      | null) ?? "lumen";
    setTheme(t);
  }, []);

  const toggle = () => {
    const next = theme === "lumen" ? "dark" : "lumen";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("esyam-theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "lumen" ? "Koyu temaya geç" : "Açık temaya geç"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--glass-border-strong)] bg-[var(--glass-panel)] text-[var(--text-primary)] backdrop-blur-md transition-colors hover:bg-[var(--glass-panel-strong)] ${className}`}
    >
      {theme === "lumen" ? <Moon size={16} strokeWidth={1.7} /> : <Sun size={16} strokeWidth={1.7} />}
    </button>
  );
}
