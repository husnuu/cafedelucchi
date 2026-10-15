"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

export function LangSwitch({ current, label, tone = "light" }: { current: Locale; label: string; tone?: "light" | "brand" }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  const base =
    tone === "light"
      ? "glass text-white"
      : "bg-white/15 text-on-brand ring-1 ring-inset ring-white/25";

  return (
    <nav aria-label={label} className={`flex rounded-full p-0.5 text-xs font-bold ${base}`}>
      {locales.map((l) => {
        const active = l === current;
        return (
          <Link
            key={l}
            href={`/${l}${rest ? `/${rest}` : ""}`}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            replace
            scroll={false}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
            }}
            className={`grid h-8 min-w-10 place-items-center rounded-full px-2.5 uppercase tracking-wide transition-colors ${
              active ? "bg-white text-ink" : "opacity-85 hover:opacity-100"
            }`}
          >
            {l}
          </Link>
        );
      })}
    </nav>
  );
}
