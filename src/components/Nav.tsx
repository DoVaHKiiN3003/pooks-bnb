"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#rooms", label: "Rooms" },
  { href: "#gallery", label: "Gallery" },
  { href: "#story", label: "Story" },
  { href: "#reviews", label: "Reviews" },
  { href: "#reserve", label: "Reserve" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 200],
    ["rgba(10,10,8,0)", "rgba(10,10,8,0.7)"]
  );
  const blur = useTransform(scrollY, [0, 200], ["blur(0px)", "blur(18px)"]);
  const borderOpacity = useTransform(scrollY, [0, 200], [0, 0.12]);
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      aria-label="Primary"
      className="fixed left-1/2 top-5 z-[100] flex w-[min(96%,1100px)] -translate-x-1/2 items-center justify-between rounded-full px-5 py-3 md:top-6 md:px-7"
      style={{
        background: bg,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        borderColor: borderOpacity as unknown as string,
      }}
    >
      <motion.div
        className="absolute inset-0 -z-10 rounded-full border"
        style={{
          borderColor: "rgba(255, 251, 235, var(--tw-border-opacity, 1))",
        }}
      />
      <a
        href="#top"
        className={cn(
          "font-serif text-lg tracking-tight text-[var(--color-cream)]",
          "md:text-xl"
        )}
      >
        Pooks
      </a>
      <ul className="hidden items-center gap-7 md:flex">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="font-display text-[13px] uppercase tracking-[0.18em] text-[var(--color-cream-dim)] transition-colors duration-300 hover:text-[var(--color-cream)]"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#reserve"
        className="hidden rounded-full border border-[var(--color-brass)] px-4 py-2 font-display text-[11px] uppercase tracking-[0.22em] text-[var(--color-brass)] transition-all duration-500 hover:bg-[var(--color-brass)] hover:text-[var(--color-bg)] md:inline-block"
        style={{ transitionTimingFunction: "var(--ease-expo-out)" }}
      >
        Book a Stay
      </a>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="md:hidden"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <X size={20} className="text-[var(--color-cream)]" />
        ) : (
          <Menu size={20} className="text-[var(--color-cream)]" />
        )}
      </button>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          y: open ? 0 : -8,
          pointerEvents: open ? "auto" : "none",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 right-0 top-[calc(100%+10px)] rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elev)]/95 p-6 backdrop-blur-xl md:hidden"
      >
        <ul className="flex flex-col gap-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-base tracking-wide text-[var(--color-cream-dim)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
}
