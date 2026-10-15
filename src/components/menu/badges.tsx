import { Bean, Egg, Milk, Nut, Sprout, Wheat, type LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { AllergenCode, TagCode } from "@/lib/menu/types";

type Meta = { label: Record<Locale, string> };

export const allergenMeta: Record<AllergenCode, Meta & { icon: LucideIcon; color: string }> = {
  gluten: { icon: Wheat, color: "#e8954a", label: { tr: "Gluten", en: "Gluten" } },
  milk: { icon: Milk, color: "#8f9cc9", label: { tr: "Süt", en: "Milk" } },
  egg: { icon: Egg, color: "#e5b93c", label: { tr: "Yumurta", en: "Egg" } },
  nuts: { icon: Nut, color: "#a7835f", label: { tr: "Kuruyemiş", en: "Tree nuts" } },
  soy: { icon: Bean, color: "#8aa36b", label: { tr: "Soya", en: "Soy" } },
  sesame: { icon: Sprout, color: "#b49a6d", label: { tr: "Susam", en: "Sesame" } },
};

export const tagMeta: Record<TagCode, Meta & { className: string }> = {
  new: { className: "bg-[#fdeee2] text-[#b2581d]", label: { tr: "Yeni", en: "New" } },
  signature: { className: "bg-brand/12 text-brand-strong", label: { tr: "Lucchi Özel", en: "Signature" } },
  vegan: { className: "bg-[#e8f3e4] text-[#3f7a35]", label: { tr: "Vegan", en: "Vegan" } },
  vegetarian: { className: "bg-[#eef4e2] text-[#5b7a2c]", label: { tr: "Vejetaryen", en: "Vegetarian" } },
  spicy: { className: "bg-[#fde6e4] text-[#b8352a]", label: { tr: "Acı", en: "Spicy" } },
};

export function AllergenDots({ codes, locale, size = "sm" }: { codes: AllergenCode[]; locale: Locale; size?: "sm" | "md" }) {
  if (!codes.length) return null;
  const box = size === "sm" ? "size-5" : "size-7";
  const icon = size === "sm" ? "size-3" : "size-4";
  return (
    <ul className="flex items-center gap-1" aria-label={locale === "tr" ? "Alerjenler" : "Allergens"}>
      {codes.map((code) => {
        const { icon: Icon, color, label } = allergenMeta[code];
        return (
          <li
            key={code}
            title={label[locale]}
            className={`${box} grid place-items-center rounded-full text-white`}
            style={{ backgroundColor: color }}
          >
            <Icon aria-hidden className={icon} strokeWidth={2} />
            <span className="sr-only">{label[locale]}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function TagPills({ tags, locale }: { tags: TagCode[]; locale: Locale }) {
  if (!tags.length) return null;
  return (
    <ul className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <li
          key={tag}
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tagMeta[tag].className}`}
        >
          {tagMeta[tag].label[locale]}
        </li>
      ))}
    </ul>
  );
}

export function KcalChip({ kcal }: { kcal: number | null }) {
  if (kcal === null) return null;
  return (
    <span className="rounded-full border border-line px-2 py-0.5 text-[11px] leading-none text-muted">{kcal} kcal</span>
  );
}
