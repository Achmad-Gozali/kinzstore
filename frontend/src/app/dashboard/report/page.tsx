"use client";

import { useMemo, useState } from "react";
import {
  DashboardPageHeader,
  DashboardFilterCard,
  DashboardField,
  DashboardFieldInput,
  DashboardFieldSelect,
  DashboardActionsRow,
  DashboardTable,
  DashboardPagination,
} from "@/components/dashboard/DashboardTable";
import { GAMES, VOUCHERS } from "@/lib/game-data";
import { TODAY_DATE } from "@/lib/dashboard-data";

const TABLE_COLUMNS = ["Tanggal", "Total Transaksi", "Total Jumlah"];

export default function DashboardReportPage() {
  const [entries, setEntries] = useState(10);
  const products = useMemo(() => [...GAMES, ...VOUCHERS], []);

  return (
    <div className="flex w-full flex-col">
      <DashboardPageHeader title="Laporan" description="Menampilkan laporan total penjualan per hari." />

      <div className="space-y-4">
        <DashboardFilterCard>
          <DashboardField label="Produk" wide>
            <DashboardFieldSelect defaultValue="" aria-label="Produk">
              <option value="">-- Pilih Semua Produk --</option>
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </DashboardFieldSelect>
          </DashboardField>
          <DashboardField label="Tanggal Mulai">
            <DashboardFieldInput type="date" defaultValue={TODAY_DATE} aria-label="Tanggal Mulai" />
          </DashboardField>
          <DashboardField label="Tanggal Akhir">
            <DashboardFieldInput type="date" defaultValue={TODAY_DATE} aria-label="Tanggal Akhir" />
          </DashboardField>
        </DashboardFilterCard>

        <DashboardActionsRow entries={entries} onEntriesChange={setEntries} />
        <DashboardTable columns={TABLE_COLUMNS} />
        <DashboardPagination />
      </div>
    </div>
  );
}
