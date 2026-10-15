import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getProduct, getProductSlugs } from "@/lib/menu/queries";
import { ProductDetail } from "@/components/menu/product-detail";
import { ProductModal } from "@/components/menu/product-modal";

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export default async function ProductModalPage({ params }: PageProps<"/[locale]/p/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  const product = await getProduct(slug, locale);
  if (!product) notFound();
  const t = getDictionary(locale);

  return (
    <ProductModal title={product.name} closeLabel={t.close}>
      <ProductDetail product={product} locale={locale} t={t} />
    </ProductModal>
  );
}
