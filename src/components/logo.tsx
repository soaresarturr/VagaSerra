import Link from "next/link";

export function Logo({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const color = tone === "ink" ? "text-ink" : "text-paper";
  return (
    <Link
      href="/"
      aria-label="FreeSerra, página inicial"
      className={`group inline-flex items-center gap-2 ${color}`}
    >
      <svg
        viewBox="0 0 32 20"
        aria-hidden
        className="h-5 w-8 transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-px"
      >
        <path
          d="M1 19 L10 6 L15 12 L21 2 L31 19"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path d="M18 7 L21 2 L24 7" fill="none" stroke="var(--color-leaf)" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className="text-[1.3rem] leading-none tracking-[-0.03em]">
        <span className="font-semibold">Free</span>
        <span className="font-semibold text-grape">Serra</span>
      </span>
    </Link>
  );
}
