import Link from "next/link";
import {
  FileText,
  Truck,
  TrendingUp,
  Users2,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { readDb } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { StatusPill } from "@/components/admin/DataTable";

const statusTone = (s: string) =>
  s === "tamamlandı"
    ? "cypress"
    : s === "yolda" || s === "yükleme"
      ? "terra"
      : s === "iptal"
        ? "danger"
        : s === "atandı"
          ? "honey"
          : "neutral";

export default async function AdminDashboard() {
  const db = await readDb();

  const totalQuotes = db.quotes.length;
  const pendingQuotes = db.quotes.filter((q) => q.status === "beklemede").length;
  const activeJobs = db.jobs.filter(
    (j) => j.status === "yolda" || j.status === "yükleme" || j.status === "atandı",
  ).length;
  const monthValue = db.quotes
    .filter((q) => q.status !== "iptal")
    .reduce((acc, q) => acc + (q.min + q.max) / 2, 0);
  const customers = db.customers.length;
  const unread = db.messages.filter((m) => !m.read).length;
  const avgRating =
    db.testimonials
      .filter((t) => t.approved)
      .reduce((a, t) => a + t.rating, 0) /
      db.testimonials.filter((t) => t.approved).length || 0;

  const upcomingJobs = db.jobs
    .filter((j) => j.status !== "tamamlandı")
    .slice(0, 5);
  const recentQuotes = db.quotes.slice(-5).reverse();

  return (
    <>
      <PageHeader
        eyebrow="Panel"
        title="Bugünün durumu"
        desc={`${new Date().toLocaleDateString("tr-TR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })} · ${activeJobs} aktif taşıma`}
        actions={
          <Link href="/admin/teklifler" className="btn-terra">
            <FileText size={14} /> Yeni teklif
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Aylık değer"
          value={`${(monthValue / 1000).toFixed(1)}k ₺`}
          delta="+%18 → geçen aya göre"
          icon={<TrendingUp size={16} />}
          tone="cypress"
        />
        <StatCard
          label="Aktif taşıma"
          value={String(activeJobs)}
          delta={`${db.vehicles.filter((v) => v.status !== "müsait").length} araç sahada`}
          icon={<Truck size={16} />}
          tone="terra"
        />
        <StatCard
          label="Bekleyen teklif"
          value={`${pendingQuotes} / ${totalQuotes}`}
          delta="2 adet 24 saatten eski"
          icon={<FileText size={16} />}
          tone="honey"
        />
        <StatCard
          label="Müşteri tabanı"
          value={String(customers)}
          delta={`Ort. puan ${avgRating.toFixed(1)} ★`}
          icon={<Users2 size={16} />}
          tone="neutral"
        />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[2fr_1fr]">
        {/* upcoming jobs */}
        <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)]">
          <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-5 py-4">
            <h2 className="h-display text-base">Yaklaşan taşımalar</h2>
            <Link
              href="/admin/tasimalar"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-terra)]"
            >
              Tümü <ArrowRight size={12} />
            </Link>
          </div>
          <ul>
            {upcomingJobs.map((job, idx) => {
              const driver = db.drivers.find((d) => d.id === job.driverId);
              const vehicle = db.vehicles.find((v) => v.id === job.vehicleId);
              return (
                <li
                  key={job.id}
                  className={`flex items-center gap-4 px-5 py-4 ${
                    idx > 0 ? "border-t border-[var(--glass-border)]" : ""
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-tinted)] text-[var(--text-secondary)]">
                    <Calendar size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="num text-sm font-semibold">{job.code}</span>
                      <StatusPill status={job.status} tone={statusTone(job.status)} />
                    </div>
                    <p className="truncate text-xs text-[var(--text-secondary)]">
                      {job.route} · {job.customer}
                    </p>
                  </div>
                  <div className="hidden text-right text-xs text-[var(--text-secondary)] sm:block">
                    <p className="num font-medium">{job.date}</p>
                    <p className="truncate">
                      {driver?.name} · {vehicle?.plate}
                    </p>
                  </div>
                  <p className="num shrink-0 text-sm font-semibold">
                    {job.value.toLocaleString("tr-TR")} ₺
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* messages */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)]">
            <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-5 py-4">
              <h2 className="h-display text-base">Yeni mesajlar</h2>
              {unread > 0 ? (
                <span className="rounded-full bg-[var(--accent-terra)] px-2 py-0.5 text-xs font-semibold text-white">
                  {unread} yeni
                </span>
              ) : null}
            </div>
            <ul className="p-2">
              {db.messages.slice(0, 4).map((m) => (
                <li
                  key={m.id}
                  className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--bg-tinted)]"
                >
                  <div
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      m.read ? "bg-[var(--glass-border-strong)]" : "bg-[var(--accent-terra)]"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{m.name}</p>
                    <p className="truncate text-xs text-[var(--text-secondary)]">
                      {m.subject}
                    </p>
                  </div>
                  <MessageCircle size={14} className="text-[var(--text-tertiary)]" />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-5">
            <h2 className="h-display mb-3 text-base">Hızlı eylemler</h2>
            <div className="space-y-2 text-sm">
              <Link
                href="/admin/teklifler"
                className="flex items-center justify-between rounded-xl bg-[var(--bg-tinted)] px-4 py-2.5 hover:bg-[var(--accent-terra-soft)]"
              >
                <span className="flex items-center gap-2">
                  <FileText size={14} /> Yeni teklif oluştur
                </span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/admin/filo"
                className="flex items-center justify-between rounded-xl bg-[var(--bg-tinted)] px-4 py-2.5 hover:bg-[var(--accent-cypress-soft)]"
              >
                <span className="flex items-center gap-2">
                  <Truck size={14} /> Araç bakım planla
                </span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/admin/yorumlar"
                className="flex items-center justify-between rounded-xl bg-[var(--bg-tinted)] px-4 py-2.5 hover:bg-[var(--bg-tinted)]"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={14} /> Yorum onay kuyruğu (
                  {db.testimonials.filter((t) => !t.approved).length})
                </span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)]">
        <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-5 py-4">
          <h2 className="h-display text-base">Son teklifler</h2>
          <Link
            href="/admin/teklifler"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-terra)]"
          >
            Tümü <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--glass-border)] text-[var(--text-tertiary)]">
              <tr>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider">Kod</th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider">Müşteri</th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider">Güzergah</th>
                <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider">Tarih</th>
                <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider">Tutar</th>
                <th className="px-5 py-3 text-right text-[11px] font-medium uppercase tracking-wider">Durum</th>
              </tr>
            </thead>
            <tbody>
              {recentQuotes.map((q, idx) => (
                <tr
                  key={q.id}
                  className={`${idx > 0 ? "border-t border-[var(--glass-border)]" : ""}`}
                >
                  <td className="num px-5 py-3 font-semibold">{q.code}</td>
                  <td className="px-5 py-3">{q.customer}</td>
                  <td className="px-5 py-3 text-[var(--text-secondary)]">
                    {q.from} → {q.to}
                  </td>
                  <td className="num px-5 py-3 text-[var(--text-secondary)]">{q.date}</td>
                  <td className="num px-5 py-3 text-right font-medium">
                    {Math.round((q.min + q.max) / 2).toLocaleString("tr-TR")} ₺
                  </td>
                  <td className="px-5 py-3 text-right">
                    <StatusPill status={q.status} tone={statusTone(q.status)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
