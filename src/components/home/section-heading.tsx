import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  link,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  link?: { href: string; label: string };
}) {
  return (
    <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">{eyebrow}</p>
        <h2 className="mt-3 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.02] tracking-[-0.03em] text-balance">
          {title}
        </h2>
        {lead && <p className="mt-4 max-w-xl leading-relaxed text-ink-soft text-pretty">{lead}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-[0.95rem] font-medium text-grape"
        >
          {link.label}
          <ArrowRight
            className="size-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      )}
    </Reveal>
  );
}
