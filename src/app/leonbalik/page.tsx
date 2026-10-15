import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { LeonLogo } from "@/components/leon/leon-logo";
import { SectionNav } from "@/components/leon/section-nav";
import {
  drinkSections,
  fixMenu,
  foodSections,
  leonSite,
  rakiGlass,
  rakiMeta,
  rakiSizes,
  rakiTable,
  type LeonItem,
  type LeonSection,
} from "@/lib/leon/menu-data";

const tl = new Intl.NumberFormat("tr-TR");
const price = (amount: number) => `${tl.format(amount)} ₺`;
const tel = `tel:+9${leonSite.phone.replace(/\s/g, "")}`;
const countOf = (s: LeonSection) => s.groups.reduce((n, g) => n + g.items.length, 0);

type Tile = { id: string; tr: string; en: string; image: string; count: number };

export default function LeonPage() {
  const food: Tile[] = foodSections.map((s) => ({ ...s, count: countOf(s) }));
  const bar: Tile[] = [
    { ...rakiMeta, count: rakiTable.length + rakiGlass.length },
    ...drinkSections.map((s) => ({ ...s, count: countOf(s) })),
  ];
  const nav = [{ id: "fix-menu", label: "Fix Menü" }, ...[...food, ...bar].map((t) => ({ id: t.id, label: t.tr }))];

  return (
    <div className="mx-auto min-h-svh max-w-[30rem] bg-surface text-ink shadow-[0_0_60px_rgb(0_0_0/0.08)]">
      {/* — Logo + iletişim — */}
      <header className="px-6 pt-[max(2.25rem,env(safe-area-inset-top))] pb-6 text-center">
        <h1 className="sr-only">{leonSite.name}</h1>
        <LeonLogo className="mx-auto w-[17rem]" />
        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.3em] text-muted">{leonSite.tagline.tr}</p>

        <div className="mt-6 flex gap-2">
          <a
            href={tel}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand text-[14px] font-bold text-on-brand transition hover:bg-brand-strong active:scale-[0.98]"
          >
            <Phone aria-hidden className="size-4" />
            Rezervasyon
          </a>
          <a href={tel} className="flex h-12 items-center justify-center rounded-xl border border-line px-4 text-[14px] font-bold tabular-nums text-ink/80">
            {leonSite.phone}
          </a>
        </div>
        <p className="mt-3 text-[12.5px] text-muted">{leonSite.freeNote.tr}</p>
      </header>

      {/* — Kategoriler: ilk ekranda — */}
      <section aria-label="Menü" className="px-4 pb-8">
        <a href="#fix-menu" className="group flex overflow-hidden rounded-2xl bg-brand text-on-brand transition active:scale-[0.99]">
          <span className="flex flex-1 flex-col justify-center px-5 py-4">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">2 Kişilik</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-[22px] font-extrabold leading-tight">
              Fix Menü
              <ArrowRight aria-hidden className="size-4.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="block text-[13px] text-white/80">Kişi başı {price(fixMenu.prices[1].price)}&apos;den</span>
          </span>
          <span className="relative w-[42%] shrink-0">
            <Image src={fixMenu.image} alt="" fill sizes="200px" className="object-cover" />
          </span>
        </a>

        <TileGroup label="Mutfak" tiles={food} />
        <TileGroup label="Bar" tiles={bar} />
      </section>

      <SectionNav sections={nav} />

      <main className="pb-16">
        <FixMenuSection />
        {foodSections.map((s) => (
          <MenuSection key={s.id} section={s} />
        ))}
        <RakiSection />
        {drinkSections.map((s) => (
          <MenuSection key={s.id} section={s} />
        ))}
      </main>

      <footer className="border-t border-line bg-chip px-6 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center">
        <LeonLogo className="mx-auto w-44" />
        <p className="mt-6 text-[13px] text-muted">{leonSite.reserveNote.tr}</p>
        <a href={tel} className="mt-1 inline-flex items-center gap-2 text-[22px] font-extrabold tabular-nums text-brand">
          <Phone aria-hidden className="size-5" />
          {leonSite.phone}
        </a>
        <a
          href={`https://instagram.com/${leonSite.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block text-[14px] font-bold text-ink/70 underline-offset-4 hover:underline"
        >
          @{leonSite.instagram}
        </a>
        <p className="mt-6 text-[12px] leading-relaxed text-muted">
          {leonSite.freeNote.tr}
          <br />
          {leonSite.freeNote.en}
        </p>
      </footer>
    </div>
  );
}

function TileGroup({ label, tiles }: { label: string; tiles: Tile[] }) {
  return (
    <div className="mt-6">
      <p className="mb-2.5 flex items-center gap-3 px-1 text-[11px] font-bold uppercase tracking-[0.26em] text-muted">
        {label}
        <span aria-hidden className="h-px flex-1 bg-line" />
      </p>
      <ul className="grid grid-cols-2 gap-2">
        {tiles.map((t) => (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:border-brand/40 active:scale-[0.98]"
            >
              <span className="relative block aspect-[16/10] bg-chip">
                <Image src={t.image} alt="" fill sizes="(min-width: 480px) 220px, 50vw" className="object-cover" />
              </span>
              <span className="flex flex-1 flex-col justify-between px-3.5 pt-2.5 pb-3">
                <span className="text-[15.5px] font-extrabold leading-tight text-ink">{t.tr}</span>
                <span className="mt-1.5 flex items-center justify-between gap-2 text-[12px] text-muted">
                  <span lang="en">{t.en}</span>
                  <span className="rounded-full bg-chip px-2 py-0.5 font-bold text-brand tabular-nums">{t.count}</span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionHeader({ id, tr, en, image, count }: Tile) {
  return (
    <header>
      <div className="relative mb-4 aspect-[3/1] overflow-hidden rounded-xl bg-chip">
        <Image src={image} alt="" fill sizes="(min-width: 480px) 440px, 100vw" className="object-cover" />
      </div>
      <div className="flex items-end justify-between gap-3 border-b-2 border-ink pb-3">
        <div>
          <h2 id={`${id}-title`} className="text-[26px] font-extrabold leading-none tracking-tight">
            {tr}
          </h2>
          <p lang="en" className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
            {en}
          </p>
        </div>
        <span className="pb-0.5 text-[12px] font-semibold text-muted">{count} çeşit</span>
      </div>
    </header>
  );
}

function FixMenuSection() {
  return (
    <section id="fix-menu" aria-labelledby="fix-menu-title" className="scroll-mt-16 px-4 pt-8">
      <div className="overflow-hidden rounded-2xl bg-brand text-on-brand">
        <div className="px-5 pt-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">
            2 Kişilik · <span lang="en">For Two</span>
          </p>
          <h2 id="fix-menu-title" className="mt-1.5 text-[30px] font-extrabold leading-none tracking-tight">
            Fix Menü
          </h2>
          <p className="mt-2 text-[13.5px] text-white/75">Alkollü veya alkolsüz · With or without alcohol</p>
        </div>

        <ol className="mt-5 border-t border-white/15">
          {fixMenu.includes.map(([tr, en], idx) => (
            <li key={tr} className="flex gap-4 border-b border-white/15 px-5 py-3">
              <span className="w-5 pt-0.5 text-[12px] font-bold text-white/45 tabular-nums">{String(idx + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-[15px] font-bold leading-snug">{tr}</p>
                <p className="text-[12.5px] text-white/60">{en}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-2 gap-2 p-2">
          {fixMenu.prices.map((p) => (
            <div key={p.tr} className="rounded-xl bg-white px-4 py-4 text-ink">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{p.tr}</p>
              <p className="mt-1 text-[26px] font-extrabold leading-none tabular-nums text-brand">{price(p.price)}</p>
              <p className="mt-1 text-[11.5px] text-muted">kişi başı · per person</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuSection({ section }: { section: LeonSection }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-16 px-5 pt-12">
      <SectionHeader {...section} count={countOf(section)} />
      {section.note && (
        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          {section.note[0]} <span className="italic">{section.note[1]}</span>
        </p>
      )}
      {section.groups.map((g, gi) => (
        <div key={g.tr ?? gi} className="mt-2">
          {g.tr && <GroupTitle tr={g.tr} en={g.en} />}
          <ul className="divide-y divide-line">
            {g.items.map((item) => (
              <li key={item.tr}>
                <ItemRow item={item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function GroupTitle({ tr, en }: { tr: string; en?: string }) {
  return (
    <h3 className="mt-6 mb-1 text-[11.5px] font-extrabold uppercase tracking-[0.2em] text-brand">
      {tr} {en && <span className="font-medium text-muted normal-case tracking-normal">/ {en}</span>}
    </h3>
  );
}

function ItemRow({ item }: { item: LeonItem }) {
  const multi = Array.isArray(item.price);
  return (
    <div className="flex gap-4 py-3.5">
      <div className="min-w-0 flex-1">
        <p className="text-[15.5px] font-bold leading-snug">{item.tr}</p>
        {item.en && item.en !== item.tr && <p className="mt-0.5 text-[13px] text-muted">{item.en}</p>}
        {item.desc && <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/60">{item.desc[0]}</p>}
        {multi && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {(item.price as number[]).map((p) => (
              <span key={p} className="rounded-lg border border-line px-2.5 py-1 text-[13.5px] font-bold tabular-nums">
                {price(p)}
              </span>
            ))}
          </div>
        )}
      </div>
      {!multi &&
        (item.price === null ? (
          <span className="shrink-0 pt-0.5 text-[12.5px] font-medium text-muted">Günün fiyatı</span>
        ) : (
          <span className="shrink-0 pt-0.5 text-[15.5px] font-extrabold tabular-nums">{price(item.price as number)}</span>
        ))}
    </div>
  );
}

function RakiSection() {
  return (
    <section id={rakiMeta.id} aria-labelledby={`${rakiMeta.id}-title`} className="scroll-mt-16 px-5 pt-12">
      <SectionHeader {...rakiMeta} count={rakiTable.length + rakiGlass.length} />
      <div className="mt-4 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[21rem] text-right text-[13px] tabular-nums">
          <thead>
            <tr className="bg-chip text-muted">
              <th scope="col" className="px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.14em]">
                cl
              </th>
              {rakiSizes.map((s) => (
                <th key={s} scope="col" className="px-1.5 py-2.5 text-[12px] font-bold whitespace-nowrap last:pr-3">
                  {s.replace(" cl", "")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rakiTable.map((r) => (
              <tr key={r.name}>
                <th scope="row" className="px-3 py-3 text-left text-[13.5px] font-bold leading-tight">
                  {r.name}
                </th>
                {r.prices.map((p, idx) => (
                  <td key={idx} className="px-1.5 py-3 font-semibold last:pr-3">
                    {tl.format(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[12px] text-muted">Fiyatlar TL&apos;dir · Prices in TRY</p>

      <GroupTitle tr="Kadeh" en="By the glass" />
      <ul className="divide-y divide-line">
        {rakiGlass.map((item) => (
          <li key={item.tr}>
            <ItemRow item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
