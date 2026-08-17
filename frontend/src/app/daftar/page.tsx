import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Daftar akun KINZSTORE untuk mulai top up game favoritmu.",
};

export default function DaftarPage() {
  return <RegisterForm />;
}
