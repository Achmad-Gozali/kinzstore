import type { GameItem, PopularItem } from "@/types/game";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toGame(name: string, ext: string, dir: "games" | "vouchers"): GameItem {
  const slug = slugify(name);
  return {
    name,
    slug,
    image: `/${dir}/${slug}.${ext}`,
  };
}

const RAW_GAMES: [string, string][] = [
  ["Mobile Legends", "webp"], ["Free Fire", "webp"], ["Free Fire MAX", "jpg"], ["PUBG Mobile", "webp"], ["Magic Chess : Go Go", "webp"], ["Octopath Traveler CotC", "webp"], ["Moonlight Blade M", "webp"],
  ["Kingdom The Blood", "webp"], ["Tarisland", "webp"], ["Arena Breakout", "webp"], ["Arena of Valor", "webp"],
  ["Be The King", "webp"], ["BLEACH Mobile 3D", "webp"], ["Blood Strike", "webp"], ["Call of Duty Mobile", "jpg"],
  ["Cloud Song : Saga of Skywalkers", "webp"], ["Conquer Online", "webp"], ["Dark Continent Mist", "webp"],
  ["Daybreak Legends", "jpeg"], ["Dragon Raja", "webp"], ["Dunk City Dynasty", "webp"], ["Echocalypse", "webp"], ["EGGY PARTY", "webp"], ["Ensemble Stars Music", "webp"], ["Eudemons Online", "webp"],
  ["Farlight84", "jpg"], ["FC Mobile", "webp"], ["Football Master 2", "webp"], ["Garena Undawn", "webp"], ["Goddess of Victory: Nikke", "webp"], ["Growtopia", "webp"], ["Guns of Glory", "webp"], ["Harry Potter Magic Awakened", "jpg"],
  ["Hatsune Miku : Colorful Stage", "webp"], ["Heroes Evolved", "webp"], ["Honkai Impact 3", "webp"], ["Honor of Kings", "webp"], ["Identity V", "webp"],
  ["Idle Legends : GODS SAGA", "webp"], ["Infinite Borders", "webp"], ["Jade Legends", "webp"], ["King of Avalon", "webp"], ["Kings Choice", "webp"], ["Laplace M", "webp"], ["League of Legends : PC", "webp"], ["League of Legends : Wild Rift", "jpg"],
  ["Legacy Fate Sacred Fearless", "webp"], ["Legends of Runeterra", "webp"], ["King of Kings", "webp"], ["Life After", "webp"], ["Life Makeover", "webp"], ["Light of Thel : New Era", "webp"], ["Lords Mobile", "webp"], ["Love and Deepspace", "webp"],
  ["Luna Online New World", "webp"], ["Madtale", "webp"], ["Maplestory R Evolution", "webp"], ["Marvel Duel", "webp"], ["Marvel Snap", "webp"], ["MARVEL Super War", "webp"], ["Metal Slug : Awakening", "webp"], ["Miko Era : Twelve Myths", "webp"],
  ["Mirage : Perfect Skyline", "webp"], ["Misty Continent", "webp"], ["MU Origin 2", "webp"], ["MU Origin 3", "webp"], ["Naruto : Slugfest X", "webp"], ["Never After", "webp"], ["Omega Legends", "webp"], ["One Punch Man : The Strongest", "webp"],
  ["Perfect World", "webp"], ["Phantasy Star Online 2 : New Genesis", "webp"], ["Pixel Gun 3D", "jpg"], ["Point Blank", "webp"], ["Project Entropy", "webp"], ["PUBG : New State Mobile", "webp"], ["Punishing Gray Raven", "webp"], ["Ragnarok M : Eternal Love", "webp"],
  ["Ragnarok Origin", "jpg"], ["Ragnarok Origin - Package", "webp"], ["Ragnarok X", "webp"], ["Revelation : Infinite Journey", "webp"], ["Rise of Kingdom", "webp"], ["Saint Seiya", "webp"], ["Sausage Man", "webp"], ["Scroll of Onmyoji Sakura Sword", "webp"],
  ["Seal M SEA", "webp"], ["Sky: Children of the Light", "webp"], ["Speed Drifters", "webp"], ["State of Survival: Zombie War", "webp"], ["Stormshot", "webp"], ["Super Mecha Champions", "webp"], ["Super SUS", "webp"], ["Teamfight Tactics Mobile", "webp"],
  ["Time Raiders", "webp"], ["Tom and Jerry: Chase", "webp"], ["Tower Brawl", "webp"], ["Tower of Fantasy", "jpg"], ["Valorant", "jpg"], ["Werewolf (Party Game)", "webp"], ["Whiteout Survival", "webp"], ["YS 6 Mobile", "webp"],
  ["Zepeto", "webp"],
];

const RAW_VOUCHERS: [string, string][] = [
  ["Blizzard Gift Card", "webp"], ["Bstation - Voucher", "webp"], ["Crunchyroll Voucher", "webp"], ["eFootball 2023 - Voucher", "webp"], ["Garena Shell", "webp"], ["Google Play", "webp"], ["Hello Yo", "webp"], ["IMVU Voucher", "webp"],
  ["Itunes", "webp"], ["MI Cash", "webp"], ["Nintendo Eshop", "webp"], ["PK XD Voucher", "webp"], ["Roblox Voucher", "webp"],
];

const RAW_POPULAR: [string, string, string][] = [
  ["Mobile Legends", "Moonton", "webp"],
  ["Free Fire", "Garena", "webp"],
  ["Magic Chess : Go Go", "Vizta Games", "webp"],
  ["Free Fire MAX", "Garena", "jpg"],
  ["PUBG Mobile", "Tencent Games", "webp"],
  ["Point Blank", "Zepetto", "webp"],
  ["Kings Choice", "ONEMT", "webp"],
  ["Roblox Voucher", "Roblox Corporation", "webp"],
];

export const GAMES: GameItem[] = RAW_GAMES.map(([name, ext]) => toGame(name, ext, "games"));
export const VOUCHERS: GameItem[] = RAW_VOUCHERS.map(([name, ext]) => toGame(name, ext, "vouchers"));
export const POPULAR: PopularItem[] = RAW_POPULAR.map(([name, publisher, ext]) => ({
  ...toGame(name, ext, "games"),
  publisher,
}));

export const LOGO_SRC = "/images/logo.jpg";
export const HERO_SRC = "/images/hero-banner.jpg";
