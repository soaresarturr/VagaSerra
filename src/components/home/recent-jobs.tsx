import { MapPin } from "lucide-react";
import Link from "next/link";
import { getRecentJobs } from "@/lib/data";
import { WORK_MODE_LABEL, formatBudget, formatDate } from "@/lib/format";
import { Reveal } from "../reveal";
import { SectionHeading } from "./section-heading";

export async function RecentJobs() {
  const jobs = await getRecentJobs(6);

  return (
    <section id="vagas" className="scroll-mt-20 bg-paper-deep/60 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Vagas abertas"
          title={
            <>
              Trabalho de verdade, <em className="text-grape">de empresas daqui</em>.
            </>
          }
          link={{ href: "/vagas", label: "Ver todas as vagas" }}
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, i) => (
            <Reveal as="li" key={job.id} i={i % 3}>
              <Link
                  href={`/vagas/${job.id}`}
                  className="lift flex h-full flex-col rounded-[20px] border border-line bg-card p-6"
                >
                  <div className="flex items-center justify-between gap-3 text-[0.78rem]">
                    <span className="rounded-full bg-grape-soft px-2.5 py-1 font-medium text-grape">{job.category}</span>
                    <time dateTime={job.publishedAt} className="font-mono text-muted">
                      {formatDate(job.publishedAt)}
                    </time>
                  </div>
                  <h3 className="mt-5 text-[1.15rem] font-medium leading-snug text-balance">{job.title}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                    <span>{job.company}</span>
                    <span aria-hidden>·</span>
                    <MapPin className="size-3.5" aria-hidden />
                    <span>{job.city}</span>
                  </p>
                  <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
                      <span className="font-mono text-[0.85rem] text-ink">
                        {formatBudget(job.budgetKind, job.budgetMinCents, job.budgetMaxCents)}
                      </span>
                      <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.75rem] text-ink-soft">
                        {WORK_MODE_LABEL[job.workMode]}
                      </span>
                    </div>
                  </div>
                </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
