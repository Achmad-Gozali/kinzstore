import Link from "next/link";
import Image from "next/image";
import { LOGO_SRC } from "@/lib/game-data";

export function ComingSoonPage({ title, description }: { title: string; description?: string }) {
  return (
    <main className="relative flex min-h-screen flex-1 flex-col items-center justify-center gap-4 bg-gradient-theme px-4 text-center">
      <Image src={LOGO_SRC} alt="KINZSTORE" width={180} height={120} sizes="130px" className="h-20 w-auto" />
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        {description ?? "Fitur ini akan segera hadir. Silakan cek kembali nanti."}
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
