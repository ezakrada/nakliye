import { ReactNode } from "react";

export type Column<T> = {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
};

export function DataTable<T extends { id: number | string }>({
  columns,
  data,
  empty,
  onRowClick,
}: {
  columns: Column<T>[];
  data: T[];
  empty?: string;
  onRowClick?: (row: T) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-elevated)]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--glass-border)] bg-[var(--bg-tinted)]">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={`px-4 py-3 text-left font-medium text-[var(--text-tertiary)] uppercase tracking-wider text-[11px] ${
                    c.align === "right"
                      ? "text-right"
                      : c.align === "center"
                        ? "text-center"
                        : ""
                  } ${c.className ?? ""}`}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-sm text-[var(--text-tertiary)]"
                >
                  {empty || "Kayıt yok."}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={`border-b border-[var(--glass-border)] transition-colors hover:bg-[var(--bg-tinted)] last:border-0 ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={`px-4 py-3 ${
                        c.align === "right"
                          ? "text-right"
                          : c.align === "center"
                            ? "text-center"
                            : ""
                      } ${c.className ?? ""}`}
                    >
                      {c.render ? c.render(row) : (row as Record<string, unknown>)[c.key] as ReactNode}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatusPill({
  status,
  tone,
}: {
  status: string;
  tone?: "terra" | "cypress" | "honey" | "neutral" | "danger";
}) {
  const map = {
    terra: "bg-[var(--accent-terra-soft)] text-[var(--accent-terra-deep)]",
    cypress: "bg-[var(--accent-cypress-soft)] text-[var(--accent-cypress)]",
    honey: "bg-[rgba(198,139,46,0.16)] text-[var(--accent-honey)]",
    neutral: "bg-[var(--bg-tinted)] text-[var(--text-secondary)]",
    danger: "bg-[rgba(185,66,53,0.12)] text-[var(--danger)]",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        map[tone || "neutral"]
      }`}
    >
      {status}
    </span>
  );
}
