import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Fitur login KINZSTORE akan segera hadir.",
};

export default function MasukPage() {
  return (
    <ComingSoonPage
      title="Masuk"
      description="Fitur login akan segera hadir. Silakan cek kembali nanti."
    />
  );
}
