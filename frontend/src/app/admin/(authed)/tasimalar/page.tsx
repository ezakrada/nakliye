import { readDb } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, StatusPill, type Column } from "@/components/admin/DataTable";
import { StatCard } from "@/components/admin/StatCard";
import { Truck, MapPin, Plus } from "lucide-react";
import { JobAssignForm } from "@/components/admin/JobAssignForm";

const tone = (s: string) =>
  s === "tamamlandı"
    ? "cypress"
    : s === "yolda" || s === "yükleme"
      ? "terra"
      : s === "atandı"
        ? "honey"
        : "neutral";

export default async function TasimalarPage() {
  const db = await readDb();

  type Job = (typeof db.jobs)[number] & {
    driverName?: string;
    plate?: string;
    vehicleType?: string;
  };

  const enriched: Job[] = db.jobs.map((j) => {
    const driver = db.drivers.find((d) => d.id === j.driverId);
    const vehicle = db.vehicles.find((v) => v.id === j.vehicleId);
    return {
      ...j,
      driverName: driver?.name,
      plate: vehicle?.plate,
      vehicleType: vehicle?.type,
    };
  });

  const active = enriched.filter(
    (j) => j.status !== "tamamlandı" && j.status !== "iptal",
  );

  const cols: Column<Job>[] = [
    {
      key: "code",
      label: "Kod",
      render: (j) => <span className="num font-semibold">{j.code}</span>,
    },
    { key: "customer", label: "Müşteri" },
    {
      key: "route",
      label: "Güzergah",
      render: (j) => (
        <span className="inline-flex items-center gap-1.5 text-[var(--text-secondary)]">
          <MapPin size={12} className="text-[var(--accent-cypress)]" /> {j.route}
        </span>
      ),
    },
    { key: "date", label: "Tarih", render: (j) => <span className="num">{j.date}</span> },
    {
      key: "vehicle",
      label: "Araç / sürücü",
      render: (j) => (
        <span className="text-xs text-[var(--text-secondary)]">
          {j.driverName} · <span className="num">{j.plate}</span>
        </span>
      ),
    },
    {
      key: "value",
      label: "Tutar",
      align: "right",
      render: (j) => (
        <span className="num font-medium">{j.value.toLocaleString("tr-TR")} ₺</span>
      ),
    },
    {
      key: "status",
      label: "Durum",
      render: (j) => <StatusPill status={j.status} tone={tone(j.status)} />,
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (j) => (
        <JobAssignForm
          jobId={j.id}
          status={j.status}
          driverId={j.driverId}
          vehicleId={j.vehicleId}
          drivers={db.drivers.map((d) => ({ id: d.id, name: d.name }))}
          vehicles={db.vehicles.map((v) => ({ id: v.id, plate: v.plate, type: v.type }))}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Operasyon"
        title="Aktif ve yaklaşan taşımalar"
        desc="Tüm sahadaki işlerin canlı durumu."
        actions={
          <button className="btn-terra text-sm">
            <Plus size={14} /> İş ekle
          </button>
        }
      />
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Aktif iş" value={String(active.length)} tone="terra" icon={<Truck size={14} />} />
        <StatCard
          label="Yolda"
          value={String(enriched.filter((j) => j.status === "yolda").length)}
          tone="cypress"
        />
        <StatCard
          label="Atandı"
          value={String(enriched.filter((j) => j.status === "atandı").length)}
          tone="honey"
        />
        <StatCard
          label="Tamamlandı"
          value={String(enriched.filter((j) => j.status === "tamamlandı").length)}
          tone="neutral"
        />
      </div>
      <DataTable columns={cols} data={enriched} />
    </>
  );
}
