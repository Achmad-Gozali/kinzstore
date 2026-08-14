"use client";

import { useState } from "react";
import Image from "next/image";
import { LOGO_SRC } from "@/lib/game-data";

interface FormState {
  totalMatch: string;
  winRateNow: string;
  target: string;
}

type Result =
  | { kind: "ok"; matches: number; target: number }
  | { kind: "reached"; target: number }
  | { kind: "error"; message: string };

function calculateWinRate({ totalMatch, winRateNow, target }: FormState): Result {
  const match = Number(totalMatch);
  const rateNow = Number(winRateNow);
  const rateTarget = Number(target);

  if (totalMatch.trim() === "" || winRateNow.trim() === "" || target.trim() === "") {
    return { kind: "error", message: "Semua kolom wajib diisi." };
  }
  if (!Number.isFinite(match) || !Number.isFinite(rateNow) || !Number.isFinite(rateTarget)) {
    return { kind: "error", message: "Semua kolom harus berupa angka." };
  }
  if (match < 0) {
    return { kind: "error", message: "Total pertandingan tidak boleh negatif." };
  }
  if (rateNow < 0 || rateNow > 100) {
    return { kind: "error", message: "Total win rate saat ini harus di antara 0 dan 100." };
  }
  if (rateTarget < 0 || rateTarget > 100) {
    return { kind: "error", message: "Win rate target harus di antara 0 dan 100." };
  }
  if (rateTarget >= 100) {
    return { kind: "error", message: "Win rate target tidak boleh 100% atau lebih." };
  }

  const winRateNowFraction = rateNow / 100;
  const targetFraction = rateTarget / 100;
  const currentWins = Math.round(match * winRateNowFraction);

  if (targetFraction <= winRateNowFraction) {
    return { kind: "reached", target: rateTarget };
  }

  const matchesNeeded = Math.ceil((targetFraction * match - currentWins) / (1 - targetFraction));

  return { kind: "ok", matches: Math.max(matchesNeeded, 0), target: rateTarget };
}

export default function WinrateCalculatorPage() {
  const [form, setForm] = useState<FormState>({ totalMatch: "", winRateNow: "", target: "" });
  const [result, setResult] = useState<Result | null>(null);

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(calculateWinRate(form));
  }

  return (
    <main className="relative bg-gradient-theme pb-20 sm:pb-28 md:pb-36">
      <div className="mx-auto w-full max-w-xl space-y-8 px-4 pb-24 pt-16 sm:pb-48 sm:pt-24">
        <div>
          <Image src={LOGO_SRC} alt="KINZSTORE" width={180} height={120} className="mx-auto h-24 w-auto sm:h-32" />
          <h1 className="mt-2 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Kalkulator Win Rate
          </h1>
          <p className="mt-2 text-center text-sm text-foreground">
            Digunakan untuk menghitung total jumlah pertandingan yang harus diambil untuk mencapai target
            tingkat kemenangan yang diinginkan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-6 rounded-md shadow-sm">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="totalMatch" className="block text-xs font-medium text-foreground">
                Total Pertandingan Kamu Saat Ini
              </label>
              <input
                id="totalMatch"
                type="text"
                inputMode="numeric"
                value={form.totalMatch}
                onChange={handleChange("totalMatch")}
                placeholder="Contoh: 223"
                className="relative block h-9 w-full appearance-none rounded-lg border border-border bg-input px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="winRateNow" className="block text-xs font-medium text-foreground">
                Total Win Rate Kamu Saat Ini
              </label>
              <input
                id="winRateNow"
                type="text"
                inputMode="numeric"
                value={form.winRateNow}
                onChange={handleChange("winRateNow")}
                placeholder="Contoh: 54"
                className="relative block h-9 w-full appearance-none rounded-lg border border-border bg-input px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="target" className="block text-xs font-medium text-foreground">
                Win Rate Total yang Kamu Inginkan
              </label>
              <input
                id="target"
                type="text"
                inputMode="numeric"
                value={form.target}
                onChange={handleChange("target")}
                placeholder="Contoh: 70"
                className="relative block h-9 w-full appearance-none rounded-lg border border-border bg-input px-3 text-xs text-foreground placeholder-muted-foreground/50 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {result && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                result.kind === "error"
                  ? "border-destructive/40 bg-destructive/10 text-destructive"
                  : "border-primary/40 bg-primary/10 text-foreground"
              }`}
            >
              {result.kind === "error" && result.message}
              {result.kind === "reached" &&
                `Target win rate ${result.target}% sudah tercapai dengan performa kamu saat ini.`}
              {result.kind === "ok" && (
                <>
                  Kamu perlu memenangkan <span className="font-bold text-primary">{result.matches} pertandingan</span>{" "}
                  berturut-turut untuk mencapai win rate {result.target}%.
                </>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="group relative flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
            >
              Hitung
            </button>
            <a
              href="#"
              className="group relative flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
            >
              Pesan Joki
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
