import { LayoutGrid, Package, Droplet, FileText, Cloud } from "lucide-react";

// Dipakai bersama oleh DashboardSidebar.tsx (rail sm+) dan Header.tsx (overlay
// hamburger mobile, hanya saat pathname dimulai /dashboard) — satu sumber
// kebenaran supaya nama/urutan item nav dashboard tidak pernah dobel-definisi.
export const DASHBOARD_NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/history", label: "Transaksi", icon: Package },
  { href: "/dashboard/mutation", label: "Mutasi", icon: Droplet },
  { href: "/dashboard/report", label: "Laporan", icon: FileText },
  { href: "/dashboard/affiliate", label: "Afiliasi", icon: Cloud },
] as const;

export function isDashboardNavActive(pathname: string, href: string) {
  return href === "/dashboard" ? pathname === href : pathname.startsWith(href);
}
