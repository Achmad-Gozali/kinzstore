import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Win Rate",
  description:
    "Hitung total jumlah pertandingan yang harus dimenangkan berturut-turut untuk mencapai target win rate yang kamu inginkan.",
  alternates: { canonical: "/calculator/winrate" },
};

export default function WinrateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
