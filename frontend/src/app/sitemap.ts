import type { MetadataRoute } from "next";
import { GAMES, VOUCHERS } from "@/lib/game-data";
import { SITE_URL } from "@/lib/seo";

const STATIC_ROUTES = [
  { path: "", priority: 1 },
  { path: "/calculator/winrate", priority: 0.5 },
  { path: "/calculator/magic-wheel", priority: 0.5 },
  { path: "/calculator/zodiac", priority: 0.5 },
  { path: "/invoices", priority: 0.5 },
  { path: "/leaderboard", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    priority,
  }));

  const productEntries: MetadataRoute.Sitemap = [...GAMES, ...VOUCHERS].map((item) => ({
    url: `${SITE_URL}/${item.slug}`,
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
