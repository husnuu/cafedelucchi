import Image from "next/image";
import { Flame, Info } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { ProductView } from "@/lib/menu/queries";
import { allergenMeta, TagPills } from "./badges";
import { Price } from "./price";

export function ProductDetail({ product, locale, t }: { product: ProductView; locale: Locale; t: Dictionary }) {
  return (
    <article>
      {product.image && (
        <div className="relative aspect-[4/3] w-full bg-chip">
          <Image
            src={product.image}
            alt={product.name}
            fill
            preload
            sizes="(min-width: 640px) 512px, 100vw"
            className={`object-cover ${product.isAvailable ? "" : "grayscale"}`}
          />
        </div>
      )}

      <div className={`space-y-6 px-5 pb-8 ${product.image ? "pt-5" : "pt-16"}`}>
        {!product.isAvailable && (
          <span className="inline-block rounded-full bg-ink/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            {t.soldOut}
          </span>
        )}
        <header className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand">{product.categoryName}</p>
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-display text-[26px] font-bold leading-tight text-ink">{product.name}</h2>
            <Price product={product} locale={locale} className="pt-1 text-xl" />
          </div>
          <TagPills tags={product.tags} locale={locale} />
          {(product.description || product.shortDescription) && (
            <p className="text-[15px] leading-relaxed text-ink/80">{product.description || product.shortDescription}</p>
          )}
        </header>

        {product.variants.length > 0 && (
          <Section title={t.sizes}>
            <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
              {product.variants.map((v) => (
                <li key={v.id} className="flex items-center justify-between px-4 py-3 text-[15px]">
                  <span className="font-semibold">{v.name}</span>
                  <span className="font-bold text-price tabular-nums">{formatPrice(v.price, locale)}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {product.optionGroups.map((group) => (
          <Section key={group.id} title={group.name} hint={t.select(group.minSelect, group.maxSelect)}>
            <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line">
              {group.options.map((o) => (
                <li key={o.id} className="flex items-center justify-between px-4 py-3 text-[14px]">
                  <span>{o.name}</span>
                  {o.priceDelta > 0 && <span className="text-muted tabular-nums">+{formatPrice(o.priceDelta, locale)}</span>}
                </li>
              ))}
            </ul>
          </Section>
        ))}

        {product.ingredients && (
          <Section title={t.ingredients}>
            <p className="text-[14px] leading-relaxed text-ink/80">{product.ingredients}</p>
          </Section>
        )}

        {product.allergens.length > 0 && (
          <Section title={t.allergens}>
            <ul className="flex flex-wrap gap-2">
              {product.allergens.map((code) => {
                const { icon: Icon, color, label } = allergenMeta[code];
                return (
                  <li key={code} className="flex items-center gap-2 rounded-full border border-line py-1 pr-3 pl-1 text-[13px]">
                    <span className="grid size-6 place-items-center rounded-full text-white" style={{ backgroundColor: color }}>
                      <Icon aria-hidden className="size-3.5" strokeWidth={2} />
                    </span>
                    {label[locale]}
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        {product.kcal !== null && (
          <p className="flex items-center gap-2 text-[14px] text-muted">
            <Flame aria-hidden className="size-4" /> {t.calories}: <strong className="font-semibold text-ink">{product.kcal} kcal</strong>
          </p>
        )}

        <p className="flex gap-2 rounded-xl bg-chip p-3 text-[12px] leading-snug text-muted">
          <Info aria-hidden className="mt-px size-4 shrink-0" />
          {t.allergenNote}
        </p>
      </div>
    </article>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-ink">{title}</h3>
        {hint && <span className="text-[12px] text-muted">{hint}</span>}
      </div>
      {children}
    </section>
  );
}
