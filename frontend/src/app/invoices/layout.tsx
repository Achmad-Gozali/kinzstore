import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cek Invoice",
  description:
    "Cek detail dan status transaksi top up game kamu di ALIGO menggunakan nomor invoice. Data real-time dan mudah diakses.",
  alternates: { canonical: "/invoices" },
};

export default function InvoicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
