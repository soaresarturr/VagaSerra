import { MapPin } from "lucide-react";
import Link from "next/link";
import { getFeaturedTalent } from "@/lib/data";
import { formatRate } from "@/lib/format";
import { Reveal } from "../reveal";
import { SectionHeading } from "./section-heading";

const AVATAR_TONES = ["bg-vine", "bg-grape", "bg-ink-soft", "bg-grape-deep"];

export async function FeaturedTalent() {
  const talent = await getFeaturedTalent(4);

  return (
    <section id="profissionais" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Profissionais"
          title={
            <>
              Gente da Serra que <em className="text-vine">sabe fazer</em>.
            </>
          }
          lead="Cada perfil mostra cidade, especialidades e valor de referência. Você vê o trabalho antes de chamar."
          link={{ href: "/profissionais", label: "Ver todos os profissionais" }}
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {talent.map((person, i) => (
            <Reveal as="li" key={person.id} i={i}>
              <Link
                href={`/profissionais/${person.id}`}
                className="lift flex h-full flex-col rounded-[20px] border border-line bg-card p-6"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`grid size-14 place-items-center rounded-full text-base font-semibold text-paper ${AVATAR_TONES[i % AVATAR_TONES.length]}`}
                  >
                    {person.initials}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${
                      person.available ? "bg-vine-soft text-vine" : "bg-paper-deep text-muted"
                    }`}
                  >
                    <span className={`size-1.5 rounded-full ${person.available ? "bg-vine" : "bg-muted"}`} />
                    {person.available ? "Disponível" : "Agenda cheia"}
                  </span>
                </div>

                <h3 className="mt-5 text-[1.1rem] font-medium">{person.name}</h3>
                <p className="mt-1 text-[0.92rem] leading-snug text-ink-soft text-pretty">{person.headline}</p>
                <p className="mt-3 flex items-center gap-1 text-sm text-muted">
                  <MapPin className="size-3.5" aria-hidden />
                  {person.city}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Especialidades">
                  {person.skills.map((skill) => (
                    <li key={skill} className="rounded-md bg-paper-deep px-2 py-0.5 text-[0.75rem] text-ink-soft">
                      {skill}
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-6 font-mono text-[0.85rem]">{formatRate(person.hourlyRateCents)}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
