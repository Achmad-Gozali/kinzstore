import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";

export const metadata: Metadata = {
  title: "Kebijakan Pribadi",
  description: "Halaman kebijakan pribadi KINZSTORE akan segera hadir.",
};

export default function KebijakanPribadiPage() {
  return (
    <ComingSoonPage
      title="Kebijakan Pribadi"
      description="Halaman kebijakan pribadi akan segera hadir. Silakan cek kembali nanti."
    />
  );
}
