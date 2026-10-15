import type { Locale } from "./config";

const tr = {
  back: "Geri",
  close: "Kapat",
  menu: "Menü",
  searchPlaceholder: "Menüde ara…",
  searchTitle: "Menüde ara",
  searchHint: "Ürün adı, içerik veya kategori yazın",
  searchEmpty: "Aramanızla eşleşen ürün bulunamadı.",
  results: (n: number) => `${n} sonuç`,
  itemCount: (n: number) => `${n} ürün`,
  featured: "Öne Çıkanlar",
  featuredSub: "Lucchi'nin bu haftaki önerileri",
  popular: "En Sevilenler",
  popularSub: "Misafirlerimizin favorileri",
  visit: "Bizi Ziyaret Edin",
  hours: "Çalışma Saatleri",
  address: "Adres",
  directions: "Yol tarifi al",
  call: "Ara",
  soldOut: "Tükendi",
  from: "başlayan",
  sizes: "Boyutlar",
  extras: "Ekstralar",
  ingredients: "İçindekiler",
  allergens: "Alerjenler",
  calories: "Kalori",
  allergenNote: "Alerji veya özel beslenme ihtiyacınız varsa lütfen ekibimize danışın.",
  select: (min: number, max: number) =>
    min > 0 ? (max > 1 ? `En fazla ${max} seçim` : "Birini seçin") : max > 1 ? `İsteğe bağlı · en fazla ${max}` : "İsteğe bağlı",
  language: "Dil",
  notFoundTitle: "Aradığınız sayfa bulunamadı",
  notFoundText: "Bağlantı değişmiş olabilir. Menüye dönerek devam edebilirsiniz.",
  backToMenu: "Menüye dön",
  categories: "Kategoriler",
  rights: "Tüm hakları saklıdır.",
};

export type Dictionary = typeof tr;

const en: Dictionary = {
  back: "Back",
  close: "Close",
  menu: "Menu",
  searchPlaceholder: "Search the menu…",
  searchTitle: "Search the menu",
  searchHint: "Type a dish, ingredient or category",
  searchEmpty: "No items match your search.",
  results: (n) => `${n} result${n === 1 ? "" : "s"}`,
  itemCount: (n) => `${n} item${n === 1 ? "" : "s"}`,
  featured: "Featured",
  featuredSub: "This week's picks from Lucchi",
  popular: "Guest Favourites",
  popularSub: "What our guests love most",
  visit: "Visit Us",
  hours: "Opening Hours",
  address: "Address",
  directions: "Get directions",
  call: "Call",
  soldOut: "Sold out",
  from: "from",
  sizes: "Sizes",
  extras: "Extras",
  ingredients: "Ingredients",
  allergens: "Allergens",
  calories: "Calories",
  allergenNote: "If you have an allergy or dietary requirement, please ask our team.",
  select: (min, max) =>
    min > 0 ? (max > 1 ? `Choose up to ${max}` : "Choose one") : max > 1 ? `Optional · up to ${max}` : "Optional",
  language: "Language",
  notFoundTitle: "Page not found",
  notFoundText: "The link may have changed. Head back to the menu to continue.",
  backToMenu: "Back to menu",
  categories: "Categories",
  rights: "All rights reserved.",
};

const dictionaries: Record<Locale, Dictionary> = { tr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
