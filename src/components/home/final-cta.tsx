import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../reveal";
import { SerraRidges } from "./serra-ridges";

export function FinalCta() {
  return (
    <section className="px-5 py-24 sm:px-8 md:py-32">
      <Reveal className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-grape px-6 py-16 text-paper sm:px-12 md:py-24">
        <SerraRidges className="absolute inset-x-0 bottom-0 -z-10 h-1/2 w-full opacity-40 invert" />
        <p className="text-center font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper/60">
          Comece hoje
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-center font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.02] tracking-[-0.035em] text-balance">
          A Serra trabalha <em className="text-leaf">junto</em>.
        </h2>

        <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
          <Link
            href="/vagas/nova"
            className="press group flex items-center justify-between gap-4 rounded-2xl bg-paper px-6 py-5 text-ink hover:bg-card"
          >
            <span>
              <span className="block text-sm text-muted">Tenho uma empresa</span>
              <span className="mt-0.5 block text-lg font-medium">Publicar uma vaga</span>
            </span>
            <ArrowRight
              className="size-5 shrink-0 text-grape transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
          <Link
            href="/cadastro?tipo=profissional"
            className="press group flex items-center justify-between gap-4 rounded-2xl border border-paper/25 px-6 py-5 hover:border-paper/50 hover:bg-paper/5"
          >
            <span>
              <span className="block text-sm text-paper/60">Sou profissional</span>
              <span className="mt-0.5 block text-lg font-medium">Criar meu perfil</span>
            </span>
            <ArrowRight
              className="size-5 shrink-0 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
