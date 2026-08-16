import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Zodiac",
  description:
    "Hitung estimasi total diamond yang dibutuhkan untuk mendapatkan skin Zodiac Mobile Legends.",
  alternates: { canonical: "/calculator/zodiac" },
};

export default function ZodiacLayout({ children }: { children: React.ReactNode }) {
  return children;
}
