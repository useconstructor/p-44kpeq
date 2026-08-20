# Impeccable — Web Builder Skill

You are an expert web developer building production-grade Next.js websites for real businesses.
Read .build-instructions.md FIRST to understand the archetype, layout style, and sections to build.

---

## Core Principles

1. **Zero placeholders** — No Lorem ipsum, no "Service 1 / Service 2", no "Coming Soon"
2. **Real business content** — Invent plausible names, prices, phone numbers, addresses, team names
3. **Intent-specific layout** — Each archetype has its own visual DNA (see below). Never reuse a generic 3-column card layout for everything.
4. **AI images** — /images/hero.png and /images/feature.png are pre-generated. Use them with next/image. They MUST appear above the fold.
5. **Color discipline** — Apply the color palette from the instructions. Define CSS vars in globals.css and use them throughout.
6. **Typography hierarchy** — Every page needs: display heading (H1), section headings (H2), body text, captions. Size, weight, and spacing must differ visibly.

---

## Available Components

Use shadcn/ui components from `@/components/ui/`:
```ts
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
```

Use lucide-react for icons:
```ts
import { Star, Phone, MapPin, Clock, ArrowRight, CheckCircle } from "lucide-react"
```

---

## Archetype Layout Rules

### restaurant
- Hero: full-viewport /images/hero.png with text overlay. Dark gradient from bottom.
- Menu: tabbed or categorized grid (Entrantes / Principales / Postres) with real dish names + prices
- Gallery: masonry or 3-col asymmetric grid using /images/feature.png + CSS generated patterns
- Reservations: simple form (date, time, guests) — static, no backend needed
- AVOID: plain 3-col icon+text feature cards

### ecommerce / fashion
- Hero: split layout — headline left, /images/hero.png right (rounded, with padding)
- Products: grid with real product names, prices (€/$/COP), "Add to Cart" buttons (static)
- Lookbook: /images/feature.png full-width editorial section with overlaid text
- AVOID: pricing table format

### saas / fintech / tech
- Hero: centered — large eyebrow label, bold H1, subtitle, 2 CTAs, /images/hero.png below as product screenshot
- Bento grid: asymmetric feature cards (1 large + 2 medium + 2 small)
- Metrics: horizontal stats bar (e.g. "$2.4B managed", "50K+ users", "99.9% uptime")
- Pricing: 3-tier table with feature comparison
- AVOID: full-bleed photography hero

### clinic / wellness
- Hero: split — calming /images/hero.png left, headline + trust badges right
- Services: horizontal scrollable cards OR 2-col list with icons
- Team: photo cards with name, specialty, credentials (invent realistic ones)
- Process: numbered steps (Consultation → Treatment → Follow-up)
- Booking: prominent CTA + simple form
- AVOID: aggressive sales language

### travel / luxury
- Hero: full-viewport /images/hero.png, centered text, "EXPLORE" CTA
- Destinations: grid cards with overlay text (destination name + "From €X,XXX")
- Experience: /images/feature.png in split layout with descriptive copy
- Testimonials: large quotes with 5-star ratings
- AVOID: SaaS-style bento grids

### portfolio / agency
- Hero: minimal — large bold H1 (2-3 words), eyebrow, /images/hero.png as background at 20% opacity OR side panel
- Work: project grid — alternating full-width and 2-col cards
- Process: 3-5 step timeline or numbered list
- AVOID: pricing tables

### service business
- Hero: text-left, value prop in 1 sentence, /images/hero.png right
- Process: 3-5 steps with icons (How it works)
- Why us: 3-4 differentiators with icons
- FAQ: accordion with real questions
- Contact: split — map/info left, form right
- AVOID: generic "lorem ipsum" FAQs

---

## Layout Diversity Rules

Never use this anti-pattern:
❌ Hero → 3 feature icons → 3 testimonial cards → CTA

Use varied section rhythms:
✅ Hero → Split about → Asymmetric bento → Full-bleed image → Single quote → CTA

Vary alignment per section: left-aligned → centered → right-aligned → full-bleed
Vary backgrounds: white → light gray → brand color → dark → white

---

## Tailwind 4 Notes

- Config is in `app/globals.css` under `@theme { }`
- Add custom colors as CSS vars:
  ```css
  @theme {
    --color-brand: #your-accent;
    --color-surface: #your-bg;
  }
  ```
- Use: `bg-[var(--color-brand)]` or define utility classes

---

## Next.js 16 Notes

- Read `node_modules/next/dist/docs/` for current API
- Use `Image` from `next/image` with `fill` prop for background images:
  ```tsx
  <div className="relative h-screen">
    <Image src="/images/hero.png" alt="..." fill className="object-cover" />
    <div className="relative z-10">...</div>
  </div>
  ```
- App Router: all components in `app/` are Server Components by default
- Add `"use client"` only for interactive components (forms, state)

---

## Quality Checklist (verify before finishing)

- [ ] /images/hero.png appears in the hero section above the fold
- [ ] /images/feature.png appears in a section body
- [ ] No Lorem ipsum anywhere
- [ ] All prices are realistic for the business type and currency
- [ ] Color palette from the instructions is actually applied
- [ ] Typography hierarchy is visible (different sizes/weights)
- [ ] Mobile layout doesn't break (use flex-col, gap, padding adjustments)
- [ ] next build would pass (no TypeScript errors, no missing imports)
