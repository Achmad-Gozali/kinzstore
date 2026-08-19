import type { GameDetail } from "@/types/game";
import { variant, createPaymentGroups } from "./game-detail-helpers";

function voucherSteps(): GameDetail["descriptionSteps"] {
  return [
    "Cara beli voucher :",
    "1) Tentukan Jumlah Pembelian",
    "2) Pilih Nominal",
    "3) Pilih Pembayaran",
    "4) Masukkan Kode Promo (jika ada)",
    "5) Isi Detail Kontak",
    "6) Klik Pesan Sekarang dan lakukan Pembayaran",
    "7) Kode voucher akan muncul di halaman invoice",
    "8) Selesai",
  ];
}

const BLIZZARD_GIFT_CARD: GameDetail = {
  slug: "blizzard-gift-card",
  name: "Blizzard Gift Card",
  publisher: "Blizzard Entertainment",
  image: "/vouchers/blizzard-gift-card.webp",
  rating: 0,
  ratingCount: "0",
  categories: [
    {
      emoji: "",
      label: "Voucher",
      items: [
        variant("Blizzard GC (IDR) 75.000", 81049, { icon: null }),
        variant("Blizzard GC (IDR) 150.000", 162096, { icon: null }),
        variant("Blizzard GC (IDR) 300.000", 318844, { icon: null }),
        variant("Blizzard GC (US) $20", 318844, { icon: null }),
      ],
    },
  ],
  paymentGroups: createPaymentGroups(),
  descriptionTitle: "Deskripsi Blizzard Gift Card",
  descriptionIntro: "Top up Blizzard Gift Card harga paling murah, aman, cepat, dan terpercaya hanya di ALIGO.",
  descriptionSteps: voucherSteps(),
};

const GARENA_SHELL: GameDetail = {
  slug: "garena-shell",
  name: "Garena Shell",
  publisher: "Garena",
  image: "/vouchers/garena-shell.webp",
  rating: 5.0,
  ratingCount: "16",
  categories: [
    {
      emoji: "",
      label: "Voucher",
      items: [
        variant("33 Shells", 9675, { icon: null }),
        variant("66 Shells", 19311, { icon: null }),
        variant("165 Shells", 48275, { icon: null }),
        variant("330 Shell", 96548, { icon: null }),
      ],
    },
  ],
  paymentGroups: createPaymentGroups(),
  descriptionTitle: "Deskripsi Garena Shell",
  descriptionIntro: "Top up Garena Shell harga paling murah, aman, cepat, dan terpercaya hanya di ALIGO.",
  descriptionSteps: voucherSteps(),
};

const GOOGLE_PLAY: GameDetail = {
  slug: "google-play",
  name: "Google Play",
  publisher: "Google LLC",
  image: "/vouchers/google-play.webp",
  rating: 5.0,
  ratingCount: "0.93rb",
  categories: [
    {
      emoji: "",
      label: "Voucher",
      items: [
        variant("10.000 IDR", 10556, { icon: null }),
        variant("16.000 IDR", 16688, { icon: null }),
        variant("20.000 IDR", 21014, { icon: null }),
        variant("50.000 IDR", 52778, { icon: null }),
        variant("100.000 IDR", 105556, { icon: null }),
        variant("150.000 IDR", 158334, { icon: null }),
        variant("300.000 IDR", 316665, { icon: null }),
        variant("500.000 IDR", 527773, { icon: null }),
      ],
    },
  ],
  paymentGroups: createPaymentGroups(),
  descriptionTitle: "Deskripsi Google Play",
  descriptionIntro: "Top up Google Play harga paling murah, aman, cepat, dan terpercaya hanya di ALIGO.",
  descriptionSteps: voucherSteps(),
};

const IMVU_VOUCHER: GameDetail = {
  slug: "imvu-voucher",
  name: "IMVU Voucher",
  publisher: "IMVU, Inc.",
  image: "/vouchers/imvu-voucher.webp",
  rating: 0,
  ratingCount: "0",
  categories: [
    {
      emoji: "",
      label: "Voucher",
      items: [
        variant("IMVU $10", 182950, { icon: null }),
        variant("IMVU $25", 457390, { icon: null }),
        variant("IMVU $50", 914985, { icon: null }),
      ],
    },
  ],
  paymentGroups: createPaymentGroups(),
  descriptionTitle: "Deskripsi IMVU Voucher",
  descriptionIntro: "Top up IMVU Voucher harga paling murah, aman, cepat, dan terpercaya hanya di ALIGO.",
  descriptionSteps: voucherSteps(),
};

const ITUNES: GameDetail = {
  slug: "itunes",
  name: "Itunes",
  publisher: "Apple Inc",
  image: "/vouchers/itunes.webp",
  rating: 5.0,
  ratingCount: "6",
  categories: [
    {
      emoji: "",
      label: "Voucher",
      items: [
        variant("iTunes US $2", 35859, { icon: null }),
        variant("iTunes US $3", 53788, { icon: null }),
        variant("iTunes US $4", 71717, { icon: null }),
        variant("iTunes US $15", 268936, { icon: null }),
        variant("iTunes US $20", 358580, { icon: null }),
        variant("iTunes US $30", 537871, { icon: null }),
        variant("iTunes US $50", 896451, { icon: null }),
        variant("iTunes US $100", 1792900, { icon: null }),
        variant("iTunes US $300", 5378700, { icon: null }),
      ],
    },
  ],
  paymentGroups: createPaymentGroups(),
  descriptionTitle: "Deskripsi Itunes",
  descriptionIntro: "Top up Itunes harga paling murah, aman, cepat, dan terpercaya hanya di ALIGO.",
  descriptionSteps: voucherSteps(),
};

const MI_CASH: GameDetail = {
  slug: "mi-cash",
  name: "MI Cash",
  publisher: "Megaxus",
  image: "/vouchers/mi-cash.webp",
  rating: 5.0,
  ratingCount: "62",
  categories: [
    {
      emoji: "",
      label: "Voucher",
      items: [
        variant("10.000 Mi-Cash", 11505, { icon: null }),
        variant("20.000 Mi-Cash", 23008, { icon: null }),
        variant("50.000 Mi-Cash", 57517, { icon: null }),
        variant("100.000 Mi-Cash", 115033, { icon: null }),
        variant("210.000 Mi-Cash", 225802, { icon: null }),
        variant("550.000 Mi-Cash", 583828, { icon: null }),
      ],
    },
  ],
  paymentGroups: createPaymentGroups(),
  descriptionTitle: "Deskripsi MI Cash",
  descriptionIntro: "Top up MI Cash harga paling murah, aman, cepat, dan terpercaya hanya di ALIGO.",
  descriptionSteps: voucherSteps(),
};

const NINTENDO_ESHOP: GameDetail = {
  slug: "nintendo-eshop",
  name: "Nintendo Eshop",
  publisher: "Nintendo",
  image: "/vouchers/nintendo-eshop.webp",
  rating: 5.0,
  ratingCount: "42",
  categories: [
    {
      emoji: "",
      label: "Voucher",
      items: [
        variant("Nintendo $10", 169132, { icon: null }),
        variant("Nintendo $20", 338263, { icon: null }),
        variant("Nintendo $50", 845658, { icon: null }),
      ],
    },
  ],
  paymentGroups: createPaymentGroups(),
  descriptionTitle: "Deskripsi Nintendo Eshop",
  descriptionIntro: "Top up Nintendo Eshop harga paling murah, aman, cepat, dan terpercaya hanya di ALIGO.",
  descriptionSteps: voucherSteps(),
};

const PLAYSTATION_GIFT_CARD: GameDetail = {
  slug: "play-station-psn-gift-card",
  name: "Play Station (PSN Gift Card)",
  publisher: "Sony Interactive Entertainment",
  image: "/vouchers/play-station-psn-gift-card.webp",
  rating: 4.97,
  ratingCount: "306",
  categories: [
    {
      emoji: "",
      label: "IDR",
      items: [
        variant("100.000 IDR", 101124, { icon: null }),
        variant("225.000 IDR", 227529, { icon: null }),
        variant("300.000 IDR", 303420, { icon: null }),
        variant("PSN 25 USD", 438301, { icon: null }),
        variant("600.000 IDR", 606744, { icon: null }),
        variant("PSN 50 USD", 876410, { icon: null }),
        variant("1.000.000 IDR", 1011240, { icon: null }),
        variant("PSN 75 USD", 1314710, { icon: null }),
        variant("1.500.000 IDR", 1516860, { icon: null }),
      ],
    },
  ],
  paymentGroups: createPaymentGroups(),
  descriptionTitle: "Deskripsi Play Station (PSN Gift Card)",
  descriptionIntro: "Top up Play Station (PSN Gift Card) harga paling murah, aman, cepat, dan terpercaya hanya di ALIGO.",
  descriptionSteps: voucherSteps(),
};

const POINT_BLANK_VOUCHER: GameDetail = {
  slug: "point-blank-voucher",
  name: "Point Blank Voucher",
  publisher: "Zepetto",
  image: "/vouchers/point-blank-voucher.webp",
  rating: 4.99,
  ratingCount: "3.41rb",
  categories: [
    {
      emoji: "",
      label: "Voucher",
      items: [
        variant("1200 Cash", 9434, { icon: null }),
        variant("2400 Cash", 18868, { icon: null }),
        variant("6000 Cash", 47170, { icon: null }),
        variant("12000 Cash", 94340, { icon: null }),
        variant("24000 Cash", 188680, { icon: null }),
        variant("36000 Cash", 283020, { icon: null }),
        variant("60000 Cash", 471700, { icon: null }),
      ],
    },
  ],
  paymentGroups: createPaymentGroups(),
  descriptionTitle: "Deskripsi Point Blank Voucher",
  descriptionIntro: "Top up Point Blank Voucher harga paling murah, aman, cepat, dan terpercaya hanya di ALIGO.",
  descriptionSteps: voucherSteps(),
};

const RAZER_GOLD: GameDetail = {
  slug: "razer-gold",
  name: "Razer Gold",
  publisher: "Razer Inc.",
  image: "/vouchers/razer-gold.webp",
  rating: 0,
  ratingCount: "0",
  categories: [
    {
      emoji: "",
      label: "Voucher",
      items: [
        variant("10.000 Razer Gold ID", 10115, { icon: null }),
        variant("50.000 Razer Gold ID", 50571, { icon: null }),
        variant("100.000 Razer Gold ID", 101140, { icon: null }),
        variant("200.000 Razer Gold ID", 202280, { icon: null }),
        variant("500.000 Razer Gold ID", 505699, { icon: null }),
        variant("1.000.000 Razer Gold ID", 1011396, { icon: null }),
      ],
    },
  ],
  paymentGroups: createPaymentGroups(),
  descriptionTitle: "Deskripsi Razer Gold",
  descriptionIntro: "Top up Razer Gold harga paling murah, aman, cepat, dan terpercaya hanya di ALIGO.",
  descriptionSteps: voucherSteps(),
};

const STEAM_WALLET: GameDetail = {
  slug: "steam-wallet",
  name: "Steam Wallet",
  publisher: "Valve",
  image: "/vouchers/steam-wallet.webp",
  rating: 4.98,
  ratingCount: "2.14rb",
  categories: [
    {
      emoji: "",
      label: "Voucher",
      items: [
        variant("12.000 IDR", 12983, { icon: null }),
        variant("45.000 IDR", 48811, { icon: null }),
        variant("60.000 IDR", 64914, { icon: null }),
        variant("90.000 IDR", 97319, { icon: null }),
        variant("120.000 IDR", 129625, { icon: null }),
        variant("250.000 IDR", 270217, { icon: null }),
        variant("400.000 IDR", 432245, { icon: null }),
        variant("600.000 IDR", 694165, { icon: null }),
      ],
    },
  ],
  paymentGroups: createPaymentGroups(),
  descriptionTitle: "Deskripsi Steam Wallet",
  descriptionIntro: "Top up Steam Wallet harga paling murah, aman, cepat, dan terpercaya hanya di ALIGO.",
  descriptionSteps: voucherSteps(),
};

const VALORANT_VOUCHER: GameDetail = {
  slug: "valorant-voucher",
  name: "Valorant Voucher",
  publisher: "Riot Games",
  image: "/vouchers/valorant-voucher.webp",
  rating: 5.0,
  ratingCount: "4",
  idLabel: "ID",
  idNote: "Please make sure you fill the correct account data",
  categories: [
    {
      emoji: "",
      label: "Voucher",
      items: [
        variant("Riot Cash - 45000 (IDR)", 45001, { icon: null }),
        variant("Riot Cash - 75000 (IDR)", 74832, { icon: null }),
        variant("Riot Cash - 149000 (IDR)", 149664, { icon: null }),
        variant("Riot Cash - 219000 (IDR)", 219440, { icon: null }),
        variant("Riot Cash - 359000 (IDR)", 360002, { icon: null }),
        variant("Riot Cash - 739000 (IDR)", 741239, { icon: null }),
      ],
    },
  ],
  paymentGroups: createPaymentGroups(),
  descriptionTitle: "Deskripsi Valorant Voucher",
  descriptionIntro: "Top up Valorant Voucher harga paling murah, aman, cepat, dan terpercaya hanya di ALIGO.",
  descriptionSteps: voucherSteps(),
};

export const GAME_DETAILS_8: Record<string, GameDetail> = {
  [BLIZZARD_GIFT_CARD.slug]: BLIZZARD_GIFT_CARD,
  [GARENA_SHELL.slug]: GARENA_SHELL,
  [GOOGLE_PLAY.slug]: GOOGLE_PLAY,
  [IMVU_VOUCHER.slug]: IMVU_VOUCHER,
  [ITUNES.slug]: ITUNES,
  [MI_CASH.slug]: MI_CASH,
  [NINTENDO_ESHOP.slug]: NINTENDO_ESHOP,
  [PLAYSTATION_GIFT_CARD.slug]: PLAYSTATION_GIFT_CARD,
  [POINT_BLANK_VOUCHER.slug]: POINT_BLANK_VOUCHER,
  [RAZER_GOLD.slug]: RAZER_GOLD,
  [STEAM_WALLET.slug]: STEAM_WALLET,
  [VALORANT_VOUCHER.slug]: VALORANT_VOUCHER,
};
