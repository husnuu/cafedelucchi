import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Carlito, Comfortaa, Signika } from "next/font/google";
import { hasLocale, locales } from "@/lib/i18n/config";
import { getSite } from "@/lib/menu/queries";
import { defaultTheme, themeToCssVars } from "@/lib/theme";
import "../globals.css";

const display = Signika({ variable: "--font-display", subsets: ["latin", "latin-ext"], weight: ["500", "600", "700"] });
// Carlito: Lato 2.0 tabanlı; Google Fonts'taki Lato'da Türkçe "İ" büyük harf dönüşümü bozuk.
const body = Carlito({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});
const logo = Comfortaa({ variable: "--font-logo", subsets: ["latin", "latin-ext"], weight: ["700"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const site = await getSite(locale);
  return {
    title: { default: `${site.name} — ${locale === "tr" ? "Menü" : "Menu"}`, template: `%s · ${site.name}` },
    description: site.about,
    openGraph: { title: site.name, description: site.about, images: [site.heroImage], locale, type: "website" },
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])) },
  };
}

export const viewport: Viewport = {
  themeColor: defaultTheme.brand,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children, modal, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      style={themeToCssVars(defaultTheme)}
      className={`${display.variable} ${body.variable} ${logo.variable} antialiased`}
    >
      <body className="min-h-svh font-sans">
        {children}
        {modal}
      </body>
    </html>
  );
}
