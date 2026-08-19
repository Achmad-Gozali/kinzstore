import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEMO_SESSION_COOKIE } from "@/lib/auth-demo";

// TODO DEMO SEMENTARA — proteksi ini hanya mengecek KEBERADAAN cookie penanda
// login (di-set client-side, lihat src/lib/auth-demo.ts), bukan memverifikasi
// session/token sungguhan di server. Ganti dengan pengecekan session/JWT yang
// sah begitu sistem autentikasi Kinzstore sudah tersedia.
export function proxy(request: NextRequest) {
  const hasSession = request.cookies.has(DEMO_SESSION_COOKIE);
  if (!hasSession) {
    return NextResponse.redirect(new URL("/masuk", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
