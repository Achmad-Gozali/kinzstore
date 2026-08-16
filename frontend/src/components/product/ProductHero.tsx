import Image from "next/image";
import { Zap, MessageCircle, ShieldCheck } from "lucide-react";
import type { GameDetail } from "@/types/game";

export function ProductHero({ detail }: { detail: GameDetail }) {
  return (
    <section className="relative overflow-hidden bg-secondary/40">
      <div className="container mx-auto px-4 pt-10 pb-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
          <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl ring-4 ring-background sm:size-36">
            <Image src={detail.image} alt={detail.name} fill sizes="144px" className="object-cover" priority />
          </div>
          <div className="flex-1 pb-1">
            <h1 className="text-xl font-bold uppercase tracking-wide sm:text-3xl">{detail.name}</h1>
            <p className="text-sm text-muted-foreground sm:text-base">{detail.publisher}</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Zap className="size-4 text-primary" /> Proses Cepat
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MessageCircle className="size-4 text-primary" /> Layanan Chat 24/7
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-primary" /> Pembayaran Aman!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
