import { Reveal } from "../reveal";

const REASONS = [
  {
    title: "Reunião no mesmo dia",
    body: "O profissional está a poucos quilômetros. Dá para tomar um café, visitar a fábrica ou acompanhar a sessão de fotos de perto.",
  },
  {
    title: "Quem conhece o mercado",
    body: "Vindima, Festa da Uva, temporada de inverno, feira de móveis. Quem é daqui já sabe o calendário e o jeito de trabalhar da Serra.",
  },
  {
    title: "Reputação que circula",
    body: "Na região todo mundo se conhece. Avaliações de empresas vizinhas valem mais do que estrelas de desconhecidos.",
  },
  {
    title: "O dinheiro fica aqui",
    body: "Cada projeto contratado na FreeSerra paga alguém que mora, consome e investe na própria região.",
  },
];

export function WhyLocal() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-paper/60">Por que regional</p>
          <h2 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.035em]">
            Perto é <em className="text-leaf">melhor</em>.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-paper/70 text-pretty">
            As grandes plataformas colocam você para competir com o Brasil inteiro. A FreeSerra faz o contrário:
            aproxima quem está a uma subida de serra de distância.
          </p>
        </Reveal>

        <ol className="flex flex-col">
          {REASONS.map((reason, i) => (
            <Reveal
              as="li"
              key={reason.title}
              i={i}
              className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-paper/15 py-8 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr]"
            >
              <span className="font-mono text-sm leading-7 text-leaf">0{i + 1}</span>
              <div>
                <h3 className="text-[1.2rem] font-medium">{reason.title}</h3>
                <p className="mt-2 leading-relaxed text-paper/70 text-pretty">{reason.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
