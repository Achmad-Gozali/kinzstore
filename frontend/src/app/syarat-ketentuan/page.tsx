import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { WHATSAPP_NUMBER } from "@/lib/game-data";

const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat & ketentuan penggunaan layanan top up game dan voucher digital ALIGO.",
};

export default function SyaratKetentuanPage() {
  return (
    <LegalPageLayout
      title="Syarat & Ketentuan"
      lastUpdated="17 Agustus 2026"
      intro="Dengan menggunakan layanan ALIGO, kamu dianggap telah membaca, memahami, dan menyetujui syarat & ketentuan berikut. Mohon dibaca dengan saksama sebelum melakukan transaksi."
      sections={[
        {
          heading: "1. Definisi Layanan",
          body: (
            <p>
              ALIGO adalah platform online yang menyediakan layanan top up (isi ulang) item dalam game dan
              penjualan voucher digital, seperti diamond, UC, voucher gift card, dan produk digital sejenis. Layanan
              disediakan untuk berbagai game dan penyedia voucher yang terdaftar di situs ini.
            </p>
          ),
        },
        {
          heading: "2. Ketentuan Penggunaan",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                Pengguna bertanggung jawab penuh atas kebenaran data yang dimasukkan saat pemesanan, termasuk namun
                tidak terbatas pada ID akun game, Server, Alamat Email, dan No. WhatsApp.
              </li>
              <li>Pengguna wajib berusia cukup untuk memiliki dan mengelola akun game/voucher yang di-top up.</li>
              <li>
                Akun yang didaftarkan di ALIGO (Nama Lengkap, Username, Alamat Email, No. WhatsApp, Kata Sandi)
                harus diisi dengan data yang valid dan menjadi tanggung jawab pemilik akun untuk menjaga
                kerahasiaan kata sandinya.
              </li>
              <li>Dilarang menyalahgunakan layanan untuk aktivitas yang melanggar hukum yang berlaku di Indonesia.</li>
            </ul>
          ),
        },
        {
          heading: "3. Kebijakan Pemesanan & Pembayaran",
          body: (
            <p>
              Pesanan diproses setelah pembayaran berhasil dikonfirmasi melalui metode pembayaran yang tersedia di
              situs. Waktu proses top up bervariasi tergantung penyedia layanan game/voucher terkait. Pengguna akan
              menerima informasi status pesanan melalui halaman Cek Transaksi dan/atau kontak yang didaftarkan saat
              pemesanan.
            </p>
          ),
        },
        {
          heading: "4. Kebijakan Refund & Pembatalan",
          body: (
            <p>
              Karena sifat produk digital yang langsung diproses setelah pembayaran dikonfirmasi, pesanan yang telah
              berhasil masuk ke akun/ID tujuan bersifat final dan tidak dapat dikembalikan (non-refundable). Refund
              hanya dapat dipertimbangkan apabila terjadi kesalahan yang murni berasal dari sistem ALIGO (misalnya
              item tidak masuk meskipun pembayaran telah dikonfirmasi berhasil dan data yang dimasukkan pengguna sudah
              benar). Kesalahan input data oleh pengguna (ID/Server yang salah, dsb.) bukan tanggung jawab ALIGO
              dan tidak dapat direfund.
            </p>
          ),
        },
        {
          heading: "5. Batasan Tanggung Jawab",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                ALIGO tidak bertanggung jawab atas kegagalan transaksi yang disebabkan oleh kesalahan data yang
                dimasukkan pengguna (ID, Server, Email, No. WhatsApp yang tidak sesuai).
              </li>
              <li>
                ALIGO tidak bertanggung jawab atas gangguan yang berasal dari pihak ketiga di luar kendali kami,
                termasuk gangguan pada server penyedia game/voucher atau penyedia metode pembayaran.
              </li>
              <li>
                Layanan disediakan &ldquo;sebagaimana adanya&rdquo;; kami berupaya menjaga ketersediaan layanan namun
                tidak menjamin situs bebas dari gangguan sepenuhnya.
              </li>
            </ul>
          ),
        },
        {
          heading: "6. Perubahan Ketentuan",
          body: (
            <p>
              ALIGO berhak mengubah, menambah, atau memperbarui syarat & ketentuan ini sewaktu-waktu tanpa
              pemberitahuan sebelumnya. Perubahan akan berlaku sejak dipublikasikan di halaman ini, dengan tanggal
              &ldquo;Terakhir diperbarui&rdquo; yang diperbarui sesuai.
            </p>
          ),
        },
        {
          heading: "7. Kontak",
          body: (
            <p>
              Untuk pertanyaan seputar syarat & ketentuan ini, silakan hubungi kami melalui WhatsApp di{" "}
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
