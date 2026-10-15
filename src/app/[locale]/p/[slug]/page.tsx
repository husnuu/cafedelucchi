import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getProduct, getProductSlugs } from "@/lib/menu/queries";
import { ProductDetail } from "@/components/menu/product-detail";

// Paylaşılan bağlantı veya sayfa yenilemesinde açılan tam sayfa ürün görünümü.
// Menü içinden tıklandığında aynı adres @modal/(.)p/[slug] ile modal olarak açılır.

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/p/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) return {};
  const product = await getProduct(slug, locale);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: { title: product.name, description: product.shortDescription, images: product.image ? [product.image] : [] },
  };
}

export default async function ProductPage({ params }: PageProps<"/[locale]/p/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  const product = await getProduct(slug, locale);
  if (!product) notFound();
  const t = getDictionary(locale);
  const backHref = product.groupSlug ? `/${locale}/g/${product.groupSlug}` : `/${locale}`;

  return (
    <div className="relative mx-auto min-h-svh max-w-[30rem] bg-surface shadow-[0_0_60px_rgb(0_0_0/0.08)]">
      <Link
        href={backHref}
        className="absolute top-[max(0.75rem,env(safe-area-inset-top))] left-3 z-10 flex h-11 items-center gap-1 rounded-full bg-black/45 pr-4 pl-2.5 text-[14px] font-semibold text-white backdrop-blur hover:bg-black/60"
      >
        <ChevronLeft aria-hidden className="size-5" />
        {t.menu}
      </Link>
      <main>
        <ProductDetail product={product} locale={locale} t={t} />
      </main>
    </div>
  );
}
