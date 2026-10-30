"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const NAV = [
  { href: "#vagas", label: "Vagas" },
  { href: "#profissionais", label: "Profissionais" },
  { href: "#categorias", label: "Categorias" },
  { href: "#como-funciona", label: "Como funciona" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-[var(--ease-out)] ${
        scrolled || open
          ? "border-line/80 bg-paper/85 backdrop-blur-md"
          : "border-transparent bg-paper/0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1 text-[0.94rem] text-ink-soft">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-2 transition-colors duration-200 hover:bg-paper-deep hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/entrar"
            className="press rounded-full px-4 py-2 text-[0.94rem] font-medium text-ink-soft hover:text-ink"
          >
            Entrar
          </Link>
          <Link
            href="/vagas/nova"
            className="press rounded-full bg-grape px-4 py-2 text-[0.94rem] font-medium text-paper hover:bg-grape-deep"
          >
            Publicar vaga
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="press -mr-2 grid size-10 place-items-center rounded-full text-ink md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-line/80 px-5 pb-6 pt-2 md:hidden"
      >
        <ul className="flex flex-col text-lg">
          {NAV.map((item, i) => (
            <li key={item.href} className="rise" style={{ "--i": i } as React.CSSProperties}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line/60 py-3"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link href="/entrar" className="press rounded-full border border-line py-3 text-center font-medium">
            Entrar
          </Link>
          <Link href="/vagas/nova" className="press rounded-full bg-grape py-3 text-center font-medium text-paper">
            Publicar vaga
          </Link>
        </div>
      </div>
    </header>
  );
}
