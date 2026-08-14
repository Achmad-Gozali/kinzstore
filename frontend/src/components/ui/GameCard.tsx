import Image from "next/image";
import type { GameItem } from "@/types/game";

export function GameCard({ item, subtitle }: { item: GameItem; subtitle?: string }) {
  return (
    <a href="#" className="relative block">
      <div className="group relative transform overflow-hidden rounded-[16px] bg-muted duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background">
        <Image
          src={item.image}
          alt={item.name}
          width={400}
          height={600}
          className="aspect-4/6 w-full object-cover object-center"
        />
        <article className="absolute inset-x-0 -bottom-10 z-10 flex transform flex-col px-3 transition-all duration-300 ease-in-out group-hover:bottom-3 sm:px-4 group-hover:sm:bottom-4">
          <h2 className="truncate text-sm font-semibold text-foreground sm:text-base">{item.name}</h2>
          {subtitle && <p className="truncate text-xxs text-foreground sm:text-xs">{subtitle}</p>}
        </article>
        <div className="absolute inset-0 transform bg-gradient-to-t from-transparent transition-all duration-300 group-hover:from-background" />
      </div>
    </a>
  );
}
