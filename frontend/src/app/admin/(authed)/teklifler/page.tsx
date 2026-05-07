import { Plus, Search, Filter, Edit3 } from "lucide-react";
import { readDb } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, StatusPill, type Column } from "@/components/admin/DataTable";
import { StatCard } from "@/components/admin/StatCard";
import { QuoteForm } from "@/components/admin/EntityForms";

const tone = (s: string) =>
  s === "tamamlandı"
    ? "cypress"
    : s === "iptal"
      ? "danger"
      : s === "onaylandı"
        ? "terra"
        : s === "beklemede"
          ? "honey"
          : "neutral";

export default async function TekliflerPage() {
  const db = await readDb();
  const total = db.quotes.length;
  const pending = db.quotes.filter((q) => q.status === "beklemede").length;
  const approved = db.quotes.filter((q) => q.status === "onaylandı").length;
  const totalValue = db.quotes
    .filter((q) => q.status !== "iptal")
    .reduce((a, q) => a + (q.min + q.max) / 2, 0);

  type Q = (typeof db.quotes)[number];
  const cols: Column<Q>[] = [
    {
      key: "code",
      label: "Kod",
      render: (q) => <span className="num font-semibold">{q.code}</span>,
    },
    { key: "customer", label: "Müşteri" },
    {
      key: "route",
      label: "Güzergah",
      render: (q) => (
        <span className="text-[var(--text-secondary)]">
          {q.from} → {q.to}
        </span>
      ),
    },
    {
      key: "homeType",
      label: "Tip",
      render: (q) => <span className="chip">{q.homeType}</span>,
    },
    { key: "date", label: "Tarih", render: (q) => <span className="num">{q.date}</span> },
    {
      key: "value",
      label: "Tutar",
      align: "right",
      render: (q) => (
        <span className="num font-medium">
          {Math.round((q.min + q.max) / 2).toLocaleString("tr-TR")} ₺
        </span>
      ),
    },
    {
      key: "status",
      label: "Durum",
      align: "right",
      render: (q) => <StatusPill status={q.status} tone={tone(q.status)} />,
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (q) => (
        <QuoteForm
          initial={q}
          trigger={<Edit3 size={13} />}
          triggerClass="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-tinted)]"
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Teklifler"
        title="Tüm teklifler"
        desc="Online formdan ve telefondan gelen tüm teklifler tek listede."
        actions={
          <QuoteForm
            trigger={
              <>
                <Plus size={14} /> Yeni teklif
              </>
            }
          />
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Toplam teklif" value={String(total)} tone="neutral" />
        <StatCard label="Onaylanan" value={String(approved)} tone="cypress" />
        <StatCard label="Beklemede" value={String(pending)} tone="honey" />
        <StatCard
          label="Toplam değer"
          value={`${(totalValue / 1000).toFixed(1)}k ₺`}
          tone="terra"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <label className="flex flex-1 items-center gap-2 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] px-3 py-2">
          <Search size={14} className="text-[var(--text-tertiary)]" />
          <input
            placeholder="Kod, müşteri veya il ara..."
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </label>
        <button className="inline-flex items-center gap-1.5 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] px-3 text-sm">
          <Filter size={13} /> Filtrele
        </button>
      </div>

      <DataTable columns={cols} data={db.quotes} empty="Henüz teklif yok." />
    </>
  );
}
