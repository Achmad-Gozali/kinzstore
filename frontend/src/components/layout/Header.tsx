"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, LogIn, UserPlus, Menu, X, ChevronDown } from "lucide-react";
import { LOGO_SRC } from "@/lib/game-data";
import { SearchBox } from "./SearchBox";
import {
  IndonesiaFlagIcon,
  TopupNavIcon,
  TransaksiNavIcon,
  LeaderboardNavIcon,
  KalkulatorNavIcon,
} from "./icons";

const NAV_ITEMS = [
  { label: "Topup", href: "/", icon: TopupNavIcon },
  { label: "Cek Transaksi", href: "/invoices", icon: TransaksiNavIcon },
  { label: "Leaderboard", href: "/leaderboard", icon: LeaderboardNavIcon },
];

const CALCULATOR_ITEMS = [
  {
    label: "Win Rate",
    href: "/calculator/winrate",
    description:
      "Digunakan untuk menghitung total jumlah match yang harus ditempuh untuk mencapai target win rate yang diinginkan.",
    disabled: false,
  },
  {
    label: "Magic Wheel",
    href: "/calculator/magic-wheel",
    description:
      "Digunakan untuk mengetahui total maksimal diamond yang dibutuhkan untuk mendapatkan skin Legends.",
    disabled: false,
  },
  {
    label: "Zodiac",
    href: "/calculator/zodiac",
    description:
      "Digunakan untuk mengetahui total diamond maksimal yang dibutuhkan untuk mendapatkan skin Zodiacs.",
    disabled: false,
  },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCalcOpen, setMobileCalcOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const calcRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  const calcActive = pathname.startsWith("/calculator");

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);


  useEffect(() => {
    if (!calcOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (calcRef.current && !calcRef.current.contains(e.target as Node)) {
        setCalcOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [calcOpen]);

  return (
    <header className="sticky top-0 z-40 w-full flex-none bg-secondary/80 backdrop-blur">
      <div className="border-b border-border/20">
        <div className="container mx-auto flex h-16 items-center justify-between gap-2 px-4 sm:gap-4">
          <Link href="/" className="flex shrink-0 items-center">
            <span className="sr-only">ALIGO Logo</span>
            <Image
              src={LOGO_SRC}
              alt="ALIGO"
              width={180}
              height={120}
              sizes="60px"
              className="h-9 w-auto lg:h-10"
            />
          </Link>
          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="relative hidden w-full md:flex">
              <SearchBox className="w-full" inputClassName="h-9" />
            </div>
            <button
              type="button"
              aria-label="Cari"
              onClick={() => {
                setMobileOpen(true);
                setMobileCalcOpen(false);
                requestAnimationFrame(() => mobileSearchRef.current?.focus());
              }}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 hover:bg-accent/75 md:hidden"
            >
              <Search className="size-4" />
            </button>
            <div className="inline-flex shrink-0 items-center whitespace-nowrap rounded-lg border border-border/50 px-2.5 py-2 text-xs sm:px-3 sm:text-sm">
              <IndonesiaFlagIcon className="size-5 shrink-0" />
              <span className="ml-1.5 sm:ml-2">ID / IDR</span>
            </div>
            <button
              type="button"
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
              onClick={() => {
                const next = !mobileOpen;
                setMobileOpen(next);
                if (next) setMobileCalcOpen(false);
              }}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 hover:bg-accent/75 md:hidden"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>
      <nav className="container mx-auto hidden h-10 w-full items-center justify-between border-b border-border/20 px-4 md:flex">
        <div className="flex h-full items-center gap-5">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`relative inline-flex h-full items-center gap-2 text-sm font-medium ${
                  active ? "text-primary" : "text-foreground"
                }`}
              >
                <Icon className="size-4" />
                <span>{label}</span>
                {active && <div className="absolute inset-x-0 bottom-0 h-[2px] bg-primary" />}
              </Link>
            );
          })}

          <div ref={calcRef} className="relative h-full">
            <button
              type="button"
              aria-expanded={calcOpen}
              onClick={() => setCalcOpen((v) => !v)}
              className={`relative inline-flex h-full items-center gap-2 text-sm font-medium ${
                calcActive || calcOpen ? "text-primary" : "text-foreground"
              }`}
            >
              <KalkulatorNavIcon className="size-4" />
              <span>Kalkulator</span>
              <ChevronDown className={`size-3.5 transition-transform ${calcOpen ? "rotate-180" : ""}`} />
              {(calcActive || calcOpen) && <div className="absolute inset-x-0 bottom-0 h-[2px] bg-primary" />}
            </button>

            {calcOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md">
                {CALCULATOR_ITEMS.map(({ label, href, description, disabled }) =>
                  disabled ? (
                    <div
                      key={label}
                      aria-disabled="true"
                      className="flex cursor-not-allowed items-start gap-2 rounded-sm px-2 py-1.5 opacity-50"
                    >
                      <KalkulatorNavIcon className="mt-0.5 size-4 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">
                          {label} <span className="text-xs font-normal">(Segera Hadir)</span>
                        </span>
                        <span className="text-xs text-foreground/75">{description}</span>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setCalcOpen(false)}
                      className="flex items-start gap-2 rounded-sm px-2 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <KalkulatorNavIcon className="mt-0.5 size-4 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{label}</span>
                        <span className="text-xs text-foreground/75">{description}</span>
                      </div>
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex h-full items-center gap-5 text-sm font-medium">
          <Link href="/masuk" className="inline-flex items-center gap-1.5">
            <LogIn className="size-4" />
            Masuk
          </Link>
          <Link href="/daftar" className="inline-flex items-center gap-1.5">
            <UserPlus className="size-4" />
            Daftar
          </Link>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-b border-border/20 px-4 pb-4 md:hidden">
          <div className="relative mb-3 mt-1">
            <SearchBox
              inputRef={mobileSearchRef}
              inputClassName="h-10 pl-9"
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent/50"
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{label}</span>
                </Link>
              );
            })}

            <div className={`rounded-lg text-sm font-medium ${calcActive ? "text-primary" : "text-foreground"}`}>
              <button
                type="button"
                aria-expanded={mobileCalcOpen}
                onClick={() => setMobileCalcOpen((v) => !v)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 ${
                  calcActive ? "bg-primary/10" : "hover:bg-accent/50"
                }`}
              >
                <span className="flex items-center gap-3">
                  <KalkulatorNavIcon className="size-4" />
                  <span>Kalkulator</span>
                </span>
                <ChevronDown className={`size-4 transition-transform duration-300 ${mobileCalcOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  mobileCalcOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-1 py-1 pl-11 pr-3">
                    {CALCULATOR_ITEMS.map(({ label, href, disabled }) =>
                      disabled ? (
                        <span key={label} className="py-1 text-xs text-foreground/50">
                          {label} <span className="italic">(Segera Hadir)</span>
                        </span>
                      ) : (
                        <Link
                          key={label}
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className="py-1 text-xs text-foreground hover:text-primary"
                        >
                          {label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-1 border-t border-border/20 pt-2">
            <Link
              href="/masuk"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent/50"
            >
              <LogIn className="size-4" />
              Masuk
            </Link>
            <Link
              href="/daftar"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent/50"
            >
              <UserPlus className="size-4" />
              Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
