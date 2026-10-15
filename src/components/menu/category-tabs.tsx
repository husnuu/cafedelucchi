"use client";

import { useEffect, useRef, useState } from "react";
import type { IconName } from "@/lib/menu/types";
import { MenuIcon } from "./menu-icon";

type Tab = { slug: string; name: string; icon: IconName };

/**
 * Yapışkan, yatay kaydırılabilir kategori sekmeleri.
 * Sayfa kaydırıldıkça aktif sekme güncellenir (scroll-spy) ve görünür alana kayar.
 */
export function CategoryTabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const [active, setActive] = useState(tabs[0]?.slug);
  const stripRef = useRef<HTMLDivElement>(null);
  const lockUntil = useRef(0);

  // İlk açılışta #hash varsa ona git; aktif sekmeyi scroll dinleyicisi belirler
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash && tabs.some((t) => t.slug === hash)) {
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    }
  }, [tabs]);

  useEffect(() => {
    const sections = tabs
      .map((t) => document.getElementById(t.slug))
      .filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      if (Date.now() < lockUntil.current) return;
      const offset = (stripRef.current?.getBoundingClientRect().bottom ?? 0) + 24;
      let current: string | undefined = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) current = section.id;
      }
      // Sayfanın en altına inildiğinde son sekmeyi seç
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections.at(-1)?.id;
      }
      if (current) setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [tabs]);

  // Aktif sekmeyi şeridin görünen alanına getir
  useEffect(() => {
    const strip = stripRef.current;
    const tab = strip?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!strip || !tab) return;
    const left = tab.offsetLeft - strip.clientWidth / 2 + tab.clientWidth / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label={label}
      className="sticky top-(--header-h) z-20 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85"
    >
      <div ref={stripRef} className="no-scrollbar flex h-(--tabs-h) items-center gap-2 overflow-x-auto scroll-px-4 px-4">
        {tabs.map((tab) => {
          const isActive = tab.slug === active;
          return (
            <a
              key={tab.slug}
              href={`#${tab.slug}`}
              data-tab={tab.slug}
              aria-current={isActive ? "location" : undefined}
              onClick={(e) => {
                e.preventDefault();
                setActive(tab.slug);
                lockUntil.current = Date.now() + 800;
                document.getElementById(tab.slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
                history.replaceState(null, "", `#${tab.slug}`);
              }}
              className={`flex h-10 shrink-0 items-center gap-2 rounded-lg px-3.5 text-[13px] font-semibold whitespace-nowrap transition-colors ${
                isActive ? "bg-brand text-on-brand shadow-sm" : "bg-chip text-ink/75 hover:text-ink"
              }`}
            >
              <MenuIcon name={tab.icon} className="size-4" strokeWidth={1.75} />
              {tab.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
