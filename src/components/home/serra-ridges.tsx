// Silhueta dos morros da Serra, em linhas finas, no pé do herói.
const RIDGES = [
  "M0 250 C140 228 220 176 330 194 S540 140 660 166 S880 104 1000 132 S1220 86 1330 112 S1440 100 1440 100",
  "M0 272 C160 252 260 214 380 226 S600 184 720 204 S940 150 1060 176 S1260 136 1440 150",
  "M0 292 C180 276 300 248 430 256 S660 226 790 240 S1010 200 1130 220 S1320 192 1440 200",
  "M0 310 C200 300 340 282 480 288 S720 266 860 276 S1080 252 1200 264 S1380 248 1440 252",
];

export function SerraRidges({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className={`pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-paper)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--color-paper-deep)" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path d={`${RIDGES[0]} L1440 320 L0 320 Z`} fill="url(#fog)" opacity="0.7" />
      {RIDGES.map((d, i) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity={0.09 + i * 0.035}
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
