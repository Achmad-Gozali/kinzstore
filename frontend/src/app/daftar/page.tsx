import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Fitur pendaftaran akun KINZSTORE akan segera hadir.",
};

export default function DaftarPage() {
  return (
    <ComingSoonPage
      title="Daftar"
      description="Fitur pendaftaran akun akan segera hadir. Silakan cek kembali nanti."
    />
  );
}
