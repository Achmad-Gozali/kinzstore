"use client";

import { useState } from "react";
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
import { TRANSACTION_STATUS_OPTIONS, PAYMENT_STATUS_OPTIONS, TODAY_DATE } from "@/lib/dashboard-data";

const TABLE_COLUMNS = ["Nomor Invoice", "ID Trx", "Item", "User Input", "Harga", "Tanggal", "Status"];

export default function DashboardHistoryPage() {
  const [entries, setEntries] = useState(10);

  return (
    <div className="flex w-full flex-col">
      <DashboardPageHeader
        title="Riwayat Transaksi"
        description="Menampilkan data riwayat transaksi yang telah Kamu lakukan selama periode yang dipilih."
      />

      <div className="space-y-4">
        <DashboardFilterCard>
          <DashboardField label="Status">
            <DashboardFieldSelect defaultValue="Semua" aria-label="Status">
              {TRANSACTION_STATUS_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </DashboardFieldSelect>
          </DashboardField>
          <DashboardField label="Status Pembayaran">
            <DashboardFieldSelect defaultValue="Semua" aria-label="Status Pembayaran">
              {PAYMENT_STATUS_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </DashboardFieldSelect>
          </DashboardField>
          <DashboardField label="Tanggal Mulai">
            <DashboardFieldInput type="date" defaultValue={TODAY_DATE} aria-label="Tanggal Mulai" />
          </DashboardField>
          <DashboardField label="Tanggal Akhir">
            <DashboardFieldInput type="date" defaultValue={TODAY_DATE} aria-label="Tanggal Akhir" />
          </DashboardField>
          <DashboardField label="Cari" full>
            <DashboardFieldInput type="text" placeholder="#trxid $price @inputs" aria-label="Cari" />
          </DashboardField>
        </DashboardFilterCard>

        <DashboardActionsRow entries={entries} onEntriesChange={setEntries} />
        <DashboardTable columns={TABLE_COLUMNS} />
        <DashboardPagination />
      </div>
    </div>
  );
}
