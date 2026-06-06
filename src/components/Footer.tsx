"use client";

import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-[var(--color-border)] py-12 md:py-16">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="font-serif text-xl italic text-[var(--color-cream)]">
            Pooks
          </span>
          <span className="text-[var(--color-cream-mute)]">·</span>
          <span className="font-display text-[11px] uppercase tracking-[0.22em] text-[var(--color-cream-dim)]">
            A Historic Inn
          </span>
        </div>
        <div className="flex items-center gap-5 text-[var(--color-cream-dim)]">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition-colors duration-300 hover:text-[var(--color-brass)]"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="transition-colors duration-300 hover:text-[var(--color-brass)]"
          >
            <Facebook size={16} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="transition-colors duration-300 hover:text-[var(--color-brass)]"
          >
            <Twitter size={16} />
          </a>
        </div>
        <div className="font-display text-[11px] uppercase tracking-[0.22em] text-[var(--color-cream-mute)]">
          © {new Date().getFullYear()} Pooks B&amp;B · hello@pooksbnb.com
        </div>
      </div>
    </footer>
  );
}
