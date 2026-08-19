"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HeroBanner } from "@/lib/game-data";

const AUTO_SLIDE_MS = 5000;
const SWIPE_THRESHOLD_PX = 40;

export function HeroCarousel({ banners }: { banners: HeroBanner[] }) {
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      const total = banners.length;
      setActive(((index % total) + total) % total);
    },
    [banners.length]
  );

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Auto-slide: restarts whenever `active` changes (including manual interaction),
  // so a manual click/swipe always gives the user a full fresh interval before the
  // next auto-advance instead of being "pulled back" moments later.
  useEffect(() => {
    if (banners.length <= 1 || isHovering) return;
    intervalRef.current = setInterval(() => {
      if (document.hidden) return; // pause while tab/page isn't visible
      setActive((prev) => (prev + 1) % banners.length);
    }, AUTO_SLIDE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, isHovering, banners.length]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    if (deltaX < 0) goNext();
    else goPrev();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  }

  if (banners.length === 0) return null;

  return (
    <div
      className="group relative h-full w-full overflow-hidden rounded-lg"
      role="region"
      aria-roledescription="carousel"
      aria-label="Banner promosi"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {banners.map((banner, i) => (
          <div key={banner.src} className="relative h-full w-full shrink-0" aria-hidden={i !== active}>
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : undefined}
            />
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => {
              goPrev();
            }}
            aria-label="Banner sebelumnya"
            className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity hover:bg-black/60 focus-visible:opacity-100 group-hover:opacity-100 md:flex"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => {
              goNext();
            }}
            aria-label="Banner selanjutnya"
            className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity hover:bg-black/60 focus-visible:opacity-100 group-hover:opacity-100 md:flex"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            {banners.map((banner, i) => (
              <button
                key={banner.src}
                type="button"
                onClick={() => {
                  goTo(i);
                }}
                aria-label={`Ke banner ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "w-6 bg-primary" : "w-1.5 bg-white/50 hover:bg-white/75"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
