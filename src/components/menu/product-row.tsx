import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { ProductView } from "@/lib/menu/queries";
import { AllergenDots, KcalChip, TagPills } from "./badges";
import { Price, VariantChips } from "./price";

/** Fotoğrafı olan ürünler küçük görselle, olmayanlar sade metin satırı olarak listelenir. */
export function ProductRow({ product, locale, soldOutLabel }: { product: ProductView; locale: Locale; soldOutLabel: string }) {
  const soldOut = !product.isAvailable;
  const hasMeta = product.kcal !== null || product.allergens.length > 0 || product.tags.length > 0;

  return (
    <Link
      href={`/${locale}/p/${product.slug}`}
      scroll={false}
      className={`group flex gap-4 px-4 outline-none transition-colors hover:bg-chip/60 focus-visible:bg-chip ${product.image ? "py-4" : "py-3.5"}`}
    >
      {product.image && (
        <div className="relative size-[5.5rem] shrink-0 overflow-hidden rounded-image bg-chip">
          <Image src={product.image} alt="" fill sizes="88px" className={`object-cover ${soldOut ? "grayscale" : ""}`} />
          {soldOut && (
            <span className="absolute inset-x-0 bottom-0 bg-ink/75 py-0.5 text-center text-[10px] font-bold uppercase tracking-wide text-white">
              {soldOutLabel}
            </span>
          )}
        </div>
      )}

      <div className={`min-w-0 flex-1 ${soldOut ? "opacity-60" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="pt-0.5 text-[15px] font-bold leading-snug text-ink">
            {product.name}
            {soldOut && !product.image && (
              <span className="ml-2 rounded-full bg-ink/80 px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wide text-white">
                {soldOutLabel}
              </span>
            )}
          </h3>
          <Price product={product} locale={locale} className="shrink-0 text-[15px]" />
        </div>

        {product.variants.length > 0 && (
          <div className="mt-1.5">
            <VariantChips variants={product.variants} locale={locale} />
          </div>
        )}

        {product.shortDescription && (
          <p className="mt-1 line-clamp-2 text-[13px] italic leading-snug text-muted">{product.shortDescription}</p>
        )}

        {hasMeta && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <KcalChip kcal={product.kcal} />
            <AllergenDots codes={product.allergens} locale={locale} />
            <TagPills tags={product.tags} locale={locale} />
          </div>
        )}
      </div>
    </Link>
  );
}
