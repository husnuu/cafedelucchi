import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getGroup, getGroupSlugs, getSite } from "@/lib/menu/queries";
import { CategoryTabs } from "@/components/menu/category-tabs";
import { LangSwitch } from "@/components/menu/lang-switch";
import { LogoBadge } from "@/components/menu/logo";
import { MenuIcon } from "@/components/menu/menu-icon";
import { ProductRow } from "@/components/menu/product-row";
import { SearchBarLink } from "@/components/menu/search-bar-link";

export async function generateStaticParams() {
  return (await getGroupSlugs()).map((group) => ({ group }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/g/[group]">): Promise<Metadata> {
  const { locale, group: slug } = await params;
  if (!hasLocale(locale)) return {};
  const group = await getGroup(slug, locale);
  return group ? { title: group.name } : {};
}

export default async function GroupPage({ params }: PageProps<"/[locale]/g/[group]">) {
  const { locale, group: slug } = await params;
  if (!hasLocale(locale)) notFound();

  const [group, site] = await Promise.all([getGroup(slug, locale), getSite(locale)]);
  if (!group) notFound();
  const t = getDictionary(locale);

  return (
    <div className="relative mx-auto min-h-svh max-w-[30rem] bg-surface shadow-[0_0_60px_rgb(0_0_0/0.08)]">
      <header className="sticky top-0 z-30 bg-brand pt-[env(safe-area-inset-top)] text-on-brand">
        <div className="flex h-(--header-h) items-center gap-3 px-4">
          <Link href={`/${locale}`} className="flex min-w-0 items-center gap-2.5">
            <LogoBadge className="size-12 shrink-0" title={site.name} />
            <span className="truncate font-display text-[17px] font-semibold">{group.name}</span>
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <LangSwitch current={locale} label={t.language} tone="brand" />
            <Link
              href={`/${locale}`}
              className="flex h-10 items-center gap-0.5 rounded-full pr-2 pl-1.5 text-[14px] font-semibold hover:bg-white/10"
            >
              <ChevronLeft aria-hidden className="size-5" />
              {t.back}
            </Link>
          </div>
        </div>
      </header>

      <CategoryTabs
        label={t.categories}
        tabs={group.sections.map((s) => ({ slug: s.slug, name: s.name, icon: s.icon }))}
      />

      <main className="pb-28">
        <h1 className="sr-only">{group.name}</h1>
        {group.sections.map((section, i) => (
          <section
            key={section.id}
            id={section.slug}
            aria-labelledby={`${section.slug}-title`}
            className="scroll-mt-[calc(var(--header-h)+var(--tabs-h)+env(safe-area-inset-top))]"
          >
            <div className="relative isolate flex h-56 flex-col justify-end overflow-hidden px-5 pb-11 text-white">
              <Image
                src={section.coverImage}
                alt=""
                fill
                sizes="(min-width: 480px) 480px, 100vw"
                preload={i === 0}
                className="-z-20 object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
              <div className="flex items-center gap-3">
                <MenuIcon name={section.icon} className="size-10 shrink-0" strokeWidth={1.2} />
                <h2 id={`${section.slug}-title`} className="font-display text-[30px] font-bold leading-[1.05] drop-shadow-sm">
                  {section.name}
                </h2>
              </div>
              {section.description && <p className="mt-2 text-[14px] text-white/90">{section.description}</p>}
              <p className="mt-1 text-[12px] text-white/70">{t.itemCount(section.products.length)}</p>
            </div>

            <ul className="relative -mt-6 mx-2.5 divide-y divide-line overflow-hidden rounded-t-card bg-surface shadow-[0_-8px_24px_rgb(0_0_0/0.06)]">
              {section.products.map((product) => (
                <li key={product.slug}>
                  <ProductRow product={product} locale={locale} soldOutLabel={t.soldOut} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <SearchBarLink locale={locale} placeholder={t.searchPlaceholder} />
    </div>
  );
}
