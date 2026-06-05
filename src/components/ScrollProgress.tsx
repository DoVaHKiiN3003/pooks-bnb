"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[9997] h-[2px] w-full origin-left bg-gradient-to-r from-[var(--color-brass)] via-[var(--color-brass-light)] to-[var(--color-brass)]"
      style={{ scaleX }}
    />
  );
}
