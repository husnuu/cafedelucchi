/**
 * Leon'un Meyhanesi menüsü — basılı menüden (Ekim 2026) aktarıldı.
 * Fiyatlar TL cinsindendir. `null` fiyat → basılı menüde fiyat yok ("?" / "—"),
 * sayfada "Günün fiyatı" olarak gösterilir.
 */

export type LeonPrice = number | number[] | null;

export interface LeonItem {
  tr: string;
  en?: string;
  /** İçerik / açıklama [tr, en] */
  desc?: [string, string?];
  price: LeonPrice;
}

export interface LeonGroup {
  tr?: string;
  en?: string;
  items: LeonItem[];
}

export interface LeonSection {
  id: string;
  tr: string;
  en: string;
  /** Kategori görseli: /leon/* restoranın Instagram'ından, diğerleri temsili stok fotoğraf */
  image: string;
  note?: [string, string];
  groups: LeonGroup[];
}

const stock = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80&fit=crop&auto=format`;

const i = (tr: string, en: string | undefined, price: LeonPrice, desc?: [string, string?]): LeonItem => ({ tr, en, price, desc });

export const leonSite = {
  name: "Leon'un Meyhanesi",
  phone: "0532 276 64 69",
  tagline: { tr: "Balık · Meze · Rakı", en: "Fish · Meze · Rakı" },
  instagram: "leonunmeyhanesi",
  freeNote: { tr: "Çay ikram, kuver servis bedeli yoktur.", en: "Complimentary tea — no cover or service charge." },
  reserveNote: { tr: "Rezervasyon yaptırmayı unutmayın", en: "Don't forget to book a table" },
};

export const fixMenu = {
  image: "/leon/fix-menu-sofra.jpg",
  includes: [
    ["Izgara Balık, Tavuk veya Köfte", "Grilled fish, chicken or meatballs"],
    ["Yeşil Balıkçı Salata", "Green fisherman's salad"],
    ["4 Çeşit Meze", "4 kinds of meze"],
    ["Fava, Havuç Tarator", "Fava, carrot tarator"],
    ["Yoğurtlu Sıcak Ot Tabağı", "Warm herb plate with yoghurt"],
    ["Cevizli Girit Kabak", "Cretan zucchini with walnuts"],
    ["Revani", "Revani"],
    ["35 cl Yeni Rakı veya 1 Şişe Şarap", "35 cl Yeni Rakı or 1 bottle of wine"],
  ] as [string, string][],
  note: { tr: "Menü 2 kişiliktir", en: "Menu is for 2 people" },
  prices: [
    { tr: "Alkollü", en: "With alcohol", price: 2350 },
    { tr: "Alkolsüz", en: "Without alcohol", price: 1750 },
  ],
};

export const foodSections: LeonSection[] = [
  {
    id: "soguk-mezeler",
    tr: "Soğuk Mezeler",
    en: "Cold Appetizers",
    image: "/leon/soguk-mezeler.jpg",
    groups: [
      {
        items: [
          i("Patlıcan Salatası", "Aubergine Salad", 300),
          i("Patlıcan Dövme", "Aubergine Dip Crush", 400),
          i("Yoğurtlu Patlıcan", "Aubergine Salad with Yoghurt", 320),
          i("Havuç Tarator", "Carrot Tarator", 320),
          i("Biber Tarator", "Pepper Tarator", 400),
          i("Şakşuka", "Şakşuka", 310),
          i("Köpoğlu", "Köpoğlu", 310),
          i("Mantar Mantı", "Mushroom Ravioli", 340),
          i("Taze Fasulye", "Green Beans with Olive Oil", 350),
          i("Deniz Börülcesi", "Sea Beans", 320),
          i("Taze Börülce", "Fresh Black-Eyed Beans", 350),
          i("Tekmil Fava", "Fava with Onion", 310),
          i("Sade Fava", "Fava", 310),
          i("Kuru Börülce", "Dry Cowpea", 300),
          i("Atom", "Atom", 350),
          i("Humus", "Hummus", 310),
          i("Pancar Turşusu", "Pickled Beetroot", 300),
          i("Mor Lahana Turşusu", "Purple Sauerkraut", 300),
          i("Karışık Ege Otları", "Mixed Aegean Herbs", null),
          i("Cibes", "Cibes", 320),
          i("Turp Otu", "Radish Greens", 300),
          i("Acılı Antep Ezme", "Spicy Antep Ezme", 320),
          i("Yoğurtlu Semizotu", "Purslane with Yoghurt", 320),
          i("Haydari", "Haydari", 300),
          i("Barbunya", "Kidney Beans with Olive Oil", 320),
          i("Brokoli", "Broccoli", 300),
          i("Söğüş Tabağı", "Söğüş Plate", 300),
          i("Girit Kabak", "Cretan Zucchini", 310),
          i("Lakerda", "Lakerda", 750),
          i("Levrek Marin", "Marinated Sea Bass", 750),
          i("Ahtapot Söğüş", "Octopus Söğüş", 800),
          i("Soslu Hamsi Marin", "Marinated Anchovy with Sauce", 600),
          i("Çiroz", "Çiroz", 650),
          i("Enginar", "Artichoke", 400),
          i("Girit Ezme", "Cretan Crush", 400),
          i("Kaya Koruğu", "Rock Samphire", 300),
        ],
      },
    ],
  },
  {
    id: "salatalar",
    tr: "Salatalar",
    en: "Salads",
    image: "/leon/salata.jpg",
    note: [
      "Tüm salata çeşitlerimiz limon, nar ekşisi ve zeytinyağı soslu servis edilir.",
      "All our salads are served with lemon, pomegranate molasses and olive oil dressing.",
    ],
    groups: [
      {
        items: [
          i("Klasik Balıkçı Salatası", "Classic Fisherman's Salad", 420, ["Roka, domates, salatalık, kırmızı soğan", "Rocket, tomato, cucumber, red onion"]),
          i("Çoban Salatası", "Shepherd's Salad", 450, ["Domates, salatalık, kırmızı soğan, yeşil biber, maydanoz", "Tomato, cucumber, red onion, green pepper, parsley"]),
          i("Kaşık Salatası", "Chopped Salad", 450, [
            "İnce kıyım domates, kırmızı soğan, salatalık, kıl yeşil biber, maydanoz, ceviz · İsteğe göre peynirli",
            "Finely chopped tomato, red onion, cucumber, green pepper, parsley, walnuts · Cheese on request",
          ]),
          i("Gavur Dağı Salatası", "Gavur Dağı Salad", 550, ["Domates, salatalık, kırmızı soğan, yeşil biber, maydanoz, ceviz", "Tomato, cucumber, red onion, green pepper, parsley, walnuts"]),
          i("Yeşil Salata", "Green Salad", 420, ["Roka, marul, taze nane, maydanoz, dereotu, salatalık", "Rocket, lettuce, fresh mint, parsley, dill, cucumber"]),
          i("Karışık Deniz Mahsullü Salata", "Mixed Seafood Salad", 1250, ["Ahtapot, karides, kalamar", "Octopus, shrimp, calamari"]),
        ],
      },
    ],
  },
  {
    id: "ara-sicaklar",
    tr: "Ara Sıcaklar",
    en: "Warm Starters",
    image: "/leon/kalamar-tava.jpg",
    groups: [
      {
        items: [
          i("Tereyağlı Karides", "Shrimp in Butter", 950),
          i("Tereyağlı Yaprak Ciğer", "Liver in Butter", 850),
          i("Kaşarlı Karides Güveç", "Shrimp Casserole with Cheese", 1000),
          i("Kaşarlı Ahtapot Güveç", "Octopus Casserole with Cheese", 1100),
          i("Izgara Ahtapot", "Grilled Octopus", 950),
          i("Kalamar Tava", "Fried Calamari", 950),
          i("Midye Tava", "Fried Mussels", 800),
          i("Bebek Izgara Kalamar", "Grilled Baby Calamari", 750),
          i("Saganaki Peyniri", "Saganaki Cheese", 350),
          i("Deniz Mahsullü Şevketi Bostan", "Seafood with Şevketi Bostan", 1200),
          i("Deniz Mahsullü Börek", "Seafood Pie", 375),
          i("Deniz Mahsullü Sıcak Ot", "Seafood with Warm Herbs", 1200),
          i("Izgara Jumbo Karides", "Grilled Jumbo Shrimp", null),
          i("Patates Kızartması", "French Fries", 375),
          i("Kaşarlı Mantar", "Mushrooms with Cheese", 195),
          i("Sıcak Ot Tabağı", "Warm Herb Plate", 400),
          i("Sigara Böreği", "Cheese Rolls", 320),
          i("Kızarmış Köy Peyniri", "Fried Village Cheese", 195),
        ],
      },
    ],
  },
  {
    id: "baliklar",
    tr: "Balıklar",
    en: "Fish",
    image: "/leon/izgara-cipura.jpg",
    groups: [
      {
        items: [
          i("Levrek", "Sea Bass", [1200, 2000, 3500]),
          i("Çipura", "Sea Bream", [1200, 2000, 3500]),
          i("Granyoz", "Meagre", 1250),
          i("Barbun", "Red Mullet", null),
          i("Somon Izgara", "Grilled Salmon", 1250),
          i("Lagos", "Grouper", null),
          i("Dil Balığı", "Sole", 3500),
        ],
      },
    ],
  },
  {
    id: "ana-yemekler",
    tr: "Ana Yemekler",
    en: "Main Dishes",
    image: "/leon/kofte.jpg",
    groups: [
      {
        items: [
          i("Leon Izgara Köfte", "Leon Grilled Meatballs", 900),
          i("Izgara Kuzu Pirzola", "Grilled Lamb Chops", 1650),
          i("Et Sote Kavurma", "Sautéed Meat", 1600),
          i("Tavuk Izgara", "Grilled Chicken", 850),
          i("Körili Tavuk", "Curry Chicken", 850),
          i("Mantarlı Tavuk", "Chicken with Mushrooms", 850),
          i("Şnitzel", "Schnitzel", 850),
          i("Karışık Izgara", "Mixed Grill", 1700),
        ],
      },
    ],
  },
  {
    id: "tatlilar",
    tr: "Tatlılar",
    en: "Desserts",
    image: "/leon/tatli.jpg",
    groups: [
      {
        items: [
          i("Cevizli Kabak Tatlısı", "Pumpkin Dessert with Walnuts", 350),
          i("Haşhaşlı Revani", "Poppy Seed Revani", 220),
          i("Çikolatalı Sufle", "Chocolate Soufflé", 650),
          i("San Sebastian", "San Sebastian Cheesecake", 400),
          i("Fırın Helva", "Baked Halva", 450),
          i("Cheesecake", "Cheesecake", 400),
          i("Çikolatalı Kara Orman Meyveli", "Chocolate Cake with Cherry", 400),
        ],
      },
    ],
  },
];

export const rakiMeta = { id: "rakilar", tr: "Rakılar", en: "Rakı", image: "/leon/raki-gun-batimi.jpg" };

export const rakiSizes = ["20 cl", "35 cl", "50 cl", "70 cl", "100 cl"];

export const rakiTable: { name: string; prices: number[] }[] = [
  { name: "Efe Gold", prices: [1150, 1850, 2250, 2800, 3200] },
  { name: "Göbek", prices: [1300, 2200, 2600, 3200, 3750] },
  { name: "Beylerbeyi Mavi", prices: [1150, 1850, 2250, 2800, 3200] },
  { name: "Yeni Rakı", prices: [900, 1250, 1700, 2200, 3000] },
  { name: "Tekirdağ", prices: [1150, 1850, 2250, 2800, 3200] },
  { name: "Sarı Zeybek", prices: [1300, 2200, 2600, 3200, 3750] },
];

export const rakiGlass: LeonItem[] = [i("Tek", "Single", 350), i("Duble", "Double", 400)];

export const drinkSections: LeonSection[] = [
  {
    id: "saraplar",
    tr: "Şaraplar",
    en: "Wines",
    image: "/leon/beyaz-sarap.jpg",
    groups: [
      {
        tr: "Kadeh",
        en: "By the Glass",
        items: [i("Beyaz Şarap", "White Wine", 400), i("Kırmızı Şarap", "Red Wine", 400), i("Roze Şarap", "Blush Wine", 400)],
      },
      {
        tr: "Kırmızı",
        en: "Red",
        items: [
          i("900 Cabernet Sauvignon", undefined, 3200),
          i("Kavaklıdere Yakut", undefined, 1950),
          i("Majestik Syrah Kalecik Karası", undefined, 1950),
          i("Kayra Allure Kalecik Karası", undefined, 2200),
          i("Kayra Vintage Merlot", undefined, 2300),
          i("Artı Cabernet Franc", undefined, 2250),
        ],
      },
      {
        tr: "Beyaz",
        en: "White",
        items: [
          i("İsabey Sauvignon Blanc", undefined, 3200),
          i("Kayra Allure Sauvignon Blanc", undefined, 2200),
          i("Artı Sauvignon Blanc", undefined, 2250),
          i("Majestik Sauvignon Blanc", undefined, 1950),
          i("Kayra Vintage Narince", undefined, 2300),
          i("Buzbağ Rezerve", undefined, 2300),
          i("Buzbağ Klasik", undefined, 1950),
        ],
      },
      {
        tr: "Roze",
        en: "Blush",
        items: [i("Leona Blush", undefined, 1950), i("Pinot Grigio Blush", undefined, 2200), i("Diamond Blush", undefined, 1750)],
      },
      {
        items: [i("Şarap Peynir Tabağı", "Wine Cheese Plate", 950, ["Parmesan, rokfor, gravyer, gouda", "Parmesan, Roquefort, Gruyère, Gouda"])],
      },
    ],
  },
  {
    id: "kokteyller",
    tr: "Kokteyller",
    en: "Cocktails",
    image: stock("1514362545857-3bc16c4c7d1b"),
    groups: [
      {
        items: [
          i("Long Island Iced Tea", undefined, 750, ["Absolut, tekila, Cointreau, Bacardi, cin, kola, lime", "Absolut, tequila, Cointreau, Bacardi, gin, cola, lime"]),
          i("Sex on the Beach", undefined, 650, ["Archers, Absolut, Olmeca, portakal suyu, grenadin", "Archers, Absolut, Olmeca, orange juice, grenadine"]),
          i("Mai Tai", undefined, 650, ["Rom, portakal suyu, lime, şeker", "Rum, orange juice, lime, sugar"]),
          i("Margarita", undefined, 650, ["Lime, tekila, Cointreau", "Lime, tequila, Cointreau"]),
          i("Mojito", undefined, 650, ["Rom, nane, lime, şeker", "Rum, mint, lime, sugar"]),
          i("Apple Martini", undefined, 650, ["Martini Bianco, Absolut, elma suyu", "Martini Bianco, Absolut, apple juice"]),
          i("Malibu Sunset", undefined, 650, ["Malibu, portakal suyu, ananas", "Malibu, orange juice, pineapple"]),
          i("Lynchburg Lemonade", undefined, 685, ["Jack, Cointreau, Sprite, lime suyu", "Jack, Cointreau, Sprite, lime juice"]),
          i("White Angel", undefined, 685, ["Jack, Safari, Sprite, lime suyu", "Jack, Safari, Sprite, lime juice"]),
          i("Manhattan", undefined, 685, ["Jack, Martini, lime suyu", "Jack, Martini, lime juice"]),
          i("Beyazıt", undefined, 685, ["Absolut, Cardinal Melon, lime suyu", "Absolut, Cardinal Melon, lime juice"]),
          i("Irish Coffee", undefined, 650, ["Viski, espresso, krema", "Whisky, espresso, cream"]),
        ],
      },
    ],
  },
  {
    id: "alkolsuz",
    tr: "Alkolsüz Kokteyller",
    en: "Non-Alcoholic",
    image: stock("1551538827-9c037cb4f32a"),
    groups: [
      {
        items: [
          i("Detox Bomb", undefined, 350, ["Salatalık, limon, maydanoz", "Cucumber, lemon, parsley"]),
          i("Blue Lagoon", undefined, 350, ["Sprite, tonik, limon, blue curaçao", "Sprite, tonic, lemon, blue curaçao"]),
          i("Piña Colada", undefined, 350, ["Hindistan cevizi, süt, buz", "Coconut, milk, ice"]),
          i("Virgin Mojito", undefined, 350, ["Lime, nane, şeker, maden suyu", "Lime, mint, sugar, mineral water"]),
        ],
      },
    ],
  },
  {
    id: "shotlar",
    tr: "Shotlar",
    en: "Shots",
    image: stock("1470337458703-46ad1756a187"),
    groups: [
      {
        items: [
          i("Tekila", "Tequila", 350),
          i("B-52", undefined, 350),
          i("Sambuca", undefined, 350),
          i("Jägermeister", undefined, 350),
          i("Limoncello", undefined, 350),
          i("Viski", "Whisky", 350),
          i("Kanlı Beyin", undefined, 350, ["Archers, Baileys, grenadin", "Archers, Baileys, grenadine"]),
        ],
      },
    ],
  },
  {
    id: "ithal-ickiler",
    tr: "İthal İçkiler",
    en: "Imported Spirits",
    image: stock("1569529465841-dfecdab7503b"),
    groups: [
      {
        items: [
          i("Jack Daniel's", undefined, 600),
          i("J&B", undefined, 600),
          i("Chivas Regal", undefined, 650),
          i("Johnnie Walker Black Label", undefined, 650),
          i("Dimple", undefined, 650),
          i("Malibu", undefined, 600),
          i("Archers", undefined, 600),
          i("Baileys", undefined, 600),
          i("Safari", undefined, 600),
          i("Cardinal Melon", undefined, 600),
          i("Smirnoff", undefined, 600),
          i("Martini", undefined, 600),
          i("Bacardi", undefined, 600),
          i("Absolut", undefined, 600),
          i("Gordon's Gin", undefined, 600),
          i("Cointreau", undefined, 600),
          i("Campari", undefined, 600),
          i("Beefeater Gin", undefined, 600),
          i("Konyak", "Cognac", 650),
          i("İthal + Enerji", "Import + Energy", 700),
          i("Hendrick's Gin", undefined, 700),
          i("Ketel One", undefined, 700),
        ],
      },
    ],
  },
];
