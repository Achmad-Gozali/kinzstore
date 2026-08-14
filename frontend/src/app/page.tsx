"use client";

import { useState } from "react";
import Image from "next/image";
import { Headset } from "lucide-react";
import { GAMES, VOUCHERS, POPULAR, HERO_SRC } from "@/lib/game-data";
import { GameCard } from "@/components/ui/GameCard";

const PAGE_SIZE = 18;
const VOUCHER_POPULAR = POPULAR.filter((p) => p.name === "Roblox Voucher");

function HeroBanner() {
  return (
    <section className="relative flex items-center overflow-hidden bg-secondary/50 px-4 py-4 lg:min-h-[554px] lg:py-8">
      <div className="container mx-auto">
        <div className="relative aspect-[1080/424] h-full overflow-hidden rounded-lg">
          <Image src={HERO_SRC} alt="KINZSTORE - TopUp Games" fill className="object-cover" priority />
        </div>
      </div>
    </section>
  );
}

function PopularSection({ items }: { items: typeof POPULAR }) {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-5 text-foreground">
        <h3 className="text-lg font-semibold uppercase leading-relaxed tracking-wider">
          🔥 Populer Sekarang!
        </h3>
        <p className="pl-6 text-xs text-muted-foreground">
          Berikut adalah beberapa produk yang paling populer saat ini.
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((item) => (
          <li key={item.slug} className="relative">
            <a
              href="#"
              className="bg-popular-background flex items-center gap-x-2 rounded-[16px] bg-muted text-foreground duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background md:gap-x-3"
            >
              <div className="group flex items-center gap-3 p-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="aspect-square h-14 w-14 rounded-[8px] object-cover object-center duration-300 group-hover:scale-110 md:h-20 md:w-20"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold sm:text-base">{item.name}</p>
                  <p className="truncate text-xs opacity-75">{item.publisher}</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TopUpGamesSection() {
  const [tab, setTab] = useState<"games" | "vouchers">("games");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const items = tab === "games" ? GAMES : VOUCHERS;
  const popularItems = tab === "games" ? POPULAR : VOUCHER_POPULAR;
  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  function selectTab(next: "games" | "vouchers") {
    setTab(next);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="flex flex-col gap-y-8">
      <PopularSection items={popularItems} />

      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center gap-2">
          <button
            type="button"
            onClick={() => selectTab("games")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === "games" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
            }`}
          >
            Top Up Games
          </button>
          <button
            type="button"
            onClick={() => selectTab("vouchers")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === "vouchers" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
            }`}
          >
            Voucher
          </button>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-5 xl:grid-cols-6">
          {visibleItems.map((item) => (
            <GameCard key={item.slug} item={item} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center pb-8">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="rounded-lg bg-muted px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/80"
            >
              Tampilkan Lainnya...
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FloatingCSButton() {
  return (
    <button
      type="button"
      className="fixed bottom-0 right-4 z-50 inline-flex items-center space-x-2.5 rounded-t-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg"
    >
      <Headset className="size-4" />
      <span>CS</span>
    </button>
  );
}

export default function Home() {
  return (
    <>
      <main className="relative bg-gradient-theme pb-20 sm:pb-28 md:pb-36">
        <HeroBanner />
        <div className="pt-8">
          <TopUpGamesSection />
        </div>
      </main>
      <FloatingCSButton />
    </>
  );
}
