"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleAlert } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/game-data";

const TABS = [
  { href: "/dashboard/affiliate", label: "Riwayat" },
  { href: "/dashboard/affiliate/settlement", label: "Pembayaran" },
] as const;

export function AffiliateTabs() {
  const pathname = usePathname();

  return (
    <div className="-mb-px flex space-x-2 overflow-auto border-b border-border pb-2">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={
              active
                ? "inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground outline-none"
                : "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm text-secondary-foreground outline-none hover:bg-secondary"
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

/**
 * Satu-satunya state affiliate yang berhasil diverifikasi langsung dari reference
 * (akun riset belum terdaftar sebagai affiliate). State "sudah terdaftar" dengan
 * kode referral/statistik komisi TIDAK diimplementasikan karena tidak pernah
 * terverifikasi tampilannya — lihat catatan riset.
 * TODO: setelah backend affiliate Kinzstore tersedia, tambahkan state "terdaftar"
 * (kode referral, link share, statistik komisi) sesuai desain sungguhan.
 */
export function AffiliateNotRegistered() {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}`;
  return (
    <div className="pt-4">
      <div className="flex flex-col items-center justify-start rounded-xl border border-dashed border-border p-4 md:p-8">
        <div className="flex w-full items-center justify-center gap-2 rounded-md bg-destructive/10 px-4 py-4 text-center text-xs font-medium text-rose-400 ring-1 ring-inset ring-destructive/20">
          <CircleAlert className="size-4 shrink-0" />
          Kamu belum terdaftar sebagai affiliate. Silahkan hubungi admin untuk informasi lebih lanjut.
        </div>
        <div className="mt-4 text-center text-sm">
          Butuh Bantuan?{" "}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
}
