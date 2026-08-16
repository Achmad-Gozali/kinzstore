import type { Metadata } from "next";
import { IBM_Plex_Sans_Condensed } from "next/font/google";
import "./globals.css";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";
import { SITE_URL } from "@/lib/seo";

const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-ibm-plex-sans-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KINZSTORE - TopUp Game Termurah",
    template: "%s - KINZSTORE",
  },
  description:
    "Suplier TopUp Game Online termurah, Proses cepat serta open 24 Jam dengan metode pembayaran terlengkap di Indonesia",
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${ibmPlexSansCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConditionalChrome>{children}</ConditionalChrome>
      </body>
    </html>
  );
}
