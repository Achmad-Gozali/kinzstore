"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, Package, Droplet, FileText, Cloud, LogOut, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { clearDemoSession } from "@/lib/auth-demo";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/history", label: "Transaksi", icon: Package },
  { href: "/dashboard/mutation", label: "Mutasi", icon: Droplet },
  { href: "/dashboard/report", label: "Laporan", icon: FileText },
  { href: "/dashboard/affiliate", label: "Afiliasi", icon: Cloud },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }

  // TODO DEMO SEMENTARA: cuma menghapus cookie penanda login di client (lihat
  // src/lib/auth-demo.ts). Ganti dengan invalidasi session sungguhan di server
  // begitu sistem autentikasi Kinzstore sudah tersedia.
  function handleLogout() {
    clearDemoSession();
    showToast("Kamu berhasil keluar. Mengarahkan ke beranda...");
    setTimeout(() => router.push("/"), 800);
  }

  return (
    <nav className="flex w-full flex-col gap-1 lg:w-64 lg:shrink-0">
      {toast && (
        <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          <CircleAlert className="size-4 shrink-0" />
          {toast}
        </div>
      )}

      {NAV_ITEMS.map((item) => {
        const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-gradient-to-r from-primary to-primary/70 text-primary-foreground"
                : "text-foreground hover:bg-muted/50"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}

      <button
        type="button"
        onClick={handleLogout}
        className="mt-2 flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
      >
        <LogOut className="size-4 shrink-0" />
        Keluar
      </button>
    </nav>
  );
}
