"use client";

import { useState } from "react";
import {
  DashboardPageHeader,
  DashboardFilterCard,
  DashboardField,
  DashboardFieldInput,
  DashboardActionsRow,
  DashboardTable,
  DashboardPagination,
} from "@/components/dashboard/DashboardTable";
import { TODAY_DATE } from "@/lib/dashboard-data";

// Kolom "XinnPay"/"XinnPay Saat Ini" pada reference di-generalisasi jadi "Saldo"/"Saldo Saat Ini"
// karena Kinzstore tidak memakai fitur wallet XinnPay.
const TABLE_COLUMNS = ["Nomor Invoice", "Deskripsi", "Jumlah", "Saldo", "Saldo Saat Ini", "Tanggal"];

export default function DashboardMutationPage() {
  const [entries, setEntries] = useState(10);

  return (
    <div className="flex w-full flex-col">
      <DashboardPageHeader
        title="Riwayat Mutasi"
        description="Menampilkan data riwayat mutasi yang telah Kamu lakukan selama periode yang dipilih."
      />

      <div className="space-y-4">
        <DashboardFilterCard>
          <DashboardField label="Status" wide>
            <DashboardFieldInput type="text" placeholder="$amount $-amount" aria-label="Status" />
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
