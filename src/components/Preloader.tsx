"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const total = reduced ? 100 : 2200;
    const t = setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, total);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-[var(--color-bg)]"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className={cn(
                "font-serif text-5xl md:text-6xl tracking-tight text-[var(--color-cream)]"
              )}
            >
              Pooks
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4,
              }}
              className="h-px w-32 origin-left bg-gradient-to-r from-[var(--color-brass)] via-[var(--color-brass-light)] to-[var(--color-brass)]"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.6,
              }}
              className="font-display text-xs uppercase tracking-[0.3em] text-[var(--color-cream-dim)]"
            >
              A historic inn
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
