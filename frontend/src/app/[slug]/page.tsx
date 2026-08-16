import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { GAMES, VOUCHERS } from "@/lib/game-data";
import { getGameDetail } from "@/lib/game-details";
import { ProductHero } from "@/components/product/ProductHero";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { DescriptionSection } from "@/components/product/DescriptionSection";

const ALL_ITEMS = [...GAMES, ...VOUCHERS];

export function generateStaticParams() {
  return ALL_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = ALL_ITEMS.find((g) => g.slug === slug);
  if (!item) return {};
  return {
    title: `Top Up ${item.name} Termurah, Beli Harga Paling Murah - KINZSTORE`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = ALL_ITEMS.find((g) => g.slug === slug);
  if (!item) notFound();

  const detail = getGameDetail(slug);

  if (!detail) {
    return (
      <main className="relative flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-gradient-theme px-4 text-center">
        <div className="relative size-24 overflow-hidden rounded-2xl">
          <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
        </div>
        <h1 className="text-xl font-bold">{item.name}</h1>
        <p className="text-sm text-muted-foreground">
          Detail produk untuk {item.name} segera hadir. Silakan cek kembali nanti.
        </p>
      </main>
    );
  }

  return (
    <main className="relative bg-gradient-theme pb-20 sm:pb-28 md:pb-36">
      <ProductHero detail={detail} />
      <PurchasePanel detail={detail}>
        <DescriptionSection detail={detail} />
      </PurchasePanel>
    </main>
  );
}
