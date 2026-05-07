"use client";

import { Edit3, Save } from "lucide-react";
import { Modal, useModal } from "./Modal";
import { updateJob } from "@/app/admin/actions";

export function JobAssignForm({
  jobId,
  status,
  driverId,
  vehicleId,
  drivers,
  vehicles,
}: {
  jobId: number;
  status: string;
  driverId: number;
  vehicleId: number;
  drivers: Array<{ id: number; name: string }>;
  vehicles: Array<{ id: number; plate: string; type: string }>;
}) {
  const m = useModal();
  return (
    <>
      <button
        type="button"
        onClick={m.show}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-tinted)]"
      >
        <Edit3 size={13} />
      </button>
      <Modal open={m.open} onClose={m.close} title="Atamayı düzenle">
        <form
          action={async (data) => {
            await updateJob(data);
            m.close();
          }}
          className="space-y-3"
        >
          <input type="hidden" name="id" value={jobId} />
          <label className="block">
            <span className="h-eyebrow">Durum</span>
            <select name="status" defaultValue={status} className="field-base mt-1.5">
              <option value="atandı">Atandı</option>
              <option value="yükleme">Yükleme</option>
              <option value="yolda">Yolda</option>
              <option value="tamamlandı">Tamamlandı</option>
              <option value="iptal">İptal</option>
            </select>
          </label>
          <label className="block">
            <span className="h-eyebrow">Sürücü</span>
            <select name="driverId" defaultValue={driverId} className="field-base mt-1.5">
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="h-eyebrow">Araç</span>
            <select name="vehicleId" defaultValue={vehicleId} className="field-base mt-1.5">
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.plate} · {v.type}
                </option>
              ))}
            </select>
          </label>
          <div className="modal-actions flex justify-end gap-2">
            <button type="button" onClick={m.close} className="btn-ghost text-sm">
              İptal
            </button>
            <button type="submit" className="btn-terra text-sm">
              <Save size={14} /> Kaydet
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
