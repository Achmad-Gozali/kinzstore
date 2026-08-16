"use client";

import { StarPointCalculator } from "@/components/calculator/StarPointCalculator";

function computeDiamond(poin: number): number {
  if (poin <= 89) {
    return 1700 - 17 * poin;
  }
  return 20 * (100 - poin);
}

export default function ZodiacCalculatorPage() {
  return (
    <StarPointCalculator
      title="Kalkulator Zodiac"
      description="Digunakan untuk mengetahui total estimasi diamond yang dibutuhkan untuk mendapatkan skin Zodiac."
      sliderLabel="Geser sesuai dengan Titik Zodiac Kamu"
      maxSlider={99}
      computeDiamond={computeDiamond}
      ctaHref="/mobile-legends"
    />
  );
}
