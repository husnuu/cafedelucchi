import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getSearchIndex } from "@/lib/menu/queries";
import { Suspense } from "react";
import { SearchClient, SearchFromParams } from "@/components/menu/search-client";

export async function generateMetadata({ params }: PageProps<"/[locale]/ara">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return { title: getDictionary(locale).searchTitle, robots: { index: false } };
}

export default async function SearchPage({ params }: PageProps<"/[locale]/ara">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getDictionary(locale);
  const items = await getSearchIndex(locale);
  const props = {
    items,
    locale,
    labels: {
      title: t.searchTitle,
      placeholder: t.searchPlaceholder,
      hint: t.searchHint,
      empty: t.searchEmpty,
      back: t.back,
      soldOut: t.soldOut,
      clear: t.close,
      results: [t.results(1).replace("1", "{n}"), t.results(2).replace("2", "{n}")],
    },
  };

  return (
    <div className="relative mx-auto min-h-svh max-w-[30rem] bg-surface shadow-[0_0_60px_rgb(0_0_0/0.08)]">
      <Suspense fallback={<SearchClient {...props} />}>
        <SearchFromParams {...props} />
      </Suspense>
    </div>
  );
}
