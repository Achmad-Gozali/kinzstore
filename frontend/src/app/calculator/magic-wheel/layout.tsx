import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Magic Wheel",
  description:
    "Hitung estimasi total diamond yang dibutuhkan untuk mendapatkan skin Legends dari Magic Wheel Mobile Legends.",
  alternates: { canonical: "/calculator/magic-wheel" },
};

export default function MagicWheelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
