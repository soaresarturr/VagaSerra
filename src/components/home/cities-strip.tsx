export function CitiesStrip({ cities }: { cities: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {cities.map((city) => (
        <li key={city} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-display text-[1.25rem] tracking-[-0.02em] text-ink-soft sm:text-[1.5rem]">{city}</span>
          <svg viewBox="0 0 12 12" className="size-2.5 text-leaf" aria-hidden>
            <path d="M6 0 L7.4 4.6 L12 6 L7.4 7.4 L6 12 L4.6 7.4 L0 6 L4.6 4.6 Z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Cidades atendidas" className="marquee-wrap border-y border-line bg-card/60 py-5">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
