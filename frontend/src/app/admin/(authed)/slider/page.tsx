import { readDb } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { Plus, Edit3, Eye, EyeOff, ImageIcon, ExternalLink } from "lucide-react";
import { SlideForm } from "@/components/admin/EntityForms";

export default async function SliderPage() {
  const db = await readDb();
  const slides = (db.slides ?? []).sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeader
        eyebrow="Galeri"
        title="Anasayfa slider"
        desc="Anasayfada üst kısımda görünen slayt'ları yönetin. Görsel URL, başlık, buton ve link her slayta özel."
        actions={
          <SlideForm
            trigger={
              <>
                <Plus size={14} /> Yeni slayt
              </>
            }
            triggerClass="btn-terra inline-flex items-center gap-1.5 text-sm"
          />
        }
      />

      {slides.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--glass-border-strong)] bg-[var(--bg-elevated)] p-10 text-center">
          <ImageIcon
            size={28}
            className="mx-auto mb-3 text-[var(--text-tertiary)]"
            strokeWidth={1.5}
          />
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Henüz slayt eklenmemiş
          </p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            "Yeni slayt" butonuyla anasayfaya görsel ekleyin.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slides.map((s) => (
            <article
              key={s.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-tinted)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.45)] to-transparent" />
                <span className="num absolute left-2 top-2 rounded-md border border-white/30 bg-white/85 px-2 py-1 text-[10px] font-bold tracking-[0.14em] text-[var(--text-primary)] backdrop-blur">
                  #{s.order}
                </span>
                <span
                  className={`absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full ${
                    s.active
                      ? "bg-[var(--accent-mint)] text-white"
                      : "bg-white/85 text-[var(--text-tertiary)]"
                  }`}
                  title={s.active ? "Yayında" : "Gizli"}
                >
                  {s.active ? <Eye size={13} /> : <EyeOff size={13} />}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="truncate text-sm font-semibold text-[var(--text-primary)]">
                  {s.title}
                </h3>
                <p className="line-clamp-2 text-xs text-[var(--text-secondary)]">
                  {s.subtitle}
                </p>
                <div className="mt-auto flex items-center justify-between gap-2 border-t border-[var(--glass-border)] pt-3">
                  <a
                    href={s.ctaLink}
                    className="inline-flex max-w-[60%] items-center gap-1 truncate text-[11px] font-medium text-[var(--accent-signal)] hover:underline"
                    title={s.ctaLink}
                  >
                    <ExternalLink size={11} />
                    <span className="truncate">{s.ctaText}</span>
                  </a>
                  <SlideForm
                    initial={s}
                    trigger={<Edit3 size={13} />}
                    triggerClass="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-tinted)] hover:text-[var(--accent-signal)]"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
