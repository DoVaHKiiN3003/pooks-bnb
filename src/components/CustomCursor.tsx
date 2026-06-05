"use client";

import { useEffect, useState } from "react";

function shouldEnable() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  return true;
}

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const active = shouldEnable();

  useEffect(() => {
    if (!active) return;
    document.documentElement.classList.add("has-custom-cursor");

    let rafId: number | null = null;
    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor-hover], input, textarea, select, [role='button']"
      );
      setHovering(Boolean(interactive));
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden md:block"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <div
          className="rounded-full border border-[var(--color-brass)] transition-[width,height,opacity,border-color] duration-300 ease-[var(--ease-expo-out)]"
          style={{
            width: hovering ? 56 : 32,
            height: hovering ? 56 : 32,
            marginLeft: hovering ? -28 : -16,
            marginTop: hovering ? -28 : -16,
            opacity: hovering ? 0.9 : 0.6,
            background: hovering ? "rgba(212, 175, 55, 0.06)" : "transparent",
            backdropFilter: hovering ? "blur(2px)" : "none",
          }}
        />
      </div>
      {/* Inner dot */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10001] hidden md:block"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <div
          className="rounded-full bg-[var(--color-brass)] transition-transform duration-200"
          style={{
            width: 4,
            height: 4,
            marginLeft: -2,
            marginTop: -2,
            transform: hovering ? "scale(0)" : "scale(1)",
          }}
        />
      </div>
    </>
  );
}
