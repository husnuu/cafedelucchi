"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, Search, X } from "lucide-react";
import { formatPrice, normalizeSearch } from "@/lib/format";
import type { Locale } from "@/lib/i18n/config";
import type { SearchItem } from "@/lib/menu/queries";

type Labels = {
  title: string;
  placeholder: string;
  hint: string;
  empty: string;
  back: string;
  soldOut: string;
  clear: string;
  results: string[]; // [tekil, çoğul] şablonları: "{n} sonuç"
};

type Props = { items: SearchItem[]; locale: Locale; labels: Labels };

/** ?q= parametresini okur. Suspense içinde kullanılır; statik kabukta boş arama görünür. */
export function SearchFromParams(props: Props) {
  const q = useSearchParams().get("q") ?? "";
  return <SearchClient {...props} initialQuery={q} />;
}

export function SearchClient({ items, locale, labels, initialQuery = "" }: Props & { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const url = query ? `?q=${encodeURIComponent(query)}` : window.location.pathname;
    history.replaceState(history.state, "", url);
  }, [query]);

  const index = useMemo(() => items.map((item) => ({ item, text: normalizeSearch(item.haystack) })), [items]);

  const results = useMemo(() => {
    const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index.filter(({ text }) => terms.every((t) => text.includes(t))).map(({ item }) => item);
  }, [index, query]);

  const resultLabel = (results.length === 1 ? labels.results[0] : labels.results[1]).replace("{n}", String(results.length));

  return (
    <>
      <header className="sticky top-0 z-20 bg-brand px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 text-on-brand">
        <div className="flex items-center gap-2">
          <Link href={`/${locale}`} className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-white/10">
            <ChevronLeft aria-hidden className="size-6" />
            <span className="sr-only">{labels.back}</span>
          </Link>
          <h1 className="sr-only">{labels.title}</h1>
          <label className="flex h-12 flex-1 items-center gap-2 rounded-full bg-white px-4 text-ink shadow-sm">
            <Search aria-hidden className="size-[18px] shrink-0 text-muted" />
            <input
              type="search"
              autoFocus
              enterKeyHint="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.placeholder}
              aria-label={labels.title}
              className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} className="-mr-2 grid size-9 place-items-center rounded-full text-muted hover:bg-chip">
                <X aria-hidden className="size-4" />
                <span className="sr-only">{labels.clear}</span>
              </button>
            )}
          </label>
        </div>
      </header>

      <main className="pb-16">
        {!query.trim() ? (
          <p className="px-6 py-16 text-center text-[15px] text-muted">{labels.hint}</p>
        ) : results.length === 0 ? (
          <p className="px-6 py-16 text-center text-[15px] text-muted" role="status">
            {labels.empty}
          </p>
        ) : (
          <>
            <p className="px-5 pt-4 pb-1 text-[12px] font-bold uppercase tracking-[0.12em] text-muted" role="status">
              {resultLabel}
            </p>
            <ul className="divide-y divide-line">
              {results.map((item) => (
                <li key={item.slug}>
                  <Link href={`/${locale}/p/${item.slug}`} scroll={false} className="flex items-center gap-4 px-4 py-3 hover:bg-chip/60">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-image bg-chip">
                      {item.image && (
                        <Image src={item.image} alt="" fill sizes="64px" className={`object-cover ${item.isAvailable ? "" : "grayscale"}`} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-brand">{item.categoryName}</p>
                      <p className="truncate text-[15px] font-bold">{item.name}</p>
                      <p className="truncate text-[13px] italic text-muted">
                        {item.isAvailable ? item.shortDescription : labels.soldOut}
                      </p>
                    </div>
                    <span className="shrink-0 text-[14px] font-semibold text-price tabular-nums">
                      {item.price !== null
                        ? formatPrice(item.price, locale)
                        : item.variants[0] && formatPrice(Math.min(...item.variants.map((v) => v.price)), locale)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </>
  );
}
