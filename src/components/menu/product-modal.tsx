"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

/**
 * Ürün detayını modal olarak gösterir (intercepting route). Native <dialog>
 * kullanıldığı için odak yönetimi, Esc ile kapatma ve ekran okuyucu desteği
 * tarayıcıdan gelir. Kapatınca bir önceki URL'e dönülür.
 */
export function ProductModal({ children, title, closeLabel }: { children: ReactNode; title: string; closeLabel: string }) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  const dismiss = () => {
    if (closing.current) return;
    closing.current = true;
    router.back();
  };

  return (
    <dialog
      ref={ref}
      aria-label={title}
      className="product-sheet"
      onClose={dismiss}
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="relative max-h-[inherit] overflow-y-auto overscroll-contain">
        <div className="pointer-events-none sticky top-0 z-10 flex h-0 justify-between px-3">
          <span aria-hidden className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-white/80 shadow sm:hidden" />
        </div>
        <button
          type="button"
          onClick={dismiss}
          autoFocus
          className="absolute top-3 right-3 z-20 grid size-11 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-white"
        >
          <X className="size-5" aria-hidden />
          <span className="sr-only">{closeLabel}</span>
        </button>
        {children}
      </div>
    </dialog>
  );
}
