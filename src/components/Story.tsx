"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Story() {
  return (
    <section
      id="story"
      className="relative w-full overflow-hidden py-24 md:py-40"
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: easeOut }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[var(--color-border)] md:col-span-5"
        >
          <Image
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80&auto=format&fit=crop"
            alt="The Pooks garden in early morning light"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 60%, rgba(10,10,8,0.6) 100%)",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
          className="md:col-span-7"
        >
          <span className="font-display text-[11px] uppercase tracking-[0.32em] text-[var(--color-brass)]">
            — Our Story
          </span>
          <h2 className="mt-4 text-balance font-serif text-5xl font-light leading-[0.95] tracking-[-0.03em] text-[var(--color-cream)] md:text-7xl">
            A house that <br />
            <span className="italic text-brass">outlived</span> its century.
          </h2>
          <div className="mt-10 space-y-6 text-pretty font-display text-base font-light leading-relaxed text-[var(--color-cream-dim)] md:text-lg">
            <p>
              Built in 1894 as the private residence of a paper merchant and
              his pianist wife, Pooks has been a guesthouse since 1952. We are
              only the third family to keep the keys.
            </p>
            <p>
              We restored the house slowly, room by room, over the course of
              seven years. The floors still creak in the same three places. The
              garden is older than the road it sits on.
            </p>
            <p>
              We are not a hotel. We don&rsquo;t have a lobby. We have a
              parlour, a kettle, and a dog named Pepper who will meet you at
              the gate.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[var(--color-border)] pt-8">
            {[
              { v: "1894", l: "Built" },
              { v: "1952", l: "First Guests" },
              { v: "Pepper", l: "Resident Dog" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-3xl font-light text-[var(--color-brass)] md:text-4xl">
                  {s.v}
                </div>
                <div className="mt-1 font-display text-[10px] uppercase tracking-[0.22em] text-[var(--color-cream-dim)]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
