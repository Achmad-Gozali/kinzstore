"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, CircleAlert, UserPlus } from "lucide-react";
import { LOGO_SRC } from "@/lib/game-data";

const INPUT_CLASS =
  "h-10 w-full rounded-lg border border-muted-foreground/10 bg-input/80 px-3 text-sm text-foreground placeholder:text-muted-foreground/75 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export function RegisterForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }

  function validateConfirmPassword(nextPassword: string, nextConfirm: string) {
    const mismatch = nextConfirm.length > 0 && nextPassword !== nextConfirm;
    setConfirmError(mismatch ? "Konfirmasi Kata Sandi tidak sama dengan Kata Sandi." : null);
    confirmPasswordRef.current?.setCustomValidity(mismatch ? "Konfirmasi Kata Sandi tidak sama dengan Kata Sandi." : "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      validateConfirmPassword(password, confirmPassword);
      return;
    }
    showToast("Fitur pendaftaran akan segera hadir.");
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
        <Image src={LOGO_SRC} alt="KINZSTORE" width={180} height={120} sizes="130px" className="h-20 w-auto" />
      </Link>

      <div className="w-full max-w-md rounded-3xl bg-background p-6 text-left shadow-md sm:p-8">
        <h1 className="text-center text-2xl font-bold text-foreground sm:text-3xl">Daftar</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Buat akun untuk mulai top up game favoritmu.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Nama Lengkap
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Masukkan nama lengkap"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Masukkan username"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Alamat Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Masukkan alamat email"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="mb-1.5 block text-sm font-medium text-muted-foreground">
              No. WhatsApp
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              required
              placeholder="Contoh: 081234567890"
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
                minLength={8}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateConfirmPassword(e.target.value, confirmPassword);
                }}
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
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-muted-foreground">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                ref={confirmPasswordRef}
                type={showConfirmPassword ? "text" : "password"}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateConfirmPassword(password, e.target.value);
                }}
                onBlur={(e) => validateConfirmPassword(password, e.target.value)}
                placeholder="Ulangi kata sandi"
                className={`${INPUT_CLASS} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {confirmError && <p className="mt-1.5 text-xs text-destructive">{confirmError}</p>}
          </div>

          <button
            type="submit"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
          >
            <UserPlus className="size-4" /> Daftar
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link href="/masuk" className="font-medium text-primary hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </main>
  );
}
