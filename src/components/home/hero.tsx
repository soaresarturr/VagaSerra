"use client";

import { ArrowRight, MapPin, Search } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { HeroFeed, type FeedItem } from "./hero-feed";
import { SerraRidges } from "./serra-ridges";

type Audience = "empresa" | "profissional";

const COPY: Record<
  Audience,
  {
    title: [string, string, string];
    lead: string;
    placeholder: string;
    action: string;
    route: string;
    chips: string[];
    feedLabel: string;
  }
> = {
  empresa: {
    title: ["Quem resolve está", "mais perto", "do que você imagina."],
    lead: "Publique uma vaga de freela e receba propostas de profissionais de Caxias, Bento, Gramado e região. Gente que pode passar na sua empresa amanhã de manhã.",
    placeholder: "Que profissional você procura?",
    action: "Buscar",
    route: "/profissionais",
    chips: ["Designer de rótulos", "Fotógrafo de eventos", "Dev de e-commerce", "Projetista CAD"],
    feedLabel: "Profissionais disponíveis",
  },
  profissional: {
    title: ["Seu trabalho merece ser", "encontrado", "aqui na Serra."],
    lead: "Monte seu perfil, mostre o que você sabe fazer e seja chamado por empresas da região. Sem disputar preço com o país inteiro.",
    placeholder: "Que tipo de trabalho você faz?",
    action: "Ver vagas",
    route: "/vagas",
    chips: ["Social media", "Tradução para italiano", "Vídeo para vinícolas", "BPO financeiro"],
    feedLabel: "Vagas novas",
  },
};

export function Hero({
  cities,
  jobsFeed,
  talentFeed,
}: {
  cities: string[];
  jobsFeed: FeedItem[];
  talentFeed: FeedItem[];
}) {
  const [audience, setAudience] = useState<Audience>("empresa");
  const copy = COPY[audience];

  return (
    <section className="relative isolate overflow-hidden">
      <SerraRidges className="absolute inset-x-0 bottom-0 -z-10 h-[38%] w-full" />

      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-14 px-5 pb-24 pt-10 sm:px-8 md:pt-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-12 lg:pb-32">
        <div>
          <p className="rise flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">
            <span className="size-1.5 rounded-full bg-leaf" />
            Freelas na Serra Gaúcha
          </p>

          <AudienceToggle value={audience} onChange={setAudience} />

          <h1
            key={audience}
            className="swap mt-7 font-display text-[clamp(2.5rem,6vw,4.4rem)] leading-[1.02] tracking-[-0.035em] text-balance"
          >
            {copy.title[0]} <em className="text-grape">{copy.title[1]}</em> {copy.title[2]}
          </h1>

          <p
            key={`${audience}-lead`}
            className="swap mt-6 max-w-[34rem] text-[1.075rem] leading-relaxed text-ink-soft text-pretty"
            style={{ animationDelay: "40ms" }}
          >
            {copy.lead}
          </p>

          <form
            action={copy.route}
            className="rise mt-9 flex flex-col gap-2 rounded-[20px] border border-line bg-card p-2 shadow-[0_20px_50px_-36px_rgb(29_26_22/0.5)] sm:flex-row sm:items-center"
            style={{ "--i": 3 } as CSSProperties}
          >
            <label className="flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl px-3 py-2.5 focus-within:bg-paper/70">
              <Search className="size-[18px] shrink-0 text-muted" aria-hidden />
              <span className="sr-only">{copy.placeholder}</span>
              <input
                name="q"
                placeholder={copy.placeholder}
                className="w-full bg-transparent text-[0.98rem] outline-none placeholder:text-muted/80"
              />
            </label>
            <span className="hidden h-7 w-px bg-line sm:block" aria-hidden />
            <label className="flex items-center gap-2 rounded-2xl px-3 py-2.5 focus-within:bg-paper/70">
              <MapPin className="size-[18px] shrink-0 text-muted" aria-hidden />
              <span className="sr-only">Cidade</span>
              <select
                name="cidade"
                defaultValue=""
                className="w-full cursor-pointer bg-transparent text-[0.98rem] outline-none sm:w-[8.5rem]"
              >
                <option value="">Toda a Serra</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="press inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-grape px-5 py-3 font-medium text-paper hover:bg-grape-deep"
            >
              {copy.action}
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </form>

          <div key={`${audience}-chips`} className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-muted">Procurados:</span>
            {copy.chips.map((chip, i) => (
              <a
                key={chip}
                href={`${copy.route}?q=${encodeURIComponent(chip)}`}
                className="swap press rounded-full border border-line bg-card/70 px-3 py-1.5 text-sm text-ink-soft hover:border-ink/30 hover:text-ink"
                style={{ animationDelay: `${80 + i * 40}ms` }}
              >
                {chip}
              </a>
            ))}
          </div>
        </div>

        <div className="rise lg:pt-10" style={{ "--i": 4 } as CSSProperties}>
          <HeroFeed
            key={audience}
            label={copy.feedLabel}
            items={audience === "empresa" ? talentFeed : jobsFeed}
          />
          <p className="mt-4 px-1 text-sm text-muted">
            {audience === "empresa"
              ? "Perfis de quem mora e trabalha na região."
              : "Vagas publicadas por empresas da região."}
          </p>
        </div>
      </div>
    </section>
  );
}

function AudienceToggle({
  value,
  onChange,
}: {
  value: Audience;
  onChange: (value: Audience) => void;
}) {
  const options: { value: Audience; label: string }[] = [
    { value: "empresa", label: "Sou empresa" },
    { value: "profissional", label: "Sou profissional" },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Você é"
      className="rise relative mt-6 inline-grid grid-cols-2 rounded-full border border-line bg-card p-1"
      style={{ "--i": 1 } as CSSProperties}
    >
      <span
        aria-hidden
        className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full transition-[transform,background-color] duration-[380ms] ease-[var(--ease-drawer)] ${
          value === "empresa" ? "translate-x-0 bg-grape" : "translate-x-full bg-vine"
        }`}
      />
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={`press relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 sm:px-5 ${
              active ? "text-paper" : "text-ink-soft hover:text-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
