# Kinzstore — Ringkasan Project

> Dibuat: 17 Agustus 2026 · Disusun dari inspeksi langsung source code (`frontend/src/`), bukan asumsi. Tidak ada kode fungsional yang diubah dalam penyusunan dokumen ini.

Dokumen ini adalah referensi menyeluruh tentang kondisi Kinzstore saat ini: apa yang sudah berdiri, fitur apa yang benar-benar berfungsi, bagaimana arsitekturnya, dan apa yang masih placeholder. Ditujukan sebagai basis diskusi roadmap ke depan.

## Daftar Isi

1. [Overview Umum](#1-overview-umum)
2. [Katalog Produk](#2-katalog-produk)
3. [Fitur yang Sudah Berfungsi](#3-fitur-yang-sudah-berfungsi)
4. [Yang Masih Placeholder / Belum Selesai](#4-yang-masih-placeholder--belum-selesai)
5. [Optimasi yang Sudah Dilakukan](#5-optimasi-yang-sudah-dilakukan)
6. [Statistik Cepat & Route Table](#6-statistik-cepat--route-table)

---

## 1. Overview Umum

**Kinzstore** adalah situs top-up game dan voucher digital. Katalognya mencakup 84 judul game (Mobile Legends, Free Fire, PUBG Mobile, dst.) dan 13 jenis voucher (Google Play, Steam Wallet, Roblox, dll.).

Project saat ini berada di tahap **front-end penuh, tanpa backend**: seluruh tampilan, alur beli, dan data produk sudah jadi, tapi belum ada server yang benar-benar memproses pembayaran atau akun pengguna.

### Tech stack

Dicek langsung dari `frontend/package.json`:

| Bagian | Teknologi | Versi |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.3.0 |
| UI library | React | 19.2.4 |
| Bahasa | TypeScript (strict mode, tanpa `any`) | ^5 |
| Styling | Tailwind CSS v4 (token `oklch`/`hsl`) | ^4 |
| Komponen dasar | shadcn/ui (primitif Radix via `@base-ui/react`) | 4.1.0 |
| Ikon | lucide-react | 1.6.0 |
| Utility class | `clsx` + `tailwind-merge` (`cn()`) | — |
| Font | IBM Plex Sans Condensed via `next/font/google` (self-hosted, tanpa request runtime ke Google) | — |
| Node engine | `>=24` | — |

### Struktur folder

```
frontend/src/
  app/              routing (App Router) — tiap folder = satu route
  components/
    layout/         Header, Footer, SearchBox, ConditionalChrome, icons
    product/        ProductHero, PurchasePanel, DescriptionSection
    auth/            LoginForm, RegisterForm
    calculator/      StarPointCalculator (dipakai Magic Wheel & Zodiac)
    ui/              primitif shadcn + GameCard
  lib/               bukan API call — "database" statis (lihat bawah)
  types/             game.ts — satu file mendefinisikan seluruh bentuk data
```

Pola arsitekturnya konsisten: **data-driven, bukan CMS**. Semua konten (nama game, harga, metode bayar, teks deskripsi) adalah konstanta TypeScript yang di-*bundle* saat build, lalu dirender statis lewat `generateStaticParams`. Tidak ada database, tidak ada fetch ke API eksternal.

---

## 2. Katalog Produk

- **84 game** (`RAW_GAMES` di `lib/game-data.ts`)
- **13 voucher** (`RAW_VOUCHERS` di `lib/game-data.ts`)
- **Total: 97 produk** — dan seluruhnya sudah punya halaman detail lengkap (bukan cuma thumbnail kosong).

### Bagaimana data disimpan

- `lib/game-data.ts` — daftar nama & gambar (untuk grid katalog). Array pasangan `[nama, ekstensi gambar]` yang di-*slugify* otomatis jadi URL produk.
- `lib/game-details.ts` — registry utama `GAME_DETAILS` (Record slug → `GameDetail`), berisi 14 entri langsung + import gabungan dari 7 file pecahan lain supaya satu file tidak membengkak:

| File | Jumlah entri game |
|---|---|
| `game-details.ts` | 14 |
| `game-details-2.ts` | 11 |
| `game-details-3.ts` | 11 |
| `game-details-4.ts` | 9 |
| `game-details-5.ts` | 11 |
| `game-details-6.ts` | 14 |
| `game-details-7.ts` | 15 |
| `game-details-8.ts` | 12 |
| **Total** | **97** |

Total gabungan sekitar **4.900 baris** data harga, kategori nominal, dan metode bayar.

### Pola field akun pembeli

Tiap game butuh data akun berbeda untuk top up. Empat pola utama:

| Pola | Contoh game |
|---|---|
| ID saja | Free Fire, Point Blank, Kings Choice |
| ID + Server | Mobile Legends, Magic Chess: Go Go, Tarisland |
| ID + Username | Jade Legends, Bleach Mobile 3D, Dark Continent Mist, Werewolf |
| Server dropdown tetap (`<select>`, bukan teks bebas) | Octopath Traveler CotC — server-nya cuma satu opsi ("Global") |

Ada satu kasus unik: **Ragnarok Origin** memakai label field custom ("Secret Code" + "Nickname") alih-alih ID/Username standar — menunjukkan sistem field-nya fleksibel untuk kasus khusus, bukan template kaku.

### Metode pembayaran

Semua 97 produk memakai daftar metode bayar yang **sama persis**, dari fungsi bersama `createPaymentGroups()` di `lib/game-detail-helpers.ts`:

- QRIS (all payment)
- 6 e-wallet: OVO, DANA, GoPay, ShopeePay, LinkAja, DOKU Wallet
- 15 bank virtual account (BCA, Mandiri, BNI, BRI, BSI, Permata, CIMB Niaga, dll.)
- Convenience store: Indomaret, Alfamart
- Transfer bank manual: BRI, BNI, Mandiri

Ini konsisten dengan kenyataan bahwa belum ada payment gateway nyata di belakangnya — daftar ini murni tampilan.

---

## 3. Fitur yang Sudah Berfungsi

"Berfungsi" di sini berarti: logikanya jalan penuh secara front-end (state, validasi, navigasi) — **bukan berarti terhubung ke server.**

### Search bar

`lib/search.ts` — pencocokan **substring** pada nama game/voucher, plus pencocokan **inisial/akronim** (mis. mengetik "ml" mencocokkan "Mobile Legends" lewat huruf pertama tiap kata). Berjalan sepenuhnya di client, mencari di seluruh 97 game+voucher sekaligus, hasil dibatasi 8 item, klik langsung navigasi ke halaman produk.

### Kalkulator

Tiga kalkulator, dua di antaranya (Magic Wheel & Zodiac) berbagi satu komponen `StarPointCalculator`:

- **Win Rate** (`/calculator/winrate`) — menghitung berapa kali menang beruntun yang dibutuhkan untuk mencapai target win rate. Validasi: semua field harus angka, total match ≥ 0, win rate saat ini & target harus 0–100, target tidak boleh ≥ 100%. Rumus: `matchesNeeded = ceil((target·match − currentWins) / (1 − target))`.
- **Magic Wheel** (`/calculator/magic-wheel`) — slider poin 0–199 → estimasi diamond maksimal. Rumus piecewise: `poin ≤ 195` → `10800 − 270·floor(poin/5)`; di atas itu → `60·(200 − poin)`.
- **Zodiac** (`/calculator/zodiac`) — slider poin 0–99 → estimasi diamond maksimal. Rumus piecewise: `poin ≤ 89` → `1700 − 17·poin`; di atas itu → `20·(100 − poin)`.

### Panel pembelian di halaman produk

Alur lengkap: isi data akun → pilih nominal → jumlah → metode bayar → kode promo → kontak. Validasi urutan berjalan (tidak bisa pilih nominal sebelum data akun terisi). Tab "Transaksi/Keterangan" muncul di mobile & tablet (di bawah breakpoint `lg`, 1024px); di desktop kedua kolom tampil sekaligus di layout 3 kolom.

### Cek Transaksi / Invoices (`/invoices`)

Form pencarian nomor invoice (dengan tombol "tempel dari clipboard") dan tabel "Transaksi Real-Time" — keduanya tampilan saja. Submit selalu menampilkan pesan "Fitur pencarian invoice akan segera hadir.", tabel selalu menampilkan status kosong "Data tidak ditemukan!".

### Leaderboard (`/leaderboard`)

Tiga kartu periode (Hari Ini / Minggu Ini / Bulan Ini), semuanya selalu menampilkan status kosong "Belum ada data transaksi".

### Form Masuk & Daftar

**UI-only, belum terhubung backend.** Validasi field jalan, toggle show/hide password jalan — tapi submit hanya menampilkan toast ("Fitur login akan segera hadir." / "Fitur pendaftaran akan segera hadir."). Tidak ada sesi, tidak ada penyimpanan akun, tidak ada API call.

---

## 4. Yang Masih Placeholder / Belum Selesai

| Item | Status | Catatan |
|---|---|---|
| Sistem autentikasi | Belum dimulai | Form Masuk/Daftar cuma toast "segera hadir" saat submit, tidak ada backend/sesi |
| Payment gateway | Belum dimulai | Tombol "Pesan Sekarang!" selalu berakhir toast "Fitur pembayaran belum tersedia." |
| Dark/Light theme toggle | Setengah jalan | Tombol ikon bulan di footer ada, tapi `onClick`-nya kosong. CSS-nya **sudah** punya dua set token warna (default navy + `.dark` abu-abu shadcn) — tinggal butuh logic toggle class `.dark` di `<html>` + simpan preferensi |
| Link TikTok di footer | Belum ada link | Ikon tanpa `<a>`, ditandai `// TODO: belum ada link TikTok resmi` di `Footer.tsx` |
| Link Facebook di footer | Belum resmi | Masih mengarah ke `#`, ditandai `// TODO: ganti dengan link Facebook resmi` di `Footer.tsx` |
| Multi-bahasa (ID/EN) | Di-park | Sempat dibahas, belum dikerjakan. Semua teks hardcode Bahasa Indonesia, tidak ada lapisan i18n |
| Kategori Pulsa & Data | Di-park | Rencana menambah kategori produk baru (isi ulang pulsa/paket data) dari sumber referensi lain — belum masuk katalog |
| Halaman produk fallback (`ComingSoonPage`) | Siap, belum kepakai | Komponen sudah dibuat untuk produk tanpa `GameDetail`, tapi tidak pernah tampil karena seluruh 97 produk sudah lengkap datanya. Siap dipakai kalau ada game baru ditambahkan tanpa data harga dulu |

---

## 5. Optimasi yang Sudah Dilakukan

### SEO

- `app/sitemap.ts` — generate otomatis untuk semua 97 halaman produk + halaman statis, dengan prioritas berjenjang (beranda 1.0, produk 0.8, kalkulator 0.5, invoices/leaderboard 0.3).
- `app/robots.ts` — mem-*block* 11 crawler AI secara eksplisit by user-agent name: `GPTBot`, `ChatGPT-User` (OpenAI), `Google-Extended` (Gemini/AI training opt-out Google), `CCBot` (Common Crawl), `anthropic-ai`, `ClaudeBot` (Anthropic), `Bytespider` (ByteDance/TikTok), `PerplexityBot`, `Diffbot`, `Omgilibot` (Webz.io), `FacebookBot` (Meta AI training) — sambil **tetap mengizinkan Googlebot Search** mengindeks normal (hanya token opt-out training AI Google yang diblokir, bukan Googlebot pencarian).
- Halaman auth (`/masuk`, `/daftar`) dan legal (kebijakan privasi, syarat & ketentuan) sengaja dikecualikan dari crawling *dan* sitemap — tidak ada nilai pencarian.
- Meta description dibangun otomatis per game dari `descriptionIntro` masing-masing (`lib/seo.ts`, dipotong rapi di batas kata, maks 160 karakter) — bukan teks generik yang sama untuk semua halaman.
- JSON-LD Product schema di tiap halaman produk (harga termurah, rating, brand) untuk rich snippet di hasil pencarian.

### Performa

- Semua gambar lewat `next/image` dengan atribut `sizes` spesifik per breakpoint, bukan satu ukuran generik.
- Font di-self-host lewat `next/font`, tidak ada request runtime ke Google Fonts.

### Aksesibilitas

- `aria-label` di semua tombol berbasis ikon.
- `aria-expanded` di dropdown/menu (kalkulator dropdown, mobile menu).
- `alt` text di semua gambar produk.
- Ring focus (`focus:ring`) yang terlihat di elemen interaktif.

### Responsive design

Memakai breakpoint standar Tailwind, konsisten di seluruh halaman:

| Breakpoint | Lebar | Contoh pemakaian |
|---|---|---|
| `sm` | 640px | Grid katalog awal |
| `md` | 768px | Grid katalog 2 → 3 kolom, search bar desktop muncul |
| `lg` | 1024px | Tab Transaksi/Keterangan hilang (desktop tampilkan semua sekaligus) |
| `xl` | 1280px | Lebar kartu game maksimal di grid |

### Branding

Pengecekan menyeluruh (case-insensitive, grep di seluruh `frontend/src/`) untuk sisa nama lama **"Xinnstore"** — **nihil hasil**. Branding "KINZSTORE" sudah 100% bersih di semua file.

---

## 6. Statistik Cepat & Route Table

| Metrik | Angka |
|---|---|
| Total produk (game + voucher) | 97 (84 game + 13 voucher) |
| Total halaman statis di-build | 112 |
| File `lib/*.ts` | 13 |
| File `components/**/*.tsx` | 15 |
| Baris data produk (`lib/game-details*.ts`) | ~4.900 |
| Sisa referensi "Xinnstore" ditemukan | 0 |

### Route table

| Route | Kategori | Tipe | Keterangan |
|---|---|---|---|
| `/` | Statis | Static | Beranda — katalog + Populer Sekarang |
| `/[slug]` | Game/Voucher | SSG × 97 | Halaman detail & beli tiap produk (`generateStaticParams`) |
| `/calculator/winrate` | Calculator | Static | Kalkulator Win Rate |
| `/calculator/magic-wheel` | Calculator | Static | Kalkulator Magic Wheel |
| `/calculator/zodiac` | Calculator | Static | Kalkulator Zodiac |
| `/invoices` | Statis | Static | Cek Transaksi (UI saja) |
| `/leaderboard` | Statis | Static | Top 10 pembelian (UI saja) |
| `/masuk` | Auth | Static | Login (UI saja, tanpa header/footer) |
| `/daftar` | Auth | Static | Register (UI saja, tanpa header/footer) |
| `/kebijakan-privasi` | Legal | Static | Dikecualikan dari sitemap & crawling |
| `/syarat-ketentuan` | Legal | Static | Dikecualikan dari sitemap & crawling |
| `/sitemap.xml` | Statis | Generated | Auto dari `GAMES` + `VOUCHERS` |
| `/robots.txt` | Statis | Generated | Aturan crawler + block AI bot |
| `/_not-found` | Statis | Static | Halaman 404 |

Contoh slug produk (dari total 97): `/mobile-legends`, `/free-fire`, `/free-fire-max`, `/pubg-mobile`, `/magic-chess-go-go`, `/point-blank`, `/kings-choice`, `/roblox-voucher`, `/steam-wallet`, `/google-play`, dst. — daftar lengkap ada di `RAW_GAMES` dan `RAW_VOUCHERS` pada `frontend/src/lib/game-data.ts`.
