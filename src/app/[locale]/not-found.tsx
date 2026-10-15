import Link from "next/link";
import { locale as localeParam } from "next/root-params";
import { defaultLocale, hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { LogoBadge } from "@/components/menu/logo";

export default async function NotFound() {
  const value = await localeParam();
  const locale = hasLocale(value) ? value : defaultLocale;
  const t = getDictionary(locale);

  return (
    <main className="mx-auto flex min-h-svh max-w-[30rem] flex-col items-center justify-center gap-5 bg-surface px-8 text-center">
      <LogoBadge className="size-24" />
      <h1 className="font-display text-[26px] font-bold leading-tight">{t.notFoundTitle}</h1>
      <p className="text-[15px] text-muted">{t.notFoundText}</p>
      <Link href={`/${locale}`} className="mt-2 rounded-full bg-brand px-6 py-3 text-[15px] font-bold text-on-brand hover:bg-brand-strong">
        {t.backToMenu}
      </Link>
    </main>
  );
}
