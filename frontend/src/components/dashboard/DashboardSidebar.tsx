"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { clearDemoSession } from "@/lib/auth-demo";
import { DASHBOARD_NAV_ITEMS, isDashboardNavActive } from "@/lib/dashboard-nav";

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
    <div className="w-full sm:w-auto sm:shrink-0">
      {toast && (
        <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          <CircleAlert className="size-4 shrink-0" />
          {toast}
        </div>
      )}

      {/* < 640px: sidebar tidak dirender di sini sama sekali — akses nav dashboard
          lewat hamburger Header.tsx (satu navbar terpadu, sama seperti reference). */}
      <nav className="hidden sm:flex sm:w-16 sm:flex-col sm:gap-1 md:w-64">
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const active = isDashboardNavActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-center gap-3 rounded-md px-2 py-2.5 text-sm font-medium transition-colors md:justify-start md:px-3",
                active
                  ? "bg-gradient-to-r from-primary to-primary/70 text-primary-foreground"
                  : "text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 flex items-center justify-center gap-3 rounded-md px-2 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 md:justify-start md:px-3"
        >
          <LogOut className="size-4 shrink-0" />
          <span className="hidden md:inline">Keluar</span>
        </button>
      </nav>
    </div>
  );
}
