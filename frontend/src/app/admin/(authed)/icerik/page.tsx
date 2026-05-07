import { readDb } from "@/lib/db";
import { PageHeader } from "@/components/admin/PageHeader";
import { Plus, Edit3, Eye, EyeOff } from "lucide-react";
import { ServiceForm, FaqForm } from "@/components/admin/EntityForms";

export default async function IcerikPage() {
  const db = await readDb();

  return (
    <>
      <PageHeader
        eyebrow="İçerik"
        title="Site içeriği"
        desc="Hizmetler ve SSS — burada düzenlediğiniz her şey anında siteye yansır."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Section
          title="Hizmetler"
          count={db.services.length}
          action={
            <ServiceForm
              trigger={
                <>
                  <Plus size={13} /> Yeni hizmet
                </>
              }
              triggerClass="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-terra-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--accent-terra-deep)]"
            />
          }
        >
          <ul className="space-y-2">
            {db.services
              .sort((a, b) => a.order - b.order)
              .map((s) => (
                <li
                  key={s.id}
                  className="flex items-center gap-3 rounded-xl bg-[var(--bg-tinted)] px-4 py-3"
                >
                  <span className="num w-8 shrink-0 text-center text-xs text-[var(--text-tertiary)]">
                    #{s.order}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{s.title}</p>
                    <p className="truncate text-xs text-[var(--text-secondary)]">{s.desc}</p>
                  </div>
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
                      s.active
                        ? "bg-[var(--accent-cypress-soft)] text-[var(--accent-cypress)]"
                        : "bg-[var(--bg-base)] text-[var(--text-tertiary)]"
                    }`}
                    title={s.active ? "Yayında" : "Gizli"}
                  >
                    {s.active ? <Eye size={13} /> : <EyeOff size={13} />}
                  </span>
                  <ServiceForm
                    initial={s}
                    trigger={<Edit3 size={13} />}
                    triggerClass="rounded-full p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
                  />
                </li>
              ))}
          </ul>
        </Section>

        <Section
          title="SSS"
          count={db.faqs.length}
          action={
            <FaqForm
              trigger={
                <>
                  <Plus size={13} /> Yeni SSS
                </>
              }
              triggerClass="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-terra-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--accent-terra-deep)]"
            />
          }
        >
          <ul className="space-y-2">
            {db.faqs.map((f) => (
              <li
                key={f.id}
                className="group flex items-start gap-3 rounded-xl bg-[var(--bg-tinted)] px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{f.q}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-[var(--text-secondary)]">{f.a}</p>
                </div>
                <span
                  className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    f.active
                      ? "bg-[var(--accent-cypress-soft)] text-[var(--accent-cypress)]"
                      : "bg-[var(--bg-base)] text-[var(--text-tertiary)]"
                  }`}
                >
                  {f.active ? <Eye size={13} /> : <EyeOff size={13} />}
                </span>
                <FaqForm
                  initial={f}
                  trigger={<Edit3 size={13} />}
                  triggerClass="rounded-full p-1.5 text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
                />
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </>
  );
}

function Section({
  title,
  count,
  action,
  children,
}: {
  title: string;
  count: number;
  action: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)] p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="h-display text-lg">{title}</h2>
          <span className="num text-xs text-[var(--text-tertiary)]">{count} kayıt</span>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
