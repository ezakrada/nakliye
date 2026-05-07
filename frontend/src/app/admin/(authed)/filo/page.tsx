import { readDb } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, StatusPill, type Column } from "@/components/admin/DataTable";
import { StatCard } from "@/components/admin/StatCard";
import { Truck, Wrench, Star, Plus, Edit3 } from "lucide-react";
import { VehicleForm, DriverForm } from "@/components/admin/EntityForms";

const vehicleTone = (s: string) =>
  s === "müsait"
    ? "cypress"
    : s === "bakımda"
      ? "danger"
      : s === "yolda"
        ? "terra"
        : "honey";

export default async function FiloPage() {
  const db = await readDb();
  const inService = db.vehicles.filter((v) => v.status !== "bakımda").length;
  const onRoad = db.vehicles.filter((v) => v.status === "yolda").length;
  const avgRating = db.drivers.reduce((a, d) => a + d.rating, 0) / db.drivers.length;
  const inMaintenance = db.vehicles.filter((v) => v.status === "bakımda").length;

  type V = (typeof db.vehicles)[number];
  const vCols: Column<V>[] = [
    { key: "plate", label: "Plaka", render: (v) => <span className="num font-semibold">{v.plate}</span> },
    { key: "type", label: "Tip" },
    { key: "code", label: "Kod" },
    { key: "capacity", label: "Kapasite", render: (v) => <span className="num">{v.capacity}</span> },
    { key: "year", label: "Model", render: (v) => <span className="num">{v.year}</span> },
    {
      key: "lastService",
      label: "Son bakım",
      render: (v) => <span className="num text-[var(--text-secondary)]">{v.lastService}</span>,
    },
    {
      key: "status",
      label: "Durum",
      render: (v) => <StatusPill status={v.status} tone={vehicleTone(v.status)} />,
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (v) => (
        <VehicleForm
          initial={v}
          trigger={<Edit3 size={13} />}
          triggerClass="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-tinted)]"
        />
      ),
    },
  ];

  type D = (typeof db.drivers)[number];
  const dCols: Column<D>[] = [
    {
      key: "name",
      label: "Sürücü",
      render: (d) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-tinted)]">
            <span className="h-display text-xs italic" style={{ fontWeight: 600 }}>
              {d.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="font-medium">{d.name}</p>
            <p className="num text-[11px] text-[var(--text-tertiary)]">{d.phone}</p>
          </div>
        </div>
      ),
    },
    { key: "license", label: "Ehliyet" },
    { key: "yearsExp", label: "Tecrübe", render: (d) => <span className="num">{d.yearsExp} yıl</span> },
    {
      key: "rating",
      label: "Puan",
      render: (d) => (
        <span className="num inline-flex items-center gap-1 font-semibold">
          <Star size={11} className="fill-[var(--accent-honey)] text-[var(--accent-honey)]" />
          {d.rating.toFixed(1)}
        </span>
      ),
    },
    {
      key: "currentJobId",
      label: "Aktif iş",
      render: (d) =>
        d.currentJobId ? (
          <span className="num text-xs font-medium text-[var(--accent-terra)]">#{d.currentJobId}</span>
        ) : (
          <span className="text-xs text-[var(--text-tertiary)]">Müsait</span>
        ),
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (d) => (
        <DriverForm
          initial={d}
          trigger={<Edit3 size={13} />}
          triggerClass="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-tinted)]"
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Filo"
        title="Araçlar ve sürücüler"
        actions={
          <>
            <DriverForm
              trigger={
                <>
                  <Plus size={14} /> Sürücü
                </>
              }
              triggerClass="btn-ghost text-sm"
            />
            <VehicleForm
              trigger={
                <>
                  <Plus size={14} /> Araç
                </>
              }
            />
          </>
        }
      />
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          label="Aktif araç"
          value={`${inService} / ${db.vehicles.length}`}
          tone="terra"
          icon={<Truck size={14} />}
        />
        <StatCard label="Yolda" value={String(onRoad)} tone="cypress" />
        <StatCard
          label="Bakımda"
          value={String(inMaintenance)}
          tone="honey"
          icon={<Wrench size={14} />}
        />
        <StatCard
          label="Sürücü ort. puan"
          value={avgRating.toFixed(2)}
          tone="neutral"
          icon={<Star size={14} />}
        />
      </div>

      <h2 className="h-display mb-3 text-lg">Filo</h2>
      <DataTable columns={vCols} data={db.vehicles} />

      <h2 className="h-display mb-3 mt-8 text-lg">Sürücüler</h2>
      <DataTable columns={dCols} data={db.drivers} />
    </>
  );
}
