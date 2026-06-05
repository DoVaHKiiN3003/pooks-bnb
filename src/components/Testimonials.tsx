"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const reviews = [
  {
    quote:
      "We arrived as guests and left as family. The wine tasting at sunset is something I think about often.",
    name: "Helena M.",
    place: "Brooklyn, NY",
  },
  {
    quote:
      "The most considered bed & breakfast I've ever stayed in. Every detail answered a question I hadn't yet asked.",
    name: "Daniel R.",
    place: "London, UK",
  },
  {
    quote:
      "Our dog was treated like royalty. The garden suite was quiet, sun-drenched, and impossibly soft.",
    name: "Priya S.",
    place: "Mumbai, IN",
  },
];

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative w-full overflow-hidden py-24 md:py-40"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mb-16 md:mb-24"
        >
          <span className="font-display text-[11px] uppercase tracking-[0.32em] text-[var(--color-brass)]">
            — Words from the road
          </span>
          <h2 className="mt-4 max-w-[20ch] text-balance font-serif text-5xl font-light leading-[0.95] tracking-[-0.03em] text-[var(--color-cream)] md:text-7xl">
            <span className="italic text-brass">Quiet praise,</span> <br />
            earned slowly.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.9,
                ease: easeOut,
                delay: i * 0.1,
              }}
              className="group flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/60 p-8 transition-colors duration-500 hover:border-[var(--color-border-strong)] md:p-10"
            >
              <div>
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="fill-[var(--color-brass)] text-[var(--color-brass)]"
                    />
                  ))}
                </div>
                <blockquote className="text-balance font-serif text-2xl font-light leading-snug tracking-tight text-[var(--color-cream)] md:text-3xl">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full border border-[var(--color-border-strong)] bg-gradient-to-br from-[var(--color-brass)]/40 to-transparent"
                  aria-hidden
                />
                <div>
                  <div className="font-display text-sm font-medium text-[var(--color-cream)]">
                    {r.name}
                  </div>
                  <div className="font-display text-[11px] uppercase tracking-[0.2em] text-[var(--color-cream-dim)]">
                    {r.place}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
