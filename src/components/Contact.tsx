"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  return (
    <section
      id="reserve"
      className="relative w-full overflow-hidden py-24 md:py-40"
    >
      {/* Decorative gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 55%)",
        }}
      />
      <div className="mx-auto w-full max-w-[1100px] px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="font-display text-[11px] uppercase tracking-[0.32em] text-[var(--color-brass)]"
        >
          — Reserve
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: easeOut, delay: 0.05 }}
          className="mt-6 text-balance font-serif text-5xl font-light leading-[0.95] tracking-[-0.03em] text-[var(--color-cream)] md:text-8xl"
        >
          Come <span className="italic text-brass">rest</span> with us.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: easeOut, delay: 0.15 }}
          className="mx-auto mt-8 max-w-[44ch] text-pretty font-display text-base font-light leading-relaxed text-[var(--color-cream-dim)] md:text-lg"
        >
          Tell us when you&rsquo;d like to visit. We&rsquo;ll reply within a day
          with availability, breakfast times, and directions through the garden
          gate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: easeOut, delay: 0.25 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
        >
          <MagneticButton
            as="a"
            href="mailto:hello@pooksbnb.com?subject=Reservation%20Inquiry&body=Hello%20Pooks%2C%0A%0AI'd%20like%20to%20inquire%20about%20a%20stay.%0A%0AName%3A%0ACheck-in%3A%0ACheck-out%3A%0AGuests%3A%0A%0AThank%20you."
            className="group relative overflow-hidden rounded-full bg-[var(--color-brass)] px-8 py-4 font-display text-[12px] uppercase tracking-[0.22em] text-[var(--color-bg)]"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              <Mail size={14} />
              Email to Reserve
            </span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-[var(--color-cream)] transition-transform duration-700 ease-[var(--ease-expo-out)] group-hover:translate-y-0" />
          </MagneticButton>
          <a
            href="tel:+15551234567"
            className="font-display text-[12px] uppercase tracking-[0.22em] text-[var(--color-cream-dim)] underline-offset-[6px] transition-colors duration-300 hover:text-[var(--color-cream)] hover:underline"
          >
            <span className="inline-flex items-center gap-2">
              <Phone size={14} />
              +1 (555) 123-4567
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.35 }}
          className="mt-20 flex flex-col items-center gap-3"
        >
          <div className="mb-2 h-px w-12 bg-[var(--color-brass)]" />
          <div className="flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.22em] text-[var(--color-cream-dim)]">
            <MapPin size={14} className="text-[var(--color-brass)]" />
            Historic District · Open Year-Round
          </div>
        </motion.div>
      </div>
    </section>
  );
}
