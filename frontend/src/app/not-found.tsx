import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan",
  description: "Halaman yang kamu cari tidak ditemukan di KINZSTORE.",
};

export default function NotFound() {
  return (
    <ComingSoonPage
      title="404 - Halaman Tidak Ditemukan"
      description="Halaman yang kamu cari tidak tersedia atau sudah dipindahkan. Silakan kembali ke beranda."
    />
  );
}
