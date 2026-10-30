import {
  ArrowUpRight,
  Calculator,
  Camera,
  CodeXml,
  Languages,
  Megaphone,
  Mountain,
  PenTool,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { Category } from "@/lib/types";
import { Reveal } from "../reveal";
import { SectionHeading } from "./section-heading";

const ICONS: Record<string, LucideIcon> = {
  design: PenTool,
  desenvolvimento: CodeXml,
  marketing: Megaphone,
  "foto-video": Camera,
  engenharia: Ruler,
  turismo: Mountain,
  idiomas: Languages,
  financas: Calculator,
};

export function Categories({ categories }: { categories: Category[] }) {
  return (
    <section id="categorias" className="scroll-mt-20 border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Categorias"
          title={
            <>
              Do rótulo do vinho <em className="text-grape">à peça usinada</em>.
            </>
          }
          lead="Áreas pensadas para o que a economia da Serra mais procura: indústria, vinho, móveis, turismo e serviços."
        />

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => {
            const Icon = ICONS[category.slug] ?? PenTool;
            return (
              <Reveal as="li" key={category.slug} i={i % 4} className="bg-card">
                <Link
                  href={`/vagas?categoria=${category.slug}`}
                  className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-paper"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="size-6 text-grape" strokeWidth={1.6} aria-hidden />
                    <ArrowUpRight
                      className="size-4 -translate-x-1 translate-y-1 text-muted opacity-0 transition-[opacity,transform] duration-300 ease-[var(--ease-out)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-8 font-medium">{category.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{category.description}</p>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
