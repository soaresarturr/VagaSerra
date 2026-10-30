import { ArrowRight, Building2, UserRound } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../reveal";
import { SectionHeading } from "./section-heading";

const SIDES = [
  {
    id: "empresa",
    icon: Building2,
    label: "Para empresas",
    title: "Contrate sem sair da região",
    accent: "bg-grape",
    tint: "bg-grape-soft text-grape",
    cta: { href: "/vagas/nova", label: "Publicar uma vaga" },
    steps: [
      ["Publique a vaga", "Diga o que precisa, o prazo, a faixa de valor e se o trabalho é presencial, híbrido ou remoto."],
      ["Receba propostas", "Profissionais da Serra respondem com portfólio e preço. Você conversa direto com eles."],
      ["Feche e avalie", "Escolha quem vai fazer. A avaliação no final fortalece quem trabalha bem por aqui."],
    ],
  },
  {
    id: "profissional",
    icon: UserRound,
    label: "Para profissionais",
    title: "Seja achado por quem está perto",
    accent: "bg-vine",
    tint: "bg-vine-soft text-vine",
    cta: { href: "/cadastro?tipo=profissional", label: "Criar meu perfil" },
    steps: [
      ["Monte seu perfil", "Conte o que você faz, onde atende e mostre trabalhos que já entregou."],
      ["Publique seus serviços", "Pacotes com preço de referência ajudam a empresa a decidir rápido."],
      ["Responda às vagas", "Receba vagas da sua área e da sua cidade e envie propostas em poucos minutos."],
    ],
  },
] as const;

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Como funciona"
          title={
            <>
              Dois lados, <em className="text-grape">um mesmo lugar</em>.
            </>
          }
          lead="A FreeSerra junta quem precisa de ajuda num projeto com quem sabe fazer, todos da mesma região."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {SIDES.map((side, s) => {
            const Icon = side.icon;
            return (
              <Reveal
                key={side.id}
                i={s}
                className="relative flex flex-col overflow-hidden rounded-[26px] border border-line bg-card p-7 sm:p-9"
              >
                <span className={`absolute inset-x-0 top-0 h-1 ${side.accent}`} aria-hidden />
                <div className="flex items-center gap-3">
                  <span className={`grid size-10 place-items-center rounded-xl ${side.tint}`}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                    {side.label}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[1.65rem] leading-tight tracking-[-0.025em]">{side.title}</h3>

                <ol className="mt-8 flex flex-1 flex-col">
                  {side.steps.map(([title, body], i) => (
                    <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-t border-line py-5">
                      <span className="font-mono text-sm text-muted">0{i + 1}</span>
                      <div>
                        <p className="font-medium">{title}</p>
                        <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <Link
                  href={side.cta.href}
                  className={`press group mt-4 inline-flex items-center justify-center gap-2 self-start rounded-full px-5 py-3 font-medium text-paper ${side.accent} hover:opacity-90`}
                >
                  {side.cta.label}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
