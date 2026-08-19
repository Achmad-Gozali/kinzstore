import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun ALIGO untuk mulai top up game favoritmu.",
};

export default function MasukPage() {
  return <LoginForm />;
}
