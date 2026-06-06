"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { MagneticButton } from "./MagneticButton";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => {
      video.play().catch(() => {
        /* autoplay blocked — silent */
      });
    };
    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("loadeddata", tryPlay, { once: true });
      video.addEventListener("canplay", tryPlay, { once: true });
    }
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState === "visible" && video.paused) tryPlay();
      },
      { once: false }
    );
    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* Video backdrop */}
      <motion.div className="absolute inset-0 -z-10" style={{ scale }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero/poster.svg"
          className="h-full w-full object-cover"
          style={{ transform: "translateZ(0)" }}
        >
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlays — match legacy hero */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,8,0.65) 0%, rgba(10,10,8,0.35) 40%, rgba(10,10,8,0.55) 70%, rgba(10,10,8,0.95) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.10) 0%, transparent 60%)",
            mixBlendMode: "overlay",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.05 }}
          className="font-display text-[11px] uppercase tracking-[0.42em] text-[var(--color-cream-dim)] md:text-xs"
        >
          Established · Historic District
        </motion.span>

        <h1 className="mt-6 max-w-[18ch] text-balance font-serif text-[15vw] font-light leading-[0.92] tracking-[-0.04em] text-[var(--color-cream)] md:text-[12vw] lg:text-[180px]">
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easeOut, delay: 0.2 }}
            className="block"
          >
            Where
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easeOut, delay: 0.32 }}
            className="block italic"
          >
            history rests.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.6 }}
          className="mt-8 max-w-[44ch] text-pretty font-display text-base font-light leading-relaxed text-[var(--color-cream-dim)] md:text-lg"
        >
          A historic inn blending luxury modern amenities with timeless charm.
          Spa, wine tasting, and pet-friendly accommodations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <MagneticButton
            as="a"
            href="#reserve"
            className="group relative overflow-hidden rounded-full bg-[var(--color-brass)] px-7 py-3.5 font-display text-[12px] uppercase tracking-[0.22em] text-[var(--color-bg)]"
          >
            <span className="relative z-10">Reserve a Stay</span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-[var(--color-cream)] transition-transform duration-700 ease-[var(--ease-expo-out)] group-hover:translate-y-0" />
          </MagneticButton>
          <a
            href="#rooms"
            className="font-display text-[12px] uppercase tracking-[0.22em] text-[var(--color-cream-dim)] underline-offset-[6px] transition-colors duration-300 hover:text-[var(--color-cream)] hover:underline"
          >
            Explore Rooms
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, ease: easeOut, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-dim)]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-8 w-px bg-gradient-to-b from-[var(--color-cream-dim)] to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
