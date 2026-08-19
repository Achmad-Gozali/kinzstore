"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CircleAlert, LogIn } from "lucide-react";
import { LOGO_SRC } from "@/lib/game-data";
import { DEMO_USERNAME, DEMO_PASSWORD, setDemoSession } from "@/lib/auth-demo";

const INPUT_CLASS =
  "h-10 w-full rounded-lg border border-muted-foreground/10 bg-input/80 px-3 text-sm text-foreground placeholder:text-muted-foreground/75 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }

  // TODO DEMO SEMENTARA: validasi kredensial hardcode di client (lihat
  // src/lib/auth-demo.ts). Ganti dengan pemanggilan endpoint login sungguhan
  // (verifikasi di server, cookie session httpOnly) sebelum go-live production.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    const formData = new FormData(e.currentTarget);
    const identifier = String(formData.get("identifier") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (identifier === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setDemoSession();
      router.push("/dashboard");
      return;
    }

    setFormError("Username atau password salah.");
  }

  return (
    <main className="relative flex min-h-screen flex-1 flex-col items-center justify-center gap-6 bg-gradient-theme px-4 py-12 text-center">
      {toast && (
        <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          <CircleAlert className="size-4 shrink-0" />
          {toast}
        </div>
      )}

      <Link href="/">
        <Image src={LOGO_SRC} alt="ALIGO" width={180} height={120} sizes="130px" className="h-20 w-auto" />
      </Link>

      <div className="w-full max-w-md rounded-3xl bg-background p-6 text-left shadow-md sm:p-8">
        <h1 className="text-center text-2xl font-bold text-foreground sm:text-3xl">Masuk</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Masuk untuk mulai top up game favoritmu.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="identifier" className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Email atau Username
            </label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              required
              placeholder="Masukkan email atau username"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Masukkan kata sandi"
                className={`${INPUT_CLASS} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            <button
              type="button"
              onClick={() => showToast("Fitur ini akan segera hadir.")}
              className="mt-1.5 text-xs font-medium text-primary hover:underline"
            >
              Lupa kata sandi?
            </button>
          </div>

          {formError && (
            <p role="alert" className="flex items-center gap-1.5 text-sm font-medium text-destructive">
              <CircleAlert className="size-4 shrink-0" />
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
          >
            <LogIn className="size-4" /> Masuk
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link href="/daftar" className="font-medium text-primary hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </main>
  );
}
