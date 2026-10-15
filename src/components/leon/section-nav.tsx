"use client";

import { useEffect, useRef, useState } from "react";

/** Yapışkan bölüm menüsü: kaydırdıkça aktif bölümü vurgular ve görünür tutar. */
export function SectionNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const targets = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (list && tab) list.scrollTo({ left: tab.offsetLeft - list.clientWidth / 2 + tab.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="Menü bölümleri" className="sticky top-0 z-20 border-b border-line bg-surface/90 backdrop-blur-lg">
      <ul ref={listRef} className="no-scrollbar flex gap-5 overflow-x-auto px-5">
        {sections.map((s) => (
          <li key={s.id} data-id={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className="relative block py-3.5 text-[13.5px] font-semibold whitespace-nowrap text-muted transition-colors aria-[current]:text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-transparent aria-[current]:after:bg-brand"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
