// TODO DEMO SEMENTARA — BUKAN sistem autentikasi production sungguhan.
// - Kredensial di-hardcode di client-side (tidak ada hashing, tidak ada backend/database).
// - "Session" hanyalah cookie penanda `1` yang di-set langsung dari browser (document.cookie),
//   sehingga siapa pun bisa memalsukannya lewat DevTools — cookie ini TIDAK diverifikasi
//   oleh server, hanya dicek keberadaannya oleh src/proxy.ts untuk memproteksi /dashboard.
// Ganti seluruh mekanisme ini dengan session/JWT yang diverifikasi di server (mis. NextAuth,
// atau endpoint login sungguhan + cookie httpOnly yang di-set oleh server) sebelum go-live.

export const DEMO_SESSION_COOKIE = "kinzstore_demo_session";
export const DEMO_USERNAME = "admin";
export const DEMO_PASSWORD = "admin123";

const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 jam

/** Hanya dipanggil dari client (browser). */
export function setDemoSession() {
  document.cookie = `${DEMO_SESSION_COOKIE}=1; path=/; max-age=${MAX_AGE_SECONDS}; samesite=lax`;
}

/** Hanya dipanggil dari client (browser). */
export function clearDemoSession() {
  document.cookie = `${DEMO_SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

/** Hanya dipanggil dari client (browser) — cek status login demo, bukan cuma halaman aktif. */
export function hasDemoSession(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").some((c) => c.startsWith(`${DEMO_SESSION_COOKIE}=`));
}
