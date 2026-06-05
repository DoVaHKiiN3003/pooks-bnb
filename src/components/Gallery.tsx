"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const easeOut = [0.16, 1, 0.3, 1] as const;

const slices = [
  {
    key: "parlour",
    title: "The Parlour",
    image:
      "https://images.unsplash.com/photo-1551776235-dde6d482980b?w=1600&q=80&auto=format&fit=crop",
  },
  {
    key: "library",
    title: "The Library",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=80&auto=format&fit=crop",
  },
  {
    key: "garden",
    title: "The Garden",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80&auto=format&fit=crop",
  },
  {
    key: "spa",
    title: "The Spa",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80&auto=format&fit=crop",
  },
  {
    key: "dining",
    title: "The Dining Room",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1600&q=80&auto=format&fit=crop",
  },
];

export function Gallery() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden py-24 md:py-40"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mb-12 flex flex-col items-start gap-4 md:mb-20"
        >
          <span className="font-display text-[11px] uppercase tracking-[0.32em] text-[var(--color-brass)]">
            — Gallery
          </span>
          <h2 className="max-w-[20ch] text-balance font-serif text-5xl font-light leading-[0.95] tracking-[-0.03em] text-[var(--color-cream)] md:text-7xl">
            Worn soft <br />
            <span className="italic text-brass">by decades.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
          className="flex h-[60vh] min-h-[420px] w-full gap-2 overflow-hidden rounded-2xl md:h-[70vh]"
        >
          {slices.map((s, i) => (
            <button
              type="button"
              key={s.key}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-label={`View ${s.title}`}
              aria-expanded={active === i}
              className={cn(
                "group relative h-full overflow-hidden rounded-xl border border-[var(--color-border)] transition-[flex] duration-700 ease-[var(--ease-expo-out)] focus:outline-none",
                active === i ? "flex-[5]" : "flex-1"
              )}
              data-cursor-hover
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo-out)] group-hover:scale-105"
              />
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  active === i ? "opacity-100" : "opacity-60"
                )}
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,10,8,0.4) 0%, rgba(10,10,8,0.1) 50%, rgba(10,10,8,0.85) 100%)",
                }}
              />
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 p-5 transition-opacity duration-500 md:p-8",
                  active === i ? "opacity-100" : "opacity-70"
                )}
              >
                <div className="mb-2 h-px w-8 bg-[var(--color-brass)]" />
                <h3 className="font-serif text-2xl font-light tracking-tight text-[var(--color-cream)] md:text-4xl">
                  {s.title}
                </h3>
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
