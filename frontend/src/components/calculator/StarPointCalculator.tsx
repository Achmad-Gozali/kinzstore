"use client";

import { useState } from "react";
import Image from "next/image";
import { LOGO_SRC } from "@/lib/game-data";

interface StarPointCalculatorProps {
  title: string;
  description: string;
  sliderLabel: string;
  maxSlider: number;
  computeDiamond: (poin: number) => number;
  ctaHref: string;
}

export function StarPointCalculator({
  title,
  description,
  sliderLabel,
  maxSlider,
  computeDiamond,
  ctaHref,
}: StarPointCalculatorProps) {
  const [poin, setPoin] = useState(0);
  const diamond = computeDiamond(poin);

  return (
    <main className="relative bg-gradient-theme pb-20 sm:pb-28 md:pb-36">
      <div className="mx-auto w-full max-w-xl space-y-8 px-4 pb-24 pt-16 sm:pb-48 sm:pt-24">
        <div>
          <Image
            src={LOGO_SRC}
            alt="ALIGO"
            width={180}
            height={120}
            sizes="(min-width: 640px) 170px, 130px"
            className="mx-auto h-24 w-auto sm:h-32"
          />
          <h1 className="mt-2 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-center text-sm text-foreground">{description}</p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="starPoint" className="block text-xs font-medium text-foreground">
              {sliderLabel}
            </label>
            <input
              id="starPoint"
              type="range"
              min={0}
              max={maxSlider}
              value={poin}
              onChange={(e) => setPoin(Number(e.target.value))}
              className="h-3 w-full cursor-pointer touch-none appearance-none rounded-full bg-border accent-primary sm:h-2"
            />
          </div>

          <div className="flex flex-col gap-2 text-sm text-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              Poin Bintang Kamu <span className="font-bold text-primary">{poin}</span>
            </p>
            <p>
              Membutuhkan Maksimal <span className="font-bold text-primary">{diamond}</span> Diamond
            </p>
          </div>

          <a
            href={ctaHref}
            className="group relative flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
          >
            Top Up Diamond Sekarang!
          </a>
        </div>
      </div>
    </main>
  );
}
