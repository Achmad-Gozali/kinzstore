"use client";

import { useRef, useState } from "react";
import { ShieldCheck, Settings, Phone, CircleAlert, BarChart3 } from "lucide-react";
import { DUMMY_USER } from "@/lib/dashboard-data";

const STATUS_CARDS = [
  { label: "Menunggu", value: 0, className: "bg-[#a68b1f]" },
  { label: "Dalam Proses", value: 0, className: "bg-secondary" },
  { label: "Sukses", value: 0, className: "bg-emerald-700" },
  { label: "Gagal", value: 0, className: "bg-rose-800" },
] as const;

const TABLE_COLUMNS = ["Nomor Invoice", "ID Trx", "Item", "User Input", "Harga", "Tanggal", "Status"];

export default function DashboardPage() {
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }

  const initials = DUMMY_USER.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col gap-6">
      {toast && (
        <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          <CircleAlert className="size-4 shrink-0" />
          {toast}
        </div>
      )}

      {/* TODO: hubungkan ke fitur 2FA sungguhan begitu tersedia */}
      <button
        type="button"
        onClick={() => showToast("Fitur ini akan segera hadir.")}
        className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-secondary to-secondary/60 p-5 text-left"
      >
        <ShieldCheck className="size-8 shrink-0 text-primary-foreground" />
        <div>
          <p className="font-semibold text-foreground">Tingkatkan keamanan!</p>
          <p className="text-sm text-foreground/80">
            Gunakan fitur 2FA agar akun kamu lebih aman. Klik <span className="underline">disini</span> untuk melakukan pengaturan!
          </p>
        </div>
      </button>

      {/* Profil — full width karena XinnPay/wallet card tidak dipakai di Kinzstore */}
      <div className="flex items-center justify-between gap-4 rounded-xl bg-card/60 p-4">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-foreground">{DUMMY_USER.name}</p>
            <span className="inline-block rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              {DUMMY_USER.memberSince}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => showToast("Fitur pengaturan profil akan segera hadir.")}
          aria-label="Pengaturan profil"
          className="text-muted-foreground hover:text-foreground"
        >
          <Settings className="size-5" />
        </button>
      </div>
      <div className="-mt-4 flex items-center gap-2 rounded-xl bg-card/60 px-4 pb-4 pt-2 text-sm text-muted-foreground">
        <Phone className="size-4 shrink-0" />
        {DUMMY_USER.phone}
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Transaksi Hari Ini</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-muted p-6 text-center">
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="mt-1 text-sm text-muted-foreground">Total Transaksi</p>
          </div>
          <div className="rounded-xl bg-muted p-6 text-center">
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="mt-1 text-sm text-muted-foreground">Total Penjualan</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATUS_CARDS.map((s) => (
            <div key={s.label} className={`rounded-xl p-5 text-center text-white ${s.className}`}>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="mt-1 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Riwayat Transaksi Terbaru Hari Ini</h2>
        <div className="-mx-4 w-full overflow-x-auto ring-1 ring-muted sm:mx-0 sm:rounded-lg">
          <table className="min-w-full divide-y divide-muted">
            <thead>
              <tr>
                {TABLE_COLUMNS.map((col) => (
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
                <td colSpan={TABLE_COLUMNS.length} className="px-4 py-24 text-center sm:px-6">
                  <BarChart3 className="mx-auto size-10 text-foreground" />
                  <h3 className="mt-2 font-semibold text-foreground">Data tidak ditemukan!</h3>
                  <p className="mt-1 text-sm text-secondary-foreground">Tidak ada aktifitasi data.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
