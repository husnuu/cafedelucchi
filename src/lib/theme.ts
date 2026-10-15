import type { CSSProperties } from "react";

/**
 * Merkezi tema. Admin panelindeki "Tasarım Ayarları" bu nesneyi düzenleyecek
 * (theme_settings tablosu); root layout bunu CSS değişkenlerine çevirir ve
 * tüm bileşenler yalnızca bu değişkenleri kullanır.
 */
export interface Theme {
  brand: string;
  brandStrong: string;
  onBrand: string;
  price: string;
  canvas: string;
  surface: string;
  chip: string;
  ink: string;
  muted: string;
  line: string;
  radiusCard: string;
  radiusImage: string;
}

export const defaultTheme: Theme = {
  brand: "#6b1a3a",
  brandStrong: "#551430",
  onBrand: "#ffffff",
  price: "#7a2347",
  canvas: "#f2edef",
  surface: "#ffffff",
  chip: "#f6f1f3",
  ink: "#231a1e",
  muted: "#6e6468",
  line: "#eee7ea",
  radiusCard: "1.5rem",
  radiusImage: "0.625rem",
};

export function themeToCssVars(theme: Theme): CSSProperties {
  return {
    "--brand": theme.brand,
    "--brand-strong": theme.brandStrong,
    "--on-brand": theme.onBrand,
    "--price": theme.price,
    "--canvas": theme.canvas,
    "--surface": theme.surface,
    "--chip": theme.chip,
    "--ink": theme.ink,
    "--muted": theme.muted,
    "--line": theme.line,
    "--radius-card": theme.radiusCard,
    "--radius-image": theme.radiusImage,
  } as CSSProperties;
}
