import type { MetadataRoute } from "next";
import { GAMES, VOUCHERS } from "@/lib/game-data";
import { SITE_URL } from "@/lib/seo";

const STATIC_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/calculator/winrate", priority: 0.5, changeFrequency: "monthly" },
  { path: "/calculator/magic-wheel", priority: 0.5, changeFrequency: "monthly" },
  { path: "/calculator/zodiac", priority: 0.5, changeFrequency: "monthly" },
  { path: "/invoices", priority: 0.3, changeFrequency: "monthly" },
  { path: "/leaderboard", priority: 0.3, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // GameDetail has no per-product "updatedAt" field yet, so build time is the best available
  // fallback for lastModified. Adding a real updatedAt to the data model would let this reflect
  // actual price/nominal changes instead of the deploy timestamp.
  const buildDate = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: buildDate,
    changeFrequency,
    priority,
  }));

  const productEntries: MetadataRoute.Sitemap = [...GAMES, ...VOUCHERS].map((item) => ({
    url: `${SITE_URL}/${item.slug}`,
    lastModified: buildDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
