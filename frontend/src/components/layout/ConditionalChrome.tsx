"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

/** Routes that render without the site Header/Footer (e.g. standalone auth placeholder pages). */
const NO_CHROME_ROUTES = ["/masuk", "/daftar"];

export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = NO_CHROME_ROUTES.includes(pathname);

  if (hideChrome) return <>{children}</>;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
