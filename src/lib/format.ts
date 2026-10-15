import type { Locale } from "@/lib/i18n/config";

const formatters: Record<Locale, Intl.NumberFormat> = {
  tr: new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  en: new Intl.NumberFormat("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
};

/** Kuruş → "75,00₺" (tr) / "₺75.00" (en) */
export function formatPrice(minor: number, locale: Locale): string {
  const amount = formatters[locale].format(minor / 100);
  return locale === "tr" ? `${amount}₺` : `₺${amount}`;
}

/** Arama için Türkçe duyarlı normalleştirme: "Çilek" ~ "cilek" */
export function normalizeSearch(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}
