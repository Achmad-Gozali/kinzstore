"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GAMES, VOUCHERS, POPULAR, HERO_BANNERS, WHATSAPP_NUMBER } from "@/lib/game-data";
import { GameCard } from "@/components/ui/GameCard";
import { WhatsAppIcon } from "@/components/layout/icons";
import { HeroCarousel } from "@/components/layout/HeroCarousel";

const PAGE_SIZE = 18;
const VOUCHER_POPULAR = POPULAR.filter((p) => p.name === "Roblox Voucher");

function HeroBanner() {
  return (
    <section className="relative flex items-center overflow-hidden bg-secondary/50 px-4 py-4 lg:min-h-[554px] lg:py-8">
      <div className="container mx-auto">
        <div className="relative aspect-[1080/424] h-full">
          <HeroCarousel banners={HERO_BANNERS} />
        </div>
      </div>
    </section>
  );
}

function PopularSection({ items }: { items: typeof POPULAR }) {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-5 text-foreground">
        <h2 className="text-lg font-semibold uppercase leading-relaxed tracking-wider">
          🔥 Populer Sekarang!
        </h2>
        <p className="pl-6 text-xs text-muted-foreground">
          Berikut adalah beberapa produk yang paling populer saat ini.
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((item) => (
          <li key={item.slug} className="relative">
            <Link
              href={`/${item.slug}`}
              className="relative flex items-center gap-x-2 rounded-[16px] border border-primary/20 bg-gradient-to-b from-card to-muted text-foreground shadow-sm transition-all duration-300 ease-in-out hover:z-10 hover:scale-[1.02] hover:border-primary/70 hover:shadow-lg hover:shadow-primary/20 md:gap-x-3"
            >
              <div className="group flex items-center gap-3 p-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  sizes="(min-width: 768px) 80px, 56px"
                  className="aspect-square h-14 w-14 rounded-[8px] object-cover object-center duration-300 group-hover:scale-110 md:h-20 md:w-20"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold sm:text-base">{item.name}</p>
                  <p className="truncate text-xs opacity-75">{item.publisher}</p>
                </div>
              </div>
            </Link>
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

function FloatingWhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}`;
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden flex-col items-end rounded-2xl bg-card px-4 py-2 leading-tight text-card-foreground shadow-lg transition-transform hover:scale-105 sm:flex"
      >
        <span className="text-xs text-muted-foreground">Butuh Bantuan?</span>
        <span className="text-sm font-bold">Chat Disini</span>
      </a>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <main className="relative bg-gradient-theme pb-20 sm:pb-28 md:pb-36">
        <h1 className="sr-only">ALIGO - Top Up Game Online Termurah</h1>
        <HeroBanner />
        <div className="pt-8">
          <TopUpGamesSection />
        </div>
      </main>
      <FloatingWhatsAppButton />
    </>
  );
}
