import type { GameItem } from "@/types/game";

/** First letter of each word, e.g. "Mobile Legends" -> "ML". Lets "ml" match "Mobile Legends". */
function initials(name: string): string {
  return name
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .toLowerCase();
}

export function searchGames(query: string, items: GameItem[], limit = 8): GameItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const matches = items.filter((item) => {
    const name = item.name.toLowerCase();
    return name.includes(q) || initials(item.name).startsWith(q);
  });

  return matches.slice(0, limit);
}
