import type { Metadata } from "next";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

// Proteksi route /dashboard/* dilakukan di src/proxy.ts (cek cookie demo login).
// TODO DEMO SEMENTARA: proxy.ts hanya mengecek keberadaan cookie, bukan
// memverifikasi session sungguhan di server. Ganti dengan pengecekan
// session/JWT yang sah begitu sistem autentikasi Kinzstore tersedia.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative bg-gradient-theme pb-20 sm:pb-28 md:pb-36">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-8 sm:flex-row sm:gap-6 md:gap-8">
        <DashboardSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  );
}
