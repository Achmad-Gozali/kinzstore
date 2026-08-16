import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Halaman syarat & ketentuan KINZSTORE akan segera hadir.",
};

export default function SyaratKetentuanPage() {
  return (
    <ComingSoonPage
      title="Syarat & Ketentuan"
      description="Halaman syarat & ketentuan akan segera hadir. Silakan cek kembali nanti."
    />
  );
}
