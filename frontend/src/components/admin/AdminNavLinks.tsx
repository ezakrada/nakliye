"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Truck,
  Users2,
  Tags,
  Type,
  MessageSquare,
  Settings,
  ChevronRight,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";

const ICON_MAP: Record<string, typeof LayoutDashboard> = {
  LayoutDashboard,
  FileText,
  Truck,
  Users2,
  Tags,
  Type,
  MessageSquare,
  Settings,
  Sparkles,
  ImageIcon,
};

export function AdminNavLinks({
  items,
}: {
  items: Array<{ href: string; label: string; icon: string }>;
}) {
  const pathname = usePathname();
  return (
    <nav className="flex-1 overflow-y-auto p-3">
      {items.map((item) => {
        const Icon = ICON_MAP[item.icon] ?? LayoutDashboard;
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
              active
                ? "bg-[var(--accent-terra-soft)] text-[var(--accent-terra-deep)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-tinted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Icon size={16} strokeWidth={1.7} />
            <span className="flex-1">{item.label}</span>
            {active ? (
              <ChevronRight size={13} className="opacity-60" />
            ) : (
              <ChevronRight
                size={13}
                className="opacity-0 transition-opacity group-hover:opacity-60"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
