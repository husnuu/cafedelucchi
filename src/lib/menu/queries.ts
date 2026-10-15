import "server-only";
import { pick, type Locale } from "@/lib/i18n/config";
import { categories, products, site } from "./menu-data";
import type { AllergenCode, Category, IconName, Product, TagCode } from "./types";

/**
 * Veri erişim katmanı. Bileşenler yalnızca bu fonksiyonları kullanır ve
 * dile göre çözümlenmiş düz "view model"ler alır. Supabase/Prisma
 * bağlandığında yalnızca bu dosyanın içi değişecek.
 */

export interface ProductView {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  ingredients: string;
  image: string | null;
  images: string[];
  /** Ürün fotoğrafı yoksa vitrin kartlarında kullanılacak kategori görseli */
  categoryImage: string | null;
  price: number | null;
  compareAtPrice: number | null;
  kcal: number | null;
  isAvailable: boolean;
  isFeatured: boolean;
  allergens: AllergenCode[];
  tags: TagCode[];
  variants: { id: string; name: string; price: number }[];
  optionGroups: {
    id: string;
    name: string;
    minSelect: number;
    maxSelect: number;
    options: { id: string; name: string; priceDelta: number }[];
  }[];
  categoryName: string;
  groupSlug: string | null;
}

export interface CategoryView {
  id: string;
  slug: string;
  icon: IconName;
  name: string;
  description: string;
  coverImage: string;
  products: ProductView[];
}

export interface GroupView {
  slug: string;
  icon: IconName;
  name: string;
  coverImage: string;
  itemCount: number;
}

const byPosition = <T extends { position: number }>(a: T, b: T) => a.position - b.position;

const activeCategories = () => categories.filter((c) => c.isActive).sort(byPosition);
const categoryById = (id: string) => categories.find((c) => c.id === id);

function toProductView(p: Product, locale: Locale): ProductView {
  const category = categoryById(p.categoryId);
  const group = category?.parentId ? categoryById(category.parentId) : category;
  return {
    slug: p.slug,
    name: pick(p.name, locale),
    shortDescription: pick(p.shortDescription, locale),
    description: pick(p.description, locale),
    ingredients: pick(p.ingredients, locale),
    image: p.images[0] ?? null,
    images: p.images,
    categoryImage: category?.coverImage ?? null,
    price: p.variants?.length ? null : (p.price ?? null),
    compareAtPrice: p.compareAtPrice ?? null,
    kcal: p.kcal ?? null,
    isAvailable: p.isAvailable,
    isFeatured: p.isFeatured,
    allergens: p.allergens,
    tags: p.tags,
    variants: (p.variants ?? []).map((v) => ({ id: v.id, name: pick(v.name, locale), price: v.price })),
    optionGroups: (p.optionGroups ?? []).map((g) => ({
      id: g.id,
      name: pick(g.name, locale),
      minSelect: g.minSelect,
      maxSelect: g.maxSelect,
      options: g.options.map((o) => ({ id: o.id, name: pick(o.name, locale), priceDelta: o.priceDelta })),
    })),
    categoryName: category ? pick(category.name, locale) : "",
    groupSlug: group?.slug ?? null,
  };
}

const visibleProducts = (categoryId: string) =>
  products.filter((p) => p.isActive && p.categoryId === categoryId).sort(byPosition);

function leafIdsOf(group: Category) {
  return activeCategories()
    .filter((c) => c.parentId === group.id)
    .map((c) => c.id);
}

export async function getSite(locale: Locale) {
  return {
    ...site,
    tagline: pick(site.tagline, locale),
    about: pick(site.about, locale),
    hours: site.hours.map((h) => ({ days: pick(h.days, locale), open: h.open, close: h.close })),
    hoursNote: pick(site.hoursNote, locale),
  };
}

export async function getGroups(locale: Locale): Promise<GroupView[]> {
  return activeCategories()
    .filter((c) => c.parentId === null)
    .map((g) => ({
      slug: g.slug,
      icon: g.icon,
      name: pick(g.name, locale),
      coverImage: g.coverImage,
      itemCount: leafIdsOf(g).reduce((n, id) => n + visibleProducts(id).length, 0),
    }));
}

export async function getGroupSlugs(): Promise<string[]> {
  return activeCategories()
    .filter((c) => c.parentId === null)
    .map((c) => c.slug);
}

export async function getGroup(slug: string, locale: Locale) {
  const group = activeCategories().find((c) => c.parentId === null && c.slug === slug);
  if (!group) return null;
  const sections: CategoryView[] = activeCategories()
    .filter((c) => c.parentId === group.id)
    .map((c) => ({
      id: c.id,
      slug: c.slug,
      icon: c.icon,
      name: pick(c.name, locale),
      description: pick(c.description, locale),
      coverImage: c.coverImage,
      products: visibleProducts(c.id).map((p) => toProductView(p, locale)),
    }))
    .filter((c) => c.products.length > 0);
  return { slug: group.slug, name: pick(group.name, locale), sections };
}

export async function getProductSlugs(): Promise<string[]> {
  return products.filter((p) => p.isActive).map((p) => p.slug);
}

export async function getProduct(slug: string, locale: Locale): Promise<ProductView | null> {
  const product = products.find((p) => p.isActive && p.slug === slug);
  const category = product && categoryById(product.categoryId);
  if (!product || !category?.isActive) return null;
  return toProductView(product, locale);
}

export async function getFeatured(locale: Locale): Promise<ProductView[]> {
  return products
    .filter((p) => p.isActive && p.isFeatured)
    .sort((a, b) => (a.featuredRank ?? Infinity) - (b.featuredRank ?? Infinity) || a.position - b.position)
    .map((p) => toProductView(p, locale));
}

export async function getPopular(locale: Locale, limit = 5): Promise<ProductView[]> {
  return products
    .filter((p) => p.isActive && p.isAvailable && p.popularity !== undefined)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
    .slice(0, limit)
    .map((p) => toProductView(p, locale));
}

export type SearchItem = Pick<
  ProductView,
  "slug" | "name" | "shortDescription" | "image" | "price" | "compareAtPrice" | "variants" | "isAvailable" | "categoryName"
> & { haystack: string };

/** Arama sayfası için hafif, istemciye gönderilecek ürün dizini. */
export async function getSearchIndex(locale: Locale): Promise<SearchItem[]> {
  return products
    .filter((p) => p.isActive && categoryById(p.categoryId)?.isActive)
    .sort(byPosition)
    .map((p) => {
      const v = toProductView(p, locale);
      return {
        slug: v.slug,
        name: v.name,
        shortDescription: v.shortDescription,
        image: v.image,
        price: v.price,
        compareAtPrice: v.compareAtPrice,
        variants: v.variants,
        isAvailable: v.isAvailable,
        categoryName: v.categoryName,
        haystack: [v.name, v.shortDescription, v.ingredients, v.categoryName].join(" "),
      };
    });
}
