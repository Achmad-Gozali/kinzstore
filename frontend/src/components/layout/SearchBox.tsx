"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { GAMES, VOUCHERS } from "@/lib/game-data";
import { searchGames } from "@/lib/search";
import { cn } from "@/lib/utils";

const ALL_ITEMS = [...GAMES, ...VOUCHERS];

export function SearchBox({
  className,
  inputClassName,
  onNavigate,
  inputRef,
}: {
  className?: string;
  inputClassName?: string;
  onNavigate?: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = searchGames(query, ALL_ITEMS);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  function handleSelect(slug: string) {
    setQuery("");
    setOpen(false);
    onNavigate?.();
    router.push(`/${slug}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      handleSelect(results[0].slug);
    }
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <input
        ref={inputRef}
        type="text"
        aria-label="Cari Game atau Voucher"
        placeholder="Cari Game atau Voucher"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => query.trim() && setOpen(true)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        className={cn(
          "w-full rounded-lg border border-muted-foreground/10 bg-input/80 pl-9 text-sm placeholder:text-muted-foreground/75 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
          inputClassName
        )}
      />
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      {open && query.trim() && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-[60vh] overflow-y-auto rounded-lg border border-border bg-popover text-popover-foreground shadow-lg">
          {results.length > 0 ? (
            <ul className="divide-y divide-border/50">
              {results.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.slug}`}
                    onClick={() => handleSelect(item.slug)}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-accent hover:text-accent-foreground"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={36}
                      height={36}
                      sizes="36px"
                      className="size-9 shrink-0 rounded-md object-cover"
                    />
                    <span className="truncate text-sm font-medium">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-4 text-center text-sm text-muted-foreground">
              Game &ldquo;{query}&rdquo; tidak ditemukan.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
