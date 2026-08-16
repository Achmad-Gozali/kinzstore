"use client";

import { StarPointCalculator } from "@/components/calculator/StarPointCalculator";

function computeDiamond(poin: number): number {
  if (poin <= 195) {
    return 10800 - 270 * Math.floor(poin / 5);
  }
  return 60 * (200 - poin);
}

export default function MagicWheelCalculatorPage() {
  return (
    <StarPointCalculator
      title="Kalkulator Magic Wheel"
      description="Digunakan untuk mengetahui total estimasi diamond yang dibutuhkan untuk mendapatkan skin Legends."
      sliderLabel="Geser sesuai dengan Titik Magic Wheel Kamu"
      maxSlider={199}
      computeDiamond={computeDiamond}
      ctaHref="/mobile-legends"
    />
  );
}
