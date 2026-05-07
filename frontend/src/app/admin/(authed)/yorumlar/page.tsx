import { readDb } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { Star, Check, X, Plus } from "lucide-react";
import { approveTestimonial, rejectTestimonial } from "@/app/admin/actions";
import { TestimonialForm } from "@/components/admin/TestimonialForm";

export default async function YorumlarPage() {
  const db = await readDb();
  const pending = db.testimonials.filter((t) => !t.approved);
  const approved = db.testimonials.filter((t) => t.approved);

  return (
    <>
      <PageHeader
        eyebrow="Müşteri yorumları"
        title="Onay kuyruğu"
        desc="Onaylanan yorumlar Müşterilerimiz bölümünde yayınlanır."
        actions={<TestimonialForm trigger={<><Plus size={14} /> Yeni yorum</>} />}
      />

      {pending.length > 0 ? (
        <div className="mb-8">
          <h2 className="h-display mb-3 text-lg">
            Beklemede{" "}
            <span className="num ml-1 rounded-full bg-[var(--accent-terra)] px-2 py-0.5 text-xs font-semibold text-white">
              {pending.length}
            </span>
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {pending.map((t) => {
              const onApprove = approveTestimonial.bind(null, t.id);
              const onReject = rejectTestimonial.bind(null, t.id);
              return (
                <div
                  key={t.id}
                  className="rounded-2xl border border-[var(--accent-terra-soft)] bg-[var(--bg-elevated)] p-5"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="num text-xs text-[var(--text-tertiary)]">{t.date}</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className="fill-[var(--accent-honey)] text-[var(--accent-honey)]"
                        />
                      ))}
                    </div>
                  </div>
                  <p
                    className="h-display text-base italic leading-snug"
                    style={{ fontWeight: 400 }}
                  >
                    "{t.text}"
                  </p>
                  <p className="mt-3 text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{t.route}</p>
                  <div className="mt-4 flex gap-2">
                    <form action={onApprove} className="flex-1">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[var(--accent-cypress)] py-2 text-sm font-semibold text-white"
                      >
                        <Check size={14} /> Onayla
                      </button>
                    </form>
                    <form action={onReject}>
                      <button
                        type="submit"
                        className="flex items-center justify-center rounded-xl border border-[var(--glass-border-strong)] bg-[var(--bg-base)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)]"
                      >
                        <X size={14} />
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <h2 className="h-display mb-3 text-lg">Yayında ({approved.length})</h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {approved.map((t) => {
          const onReject = rejectTestimonial.bind(null, t.id);
          return (
            <div
              key={t.id}
              className="group relative rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-5"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="num text-xs text-[var(--text-tertiary)]">{t.date}</span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      className="fill-[var(--accent-honey)] text-[var(--accent-honey)]"
                    />
                  ))}
                </div>
              </div>
              <p className="line-clamp-3 text-sm text-[var(--text-secondary)]">"{t.text}"</p>
              <p className="mt-3 text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-[var(--text-tertiary)]">{t.route}</p>
              <form
                action={onReject}
                className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <button
                  type="submit"
                  aria-label="Sil"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--bg-base)] text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white"
                >
                  <X size={12} />
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
}
