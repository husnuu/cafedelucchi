import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Phone } from "lucide-react";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getFeatured, getGroups, getPopular, getSite } from "@/lib/menu/queries";
import { LangSwitch } from "@/components/menu/lang-switch";
import { LogoBadge } from "@/components/menu/logo";
import { MenuIcon } from "@/components/menu/menu-icon";
import { ProductRow } from "@/components/menu/product-row";
import { SearchBarLink } from "@/components/menu/search-bar-link";
import { InstagramIcon, WhatsAppIcon } from "@/components/menu/social-icons";
import { formatPrice } from "@/lib/format";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const t = getDictionary(locale);
  const [site, groups, featured, popular] = await Promise.all([
    getSite(locale),
    getGroups(locale),
    getFeatured(locale),
    getPopular(locale),
  ]);

  return (
    <div className="relative mx-auto min-h-svh max-w-[30rem] bg-surface shadow-[0_0_60px_rgb(0_0_0/0.08)]">
      {/* — Hero: marka + ana gruplar (ilk ekranda menüye tek dokunuş) — */}
      <section className="relative isolate flex min-h-[88svh] flex-col overflow-hidden px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-14">
        <Image src={site.heroImage} alt="" fill preload sizes="(min-width: 480px) 480px, 100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />

        <div className="flex justify-end">
          <LangSwitch current={locale} label={t.language} />
        </div>

        <div className="mt-2 flex flex-col items-center text-center text-white">
          <h1 className="sr-only">{site.name}</h1>
          <LogoBadge className="size-44 drop-shadow-[0_6px_20px_rgb(0_0_0/0.35)]" title={site.name} />
          <p className="-mt-2 text-[12px] font-bold uppercase tracking-[0.28em] text-white/85">{site.tagline}</p>
        </div>

        <nav aria-label={t.menu} className="mt-auto grid grid-cols-2 gap-2.5 pt-6">
          {groups.map((g, i) => (
            <Link
              key={g.slug}
              href={`/${locale}/g/${g.slug}`}
              // Tek sayıda grup varsa sonuncusu tam genişlikte, daha basık bir kutu olur
              className={`glass group flex flex-col ${groups.length % 2 === 1 && i === groups.length - 1 ? "col-span-2 aspect-[3.2]" : "aspect-[1.45]"} items-center justify-center gap-2 rounded-2xl px-2 text-center text-white transition active:scale-[0.98]`}
            >
              <MenuIcon name={g.icon} className="size-9 transition-transform group-hover:-translate-y-0.5" strokeWidth={1.2} />
              <span className="text-[12.5px] font-bold uppercase leading-tight tracking-[0.12em]">{g.name}</span>
              <span className="-mt-1 text-[11px] text-white/70">{t.itemCount(g.itemCount)}</span>
            </Link>
          ))}
        </nav>
      </section>

      {/* — İçerik sayfası — */}
      <div className="relative -mt-8 rounded-t-card bg-surface pt-7 pb-32">
        {featured.length > 0 && (
          <section aria-labelledby="featured-title">
            <SectionHeading id="featured-title" title={t.featured} subtitle={t.featuredSub} />
            <ul className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-1">
              {featured.map((p) => (
                <li key={p.slug} className="w-[11.5rem] shrink-0 snap-start">
                  <Link href={`/${locale}/p/${p.slug}`} scroll={false} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-chip">
                      {(p.image ?? p.categoryImage) && (
                        <Image
                          src={(p.image ?? p.categoryImage)!}
                          alt=""
                          fill
                          sizes="184px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                        <p className="font-display text-[17px] font-semibold leading-tight">{p.name}</p>
                        <p className="mt-1 text-[13px] font-bold tabular-nums">
                          {p.price !== null
                            ? formatPrice(p.price, locale)
                            : p.variants[0] && formatPrice(Math.min(...p.variants.map((v) => v.price)), locale)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {popular.length > 0 && (
          <section aria-labelledby="popular-title" className="mt-9">
            <SectionHeading id="popular-title" title={t.popular} subtitle={t.popularSub} />
            <ul className="mt-2 divide-y divide-line">
              {popular.map((p) => (
                <li key={p.slug}>
                  <ProductRow product={p} locale={locale} soldOutLabel={t.soldOut} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="visit-title" className="mt-9 px-5">
          <h2 id="visit-title" className="font-display text-[22px] font-bold text-ink">
            {t.visit}
          </h2>
          <p className="mt-1 text-[14px] leading-relaxed text-muted">{site.about}</p>

          <div className="mt-4 divide-y divide-line rounded-2xl border border-line">
            <div className="flex gap-3 p-4">
              <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
              <div className="flex-1">
                <h3 className="text-[13px] font-bold uppercase tracking-[0.1em]">{t.hours}</h3>
                <dl className="mt-2 space-y-1 text-[14px]">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4">
                      <dt className="text-muted">{h.days}</dt>
                      <dd className="font-semibold tabular-nums">
                        {h.open} – {h.close}
                      </dd>
                    </div>
                  ))}
                </dl>
                {site.hoursNote && <p className="mt-2 text-[13px] italic text-muted">{site.hoursNote}</p>}
              </div>
            </div>
            <div className="flex gap-3 p-4">
              <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
              <div className="flex-1">
                <h3 className="text-[13px] font-bold uppercase tracking-[0.1em]">{t.address}</h3>
                <p className="mt-1 text-[14px] text-ink/80">{site.address}</p>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-[14px] font-bold text-brand underline-offset-4 hover:underline">
                  {t.directions} →
                </a>
              </div>
            </div>
          </div>

          <div className={`mt-4 grid gap-2 ${site.whatsapp ? "grid-cols-3" : "grid-cols-2"}`}>
            <SocialLink href={`tel:${site.phone.replace(/\s/g, "")}`} label={t.call}>
              <Phone aria-hidden className="size-5" />
            </SocialLink>
            {site.whatsapp && (
              <SocialLink href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} label="WhatsApp" external>
                <WhatsAppIcon className="size-5" />
              </SocialLink>
            )}
            <SocialLink href={`https://instagram.com/${site.instagram}`} label="Instagram" external>
              <InstagramIcon className="size-5" />
            </SocialLink>
          </div>
        </section>

        <footer className="mt-12 flex flex-col items-center gap-3 px-5 text-center">
          <LogoBadge className="size-24" title={site.name} />
          <p className="text-[12px] text-muted">
            © {site.name} · {t.rights}
          </p>
        </footer>
      </div>

      <SearchBarLink locale={locale} placeholder={t.searchPlaceholder} />
    </div>
  );
}

function SectionHeading({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  return (
    <div className="px-5">
      <h2 id={id} className="font-display text-[22px] font-bold leading-tight text-ink">
        {title}
      </h2>
      <p className="mt-0.5 text-[13px] italic text-muted">{subtitle}</p>
    </div>
  );
}

function SocialLink({ href, label, external, children }: { href: string; label: string; external?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex h-14 flex-col items-center justify-center gap-1 rounded-xl bg-chip text-[11px] font-bold text-ink/80 transition hover:bg-brand hover:text-on-brand"
    >
      {children}
      {label}
    </a>
  );
}
