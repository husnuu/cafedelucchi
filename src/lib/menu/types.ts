import type { LocalizedText } from "@/lib/i18n/config";

/**
 * Kaynak veri tipleri — planlanan veritabanı şemasının (categories, products,
 * product_variants, product_option_groups …) birebir karşılığıdır. Supabase
 * bağlandığında sample-data.ts yerine Prisma sorguları bu tipleri döndürecek.
 * Fiyatlar kuruş cinsinden tam sayıdır.
 */

export type IconName =
  | "coffee" | "cup-soda" | "cake-slice" | "egg-fried" | "flame" | "snowflake" | "sparkles"
  | "leaf" | "citrus" | "glass-water" | "croissant" | "ice-cream" | "sandwich" | "salad"
  | "dessert" | "cookie" | "utensils" | "martini" | "beer" | "wine" | "pizza" | "fish" | "shrimp"
  | "beef" | "drumstick" | "soup" | "popcorn" | "milk" | "cherry" | "grape" | "hamburger"
  | "cooking-pot" | "candy" | "blend" | "cloud-fog";

export type AllergenCode = "gluten" | "milk" | "egg" | "nuts" | "soy" | "sesame";
export type TagCode = "new" | "signature" | "vegan" | "vegetarian" | "spicy";

export interface Category {
  id: string;
  slug: string;
  /** null → ana grup (ana sayfa kutusu); dolu → grup içindeki kategori (sekme) */
  parentId: string | null;
  icon: IconName;
  coverImage: string;
  position: number;
  isActive: boolean;
  name: LocalizedText;
  description?: LocalizedText;
}

export interface ProductVariant {
  id: string;
  name: LocalizedText;
  price: number;
}

export interface ProductOption {
  id: string;
  name: LocalizedText;
  priceDelta: number;
}

export interface ProductOptionGroup {
  id: string;
  name: LocalizedText;
  minSelect: number;
  maxSelect: number;
  options: ProductOption[];
}

export interface Product {
  id: string;
  slug: string;
  categoryId: string;
  position: number;
  isActive: boolean;
  isAvailable: boolean;
  isFeatured: boolean;
  /** Öne Çıkanlar'daki sıra (küçük olan önce) */
  featuredRank?: number;
  /** Varyantı olmayan ürünlerin fiyatı */
  price?: number;
  /** İndirim öncesi fiyat (varsa üstü çizili gösterilir) */
  compareAtPrice?: number;
  kcal?: number;
  images: string[];
  name: LocalizedText;
  shortDescription?: LocalizedText;
  description?: LocalizedText;
  ingredients?: LocalizedText;
  allergens: AllergenCode[];
  tags: TagCode[];
  variants?: ProductVariant[];
  optionGroups?: ProductOptionGroup[];
  /** Geçici: analytics bağlanana kadar "En Sevilenler" sıralaması için */
  popularity?: number;
}

export interface OpeningHours {
  days: LocalizedText;
  open: string;
  close: string;
}

export interface SiteSettings {
  name: string;
  tagline: LocalizedText;
  about: LocalizedText;
  heroImage: string;
  phone: string;
  /** Boşsa WhatsApp düğmesi gösterilmez */
  whatsapp?: string;
  instagram: string;
  address: string;
  mapsUrl: string;
  hours: OpeningHours[];
  hoursNote?: LocalizedText;
}
