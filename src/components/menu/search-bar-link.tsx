import Link from "next/link";
import { Search } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

/** Altta sabit, tek elle erişilebilen arama çubuğu; dokununca arama sayfası açılır. */
export function SearchBarLink({ locale, placeholder }: { locale: Locale; placeholder: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[30rem] px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <Link
        href={`/${locale}/ara`}
        className="pointer-events-auto flex h-14 items-center gap-3 rounded-full border border-white/60 bg-white/85 pr-2 pl-5 text-[15px] text-muted shadow-[0_8px_30px_rgb(0_0_0/0.16)] backdrop-blur-md"
      >
        <span className="flex-1 truncate">{placeholder}</span>
        <span className="grid size-10 place-items-center rounded-full bg-brand text-on-brand">
          <Search aria-hidden className="size-[18px]" strokeWidth={2.25} />
        </span>
      </Link>
    </div>
  );
}
