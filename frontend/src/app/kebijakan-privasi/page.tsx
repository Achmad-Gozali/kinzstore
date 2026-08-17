import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { WHATSAPP_NUMBER } from "@/lib/game-data";

const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi KINZSTORE — data apa saja yang kami kumpulkan, cara kami menggunakannya, dan hak kamu atas data tersebut.",
};

export default function KebijakanPrivasiPage() {
  return (
    <LegalPageLayout
      title="Kebijakan Privasi"
      lastUpdated="17 Agustus 2026"
      intro="KINZSTORE menghargai privasi setiap pengguna. Kebijakan ini menjelaskan data apa saja yang kami kumpulkan saat kamu menggunakan layanan top up game dan voucher digital di KINZSTORE, bagaimana data itu digunakan, dan hak yang kamu miliki atas data tersebut."
      sections={[
        {
          heading: "1. Data yang Kami Kumpulkan",
          body: (
            <>
              <p>Kami hanya mengumpulkan data yang benar-benar diperlukan untuk memproses layanan, yaitu:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  <span className="font-medium text-foreground">Data pendaftaran akun</span> — Nama Lengkap,
                  Username, Alamat Email, No. WhatsApp, dan Kata Sandi (tersimpan terenkripsi) saat kamu mendaftar
                  akun.
                </li>
                <li>
                  <span className="font-medium text-foreground">Data transaksi top up</span> — ID akun game, Server
                  (jika game yang kamu top up memerlukannya), No. WhatsApp, dan Alamat Email yang kamu masukkan saat
                  melakukan pemesanan.
                </li>
                <li>
                  <span className="font-medium text-foreground">Data teknis dasar</span> — informasi standar seperti
                  jenis perangkat dan browser yang digunakan untuk memastikan situs berjalan dengan baik.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "2. Penggunaan Data",
          body: (
            <>
              <p>Data yang kamu berikan digunakan untuk:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Memproses pesanan top up game atau voucher digital ke akun/ID yang kamu masukkan.</li>
                <li>Menghubungi kamu melalui WhatsApp atau Email terkait status pesanan, apabila diperlukan.</li>
                <li>Mengelola akun kamu di KINZSTORE, termasuk proses masuk (login) di kemudian hari.</li>
                <li>Meningkatkan kualitas layanan dan mengatasi kendala teknis.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "3. Penyimpanan & Perlindungan Data",
          body: (
            <p>
              Kami berupaya menjaga kerahasiaan dan keamanan data kamu dengan langkah-langkah yang wajar sesuai
              praktik umum industri. Kata sandi akun tidak pernah disimpan dalam bentuk teks biasa. Meski demikian,
              tidak ada sistem penyimpanan data yang sepenuhnya bebas risiko — kami akan terus berupaya meningkatkan
              standar keamanan seiring berkembangnya layanan KINZSTORE.
            </p>
          ),
        },
        {
          heading: "4. Berbagi Data ke Pihak Ketiga",
          body: (
            <p>
              KINZSTORE tidak menjual atau membagikan data pribadimu kepada pihak ketiga untuk tujuan pemasaran. Data
              hanya dapat dibagikan kepada penyedia layanan yang benar-benar diperlukan untuk menjalankan transaksi
              (misalnya penyedia layanan pembayaran, apabila sudah diimplementasikan), dan hanya sebatas data yang
              diperlukan untuk menyelesaikan transaksi tersebut.
            </p>
          ),
        },
        {
          heading: "5. Hak Kamu atas Data",
          body: (
            <>
              <p>Sebagai pengguna, kamu berhak untuk:</p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Meminta informasi mengenai data apa saja yang kami simpan terkait akunmu.</li>
                <li>Meminta koreksi apabila ada data yang tidak akurat.</li>
                <li>Meminta penghapusan data akun, selama tidak bertentangan dengan kewajiban penyimpanan data transaksi yang berlaku.</li>
              </ul>
              <p>Untuk menggunakan hak-hak di atas, silakan hubungi kami melalui kontak pada bagian di bawah.</p>
            </>
          ),
        },
        {
          heading: "6. Perubahan Kebijakan",
          body: (
            <p>
              Kebijakan privasi ini dapat diperbarui sewaktu-waktu mengikuti perkembangan layanan KINZSTORE. Perubahan
              akan tercermin pada tanggal &ldquo;Terakhir diperbarui&rdquo; di bagian atas halaman ini.
            </p>
          ),
        },
        {
          heading: "7. Kontak",
          body: (
            <p>
              Jika kamu memiliki pertanyaan seputar kebijakan privasi ini, silakan hubungi kami melalui WhatsApp di{" "}
              <Link href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                {WHATSAPP_HREF.replace("https://", "")}
              </Link>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
