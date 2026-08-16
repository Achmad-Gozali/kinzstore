import type { NominalVariant, PaymentGroup } from "@/types/game";

export function variant(name: string, price: number, opts?: Partial<NominalVariant>): NominalVariant {
  return { id: name, name, price, instant: true, ...opts };
}

export function createPaymentGroups(): PaymentGroup[] {
  return [
    {
      id: "qris",
      label: "Qris (All Payment)",
      featured: true,
      logo: "/payment/qris.webp",
      badge: "BEST PRICE",
      info: "Min. Rp 1.000",
      options: [],
    },
    {
      id: "ewallet",
      label: "E-Wallet",
      options: [
        { name: "OVO", logo: "/payment/ovo.webp", fee: "Rp 3.639", note: "Pakai Aplikasi OVO" },
        { name: "DOKU Wallet", logo: "/payment/doku.jpg", fee: "Rp 2.500", note: "Realtime" },
        { name: "DANA", logo: "/payment/dana.webp", fee: "Rp 2.500", note: "Pakai Aplikasi DANA" },
        { name: "GoPay", logo: "/payment/gopay.webp", fee: "Rp 3.000", note: "Pakai Aplikasi GoPay" },
        { name: "ShopeePay", logo: "/payment/shopeepay.webp", fee: "Rp 3.000", note: "Pakai Aplikasi Shopee" },
        { name: "LinkAja", logo: "/payment/linkaja.webp", fee: "Rp 2.000", note: "Pakai Aplikasi LinkAja" },
      ],
    },
    {
      id: "va",
      label: "Virtual Account",
      options: [
        { name: "Maybank", logo: "/payment/maybank-va.webp", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "BNI", logo: "/payment/bni-va.webp", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "BSI", logo: "/payment/bsi-va.png", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "BRIVA (BRI)", logo: "/payment/bri-va.webp", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "Bank Sinarmas", logo: "/payment/sinarmas-va.webp", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "Bank Neo Commerce", logo: "/payment/bank-neo-va.webp", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "Danamon", logo: "/payment/danamon-va.webp", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "PermataBank", logo: "/payment/permata-va.webp", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "BCA", logo: "/payment/bca-va.webp", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "Mandiri", logo: "/payment/mandiri-va.webp", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "OCBC", logo: "/payment/ocbc-va.png", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "DOKU Wallet", logo: "/payment/doku.jpg", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "Bank Muamalat", logo: "/payment/muamalat-va.png", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "CIMB Niaga", logo: "/payment/cimb-niaga-va.webp", fee: "Rp 4.000", note: "Min. Rp 10.000" },
        { name: "Bank BTN", logo: "/payment/btn-va.png", fee: "Rp 4.000", note: "Min. Rp 10.000" },
      ],
    },
    {
      id: "cstore",
      label: "Convenience Store",
      options: [
        { name: "Indomaret", logo: "/payment/indomaret.webp", fee: "Fee= 2300", note: "Pengecekan membutuhkan waktu 5-15 menit" },
        { name: "Alfamart", logo: "/payment/alfamart.webp", fee: "Fee= 2300", note: "Pengecekan membutuhkan waktu 5-15 menit" },
      ],
    },
    {
      id: "bank",
      label: "Transfer Bank",
      options: [
        { name: "BRI", logo: "/payment/bri-transfer.webp", fee: "Rp 5.000", note: "Konfirmasi manual, cek berkala" },
        { name: "BNI", logo: "/payment/bni-transfer.webp", fee: "Rp 5.000", note: "Konfirmasi manual, cek berkala" },
        { name: "Mandiri", logo: "/payment/mandiri-transfer.webp", fee: "Rp 5.000", note: "Konfirmasi manual, cek berkala" },
      ],
    },
  ];
}
