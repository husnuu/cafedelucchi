import { formatPrice } from "@/lib/format";
import type { Locale } from "@/lib/i18n/config";
import type { ProductView } from "@/lib/menu/queries";

type PriceSource = Pick<ProductView, "price" | "compareAtPrice">;

/** Tek fiyatlı ürün: indirim varsa eski fiyat üstü çizili. */
export function Price({ product, locale, className = "" }: { product: PriceSource; locale: Locale; className?: string }) {
  if (product.price === null) return null;
  return (
    <span className={`inline-flex flex-col items-end leading-tight ${className}`}>
      {product.compareAtPrice !== null && product.compareAtPrice > product.price && (
        <s className="text-[11px] font-normal text-muted">{formatPrice(product.compareAtPrice, locale)}</s>
      )}
      <span className="font-semibold text-price tabular-nums">{formatPrice(product.price, locale)}</span>
    </span>
  );
}

/** Varyantlı ürün: referanstaki "Tek 75,00₺ · Duble 90,00₺" etiketleri. */
export function VariantChips({ variants, locale }: { variants: ProductView["variants"]; locale: Locale }) {
  if (!variants.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {variants.map((v) => (
        <li key={v.id} className="flex items-baseline gap-1.5 rounded-md border border-line bg-chip px-2 py-1 text-[11px] leading-none">
          <span className="font-semibold text-ink">{v.name}</span>
          <span className="font-semibold text-price tabular-nums">{formatPrice(v.price, locale)}</span>
        </li>
      ))}
    </ul>
  );
}
