export interface GameItem {
  name: string;
  slug: string;
  image: string;
}

export interface PopularItem extends GameItem {
  publisher: string;
}

export interface NominalVariant {
  id: string;
  name: string;
  price: number;
  instant?: boolean;
  note?: string;
  /** undefined = default diamond icon, null = no icon, string = specific icon path */
  icon?: string | null;
}

export interface NominalCategory {
  emoji: string;
  label: string;
  items: NominalVariant[];
}

export interface PaymentOption {
  name: string;
  logo: string;
  fee?: string;
  note?: string;
}

export interface PaymentGroup {
  id: string;
  label: string;
  featured?: boolean;
  logo?: string;
  badge?: string;
  info?: string;
  options: PaymentOption[];
}

export interface DescriptionStep {
  text: string;
  linkText: string;
  linkHref: string;
}

export interface GameDetail {
  slug: string;
  name: string;
  publisher: string;
  image: string;
  rating: number;
  ratingCount: string;
  idLabel?: string;
  serverLabel?: string;
  idTooltip?: string;
  idNote?: string;
  categories: NominalCategory[];
  paymentGroups: PaymentGroup[];
  descriptionTitle: string;
  descriptionIntro: string;
  descriptionSteps: (string | DescriptionStep)[];
}
