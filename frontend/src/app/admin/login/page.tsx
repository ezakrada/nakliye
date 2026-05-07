import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { checkLogin, setSession } from "@/lib/auth";

async function loginAction(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const session = await checkLogin(email, password);
  if (!session) {
    redirect("/admin/login?err=1");
  }
  await setSession(session);
  redirect("/admin");
}

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ err?: string }>;
}) {
  const sp = await searchParams;
  return (
    <main
      className="relative grid min-h-dvh place-items-center px-5 py-10"
      style={{
        background:
          "radial-gradient(1000px 600px at 70% 0%, rgba(201,71,43,0.12), transparent 60%), radial-gradient(800px 600px at 0% 100%, rgba(14,94,78,0.10), transparent 60%), var(--bg-base)",
      }}
    >
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex justify-center">
          <Logo size={26} />
        </Link>
        <div className="overflow-hidden rounded-[32px] border border-[var(--glass-border-strong)] bg-[var(--bg-elevated)] shadow-[var(--shadow-pop)]">
          <div className="border-b border-[var(--glass-border)] p-8 text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-cypress-soft)] text-[var(--accent-cypress)]">
              <ShieldCheck size={20} />
            </span>
            <h1 className="h-display mt-4 text-2xl">Yönetim Paneli</h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Yalnızca yetkili ekip için.
            </p>
          </div>

          <form action={loginAction} className="space-y-4 p-8">
            {sp?.err ? (
              <p className="rounded-2xl border border-[rgba(185,66,53,0.2)] bg-[rgba(185,66,53,0.08)] px-4 py-3 text-sm font-medium text-[var(--danger)]">
                Geçersiz e-posta veya şifre.
              </p>
            ) : null}
            <label className="block">
              <span className="h-eyebrow mb-2 block">E-posta</span>
              <input
                type="email"
                name="email"
                required
                defaultValue="admin@esyam.com.tr"
                className="field-base"
                placeholder="admin@esyam.com.tr"
              />
            </label>
            <label className="block">
              <span className="h-eyebrow mb-2 block">Şifre</span>
              <input
                type="password"
                name="password"
                required
                defaultValue="Esyam2026!"
                className="field-base"
                placeholder="••••••••"
              />
            </label>
            <button type="submit" className="btn-terra w-full justify-center">
              Giriş yap <ArrowRight size={16} />
            </button>
            <div className="rounded-2xl bg-[var(--bg-base)] p-3 text-center text-[11px] leading-relaxed text-[var(--text-tertiary)]">
              <span className="h-eyebrow">Demo bilgileri</span>
              <p className="num mt-1 font-medium text-[var(--text-secondary)]">
                admin@esyam.com.tr · Esyam2026!
              </p>
            </div>
          </form>
        </div>
        <div className="mt-5 text-center text-xs text-[var(--text-tertiary)]">
          <Link href="/" className="hover:text-[var(--text-primary)]">
            ← Anasayfaya dön
          </Link>
        </div>
      </div>
    </main>
  );
}
