export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export const localeLabels: Record<Locale, string> = { tr: "Türkçe", en: "English" };

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Çeviri alanı: varsayılan dil zorunlu, diğerleri isteğe bağlı. */
export type LocalizedText = { tr: string } & Partial<Record<Exclude<Locale, "tr">, string>>;

/** İstenen dil → varsayılan dil sırasıyla güvenli fallback. */
export function pick(text: LocalizedText | undefined, locale: Locale): string {
  if (!text) return "";
  return text[locale]?.trim() || text.tr;
}
