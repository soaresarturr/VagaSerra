"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  /** Posição na sequência; cada passo atrasa a entrada em 60ms. */
  i?: number;
  as?: "div" | "li";
};

export function Reveal({ i = 0, as: Tag = "div", className = "", style, ...rest }: Props) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.shown = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--i": i, ...style } as CSSProperties}
      {...rest}
    />
  );
}
