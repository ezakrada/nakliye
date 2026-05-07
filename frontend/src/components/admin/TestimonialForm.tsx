"use client";

import { ReactNode } from "react";
import { Modal, useModal } from "./Modal";
import { saveTestimonial } from "@/app/admin/actions";
import { Save } from "lucide-react";

type T = {
  id?: number;
  name?: string;
  route?: string;
  date?: string;
  rating?: number;
  text?: string;
  approved?: boolean;
};

export function TestimonialForm({
  trigger,
  initial,
  triggerClass,
}: {
  trigger: ReactNode;
  initial?: T;
  triggerClass?: string;
}) {
  const m = useModal();
  return (
    <>
      <button
        type="button"
        onClick={m.show}
        className={
          triggerClass ?? "inline-flex items-center gap-1.5 btn-terra text-sm"
        }
      >
        {trigger}
      </button>
      <Modal
        open={m.open}
        onClose={m.close}
        title={initial?.id ? "Yorumu düzenle" : "Yeni yorum ekle"}
      >
        <form
          action={async (data) => {
            await saveTestimonial(data);
            m.close();
          }}
          className="space-y-3"
        >
          {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Müşteri adı" name="name" defaultValue={initial?.name ?? ""} required />
            <Field label="Güzergah" name="route" defaultValue={initial?.route ?? ""} placeholder="Kadıköy → Çeşme" required />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Tarih (etiket)" name="date" defaultValue={initial?.date ?? ""} placeholder="Mayıs 2026" required />
            <label className="block">
              <span className="h-eyebrow">Puan</span>
              <select
                name="rating"
                defaultValue={initial?.rating ?? 5}
                className="field-base mt-1.5"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {"★".repeat(n)} ({n})
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="h-eyebrow">Yorum metni</span>
            <textarea
              name="text"
              rows={4}
              defaultValue={initial?.text ?? ""}
              required
              className="field-base mt-1.5 resize-none"
            />
          </label>
          <label className="flex items-center gap-2.5 rounded-xl bg-[var(--bg-tinted)] p-3 text-sm">
            <input
              type="checkbox"
              name="approved"
              defaultChecked={initial?.approved ?? false}
              className="h-4 w-4 accent-[var(--accent-cypress)]"
            />
            Yayında
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

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  defaultValue: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="h-eyebrow">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="field-base mt-1.5"
      />
    </label>
  );
}
