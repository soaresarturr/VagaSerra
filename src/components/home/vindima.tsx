"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";

// Cena da vindima em camadas: foto inteira atrás, a palavra no meio e o
// recorte da mesma foto na frente. As duas fotos recebem exatamente o mesmo
// enquadramento e a mesma transformação, então o recorte cobre a pessoa da
// foto de fundo sem deslocar. O scroll só mexe na escala comum, no
// escurecimento do fundo e no texto, que sobe por trás da pessoa.
//
// O progresso do scroll vira a variável --p (0 a 1) na seção; o CSS faz o resto.

const PHOTO = "object-cover object-[50%_42%]";

export function Vindima() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 1;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const layer = { transform: "scale(calc(1.16 - 0.16 * var(--p)))" } as CSSProperties;

  return (
    <section
      ref={ref}
      aria-labelledby="vindima-titulo"
      className="relative h-[230vh] bg-ink motion-reduce:h-svh"
      style={{ "--p": 0 } as CSSProperties}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Fundo */}
        <div className="absolute inset-0 origin-[50%_60%] will-change-transform" style={layer}>
          <Image src="/img/vindima.webp" alt="" fill sizes="100vw" className={PHOTO} />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgb(28_24_36/0.55),rgb(59_21_80/0.35)_45%,rgb(28_24_36/0.75))]"
            style={{ opacity: "calc(0.35 + 0.65 * var(--p))" }}
          />
        </div>

        {/* Palavra entre as camadas */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[25%] flex justify-center md:top-[17%] will-change-transform"
          style={{
            opacity: "clamp(0, (var(--p) - 0.04) * 3.2, 1)",
            transform: "translateY(calc((1 - clamp(0, var(--p) * 2.2, 1)) * 18vh))",
          }}
        >
          <span className="select-none font-display text-[clamp(4.5rem,21vw,21rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.06em] text-paper">
            Vindima
          </span>
        </div>

        {/* Recorte na frente */}
        <div className="pointer-events-none absolute inset-0 origin-[50%_60%] will-change-transform" style={layer}>
          <Image
            src="/img/vindima-recorte.png"
            alt="Mulher sorrindo durante a colheita da uva em um parreiral da Serra Gaúcha"
            fill
            sizes="100vw"
            className={PHOTO}
          />
        </div>

        {/* Texto na frente de tudo */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/55 to-transparent pt-56">
          <div
            className="mx-auto flex max-w-6xl flex-col gap-6 px-5 pb-12 text-paper sm:px-8 md:flex-row md:items-end md:justify-between md:pb-16"
            style={{
              opacity: "clamp(0, (var(--p) - 0.45) * 3.5, 1)",
              transform: "translateY(calc((1 - clamp(0, (var(--p) - 0.45) * 3.5, 1)) * 24px))",
            }}
          >
            <div className="max-w-xl">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-leaf">Feito junto</p>
              <h2
                id="vindima-titulo"
                className="mt-3 font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.035em] text-balance"
              >
                Na Serra, o trabalho sempre foi feito lado a lado.
              </h2>
            </div>
            <p className="max-w-sm leading-relaxed text-paper/75 text-pretty">
              Da colheita da uva à linha de produção, a região cresceu com gente que se ajuda. A FreeSerra leva esse
              jeito para cada projeto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
