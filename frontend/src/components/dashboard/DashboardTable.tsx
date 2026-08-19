"use client";

import { BarChart3 } from "lucide-react";

export function DashboardPageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="pb-6 sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-foreground">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function DashboardFilterCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-2 rounded-xl border border-border p-4 md:p-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{children}</div>
      </div>
    </div>
  );
}

export function DashboardField({
  label,
  wide,
  full,
  children,
}: {
  label: string;
  wide?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  const spanClass = full ? "col-span-2 md:col-span-4" : wide ? "col-span-2" : "";
  return (
    <div className={`${spanClass} flex flex-col gap-2`}>
      <div className="text-xs text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

const FIELD_CLASS =
  "block h-9 w-full appearance-none rounded-lg border border-border bg-input px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-75";

export function DashboardFieldInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={FIELD_CLASS} />;
}

export function DashboardFieldSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={FIELD_CLASS} />;
}

export function DashboardActionsRow({
  entries,
  onEntriesChange,
}: {
  entries: number;
  onEntriesChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center justify-end gap-x-4">
      <button
        type="button"
        disabled
        className="inline-flex w-full items-center justify-center rounded-md border bg-muted px-4 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-75 md:w-auto"
      >
        Download CSV
      </button>
      <button
        type="button"
        disabled
        className="inline-flex w-full items-center justify-center rounded-md border bg-muted px-4 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-75 md:w-auto"
      >
        Download XLSX
      </button>
      <select
        aria-label="Jumlah baris"
        value={entries}
        onChange={(e) => onEntriesChange(Number(e.target.value))}
        className="inline-flex w-full cursor-pointer items-center justify-center rounded-md border bg-muted py-2 text-xs ring-inset hover:bg-muted/80 focus:ring-2 focus:ring-primary md:w-auto"
      >
        {[5, 10, 25, 50, 100].map((n) => (
          <option key={n} value={n}>
            {n} Entries
          </option>
        ))}
      </select>
    </div>
  );
}

export function DashboardTable({ columns }: { columns: string[] }) {
  return (
    <div className="-mx-4 w-full overflow-x-auto ring-1 ring-muted sm:mx-0 sm:rounded-lg">
      <table className="min-w-full divide-y divide-muted">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="whitespace-nowrap px-3 py-3.5 text-left text-xs font-semibold text-foreground first:pl-4 first:sm:pl-6 last:pr-4 last:sm:pr-6"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={columns.length} className="px-4 py-24 text-center sm:px-6">
              <BarChart3 className="mx-auto size-10 text-foreground" />
              <h3 className="mt-2 font-semibold text-foreground">Data tidak ditemukan!</h3>
              <p className="mt-1 text-sm text-secondary-foreground">Tidak ada aktifitasi data.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function DashboardPagination() {
  return (
    <nav className="flex items-center justify-between">
      <div className="hidden text-sm text-muted-foreground sm:block">Menampilkan 0 sampai 0 dari 0 hasil</div>
      <div className="flex flex-1 justify-between gap-x-4 sm:justify-end">
        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center rounded-md border bg-muted px-4 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-75"
        >
          Sebelumnya
        </button>
        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center rounded-md border bg-muted px-4 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-75"
        >
          Selanjutnya
        </button>
      </div>
    </nav>
  );
}
