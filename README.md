# Pooks — A Historic Bed & Breakfast

A single-page marketing site for Pooks B&B. Award-grade typography, choreographed motion, and considered micro-details.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** with a custom `@theme inline` token system
- **Space Grotesk** (display) + **Fraunces** (serif italic accent) via `next/font`
- **Framer Motion** for choreography
- **Lenis** for smooth, weighted scroll
- **Lucide** for iconography

## Design

The site is built to an internal "10/10" rubric (typography, composition, motion, color, details). See `aww.md` in the parent directory for the full scoring guide.

Key decisions:

- Warm-black `#0a0a08` and warm-cream `#fffbeb` (never pure `#000`/`#fff`)
- Aviation-brass accent `#d4af37` used sparingly
- Custom easing only — `cubic-bezier(0.16, 1, 0.3, 1)` (expo out)
- All animations animate only `transform` and `opacity` (60fps rule)
- `prefers-reduced-motion` respected globally
- WCAG AA contrast throughout
- Self-hosted hero video (`public/hero/hero.mp4`) for LCP

## Sections

1. `Nav` — floating glass-pill, scroll-reactive blur
2. `Hero` — viewport-filling Fraunces italic, cinematic video, magnetic CTA
3. `Marquee` — infinite scrolling highlights strip
4. `Features` — bento-grid room cards with amenities strip
5. `Gallery` — hover-driven accordion-slice gallery
6. `Story` — house history with stats
7. `Testimonials` — three review cards
8. `Contact` — "Reserve" CTA → `mailto:hello@pooksbnb.com`
9. `Footer`

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

## Deploy

Configured for [Vercel](https://vercel.com). Push to `main` and Vercel will auto-detect Next.js 16.

## License

MIT
