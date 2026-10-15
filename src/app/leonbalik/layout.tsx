import type { Metadata, Viewport } from "next";
import { Manrope, Tinos } from "next/font/google";
import { themeToCssVars, type Theme } from "@/lib/theme";
import { leonSite } from "@/lib/leon/menu-data";
import "../globals.css";

// Leon'un Meyhanesi kendi root layout'unu kullanır: Cafe de Lucchi'den bağımsız
// font ve renk teması (logonun mavisi + yeşili, açık zemin).
const body = Manrope({ variable: "--font-body", subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700", "800"] });
// Tinos: Times New Roman ile aynı ölçülerde; logodaki serif yazı için.
const logo = Tinos({ variable: "--font-logo", subsets: ["latin", "latin-ext"], weight: "400" });

const leonTheme: Theme = {
  brand: "#1f68b0",
  brandStrong: "#17538e",
  onBrand: "#ffffff",
  price: "#10243a",
  canvas: "#eef2f6",
  surface: "#ffffff",
  chip: "#f1f5f9",
  ink: "#10243a",
  muted: "#66717e",
  line: "#e5e9ee",
  radiusCard: "1.75rem",
  radiusImage: "0.75rem",
};

export const metadata: Metadata = {
  title: `${leonSite.name} — Menü`,
  description: `${leonSite.name}: ${leonSite.tagline.tr}. ${leonSite.freeNote.tr}`,
  openGraph: { title: leonSite.name, description: leonSite.tagline.tr, locale: "tr", type: "website" },
};

export const viewport: Viewport = {
  themeColor: leonTheme.brandStrong,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function LeonLayout({ children }: LayoutProps<"/leonbalik">) {
  return (
    <html lang="tr" style={themeToCssVars(leonTheme)} className={`${body.variable} ${logo.variable} antialiased`}>
      <body className="min-h-svh font-sans">{children}</body>
    </html>
  );
}
