import type { GameDetail } from "@/types/game";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aligo.id").replace(/\/$/, "");

const MAX_DESCRIPTION_LENGTH = 160;

/** Truncates on a word boundary so the meta description never cuts off mid-word. */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const sliced = text.slice(0, maxLength - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${sliced.slice(0, lastSpace > 0 ? lastSpace : maxLength - 1)}…`;
}

/** Builds a unique, per-game meta description from data already on the GameDetail, no hardcoding. */
export function buildGameMetaDescription(detail: GameDetail | undefined, fallbackName: string): string {
  if (!detail) {
    return truncate(
      `Top up ${fallbackName} harga paling murah, aman, dan cepat hanya di ALIGO. Proses instan 24 jam dengan metode pembayaran terlengkap.`,
      MAX_DESCRIPTION_LENGTH
    );
  }
  return truncate(detail.descriptionIntro, MAX_DESCRIPTION_LENGTH);
}

/** Returns the lowest nominal price across all categories, used for Product structured data. */
export function getCheapestPrice(detail: GameDetail): number | null {
  const prices = detail.categories.flatMap((category) => category.items.map((item) => item.price));
  return prices.length ? Math.min(...prices) : null;
}
