import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Truck,
  Users2,
  Tags,
  Type,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { getSession, clearSession } from "@/lib/auth";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { AdminNavLinks } from "@/components/admin/AdminNavLinks";
import { readDb } from "@/lib/db";

const nav = [
  { href: "/admin", label: "Panel", icon: "LayoutDashboard" },
  { href: "/admin/teklifler", label: "Teklifler", icon: "FileText" },
  { href: "/admin/tasimalar", label: "Taşımalar", icon: "Truck" },
  { href: "/admin/filo", label: "Filo & Sürücü", icon: "Sparkles" },
  { href: "/admin/musteriler", label: "Müşteriler", icon: "Users2" },
  { href: "/admin/fiyatlandirma", label: "Fiyatlandırma", icon: "Tags" },
  { href: "/admin/slider", label: "Slider", icon: "ImageIcon" },
  { href: "/admin/icerik", label: "İçerik", icon: "Type" },
  { href: "/admin/yorumlar", label: "Yorumlar", icon: "MessageSquare" },
  { href: "/admin/ayarlar", label: "Ayarlar", icon: "Settings" },
] as const;

async function logoutAction() {
  "use server";
  await clearSession();
  redirect("/admin/login");
}

export default async function AuthedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const db = await readDb();
  const currentTheme = db.settings?.theme ?? "lumen";
  const themeLabel: Record<string, string> = {
    lumen: "Lumen",
    forest: "Forest",
    coral: "Coral",
    navy: "Navy",
    dark: "Graphite",
  };

  return (
    <div className="min-h-dvh bg-[var(--bg-base)]">
      {/* desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-[var(--glass-border)] bg-[var(--bg-elevated)] lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-[var(--glass-border)] px-5">
          <Logo size={20} />
          <span className="rounded-full bg-[var(--accent-terra-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-terra-deep)]">
            Yönetim
          </span>
        </div>
        <AdminNavLinks items={[...nav]} />
        <form action={logoutAction} className="border-t border-[var(--glass-border)] p-3">
          <div className="mb-2 rounded-xl bg-[var(--bg-base)] p-3">
            <p className="h-eyebrow truncate">Giriş yapan</p>
            <p className="truncate text-sm font-semibold">{session.name}</p>
            <Link
              href="/admin/ayarlar"
              className="mt-2 flex items-center justify-between rounded-lg border border-[var(--glass-border)] bg-[var(--bg-elevated)] px-2.5 py-1.5 text-[11px] transition-colors hover:border-[var(--accent-terra)]"
            >
              <span className="h-eyebrow">TEMA</span>
              <span className="num font-semibold text-[var(--accent-terra)]">
                {themeLabel[currentTheme]}
              </span>
            </Link>
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--bg-tinted)] py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--danger)]"
          >
            <LogOut size={14} /> Çıkış yap
          </button>
        </form>
      </aside>

      <AdminMobileNav
        navItems={[...nav]}
        userName={session.name}
        logoutAction={logoutAction}
      />

      <div className="lg:pl-64">
        <main className="min-h-dvh px-4 py-6 pt-20 sm:px-6 lg:px-10 lg:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}
