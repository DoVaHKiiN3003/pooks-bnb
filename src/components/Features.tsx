"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Wifi, Wine, Utensils, Bath, PawPrint, Sparkles } from "lucide-react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const rooms = [
  {
    name: "The Standard",
    price: 149,
    nights: "/ night",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80&auto=format&fit=crop",
    blurb: "Hand-crafted linens, morning light, and a view of the garden.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    name: "The Deluxe",
    price: 229,
    nights: "/ night",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80&auto=format&fit=crop",
    blurb: "A private terrace and claw-foot tub. Built for slow mornings.",
    span: "md:col-span-2",
  },
  {
    name: "The Suite",
    price: 349,
    nights: "/ night",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80&auto=format&fit=crop",
    blurb: "A fireplace, a reading nook, and the softest sheets in the house.",
    span: "md:col-span-2",
  },
];

const amenities = [
  { Icon: Sparkles, label: "Spa Treatments" },
  { Icon: Wine, label: "Wine Tasting" },
  { Icon: PawPrint, label: "Pet Friendly" },
  { Icon: Wifi, label: "Free WiFi" },
  { Icon: Utensils, label: "Breakfast Included" },
  { Icon: Bath, label: "Private Baths" },
];

export function Features() {
  return (
    <section
      id="rooms"
      className="relative w-full overflow-hidden py-24 md:py-40"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mb-16 flex flex-col items-start gap-4 md:mb-24 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="font-display text-[11px] uppercase tracking-[0.32em] text-[var(--color-brass)]">
              — Rooms &amp; Rates
            </span>
            <h2 className="mt-4 max-w-[18ch] text-balance font-serif text-5xl font-light leading-[0.95] tracking-[-0.03em] text-[var(--color-cream)] md:text-7xl">
              Three rooms. <br />
              <span className="italic text-brass">One house.</span>
            </h2>
          </div>
          <p className="max-w-[36ch] text-pretty font-display text-base font-light leading-relaxed text-[var(--color-cream-dim)] md:text-right">
            Each room is named, not numbered. Each bed is dressed in linen we
            wash by hand. Nothing here is generic.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-4 md:grid-rows-[auto_auto]">
          {rooms.map((room, i) => (
            <motion.a
              key={room.name}
              href="#reserve"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.9,
                ease: easeOut,
                delay: i * 0.08,
              }}
              className={`group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elev)] ${
                room.span
              } min-h-[280px] md:min-h-[340px]`}
              data-cursor-hover
            >
              <Image
                src={room.image}
                alt={room.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-70 transition-transform duration-[1400ms] ease-[var(--ease-expo-out)] group-hover:scale-105 group-hover:opacity-90"
                style={{ transitionTimingFunction: "var(--ease-expo-out)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,10,8,0) 30%, rgba(10,10,8,0.85) 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl font-light tracking-tight text-[var(--color-cream)] md:text-3xl">
                    {room.name}
                  </h3>
                  <span className="font-display text-sm text-[var(--color-brass)]">
                    ${room.price}
                    <span className="text-[var(--color-cream-mute)]">
                      {room.nights}
                    </span>
                  </span>
                </div>
                <p className="mt-2 max-w-[40ch] text-pretty font-display text-sm font-light text-[var(--color-cream-dim)]">
                  {room.blurb}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Amenities strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-[var(--color-border)] pt-10"
        >
          {amenities.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 font-display text-[12px] uppercase tracking-[0.2em] text-[var(--color-cream-dim)]"
            >
              <Icon size={14} className="text-[var(--color-brass)]" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
