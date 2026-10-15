import type { LocalizedText } from "@/lib/i18n/config";
import type { Category, IconName, Product, ProductOptionGroup, SiteSettings, TagCode } from "./types";

/**
 * Cafe de Lucchi menüsü — basılı menüden (Ekim 2026) aktarıldı.
 * Supabase bağlandığında bu dosya seed betiğine dönüşecek; sonrasında tüm
 * içerik admin panelinden yönetilecek.
 *
 * Basılı menüde ürün fotoğrafı, alerjen ve kalori bilgisi yok; bu alanlar boş
 * bırakıldı (tahmin edilmedi). Kategori kapak görselleri temsili stok fotoğraflardır.
 */

const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80&fit=crop&auto=format`;
const tl = (amount: number) => Math.round(amount * 100);

export const site: SiteSettings = {
  name: "Cafe de Lucchi",
  tagline: { tr: "Çeşme · İzmir", en: "Çeşme · İzmir" },
  about: {
    tr: "Çeşme'de kahvaltıdan akşam yemeğine, kahveden kokteyle.",
    en: "In Çeşme — from breakfast to dinner, from coffee to cocktails.",
  },
  heroImage: img("1509042239860-f550ce710b93"),
  phone: "+90 532 276 64 69",
  instagram: "cafe.delucchi",
  address: "16 Eylül Mah., 3264 Sk. No:14, 35930 Çeşme/İzmir",
  mapsUrl: "https://maps.google.com/?cid=14081087481358566616",
  hours: [{ days: { tr: "Her gün", en: "Every day" }, open: "11:00", close: "03:00" }],
  hoursNote: { tr: "Kahvaltı servisi 14:30'a kadardır.", en: "Breakfast is served until 14:30." },
};

// ───────────────────────── Kategoriler ─────────────────────────

export const categories: Category[] = [];

function group(slug: string, icon: IconName, name: LocalizedText, cover: string) {
  const id = `g-${slug}`;
  categories.push({ id, slug, parentId: null, icon, coverImage: img(cover), position: categories.length, isActive: true, name });
  return id;
}

function category(parentId: string, slug: string, icon: IconName, name: LocalizedText, cover: string, description?: LocalizedText) {
  const id = `c-${slug}`;
  categories.push({ id, slug, parentId, icon, coverImage: img(cover), position: categories.length, isActive: true, name, description });
  return id;
}

// ───────────────────────── Ürün yardımcıları ─────────────────────────

export const products: Product[] = [];

type Item = {
  en?: string;
  /** Kısa açıklama [tr, en] */
  d?: [string, string?];
  /** İçindekiler [tr, en] */
  ing?: [string, string?];
  /** Boyut/porsiyon fiyatları: [tr, en, fiyat] */
  v?: [string, string, number][];
  og?: ProductOptionGroup[];
  tags?: TagCode[];
  featured?: boolean;
  /** Öne Çıkanlar'daki sıra (küçük olan önce) */
  featuredRank?: number;
};

const lt = (pair?: [string, string?]): LocalizedText | undefined =>
  pair ? { tr: pair[0], ...(pair[1] ? { en: pair[1] } : {}) } : undefined;

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function add(categoryId: string, name: string, price: number | null, o: Item = {}) {
  let slug = slugify(name);
  if (products.some((p) => p.slug === slug)) slug = `${slug}-${categoryId.slice(2)}`;
  products.push({
    id: `p-${slug}`,
    slug,
    categoryId,
    position: products.length,
    isActive: true,
    isAvailable: true,
    isFeatured: o.featured ?? false,
    featuredRank: o.featuredRank,
    price: price === null ? undefined : tl(price),
    images: [],
    name: { tr: name, ...(o.en ? { en: o.en } : {}) },
    shortDescription: lt(o.d),
    ingredients: lt(o.ing),
    allergens: [],
    tags: o.tags ?? [],
    variants: o.v?.map(([tr, en, p], i) => ({ id: `v${i}`, name: { tr, en }, price: tl(p) })),
    optionGroups: o.og,
  });
}

function choice(id: string, name: LocalizedText, options: [string, string][]): ProductOptionGroup {
  return {
    id,
    name,
    minSelect: 1,
    maxSelect: 1,
    options: options.map(([tr, en], i) => ({ id: `${id}-${i}`, name: { tr, en }, priceDelta: 0 })),
  };
}

const flavour = (options: [string, string][]) => choice("og-flavour", { tr: "Aroma", en: "Flavour" }, options);

// ═════════════════════════ KAHVALTI ═════════════════════════

const gBreakfast = group("kahvalti", "egg-fried", { tr: "Kahvaltı", en: "Breakfast" }, "1618666185561-baed3459ff18");

const breakfastContents: [string, string] = [
  "Domates, salatalık, yeşil biber, kırmızı biber, Ezine peyniri, kaşar, siyah ve yeşil zeytin, salam, yumurta, bal, kaymak, tereyağı, çilek reçeli, sigara böreği, patates kızartması",
  "Tomato, cucumber, green and red pepper, Ezine cheese, kashar cheese, black and green olives, salami, egg, honey, clotted cream, butter, strawberry jam, cheese rolls, French fries",
];

const cBreakfast = category(gBreakfast, "kahvalti-tabaklari", "egg-fried", { tr: "Kahvaltı", en: "Breakfast Plates" }, "1618666185561-baed3459ff18",
  { tr: "Kahvaltı servisi 14:30'a kadardır.", en: "Served until 14:30." });
add(cBreakfast, "Kahvaltı Tabağı (1 Kişilik)", 650, {
  en: "Breakfast Plate (for 1)",
  d: ["Peynirler, zeytinler, bal-kaymak, yumurta, sigara böreği ve patates kızartmasıyla klasik kahvaltı tabağı.", "Classic breakfast plate with cheeses, olives, honey & clotted cream, egg, cheese rolls and fries."],
  ing: breakfastContents,
});
add(cBreakfast, "Serpme Kahvaltı (2 Kişilik)", 1200, {
  en: "Turkish Breakfast Spread (for 2)",
  d: ["İki kişilik serpme kahvaltı. Limitsiz çay dahildir.", "Breakfast spread for two. Unlimited tea included."],
  ing: breakfastContents,
});

const cCrepe = category(gBreakfast, "krepler", "cooking-pot", { tr: "Krepler", en: "Crêpes" }, "1519676867240-f03562e64548");
add(cCrepe, "Krep Sade", 180, { en: "Plain Crêpe" });
add(cCrepe, "Krep Nutella", 220, { en: "Nutella Crêpe" });
add(cCrepe, "Krep Kaşarlı", 200, { en: "Crêpe with Kashar Cheese" });

const cEggs = category(gBreakfast, "yumurta-omlet", "egg-fried", { tr: "Yumurta & Omlet", en: "Eggs & Omelettes" }, "1590412200988-a436970781fa");
add(cEggs, "Hellim Sahanda", 250, { en: "Pan-fried Halloumi" });
add(cEggs, "Sucuklu Yumurta", 250, { en: "Eggs with Sucuk" });
add(cEggs, "Sahanda Sucuk", 250, { en: "Pan-fried Sucuk" });
add(cEggs, "Sahanda Yumurta", 180, { en: "Fried Eggs" });
add(cEggs, "Sade Omlet", 180, { en: "Plain Omelette" });
add(cEggs, "Karışık Omlet", 250, { en: "Mixed Omelette", d: ["Mısır, mantar, biber, kaşar", "Corn, mushroom, pepper, kashar cheese"] });
add(cEggs, "Omlet Kaşarlı", 220, { en: "Cheese Omelette" });
add(cEggs, "Omlet Sucuk ve Kaşar", 250, { en: "Omelette with Sucuk & Cheese" });
add(cEggs, "Omlet Sucuklu", 250, { en: "Omelette with Sucuk" });
add(cEggs, "Menemen", 320, { en: "Menemen (Turkish Scrambled Eggs)" });
add(cEggs, "Rafadan Yumurta", 50, { en: "Soft-boiled Egg" });

// ═════════════════════════ YEMEKLER ═════════════════════════

const gFood = group("yemekler", "utensils", { tr: "Yemekler", en: "Food" }, "1532550907401-a500c9a57435");

const cSalad = category(gFood, "salatalar", "salad", { tr: "Salatalar", en: "Salads" }, "1512621776951-a57141f2eefd");
add(cSalad, "Hellim Peynirli Salata", 450, {
  en: "Halloumi Salad",
  d: ["Domates, salatalık, Akdeniz yeşillikleri, cherry domates, yağ, limon sos, hellim peyniri", "Tomato, cucumber, Mediterranean greens, cherry tomatoes, olive oil, lemon dressing, halloumi"],
});
add(cSalad, "Yunan Salatası", 450, {
  en: "Greek Salad",
  d: ["Domates, salatalık, soğan, yeşil biber, kırmızı biber, beyaz peynir, zeytin, kapari, kekik", "Tomato, cucumber, onion, green and red pepper, feta cheese, olives, capers, thyme"],
});
add(cSalad, "Lor Peynirli Cevizli Roka Salatası", 450, {
  en: "Rocket Salad with Curd Cheese & Walnuts",
  d: ["Roka, portakal, ceviz, lor peyniri, cherry domates", "Rocket, orange, walnuts, curd cheese, cherry tomatoes"],
});
add(cSalad, "Tavuk Salatası", 485, {
  en: "Chicken Salad",
  d: ["Akdeniz yeşillikleri, domates, salatalık, kırmızı biber, mısır, panelenmiş tavuk", "Mediterranean greens, tomato, cucumber, red pepper, corn, breaded chicken"],
});
add(cSalad, "Ton Balıklı Salata", 485, {
  en: "Tuna Salad",
  d: ["Akdeniz yeşillikleri, domates, salatalık, kapari, kırmızı soğan, kırmızı biber, mısır, ton balığı, yağ-limon sos", "Mediterranean greens, tomato, cucumber, capers, red onion, red pepper, corn, tuna, olive oil & lemon dressing"],
});
add(cSalad, "Tavuklu Sezar Salatası", 550, {
  en: "Chicken Caesar Salad",
  d: ["Domates, salatalık, marul, tavuk, kızarmış ekmek, parmesan, sezar sos", "Tomato, cucumber, lettuce, chicken, croutons, parmesan, Caesar dressing"],
});
add(cSalad, "Karidesli Salata", 950, {
  en: "Shrimp Salad",
  d: ["Akdeniz yeşillikleri, domates, oyster sos", "Mediterranean greens, tomato, oyster sauce"],
});
add(cSalad, "Deniz Mahsüllü Salata", 950, {
  en: "Seafood Salad",
  d: ["Akdeniz yeşillikleri, domates, ahtapot, midye, karides, oyster sos", "Mediterranean greens, tomato, octopus, mussels, shrimp, oyster sauce"],
});

const cPasta = category(gFood, "makarnalar", "soup", { tr: "Makarnalar", en: "Pasta" }, "1621996346565-e3dbc646d9a9");
add(cPasta, "Spagetti Napolitan", 300, { en: "Spaghetti Napoletana", d: ["Napoliten sos, sarımsak", "Napoletana sauce, garlic"] });
add(cPasta, "Spagetti Bolonez", 550, { en: "Spaghetti Bolognese", d: ["Kıyma, soğan, sarımsak, biber, domates", "Minced beef, onion, garlic, pepper, tomato"] });
add(cPasta, "Penne Kremalı Mantarlı Tavuklu", 320, { en: "Creamy Chicken & Mushroom Penne", d: ["Tavuk, mantar, krema", "Chicken, mushrooms, cream"] });
add(cPasta, "Deniz Mahsüllü Spagetti", 950, {
  en: "Seafood Spaghetti",
  d: ["Karides, ahtapot, midye, sarımsak, oyster sos, cherry domates, dereotu", "Shrimp, octopus, mussels, garlic, oyster sauce, cherry tomatoes, dill"],
  og: [choice("og-sauce", { tr: "Sos", en: "Sauce" }, [["Kremalı", "Cream sauce"], ["Domates soslu", "Tomato sauce"]])],
});
add(cPasta, "Penne Arabiata", 320, { en: "Penne Arrabbiata", d: ["Acılı domates sosu, zeytin, mısır", "Spicy tomato sauce, olives, corn"], tags: ["spicy"] });
add(cPasta, "Köri Soslu Tavuklu Penne", 320, { en: "Chicken Curry Penne", d: ["Tavuk dilimleri, krema, köri", "Sliced chicken, cream, curry"] });
add(cPasta, "Cheddar Peynirli Tavuklu Penne", 350, { en: "Cheddar Chicken Penne", d: ["Mantar, krema, tavuk, kırmızı biber, cheddar sos", "Mushrooms, cream, chicken, red pepper, cheddar sauce"] });
add(cPasta, "Meksikan Spagetti", 350, { en: "Mexican Spaghetti", d: ["Fasulye, kabak, tavuk, havuç, kırmızı-yeşil biber, mantar, mısır", "Beans, courgette, chicken, carrot, red & green pepper, mushrooms, corn"] });
add(cPasta, "Ton Balıklı Spagetti", 375, { en: "Tuna Spaghetti", d: ["Mısır, dereotu, krema", "Corn, dill, cream"] });
add(cPasta, "Mantı", 395, { en: "Turkish Mantı (Dumplings)" });

const cChicken = category(gFood, "soslu-tavuklar", "drumstick", { tr: "Soslu Tavuklar", en: "Chicken Dishes" }, "1532550907401-a500c9a57435");
add(cChicken, "Meksika Usulü Tavuk", 650, {
  en: "Mexican-style Chicken",
  d: ["Julyen tavuk, soğan, sarımsak, mantar, Meksika fasulyesi, kabak, havuç, kırmızı biber, mısır, acı sos", "Julienned chicken, onion, garlic, mushrooms, Mexican beans, courgette, carrot, red pepper, corn, hot sauce"],
  tags: ["spicy"],
});
add(cChicken, "Körili Tavuk", 650, {
  en: "Chicken Curry",
  d: ["Julyen tavuk, sarımsak, mantar, yeşil ve kırmızı biber, elma, köri sosu, krema", "Julienned chicken, garlic, mushrooms, green & red pepper, apple, curry sauce, cream"],
});
add(cChicken, "Barbekü Soslu Tavuk", 650, {
  en: "BBQ Chicken",
  d: ["Kırmızı-yeşil biber, soğan, mantar, tavuk, barbekü sos", "Red & green pepper, onion, mushrooms, chicken, BBQ sauce"],
});
add(cChicken, "Mantarlı Bonfile Tavuk", 650, {
  en: "Chicken Fillet with Mushrooms",
  d: ["Mantar, tavuk, sarımsak, demi-glace sos", "Mushrooms, chicken, garlic, demi-glace sauce"],
});
add(cChicken, "Cheddarlı Tavuk Şnitzel", 650, { en: "Cheddar Chicken Schnitzel", d: ["Galeta unu, tavuk, garnitür", "Breadcrumbs, chicken, side garnish"] });
add(cChicken, "Şefin Mantar Soslu Tavuğu", 650, {
  en: "Chef's Chicken in Mushroom Sauce",
  d: ["Mantar, krema, tavuk, acı sos", "Mushrooms, cream, chicken, hot sauce"],
  tags: ["spicy"],
});
add(cChicken, "Cheddar Soslu Tavuk", 650, {
  en: "Chicken in Cheddar Sauce",
  d: ["Tavuk dilimleri, cheddar sos, sarımsak, soğan, kırmızı biber, krema", "Sliced chicken, cheddar sauce, garlic, onion, red pepper, cream"],
});
add(cChicken, "Tavuk Fajita", 650, {
  en: "Chicken Fajita",
  d: ["Tavuk dilimleri, kırmızı-yeşil biber, sarımsak, soya sosu", "Sliced chicken, red & green pepper, garlic, soy sauce"],
});

const cMeat = category(gFood, "et-cesitleri", "beef", { tr: "Et Çeşitleri", en: "Meat Dishes" }, "1529692236671-f1f6cf9683ba");
add(cMeat, "Lucchi Köfte", 800, { en: "Lucchi Meatballs", d: ["Garnitür ile", "Served with garnish"], tags: ["signature"], featured: true });
add(cMeat, "Cheddar Peynirli Köfte", 850, { en: "Cheddar Meatballs", d: ["Garnitür ile", "Served with garnish"] });
add(cMeat, "Tereyağlı Ciğer Tava", 800, { en: "Pan-fried Liver in Butter", d: ["Maydanoz, sumak, kırmızı soğan", "Parsley, sumac, red onion"] });

const cSeafood = category(gFood, "deniz-mahsulleri", "shrimp", { tr: "Deniz Mahsülleri", en: "Seafood" }, "1559737558-2f5a35f4523b");
add(cSeafood, "Karides Tava", 900, { en: "Pan-fried Shrimp", d: ["Sarımsak, tereyağı, pul biber", "Garlic, butter, chilli flakes"] });
add(cSeafood, "Somon Izgara", 1100, { en: "Grilled Salmon", d: ["Patates cips, yeşillik, karışık sebze", "Potato chips, greens, mixed vegetables"], featured: true });
add(cSeafood, "Kremalı Somon", 1100, { en: "Salmon in Cream Sauce", d: ["Patates cips, yeşillik, karışık sebze", "Potato chips, greens, mixed vegetables"] });
add(cSeafood, "Kalamar Tava", 980, { en: "Fried Calamari" });
add(cSeafood, "Tereyağlı Ahtapot", 980, { en: "Octopus in Butter" });
add(cSeafood, "Midye Tava", 700, { en: "Fried Mussels" });

const cPizza = category(gFood, "pizzalar", "pizza", { tr: "Pizzalar", en: "Pizza" }, "1565299624946-b28f40a0ae38");
add(cPizza, "Karidesli Pizza", 750, { en: "Shrimp Pizza" });
add(cPizza, "Dört Peynirli Pizza", 650, { en: "Four Cheese Pizza" });
add(cPizza, "Karışık Pizza", 650, { en: "Mixed Pizza" });

const cWrap = category(gFood, "wrap", "sandwich", { tr: "Wrap", en: "Wraps" }, "1626700051175-6818013e1d4f");
add(cWrap, "Tavuklu Wrap", 420, {
  en: "Chicken Wrap",
  d: ["Tavuk, mantar, biber, soğan, paprika sos, kaşar, patates kızartması", "Chicken, mushrooms, pepper, onion, paprika sauce, kashar cheese, fries"],
});
add(cWrap, "Sebzeli Wrap", 420, {
  en: "Vegetable Wrap",
  d: ["Kabak, havuç, mısır, biber, mantar, Meksika fasulyesi, paprika sos, kaşar; patates kızartması eşliğinde", "Courgette, carrot, corn, pepper, mushrooms, Mexican beans, paprika sauce, kashar cheese; served with fries"],
});
add(cWrap, "Ton Balıklı Wrap", 420, {
  en: "Tuna Wrap",
  d: ["Ton balığı, yeşillik, patates kızartması, mayonez", "Tuna, greens, fries, mayonnaise"],
});

const cToast = category(gFood, "kumru-tost", "hamburger", { tr: "Kumru, Tost & Burger", en: "Kumru, Toasties & Burgers" }, "1528735602780-2552fd46c7af");
add(cToast, "Karışık Kumru", 320, { en: "Mixed Kumru Sandwich", d: ["Salam, sucuk, kaşar", "Salami, sucuk, kashar cheese"] });
add(cToast, "Kumru", 320, { en: "Kumru Sandwich", d: ["Kaşar, sucuk", "Kashar cheese, sucuk"] });
add(cToast, "Kaşarlı Tost", 245, { en: "Cheese Toastie" });
add(cToast, "Karışık Tost", 285, { en: "Mixed Toastie", d: ["Sucuk, kaşar, salam", "Sucuk, kashar cheese, salami"] });
add(cToast, "Ton Balıklı Tost", 350, { en: "Tuna Toastie", d: ["Domates, marul, dereotu, mısır, salatalık turşusu", "Tomato, lettuce, dill, corn, pickled cucumber"] });
add(cToast, "Cheddar Peynirli Tost", 320, { en: "Cheddar Toastie", d: ["Domates, marul", "Tomato, lettuce"] });
add(cToast, "Hamburger", 545, { en: "Hamburger" });
add(cToast, "Cheeseburger", 575, { en: "Cheeseburger" });

const cBorek = category(gFood, "borekler", "croissant", { tr: "Börekler", en: "Börek" }, "1601050690597-df0568f70950");
add(cBorek, "Sigara Böreği (Peynirli)", 245, { en: "Cheese Rolls (Sigara Böreği)" });
add(cBorek, "Paçanga Böreği", 395, { en: "Paçanga Börek" });
add(cBorek, "Deniz Mahsüllü Börek", 420, { en: "Seafood Börek" });

const cMeze = category(gFood, "meze-cesitleri", "leaf", { tr: "Meze Çeşitleri", en: "Meze" }, "1783455442171-16dbde079c53");
add(cMeze, "Havuç Tarator, Şakşuka", 300, { en: "Carrot Tarator, Şakşuka" });
add(cMeze, "Köpoğlu, Semizotu", 300, { en: "Köpoğlu, Purslane" });
add(cMeze, "Yoğurtlu Patlıcan", 300, { en: "Aubergine with Yoghurt" });
add(cMeze, "Deniz Börülcesi", 300, { en: "Samphire" });
add(cMeze, "Girit Ezme", 400, { en: "Cretan Cheese Dip (Girit Ezme)" });
add(cMeze, "Mantar Mantı", 300, { en: "Mushroom Mantı" });

const cSnacks = category(gFood, "aperatif", "popcorn", { tr: "Aperatif", en: "Snacks & Sharing" }, "1768215610440-fcb9631c7ee2");
add(cSnacks, "Bira Tabağı", 455, { en: "Beer Platter", d: ["Patates, sigara böreği, soğan halkası, sosis", "Fries, cheese rolls, onion rings, sausages"] });
add(cSnacks, "Rakı Tabağı", 365, { en: "Rakı Platter", d: ["Beyaz peynir, turşu, salatalık, domates", "Feta cheese, pickles, cucumber, tomato"] });
add(cSnacks, "Çıtır Tavuk Dilimleri", 455, { en: "Crispy Chicken Strips", d: ["Tavuk, patates", "Chicken, fries"] });
add(cSnacks, "Patates Kızartması", 265, { en: "French Fries" });
add(cSnacks, "Cheddar Peynirli Patates Kızartması", 300, { en: "Cheddar Fries" });
add(cSnacks, "Söğüş Tabağı", 200, { en: "Fresh Vegetable Plate", d: ["Domates, salatalık", "Tomato, cucumber"] });
add(cSnacks, "Soğan Halkası", 200, { en: "Onion Rings" });
add(cSnacks, "Sigara Böreği", 245, { en: "Cheese Rolls (Sigara Böreği)" });
add(cSnacks, "Meyve Tabağı", 450, { en: "Fruit Platter", d: ["Mevsim meyveleri", "Seasonal fruit"] });
add(cSnacks, "Lüks Çerez", 245, { en: "Deluxe Mixed Nuts" });
add(cSnacks, "Fıstık", 185, { en: "Peanuts" });

// ═════════════════════════ TATLILAR ═════════════════════════

const gSweets = group("tatlilar", "cake-slice", { tr: "Tatlılar", en: "Desserts" }, "1533134242443-d4fd215305ad");

const cCakes = category(gSweets, "pastalar", "cake-slice", { tr: "Pastalar", en: "Cakes" }, "1638519651608-412009302a02",
  { tr: "Pastalarımız kendi ürünümüzdür. Kesinlikle donuk değildir.", en: "All our cakes are made in-house — never frozen." });
add(cCakes, "Çikolatalı Kara Orman", 315, { en: "Black Forest Cake" });
add(cCakes, "Limonlu Cheesecake", 315, { en: "Lemon Cheesecake" });
add(cCakes, "Frambuazlı Cheesecake", 315, { en: "Raspberry Cheesecake" });
add(cCakes, "Karamel Soslu Cheesecake", 315, { en: "Caramel Cheesecake" });
add(cCakes, "San Sebastian", 315, { en: "San Sebastián Cheesecake", featured: true, featuredRank: 1 });
add(cCakes, "Çikolatalı Cheesecake", 350, { en: "Chocolate Cheesecake" });
add(cCakes, "Çikolatalı San Sebastian", 350, { en: "Chocolate San Sebastián" });

const cMilkDesserts = category(gSweets, "sutlu-tatlilar", "dessert", { tr: "Sütlü Tatlılar", en: "Milk Puddings" }, "1708782343229-b58f8e0b7020");
add(cMilkDesserts, "Fırın Sütlaç", 165, { en: "Baked Rice Pudding" });
add(cMilkDesserts, "Sakızlı Muhallebi", 165, { en: "Mastic Milk Pudding" });
add(cMilkDesserts, "Supangle", 180, { en: "Chocolate Pudding (Supangle)" });

// ═════════════════════════ SICAK İÇECEKLER ═════════════════════════

const gHot = group("sicak-icecekler", "coffee", { tr: "Sıcak İçecekler", en: "Hot Drinks" }, "1534778101976-62847782c213");

const cHotCoffee = category(gHot, "sicak-kahveler", "coffee", { tr: "Sıcak Kahveler", en: "Hot Coffee" }, "1534778101976-62847782c213");
add(cHotCoffee, "Americano", 195, { d: ["Yoğun espressonun sıcak su ile inceltilmiş hali", "Rich espresso lengthened with hot water"] });
add(cHotCoffee, "Espresso", 175, { d: ["Yoğun espresso kahve", "Intense espresso"] });
add(cHotCoffee, "Cappuccino", 200, { d: ["Espresso üzerine süt ve süt köpüğü", "Espresso topped with milk and milk foam"] });
add(cHotCoffee, "Viyana Usulü Cappuccino", 220, { en: "Viennese Cappuccino", d: ["Espresso üzerine süt, süt köpüğü ve tatlı krema", "Espresso with milk, foam and sweet cream"] });
add(cHotCoffee, "Caffè Latte", 200, { d: ["Bol süt kreması ile harmanlanmış espresso", "Espresso blended with plenty of creamy milk"] });
add(cHotCoffee, "Aromalı Caffè Latte", 220, {
  en: "Flavoured Caffè Latte",
  d: ["Çikolata, karamel, beyaz çikolata, vanilya, acıbadem veya fındık aromalı", "Chocolate, caramel, white chocolate, vanilla, amaretto or hazelnut"],
  og: [flavour([["Çikolata", "Chocolate"], ["Karamel", "Caramel"], ["Beyaz çikolata", "White chocolate"], ["Vanilya", "Vanilla"], ["Acıbadem", "Amaretto"], ["Fındık", "Hazelnut"]])],
});
add(cHotCoffee, "Caffè Mocha", 220, { d: ["Çikolata, espresso, süt ve süt kreması, üzerine çikolata sos", "Chocolate, espresso, milk and cream, topped with chocolate sauce"] });
add(cHotCoffee, "White Chocolate Mocha", 220, { d: ["Beyaz çikolata, espresso, süt ve süt kreması, üzerine beyaz çikolata sos", "White chocolate, espresso, milk and cream, topped with white chocolate sauce"] });
add(cHotCoffee, "Macchiato", 220, { d: ["Espresso üzerine süt köpüğü", "Espresso marked with milk foam"] });
add(cHotCoffee, "Latte Macchiato", 220, { d: ["Espresso, süt ve süt köpüğü katlar halinde", "Layers of espresso, milk and milk foam"] });
add(cHotCoffee, "Nescafe Sade", 195, { en: "Instant Coffee (Black)" });
add(cHotCoffee, "Nescafe Sütlü", 200, { en: "Instant Coffee with Milk" });
add(cHotCoffee, "Nescafe Sütten", 220, { en: "Instant Coffee Made with Milk" });
add(cHotCoffee, "Ballı Süt", 235, { en: "Hot Milk with Honey" });
add(cHotCoffee, "Türk Kahvesi", 120, { en: "Turkish Coffee" });
add(cHotCoffee, "Sakızlı Türk Kahvesi", 145, { en: "Turkish Coffee with Mastic" });

const cFilter = category(gHot, "filtre-kahveler", "flame", { tr: "Filtre Kahveler", en: "Filter Coffee" }, "1442512595331-e89e73853f31");
add(cFilter, "Filtre Kahve", 245, { en: "Filter Coffee" });
add(cFilter, "Kenya AA", 245);
add(cFilter, "Colombian Supremo", 245);
add(cFilter, "Amaretto (Badem)", 245, { en: "Amaretto (Almond)" });
add(cFilter, "French Vanilla", 245);
add(cFilter, "Hazelnut (Fındık)", 245, { en: "Hazelnut" });

const cTea = category(gHot, "caylar", "leaf", { tr: "Çaylar", en: "Tea" }, "1576092768241-dec231879fc3");
add(cTea, "Çay", 50, { en: "Turkish Tea" });
add(cTea, "Fincan Çay", 100, { en: "Tea (Cup)" });

const cHerbal = category(gHot, "bitki-caylari", "leaf", { tr: "Bitki Çayları", en: "Herbal Teas" }, "1594631252845-29fc4cc8cde9",
  { tr: "French press ile, doğal ve naturel.", en: "Brewed in a French press — all natural." });
add(cHerbal, "Yeşil Çay", 195, { en: "Green Tea" });
add(cHerbal, "Ada Çayı", 180, { en: "Sage Tea" });
add(cHerbal, "Ada Çayı & Ihlamur Mix", 200, { en: "Sage & Linden Blend" });
add(cHerbal, "Ihlamur", 220, { en: "Linden Tea" });
add(cHerbal, "Böğürtlen", 220, { en: "Blackberry Tea" });
add(cHerbal, "Elma", 200, { en: "Apple Tea" });
add(cHerbal, "Kekik", 180, { en: "Thyme Tea" });
add(cHerbal, "Papatya Çayı", 200, { en: "Chamomile Tea" });
add(cHerbal, "Nane-Limon", 200, { en: "Mint & Lemon", d: ["Taze nane ile", "With fresh mint"] });
add(cHerbal, "Kış Çayı", 200, {
  en: "Winter Tea",
  d: ["Hibiskus, elma kurusu, altın otu, gülhatmi, tarçın, zencefil, zerdeçal, ada çayı, gül kurusu", "Hibiscus, dried apple, everlasting, hollyhock, cinnamon, ginger, turmeric, sage, dried rose"],
});

const cSalep = category(gHot, "salep", "milk", { tr: "Salep", en: "Salep" }, "1724198218217-342f615dc034");
add(cSalep, "Salep", 190);
add(cSalep, "Sakızlı Salep", 190, { en: "Salep with Mastic" });
add(cSalep, "Cevizli Salep", 210, { en: "Salep with Walnuts" });
add(cSalep, "Fındıklı Salep", 210, { en: "Salep with Hazelnuts" });
add(cSalep, "Bademli Salep", 210, { en: "Salep with Almonds" });
add(cSalep, "Mix Salep", 230, { en: "Mixed Nut Salep", d: ["Ceviz, fındık, badem", "Walnuts, hazelnuts, almonds"] });

const cChocolate = category(gHot, "cikolatalar", "candy", { tr: "Sıcak / Soğuk Çikolatalar", en: "Hot / Iced Chocolate" }, "1542990253-0d0f5be5f0ed");
add(cChocolate, "Chocolate Truffle / Sıcak Çikolata", 225, { en: "Chocolate Truffle / Hot Chocolate" });
add(cChocolate, "Beyaz Çikolata", 225, { en: "White Chocolate" });
add(cChocolate, "Ahududulu Çikolata", 225, { en: "Raspberry Chocolate" });

// ═════════════════════════ SOĞUK İÇECEKLER ═════════════════════════

const gCold = group("soguk-icecekler", "glass-water", { tr: "Soğuk İçecekler", en: "Cold Drinks" }, "1497534446932-c925b458314e");

const cColdCoffee = category(gCold, "soguk-kahveler", "snowflake", { tr: "Soğuk Kahveler", en: "Iced Coffee" }, "1461023058943-07fcbe16d735");
add(cColdCoffee, "Ice Americano", 220, { d: ["Espresso bazlı", "Espresso based"] });
add(cColdCoffee, "Ice Caffè Mocha", 245, { d: ["Espresso bazlı", "Espresso based"] });
add(cColdCoffee, "Freddo Cappuccino", 245, { d: ["Espresso bazlı", "Espresso based"] });
add(cColdCoffee, "Ice Latte", 245, { d: ["Espresso bazlı", "Espresso based"] });
add(cColdCoffee, "Buzlu Soğuk Kahve", 220, { en: "Iced Instant Coffee", d: ["Nescafe Gold ile", "Made with Nescafé Gold"] });

const cFrozen = category(gCold, "frozen", "blend", { tr: "Frozen", en: "Frozen" }, "1505252585461-04db1eb84625");
for (const [tr, en] of [["Orman Meyveli", "Forest Fruits"], ["Kavun", "Melon"], ["Çilek", "Strawberry"], ["Karpuz", "Watermelon"], ["Nane-Limon", "Mint & Lemon"], ["Mango", "Mango"], ["Yaban Mersini", "Blueberry"], ["Kivi", "Kiwi"]] as const) {
  add(cFrozen, `${tr} Frozen`, 250, { en: `${en} Frozen` });
}

const cFrappe = category(gCold, "frappeler", "cup-soda", { tr: "Frappeler", en: "Frappés" }, "1563805042-7684c019e1cb",
  { tr: "Sıcak veya soğuk servis edilir.", en: "Served hot or iced." });
const hotOrCold = choice("og-temp", { tr: "Servis", en: "Serving" }, [["Sıcak", "Hot"], ["Soğuk", "Iced"]]);
for (const [tr, en, d] of [
  ["Çikolatalı", "Chocolate"],
  ["Kavunlu", "Melon"],
  ["Vanilyalı", "Vanilla"],
  ["Çilekli-Muzlu", "Strawberry & Banana"],
  ["Tropical", "Tropical"],
  ["Piña Colada", "Piña Colada"],
  ["Şeftali", "Peach"],
  ["Mai Tai", "Mai Tai"],
  ["Banana Cream (Muz)", "Banana Cream"],
  ["Irish Cream", "Irish Cream", ["İrlanda kreması, kahve aromalı", "Irish cream, coffee flavoured"]],
  ["French Vanilla", "French Vanilla", ["Fransız kreması, kahve aromalı", "French cream, coffee flavoured"]],
  ["Karamelli Coffee Toffee", "Caramel Coffee Toffee", ["Karamel aromalı kahve", "Caramel flavoured coffee"]],
] as [string, string, [string, string]?][]) {
  add(cFrappe, `${tr} Frappe`, 250, { en: `${en} Frappé`, d, og: [hotOrCold] });
}

const cShake = category(gCold, "milkshake", "cup-soda", { tr: "Milkshake", en: "Milkshakes" }, "1572490122747-3968b75cc699");
add(cShake, "Milkshake", 250, {
  d: ["Muz, çikolata, çilek, karamel, kavun, vanilya veya şeftali", "Banana, chocolate, strawberry, caramel, melon, vanilla or peach"],
  og: [flavour([["Muz", "Banana"], ["Çikolata", "Chocolate"], ["Çilek", "Strawberry"], ["Karamel", "Caramel"], ["Kavun", "Melon"], ["Vanilya", "Vanilla"], ["Şeftali", "Peach"]])],
});

const cJuice = category(gCold, "sikma-meyve-sulari", "citrus", { tr: "Limonata & Meyve Suları", en: "Lemonades & Fresh Juice" }, "1621263764928-df1444c5e859");
add(cJuice, "Çilekli Limonata", 250, { en: "Strawberry Lemonade", featured: true });
add(cJuice, "Çeşme Limonatası", 200, { en: "Çeşme Lemonade", tags: ["signature"] });
add(cJuice, "Taze Portakal Suyu", 265, { en: "Fresh Orange Juice" });
add(cJuice, "Frambuazlı Limonata", 250, { en: "Raspberry Lemonade" });

const cMocktail = category(gCold, "alkolsuz-kokteyller", "cherry", { tr: "Alkolsüz Kokteyller", en: "Mocktails" }, "1551538827-9c037cb4f32a");
add(cMocktail, "Detox Bombası", 350, { en: "Detox Bomb", d: ["Salatalık, limon, maydanoz", "Cucumber, lemon, parsley"] });
add(cMocktail, "Blue Lagoon", 350, { d: ["Sprite, tonik, limon suyu, Blue Curaçao şurubu", "Sprite, tonic, lemon juice, blue curaçao syrup"] });
add(cMocktail, "Piña Colada", 350, { en: "Virgin Piña Colada", d: ["Hindistan cevizi, süt, buz parçaları", "Coconut, milk, crushed ice"] });
add(cMocktail, "Mojito", 350, { en: "Virgin Mojito", d: ["Limon, nane, şeker, soda", "Lime, mint, sugar, soda"] });

const cSoft = category(gCold, "mesrubatlar", "glass-water", { tr: "Meşrubatlar", en: "Soft Drinks" }, "1581636625402-29b2a704ef13");
add(cSoft, "Cola / Fanta / Sprite", 125, {
  og: [choice("og-soda", { tr: "Seçim", en: "Choice" }, [["Cola", "Cola"], ["Fanta", "Fanta"], ["Sprite", "Sprite"]])],
});
add(cSoft, "Cappy", 125, { og: [flavour([["Vişne", "Sour cherry"], ["Şeftali", "Peach"], ["Karışık", "Mixed fruit"]])] });
add(cSoft, "Ice Tea", 125, { en: "Iced Tea", og: [flavour([["Şeftali", "Peach"], ["Limon", "Lemon"], ["Mango", "Mango"]])] });
add(cSoft, "Soda", 75, { en: "Sparkling Mineral Water" });
add(cSoft, "Su", 60, { en: "Water" });
add(cSoft, "Ayran", 95);
add(cSoft, "Red Bull", 285);
add(cSoft, "Churchill", 145);

// ═════════════════════════ BAR ═════════════════════════

const gBar = group("bar", "martini", { tr: "Bar", en: "Bar" }, "1514362545857-3bc16c4c7d1b");

const cCocktail = category(gBar, "kokteyller", "martini", { tr: "Kokteyller", en: "Cocktails" }, "1514362545857-3bc16c4c7d1b");
add(cCocktail, "Long Island Iced Tea", 750, { d: ["Absolut, tekila, Cointreau, Bacardi, cin, kola, misket limonu", "Absolut, tequila, Cointreau, Bacardi, gin, cola, lime"] });
add(cCocktail, "Sex on the de Lucchi", 650, {
  d: ["Archers, Absolut, Olmeca, portakal suyu, grenadin", "Archers, Absolut, Olmeca, orange juice, grenadine"],
  tags: ["signature"],
  featured: true,
});
add(cCocktail, "Mai Tai", 650, { d: ["Rom, portakal suyu, misket limonu, şeker", "Rum, orange juice, lime, sugar"] });
add(cCocktail, "Margarita", 650, { d: ["Misket limonu, tekila, Cointreau", "Lime, tequila, Cointreau"] });
add(cCocktail, "Mojito", 650, { d: ["Rom, nane, misket limonu, şeker", "Rum, mint, lime, sugar"] });
add(cCocktail, "Apple Martini", 650, { d: ["Martini Bianco, Absolut, elma suyu", "Martini Bianco, Absolut, apple juice"] });
add(cCocktail, "Malibu Sunset", 650, { d: ["Malibu, portakal suyu, ananas", "Malibu, orange juice, pineapple"] });
add(cCocktail, "Lynchburg Lemonade", 685, { d: ["Jack Daniel's, Cointreau, Sprite, misket limonu suyu", "Jack Daniel's, Cointreau, Sprite, lime juice"] });
add(cCocktail, "White Angel", 685, { d: ["Jack Daniel's, Safari, Sprite, misket limonu suyu", "Jack Daniel's, Safari, Sprite, lime juice"] });
add(cCocktail, "Manhattan", 685, { d: ["Jack Daniel's, Martini, misket limonu suyu", "Jack Daniel's, Martini, lime juice"] });
add(cCocktail, "Beyazıt", 685, { d: ["Absolut, Cardinal Melon, misket limonu suyu", "Absolut, Cardinal Melon, lime juice"] });
add(cCocktail, "Irish Coffee", 650, { d: ["Viski, espresso, krema", "Whisky, espresso, cream"] });

const cShots = category(gBar, "shotlar", "flame", { tr: "Shot'lar", en: "Shots" }, "1470337458703-46ad1756a187");
add(cShots, "Tekila", 350, { en: "Tequila" });
add(cShots, "B-52", 350);
add(cShots, "Sambuca", 350);
add(cShots, "Jägermeister", 350);
add(cShots, "Limoncello", 350);
add(cShots, "Viski", 350, { en: "Whisky" });
add(cShots, "Kanlı Beyin", 350, { en: "Bloody Brain", d: ["Archers, Baileys, grenadin", "Archers, Baileys, grenadine"] });

const cImport = category(gBar, "import-icecekler", "martini", { tr: "Import İçecekler", en: "Imported Spirits" }, "1527281400683-1aae777175f8");
for (const [name, price] of [
  ["Jack Daniel's", 600], ["J&B", 600], ["Chivas Regal", 650], ["Johnnie Walker Black Label", 650], ["Dimple", 650],
  ["Malibu", 600], ["Archers", 600], ["Baileys", 600], ["Safari", 600], ["Cardinal Melon", 600], ["Smirnoff", 600],
  ["Martini", 600], ["Bacardi", 600], ["Absolut", 600], ["Gordon's Gin", 600], ["Cointreau", 600], ["Campari", 600],
  ["Beefeater Gin", 600], ["Konyak", 650], ["Import + Enerji İçeceği", 700], ["Hendrick's Gin", 700], ["Ketel One", 700],
] as [string, number][]) {
  add(cImport, name, price, name === "Konyak" ? { en: "Cognac" } : name.startsWith("Import") ? { en: "Imported Spirit + Energy Drink" } : {});
}

const cLocal = category(gBar, "yerli-icecekler", "glass-water", { tr: "Yerli İçecekler", en: "Local Spirits" }, "1703013131836-362d5f600eef");
add(cLocal, "Rakı", null, { v: [["Tek", "Single", 320], ["Duble", "Double", 380]] });
add(cLocal, "Votka", 450, { en: "Vodka" });
add(cLocal, "Cin", 450, { en: "Gin" });
add(cLocal, "Votka + Enerji İçeceği", 500, { en: "Vodka + Energy Drink" });

const cBeer = category(gBar, "biralar", "beer", { tr: "Biralar", en: "Beers" }, "1535958636474-b021ee887b13");
for (const [name, size, price] of [
  ["Blanc", "33 cl", 320], ["Tuborg", "50 cl şişe", 300], ["Tuborg", "33 cl şişe", 270], ["Carlsberg", "50 cl şişe", 320],
  ["Efes Özel Seri", "50 cl şişe", 320], ["Corona", "35,5 cl şişe", 400], ["Bomonti Filtresiz", "50 cl şişe", 320], ["Heineken", "33 cl şişe", 400],
] as [string, string, number][]) {
  const label = name === "Tuborg" ? `${name} ${size.split(" ")[0]} cl` : name;
  add(cBeer, label, price, { d: [size, size.replace("şişe", "bottle")] });
}

const cWineGlass = category(gBar, "kadeh-saraplar", "wine", { tr: "Kadeh Şaraplar", en: "Wine by the Glass" }, "1510812431401-41d2bd2722f3");
add(cWineGlass, "Kadeh Beyaz Şarap", 385, { en: "Glass of White Wine" });
add(cWineGlass, "Kadeh Kırmızı Şarap", 385, { en: "Glass of Red Wine" });
add(cWineGlass, "Kadeh Roze Şarap", 385, { en: "Glass of Rosé Wine" });
add(cWineGlass, "Şarap Peynir Tabağı", 750, { en: "Wine & Cheese Plate", d: ["Parmesan, rokfor, gravyer, gouda", "Parmesan, Roquefort, Gruyère, Gouda"] });

const cRed = category(gBar, "kirmizi-saraplar", "grape", { tr: "Kırmızı Şaraplar", en: "Red Wines" }, "1506377247377-2a5b3b417ebb");
add(cRed, "900 Cabernet Sauvignon", 2950);
add(cRed, "Kavaklıdere Yakut", 1850);
add(cRed, "Majestik Syrah Kalecik Karası", 1850);
add(cRed, "Kayra Allure Kalecik Karası", 1950);
add(cRed, "Kayra Vintage Merlot", 2100);
add(cRed, "Artı Cabernet Franc", 1950);

const cWhite = category(gBar, "beyaz-saraplar", "wine", { tr: "Beyaz Şaraplar", en: "White Wines" }, "1506377247377-2a5b3b417ebb");
add(cWhite, "İsabey Sauvignon Blanc", 2750);
add(cWhite, "Kayra Allure Sauvignon Blanc", 1950);
add(cWhite, "Artı Sauvignon Blanc", 1950);
add(cWhite, "Majestik Sauvignon Blanc", 1850);
add(cWhite, "Kayra Vintage Narince", 2100);
add(cWhite, "Buzbağ Rezerve", 2100);
add(cWhite, "Buzbağ Klasik", 1850);

const cRose = category(gBar, "roze-saraplar", "wine", { tr: "Roze Şaraplar", en: "Rosé Wines" }, "1510812431401-41d2bd2722f3");
add(cRose, "Leona Blush", 1850);
add(cRose, "Pinot Grigio Blush", 1950);
add(cRose, "Diamond Blush", 1600);

// ═════════════════════════ NARGİLE ═════════════════════════

const gShisha = group("nargile", "cloud-fog", { tr: "Nargile", en: "Shisha" }, "1635547821500-77542481940c");

const cShishaMix = category(gShisha, "nargile-ozel-karisimlar", "cloud-fog", { tr: "Özel Karışımlar", en: "Signature Blends" }, "1635547821500-77542481940c",
  { tr: "Shisha Lounge imza karışımları.", en: "Signature blends from our shisha lounge." });
for (const [name, en, tr, enD] of [
  ["Kaktüs & Limon", "Cactus & Lemon", "Kaktüs, limon", "Cactus, lemon"],
  ["Dejavu", "Dejavu", "Kavun, karpuz, mentol", "Melon, watermelon, menthol"],
  ["Marilyn Monroe", "Marilyn Monroe", "Gül, limon, mentol", "Rose, lemon, menthol"],
  ["Moscow Night", "Moscow Night", "Muz, orman meyveleri, mentol", "Banana, forest fruits, menthol"],
  ["Love 66", "Love 66", "Karpuz, sakız, mentol", "Watermelon, gum, menthol"],
  ["Lady Killer", "Lady Killer", "Ejder meyvesi, yaban mersini, mentol", "Dragon fruit, blueberry, menthol"],
  ["Plombir Ice Cream", "Plombir Ice Cream", "Vanilya, çikolata, dondurma", "Vanilla, chocolate, ice cream"],
  ["İzmir Romantik", "İzmir Romantic", "Kavun, karpuz, nane", "Melon, watermelon, mint"],
  ["İnferno", "Inferno", "Yaban mersini, çilek, üzüm, ahududu, nane", "Blueberry, strawberry, grape, raspberry, mint"],
] as const) {
  add(cShishaMix, `${name} Nargile`, 900, { en: `${en} Shisha`, d: [tr, enD] });
}
add(cShishaMix, "Soğuk Marpuç Nargile", 900, { en: "Frosted Hose Shisha", d: ["Buzlu (soğuk) marpuç ile", "Served with an iced hose"] });

const shishaFlavours: [string, string][] = [
  ["Elma", "Apple"], ["Nane", "Mint"], ["Portakal", "Orange"], ["Kavun", "Melon"], ["Vivident", "Vivident"],
  ["Çift Elma", "Two Apple"], ["Pişmiş Şeftali", "Peach"], ["Limon", "Lemon"], ["Karpuz", "Watermelon"],
  ["Çilek", "Strawberry"], ["Cappuccino", "Cappuccino"], ["Sakız", "Gum"], ["Osmanlı Kahvesi", "Ottoman Coffee"],
  ["Üzüm", "Grape"], ["Bisküvi", "Biscuit"],
];
const cShishaClassic = category(gShisha, "nargile-klasik-aromalar", "cloud-fog", { tr: "Klasik Aromalar", en: "Classic Flavours" }, "1574238752695-675b86d49267");
add(cShishaClassic, "Klasik Nargile", 900, {
  en: "Classic Shisha",
  d: [shishaFlavours.map(([tr]) => tr).join(", "), shishaFlavours.map(([, en]) => en).join(", ")],
  og: [flavour(shishaFlavours)],
});
