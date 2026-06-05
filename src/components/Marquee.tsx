"use client";

const items = [
  "Spa Treatments",
  "Wine Tasting",
  "Pet Friendly",
  "Historic Charm",
  "Quiet Mornings",
  "Garden Breakfast",
];

export function Marquee() {
  return (
    <section
      aria-label="Highlights"
      className="relative w-full overflow-hidden border-y border-[var(--color-border)] py-10 md:py-14"
    >
      <div
        className="flex w-max animate-[marquee_38s_linear_infinite] gap-12 will-change-transform"
        style={{ animationName: "marquee" }}
      >
        {[...items, ...items, ...items].map((label, i) => (
          <div
            key={`${label}-${i}`}
            className="flex shrink-0 items-center gap-12 font-serif text-3xl font-light tracking-tight text-[var(--color-cream)] md:text-5xl"
          >
            <span className="italic">{label}</span>
            <span className="text-[var(--color-brass)]" aria-hidden>
              ✦
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}
