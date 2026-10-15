import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales, type Locale } from "@/lib/i18n/config";

/** Dil öneki olmayan adresleri (ör. "/") tercih edilen dile yönlendirir. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  // Dil önekli adresler ve kendi root layout'u olan Leon'un Meyhanesi menüsü olduğu gibi geçer
  if (hasLocale(first) || first === "leonbalik") return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get("NEXT_LOCALE")?.value;
  if (saved && hasLocale(saved)) return saved;

  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return (ranked.find((r) => (locales as readonly string[]).includes(r.lang))?.lang as Locale) ?? defaultLocale;
}

export const config = {
  // _next, api, statik dosyalar ve metadata dosyaları hariç
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
