export interface GameItem {
  name: string;
  slug: string;
  image: string;
}

export interface PopularItem extends GameItem {
  publisher: string;
}
