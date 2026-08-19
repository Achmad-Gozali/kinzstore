"use client";

import { useState } from "react";
import { Search, ClipboardPaste, BarChart3 } from "lucide-react";

const TABLE_COLUMNS = ["Tanggal", "Nomor Invoice", "No. Handphone", "Harga", "Status"];

export default function InvoicesPage() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [searchMessage, setSearchMessage] = useState<string | null>(null);

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInvoiceNumber(text);
    } catch {
      // clipboard access denied or unavailable — no-op, dummy UI only
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchMessage(
      invoiceNumber.trim()
        ? "Fitur pencarian invoice akan segera hadir."
        : "Silakan masukkan nomor Invoice terlebih dahulu."
    );
  }

  return (
    <main className="relative bg-gradient-theme pb-20 sm:pb-28 md:pb-36">
      <div className="m-4 rounded-3xl bg-primary/5">
        <div className="container mx-auto flex flex-col items-center justify-center gap-3 px-4 pb-4 pt-12 text-center md:py-32">
          <h1 className="text-3xl font-bold lg:text-4xl">Cek Invoice Kamu dengan Mudah dan Cepat</h1>
          <p className="text-sm font-medium text-muted-foreground md:text-base">
            Lihat detail pembelian kamu menggunakan nomor Invoice.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 w-full max-w-xl rounded-3xl bg-background p-6 text-left shadow-md"
          >
            <h2 id="invoiceSearchLabel" className="text-sm font-semibold">Cari detail pembelian kamu disini</h2>
            <div className="relative py-4">
              <input
                type="text"
                aria-labelledby="invoiceSearchLabel"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="Masukkan nomor Invoice Kamu (Contoh: KZXXXXXXXXXXXXX)"
                className="block h-10 w-full appearance-none rounded-lg border border-border bg-input px-3 pr-11 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={handlePaste}
                aria-label="Tempel dari clipboard"
                className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded bg-input p-1 text-muted-foreground hover:text-foreground"
              >
                <ClipboardPaste className="size-4" />
              </button>
            </div>
            <button
              type="submit"
              className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary pl-2 pr-5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <Search className="size-4" />
              Cari Invoice
            </button>
            {searchMessage && (
              <p className="mt-3 text-center text-xs text-muted-foreground">{searchMessage}</p>
            )}
          </form>
        </div>
      </div>

      <div className="container mx-auto flex flex-col items-center gap-1 px-4 pb-16 text-center">
        <h2 className="text-2xl font-bold">Transaksi Real-Time</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Berikut ini Real-Time data pesanan masuk terbaru ALIGO.
        </p>

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
    </main>
  );
}
