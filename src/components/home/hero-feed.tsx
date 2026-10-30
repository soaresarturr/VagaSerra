"use client";

import { MapPin } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type FeedItem = {
  id: string;
  kind: "vaga" | "profissional";
  title: string;
  subtitle: string;
  city: string;
  aside: string;
  initials?: string;
};

const VISIBLE = 4;
const INTERVAL_MS = 3200;

// Painel "Agora na Serra": a cada poucos segundos um item novo entra no topo
// e a lista desliza uma linha para baixo. Pausa com o mouse em cima, com a aba
// oculta e quando o sistema pede menos movimento.
export function HeroFeed({ items, label }: { items: FeedItem[]; label: string }) {
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (paused || items.length <= VISIBLE) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setOffset((o) => o + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const list = listRef.current;
    const row = list?.children[1] as HTMLElement | undefined;
    if (!list || !row) return;
    const step = row.offsetTop - (list.children[0] as HTMLElement).offsetTop;
    list.animate([{ transform: `translateY(-${step}px)` }, { transform: "none" }], {
      duration: 520,
      easing: "cubic-bezier(0.23, 1, 0.32, 1)",
    });
  }, [offset]);

  const visible = Array.from(
    { length: Math.min(VISIBLE, items.length) },
    (_, k) => items[(((k - offset) % items.length) + items.length) % items.length],
  );

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className="relative overflow-hidden rounded-[22px] border border-line bg-card/90 shadow-[0_30px_80px_-40px_rgb(29_26_22/0.45)] backdrop-blur"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="pulse-dot size-2 rounded-full bg-vine" />
          <span className="text-sm font-medium">Agora na Serra</span>
        </div>
        <span key={label} className="swap hidden font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted sm:inline">
          {label}
        </span>
      </div>

      <div className="swap relative h-[316px] overflow-hidden">
        <ul ref={listRef} className="flex flex-col gap-2 p-3" aria-live="off">
          {visible.map((item, k) => (
            <li
              key={item.id}
              className={`${k === 0 && offset > 0 ? "feed-in" : ""} flex items-center gap-3.5 rounded-2xl border border-line/70 bg-paper/60 px-3.5 py-3`}
            >
              {item.kind === "profissional" ? (
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-vine text-[0.8rem] font-semibold text-paper">
                  {item.initials}
                </span>
              ) : (
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-grape-soft font-display text-base text-grape">
                  {item.subtitle.charAt(0)}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.95rem] font-medium leading-snug">{item.title}</p>
                <p className="mt-0.5 flex items-center gap-1 truncate text-[0.8rem] text-muted">
                  <span className="truncate">{item.subtitle}</span>
                  <span aria-hidden>·</span>
                  <MapPin className="size-3 shrink-0" aria-hidden />
                  <span className="truncate">{item.city}</span>
                </p>
              </div>
              <span className="hidden shrink-0 font-mono text-[0.72rem] text-ink-soft sm:block">
                {item.aside}
              </span>
            </li>
          ))}
        </ul>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
      </div>
    </div>
  );
}
