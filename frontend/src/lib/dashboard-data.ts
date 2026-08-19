// TODO: Ganti seluruh data dummy di file ini dengan data akun & transaksi asli
// begitu sistem autentikasi/session Kinzstore sudah tersedia.

export interface DashboardUser {
  name: string;
  phone: string;
  memberSince: string;
}

/** Placeholder — mencerminkan akun demo ("admin"), belum terhubung ke akun/session sungguhan. */
export const DUMMY_USER: DashboardUser = {
  name: "Administrator",
  phone: "+62xxxxxxxxxx",
  memberSince: "Admin",
};

export const TRANSACTION_STATUS_OPTIONS = [
  "Semua",
  "Menunggu",
  "Sedang Diproses",
  "Selesai",
  "Dibatalkan",
  "Gagal",
];

export const PAYMENT_STATUS_OPTIONS = ["Semua", "Dibayar", "Dikembalikan"];

const today = new Date().toISOString().slice(0, 10);
export const TODAY_DATE = today;
