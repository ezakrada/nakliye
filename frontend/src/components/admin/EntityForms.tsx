"use client";

import { ReactNode } from "react";
import { Modal, useModal } from "./Modal";
import { Save, Trash2 } from "lucide-react";
import {
  saveService,
  deleteService,
  saveFaq,
  deleteFaq,
  saveVehicle,
  deleteVehicle,
  saveDriver,
  deleteDriver,
  saveCustomer,
  deleteCustomer,
  saveQuote,
  deleteQuote,
  saveSlide,
  deleteSlide,
} from "@/app/admin/actions";

function FieldRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  name,
  defaultValue = "",
  placeholder,
  required,
  type = "text",
  step,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  required?: boolean;
  type?: string;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="h-eyebrow">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        type={type}
        step={step}
        className="field-base mt-1.5"
      />
    </label>
  );
}

function Select({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  options: Array<{ v: string | number; t: string }>;
}) {
  return (
    <label className="block">
      <span className="h-eyebrow">{label}</span>
      <select name={name} defaultValue={defaultValue} className="field-base mt-1.5">
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.t}
          </option>
        ))}
      </select>
    </label>
  );
}

function Footer({
  onCancel,
  onDelete,
}: {
  onCancel: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="modal-actions flex items-center justify-between gap-2">
      <div>
        {onDelete ? (
          <form action={onDelete}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--glass-border)] bg-[var(--bg-base)] px-3 py-2 text-xs text-[var(--danger)] hover:bg-[rgba(185,66,53,0.08)]"
            >
              <Trash2 size={12} /> Sil
            </button>
          </form>
        ) : null}
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={onCancel} className="btn-ghost text-sm">
          İptal
        </button>
        <button type="submit" className="btn-terra text-sm">
          <Save size={14} /> Kaydet
        </button>
      </div>
    </div>
  );
}

// ─── Service ──────────────────────────────────────────────────
export function ServiceForm({
  trigger,
  initial,
  triggerClass,
}: {
  trigger: ReactNode;
  initial?: { id: number; title: string; icon: string; desc: string; active: boolean; order: number };
  triggerClass?: string;
}) {
  const m = useModal();
  const onDelete = initial?.id ? deleteService.bind(null, initial.id) : undefined;
  return (
    <>
      <button type="button" onClick={m.show} className={triggerClass ?? "btn-terra text-sm inline-flex items-center gap-1.5"}>
        {trigger}
      </button>
      <Modal open={m.open} onClose={m.close} title={initial ? "Hizmeti düzenle" : "Yeni hizmet"}>
        <form
          action={async (d) => {
            await saveService(d);
            m.close();
          }}
          className="space-y-3"
        >
          {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
          <FieldRow>
            <Field label="Başlık" name="title" defaultValue={initial?.title} required />
            <Select
              label="İkon"
              name="icon"
              defaultValue={initial?.icon ?? "Home"}
              options={[
                { v: "Home", t: "🏠 Home" },
                { v: "MoveVertical", t: "↕ Asansör" },
                { v: "Building2", t: "🏢 Bina" },
                { v: "Truck", t: "🚛 Kamyon" },
                { v: "Music", t: "🎵 Müzik (Hassas)" },
                { v: "PackageOpen", t: "📦 Paket" },
                { v: "Box", t: "📦 Kutu" },
                { v: "ShieldCheck", t: "🛡 Sigorta" },
                { v: "Sparkles", t: "✨ Premium" },
              ]}
            />
          </FieldRow>
          <label className="block">
            <span className="h-eyebrow">Açıklama</span>
            <textarea
              name="desc"
              rows={3}
              defaultValue={initial?.desc ?? ""}
              required
              className="field-base mt-1.5 resize-none"
            />
          </label>
          <FieldRow>
            <Field label="Sıra" name="order" type="number" defaultValue={initial?.order ?? 99} />
            <label className="flex items-center gap-2.5 rounded-xl bg-[var(--bg-tinted)] p-3 text-sm">
              <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} className="h-4 w-4 accent-[var(--accent-cypress)]" />
              Yayında
            </label>
          </FieldRow>
          <Footer onCancel={m.close} onDelete={onDelete} />
        </form>
      </Modal>
    </>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────
export function FaqForm({
  trigger,
  initial,
  triggerClass,
}: {
  trigger: ReactNode;
  initial?: { id: number; q: string; a: string; active: boolean };
  triggerClass?: string;
}) {
  const m = useModal();
  const onDelete = initial?.id ? deleteFaq.bind(null, initial.id) : undefined;
  return (
    <>
      <button type="button" onClick={m.show} className={triggerClass ?? "btn-terra text-sm inline-flex items-center gap-1.5"}>
        {trigger}
      </button>
      <Modal open={m.open} onClose={m.close} title={initial ? "SSS düzenle" : "Yeni SSS"}>
        <form
          action={async (d) => {
            await saveFaq(d);
            m.close();
          }}
          className="space-y-3"
        >
          {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
          <Field label="Soru" name="q" defaultValue={initial?.q} required />
          <label className="block">
            <span className="h-eyebrow">Cevap</span>
            <textarea name="a" rows={5} defaultValue={initial?.a ?? ""} required className="field-base mt-1.5 resize-none" />
          </label>
          <label className="flex items-center gap-2.5 rounded-xl bg-[var(--bg-tinted)] p-3 text-sm">
            <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} className="h-4 w-4 accent-[var(--accent-cypress)]" />
            Yayında
          </label>
          <Footer onCancel={m.close} onDelete={onDelete} />
        </form>
      </Modal>
    </>
  );
}

// ─── Slide ────────────────────────────────────────────────────
export function SlideForm({
  trigger,
  initial,
  triggerClass,
}: {
  trigger: ReactNode;
  initial?: {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    order: number;
    active: boolean;
  };
  triggerClass?: string;
}) {
  const m = useModal();
  const onDelete = initial?.id ? deleteSlide.bind(null, initial.id) : undefined;
  return (
    <>
      <button
        type="button"
        onClick={m.show}
        className={triggerClass ?? "btn-terra text-sm inline-flex items-center gap-1.5"}
      >
        {trigger}
      </button>
      <Modal open={m.open} onClose={m.close} title={initial ? "Slayt düzenle" : "Yeni slayt"}>
        <form
          action={async (d) => {
            await saveSlide(d);
            m.close();
          }}
          className="space-y-3"
        >
          {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
          <Field
            label="Görsel URL"
            name="image"
            defaultValue={initial?.image}
            required
            placeholder="https://images.pexels.com/..."
          />
          {initial?.image ? (
            <div className="overflow-hidden rounded-xl border border-[var(--glass-border)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={initial.image}
                alt="önizleme"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          ) : null}
          <Field label="Başlık" name="title" defaultValue={initial?.title} required />
          <Field label="Alt başlık" name="subtitle" defaultValue={initial?.subtitle} />
          <FieldRow>
            <Field
              label="Buton yazısı"
              name="ctaText"
              defaultValue={initial?.ctaText ?? "Detaylar"}
              placeholder="Hemen teklif al"
            />
            <Field
              label="Buton linki"
              name="ctaLink"
              defaultValue={initial?.ctaLink ?? "/teklif-al"}
              placeholder="/teklif-al veya https://..."
            />
          </FieldRow>
          <FieldRow>
            <Field
              label="Sıra"
              name="order"
              type="number"
              defaultValue={initial?.order ?? 99}
            />
            <label className="flex items-center gap-2.5 rounded-xl bg-[var(--bg-tinted)] p-3 text-sm">
              <input
                type="checkbox"
                name="active"
                defaultChecked={initial?.active ?? true}
                className="h-4 w-4 accent-[var(--accent-cypress)]"
              />
              Yayında
            </label>
          </FieldRow>
          <Footer onCancel={m.close} onDelete={onDelete} />
        </form>
      </Modal>
    </>
  );
}

// ─── Vehicle ──────────────────────────────────────────────────
export function VehicleForm({
  trigger,
  initial,
  triggerClass,
}: {
  trigger: ReactNode;
  initial?: { id: number; plate: string; type: string; code: string; capacity: string; year: number; lastService: string; status: string };
  triggerClass?: string;
}) {
  const m = useModal();
  const onDelete = initial?.id ? deleteVehicle.bind(null, initial.id) : undefined;
  return (
    <>
      <button type="button" onClick={m.show} className={triggerClass ?? "btn-terra text-sm inline-flex items-center gap-1.5"}>
        {trigger}
      </button>
      <Modal open={m.open} onClose={m.close} title={initial ? "Aracı düzenle" : "Yeni araç"}>
        <form
          action={async (d) => {
            await saveVehicle(d);
            m.close();
          }}
          className="space-y-3"
        >
          {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
          <FieldRow>
            <Field label="Plaka" name="plate" defaultValue={initial?.plate} required placeholder="34 ABC 1234" />
            <Field label="Tip" name="type" defaultValue={initial?.type} required placeholder="Çift Kabin" />
          </FieldRow>
          <FieldRow>
            <Field label="Kod" name="code" defaultValue={initial?.code} placeholder="22m³" />
            <Field label="Kapasite" name="capacity" defaultValue={initial?.capacity} placeholder="20–24 m³" />
          </FieldRow>
          <FieldRow>
            <Field label="Model yılı" name="year" type="number" defaultValue={initial?.year ?? new Date().getFullYear()} />
            <Field label="Son bakım" name="lastService" type="date" defaultValue={initial?.lastService} />
          </FieldRow>
          <Select
            label="Durum"
            name="status"
            defaultValue={initial?.status ?? "müsait"}
            options={[
              { v: "müsait", t: "Müsait" },
              { v: "atandı", t: "Atandı" },
              { v: "yükleme", t: "Yükleme" },
              { v: "yolda", t: "Yolda" },
              { v: "bakımda", t: "Bakımda" },
            ]}
          />
          <Footer onCancel={m.close} onDelete={onDelete} />
        </form>
      </Modal>
    </>
  );
}

// ─── Driver ───────────────────────────────────────────────────
export function DriverForm({
  trigger,
  initial,
  triggerClass,
}: {
  trigger: ReactNode;
  initial?: { id: number; name: string; phone: string; license: string; yearsExp: number; rating: number };
  triggerClass?: string;
}) {
  const m = useModal();
  const onDelete = initial?.id ? deleteDriver.bind(null, initial.id) : undefined;
  return (
    <>
      <button type="button" onClick={m.show} className={triggerClass ?? "btn-terra text-sm inline-flex items-center gap-1.5"}>
        {trigger}
      </button>
      <Modal open={m.open} onClose={m.close} title={initial ? "Sürücüyü düzenle" : "Yeni sürücü"}>
        <form
          action={async (d) => {
            await saveDriver(d);
            m.close();
          }}
          className="space-y-3"
        >
          {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
          <FieldRow>
            <Field label="Ad Soyad" name="name" defaultValue={initial?.name} required />
            <Field label="Telefon" name="phone" defaultValue={initial?.phone} required placeholder="+9055..." />
          </FieldRow>
          <FieldRow>
            <Field label="Ehliyet" name="license" defaultValue={initial?.license ?? "B"} placeholder="B-E + ADR" />
            <Field label="Tecrübe (yıl)" name="yearsExp" type="number" defaultValue={initial?.yearsExp ?? 0} />
          </FieldRow>
          <Field label="Puan" name="rating" type="number" step="0.1" defaultValue={initial?.rating ?? 5.0} />
          <Footer onCancel={m.close} onDelete={onDelete} />
        </form>
      </Modal>
    </>
  );
}

// ─── Customer ─────────────────────────────────────────────────
export function CustomerForm({
  trigger,
  initial,
  triggerClass,
}: {
  trigger: ReactNode;
  initial?: { id: number; name: string; phone: string; email: string; moves: number; totalValue: number; lastMove: string | null; tags: string[] };
  triggerClass?: string;
}) {
  const m = useModal();
  const onDelete = initial?.id ? deleteCustomer.bind(null, initial.id) : undefined;
  return (
    <>
      <button type="button" onClick={m.show} className={triggerClass ?? "btn-terra text-sm inline-flex items-center gap-1.5"}>
        {trigger}
      </button>
      <Modal open={m.open} onClose={m.close} title={initial ? "Müşteriyi düzenle" : "Yeni müşteri"}>
        <form
          action={async (d) => {
            await saveCustomer(d);
            m.close();
          }}
          className="space-y-3"
        >
          {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
          <FieldRow>
            <Field label="Ad Soyad" name="name" defaultValue={initial?.name} required />
            <Field label="Telefon" name="phone" defaultValue={initial?.phone} required />
          </FieldRow>
          <Field label="E-posta" name="email" type="email" defaultValue={initial?.email} />
          <FieldRow>
            <Field label="Taşıma sayısı" name="moves" type="number" defaultValue={initial?.moves ?? 0} />
            <Field label="Toplam değer (₺)" name="totalValue" type="number" defaultValue={initial?.totalValue ?? 0} />
          </FieldRow>
          <FieldRow>
            <Field label="Son taşıma tarihi" name="lastMove" type="date" defaultValue={initial?.lastMove ?? ""} />
            <Field label="Etiketler (virgülle)" name="tags" defaultValue={initial?.tags?.join(", ") ?? ""} placeholder="VIP, Sadık, Kurumsal" />
          </FieldRow>
          <Footer onCancel={m.close} onDelete={onDelete} />
        </form>
      </Modal>
    </>
  );
}

// ─── Quote ────────────────────────────────────────────────────
export function QuoteForm({
  trigger,
  initial,
  triggerClass,
}: {
  trigger: ReactNode;
  initial?: { id: number; customer: string; phone: string; from: string; to: string; homeType: string; date: string; min: number; max: number; status: string };
  triggerClass?: string;
}) {
  const m = useModal();
  const onDelete = initial?.id ? deleteQuote.bind(null, initial.id) : undefined;
  return (
    <>
      <button type="button" onClick={m.show} className={triggerClass ?? "btn-terra text-sm inline-flex items-center gap-1.5"}>
        {trigger}
      </button>
      <Modal
        open={m.open}
        onClose={m.close}
        title={initial ? `Teklifi düzenle` : "Yeni teklif"}
        width="max-w-xl"
      >
        <form
          action={async (d) => {
            await saveQuote(d);
            m.close();
          }}
          className="space-y-3"
        >
          {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
          <FieldRow>
            <Field label="Müşteri" name="customer" defaultValue={initial?.customer} required />
            <Field label="Telefon" name="phone" defaultValue={initial?.phone} required />
          </FieldRow>
          <FieldRow>
            <Field label="Çıkış" name="from" defaultValue={initial?.from} required placeholder="Kadıköy, İstanbul" />
            <Field label="Varış" name="to" defaultValue={initial?.to} required placeholder="Çeşme, İzmir" />
          </FieldRow>
          <FieldRow>
            <Select
              label="Ev tipi"
              name="homeType"
              defaultValue={initial?.homeType ?? "2+1"}
              options={[
                { v: "1+1", t: "1+1" },
                { v: "2+1", t: "2+1" },
                { v: "3+1", t: "3+1" },
                { v: "4+1", t: "4+1" },
                { v: "Villa", t: "Villa" },
                { v: "Ofis", t: "Ofis" },
              ]}
            />
            <Field label="Tarih" name="date" type="date" defaultValue={initial?.date} required />
          </FieldRow>
          <FieldRow>
            <Field label="Min tutar" name="min" type="number" defaultValue={initial?.min ?? 0} />
            <Field label="Max tutar" name="max" type="number" defaultValue={initial?.max ?? 0} />
          </FieldRow>
          <Select
            label="Durum"
            name="status"
            defaultValue={initial?.status ?? "beklemede"}
            options={[
              { v: "beklemede", t: "Beklemede" },
              { v: "onaylandı", t: "Onaylandı" },
              { v: "tamamlandı", t: "Tamamlandı" },
              { v: "iptal", t: "İptal" },
            ]}
          />
          <Footer onCancel={m.close} onDelete={onDelete} />
        </form>
      </Modal>
    </>
  );
}
