import { readDb } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { StatCard } from "@/components/admin/StatCard";
import { Users2, Search, Plus, Star, Edit3 } from "lucide-react";
import { CustomerForm } from "@/components/admin/EntityForms";

export default async function MusterilerPage() {
  const db = await readDb();

  type C = (typeof db.customers)[number];
  const cols: Column<C>[] = [
    {
      key: "name",
      label: "Müşteri",
      render: (c) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-tinted)]">
            <span className="h-display text-xs italic" style={{ fontWeight: 600 }}>
              {c.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="font-semibold">{c.name}</p>
            <p className="text-xs text-[var(--text-tertiary)]">{c.email}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", label: "Telefon", render: (c) => <span className="num text-sm">{c.phone}</span> },
    {
      key: "moves",
      label: "Taşıma",
      align: "center",
      render: (c) => <span className="num font-semibold">{c.moves}</span>,
    },
    {
      key: "totalValue",
      label: "Toplam değer",
      align: "right",
      render: (c) => (
        <span className="num font-medium">{c.totalValue.toLocaleString("tr-TR")} ₺</span>
      ),
    },
    {
      key: "lastMove",
      label: "Son taşıma",
      align: "right",
      render: (c) => (
        <span className="num text-sm text-[var(--text-secondary)]">{c.lastMove ?? "—"}</span>
      ),
    },
    {
      key: "tags",
      label: "Etiket",
      align: "right",
      render: (c) => (
        <span className="flex flex-wrap justify-end gap-1">
          {c.tags.map((t) => (
            <span
              key={t}
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                t === "VIP"
                  ? "bg-[var(--accent-terra-soft)] text-[var(--accent-terra-deep)]"
                  : t === "Sadık"
                    ? "bg-[var(--accent-cypress-soft)] text-[var(--accent-cypress)]"
                    : "bg-[rgba(198,139,46,0.16)] text-[var(--accent-honey)]"
              }`}
            >
              {t}
            </span>
          ))}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (c) => (
        <CustomerForm
          initial={c}
          trigger={<Edit3 size={13} />}
          triggerClass="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-tinted)]"
        />
      ),
    },
  ];

  const totalValue = db.customers.reduce((a, c) => a + c.totalValue, 0);
  const vipCount = db.customers.filter((c) => c.tags.includes("VIP")).length;

  return (
    <>
      <PageHeader
        eyebrow="CRM"
        title="Müşteriler"
        actions={
          <CustomerForm
            trigger={
              <>
                <Plus size={14} /> Müşteri ekle
              </>
            }
          />
        }
      />
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          label="Toplam müşteri"
          value={String(db.customers.length)}
          tone="neutral"
          icon={<Users2 size={14} />}
        />
        <StatCard label="VIP" value={String(vipCount)} tone="terra" icon={<Star size={14} />} />
        <StatCard
          label="Sadık (2+ taşıma)"
          value={String(db.customers.filter((c) => c.moves >= 2).length)}
          tone="cypress"
        />
        <StatCard
          label="Hayat boyu değer"
          value={`${(totalValue / 1000).toFixed(0)}k ₺`}
          tone="honey"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <label className="flex flex-1 items-center gap-2 rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] px-3 py-2">
          <Search size={14} className="text-[var(--text-tertiary)]" />
          <input
            placeholder="İsim, telefon veya e-posta ara..."
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </label>
      </div>

      <DataTable columns={cols} data={db.customers} />
    </>
  );
}
