import Image from "next/image";
import { Moon } from "lucide-react";
import { LOGO_SRC } from "@/lib/game-data";
import { InstagramIcon, TikTokIcon, YoutubeIcon } from "./icons";

const COLUMNS = [
  {
    title: "Peta Situs",
    links: ["Beranda", "Masuk", "Daftar", "Cek Transaksi", "Hubungi Kami", "Ulasan"],
  },
  {
    title: "Dukungan",
    links: ["Whatsapp", "Gmail"],
  },
  {
    title: "Legalitas",
    links: ["Kebijakan Pribadi", "Syarat & Ketentuan"],
  },
];

const WAVE_PATH =
  "M 0,400 C 0,400 0,200 0,200 C 40.34909359970402,243.0042668639783 80.69818719940804,286.0085337279566 135,268 C 189.30181280059196,249.9914662720434 257.5563448020718,170.97013195215192 311,159 C 364.4436551979282,147.02986804784808 403.07643359230485,202.11093846343573 452,207 C 500.92356640769515,211.88906153656427 560.137920828709,166.58611419410528 626,169 C 691.862079171291,171.41388580589472 764.3718830928599,221.54460476014305 826,248 C 887.6281169071401,274.45539523985695 938.3745467998519,277.2354667653225 985,246 C 1031.625453200148,214.7645332346775 1074.1299297077323,149.51352817856701 1122,137 C 1169.8700702922677,124.48647182143299 1223.1057343692194,164.71042052040943 1277,184 C 1330.8942656307806,203.28957947959057 1385.4471328153904,201.64478973979527 1440,200 C 1440,200 1440,400 1440,400 Z";

export function Footer() {
  return (
    <footer className="relative bg-secondary">
      <div className="pointer-events-none absolute inset-x-0 bottom-full h-16 overflow-hidden leading-none sm:h-24 md:h-32">
        <svg
          viewBox="0 0 1440 390"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden="true"
        >
          <path d={WAVE_PATH} className="fill-secondary" />
        </svg>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <Image src={LOGO_SRC} alt="Kinzstore" width={180} height={120} className="h-16 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-foreground/90">
              Suplier TopUp Game Online termurah, Proses cepat serta open 24 Jam dengan metode
              pembayaran terlengkap di Indonesia
            </p>
            <div className="mt-4 flex items-center gap-4">
              <InstagramIcon className="size-6" />
              <TikTokIcon className="size-6" />
              <YoutubeIcon className="size-6" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:col-span-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-sm font-semibold text-primary">{col.title}</h4>
                <ul className="space-y-3 text-sm text-foreground/90">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/20">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-foreground/80">
          <span>&copy; 2026 KINZSTORE. All rights reserved.</span>
          <button type="button" aria-label="Toggle theme" className="rounded-md p-1.5 hover:bg-accent/50">
            <Moon className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
