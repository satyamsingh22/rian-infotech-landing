# Rian Infotech — SaaS Landing Page

## Overview

A single-page marketing site for **Rian Infotech**, an AI and software development studio. The page tells one story from top to bottom: the promise (hero), the friction businesses face, the services that address it, a working product, how automation flows, the delivery process, the studio's point of view, and a closing invitation to build something together.

Every product visual (the hero workflow, the service-card illustrations, the analytics dashboard and the automation inspector) is built from React and CSS. The site uses no stock imagery or third-party assets.

## Tech Stack

- **Next.js 16** (App Router, statically prerendered)
- **TypeScript**
- **Tailwind CSS v4** (design tokens defined with `@theme` in `globals.css`)
- **Framer Motion**
- **Lucide React** icons
- `next/font`: Geist, Geist Mono and Instrument Serif

No other runtime dependencies.

## Design Approach

The design is an original SaaS and product-studio experience. It draws on the editorial whitespace, typographic confidence and storytelling of modern presentation and product websites. [Pitch](https://pitch.com/) served **only as visual inspiration**. The layout, copy, colours, illustrations, dashboard and motion are all original.

Key decisions:

- **Type system:** tight, heavy Geist headlines paired with an italic Instrument Serif accent word, plus Geist Mono for eyebrows, labels and data. This pairing gives the site its own voice.
- **Palette:** a near-white canvas (`#F7F8FA`), ink text (`#111318`) and slate secondary text (`#5F6673`), with a single indigo-violet accent (`#5B4CF0`). Two dark sections (Automation and the CTA) break up the page.
- **Editorial structure:** numbered section labels (`01 — The friction`) and asymmetric grids. The page mixes a sticky storytelling column, a bento service grid and a staggered benefit layout, so it never repeats one centred layout.
- **Honest content:** dashboard figures are labelled "sample data". The metrics strip shows capabilities and commitments rather than unverifiable company statistics.

## Animation Approach

All motion uses one easing curve (`cubic-bezier(0.16, 1, 0.3, 1)`) and short, purposeful durations.

- **Page load:** the headline lines slide up from behind a mask in sequence, followed by the copy, the buttons and the hero product. The hero product scales in, then its workflow nodes appear one after another.
- **Scroll reveals:** reusable `Reveal`, `FadeIn`, `StaggerContainer` and `StaggerItem` components (in `src/components/motion`) fade and lift content once, as it enters the viewport.
- **Stagger animations:** cards, lists, capabilities and metrics cascade in.
- **Dashboard animations:**
  - The showcase tilts up and settles as you scroll (scroll-linked `rotateX` and `scale`).
  - Charts draw in, and the 7D/30D/90D toggle morphs the chart path.
  - Counters tick up.
  - A simulated cursor clicks the AI assistant's action button.
- **Workflow animations:** the hero workflow and the automation inspector step through their stages automatically, with data dots travelling along the connectors. Hovering or focusing a node pauses the cycle and inspects that step.
- **Hover micro-interactions:** buttons lift slightly and their arrows nudge right. Cards rise 4px and draw an accent hairline, and their icons rotate or scale. Nav links share a pill highlight that glides between them (`layoutId`).
- **Scroll-driven statement:** in the "Our approach" section, each word lights up as you scroll, with inline icon pills.
- **Pinned horizontal use cases:** on desktop the section stays in place while vertical scrolling moves the cards sideways, with a progress readout. Below desktop width it becomes a native swipeable carousel with snap points.
- **Cursor spotlight:** a soft glow follows the pointer across service, use-case and benefit cards, and the hero grid lights up around the cursor.
- **Navbar:** a reading-progress bar runs along the top, and the link for the current section is highlighted.
- **Process timeline:** the line draws as you scroll, and each step activates when the line reaches it.
- **Performance:** continuous effects (pulses, floats, the tech ticker, data dots, the CTA gradient) are CSS keyframes that animate only `transform` and `opacity`. Timed cycles run only while their element is on screen, and counters write directly to the DOM without re-rendering React.
- **Reduced motion:**
  - `MotionConfig reducedMotion="user"` turns off Framer Motion transforms for users who ask for less motion.
  - A global `prefers-reduced-motion` rule stops CSS loops.
  - The auto-cycling workflows rest on a static step.
  - A hydration-safe hook (`useSafeReducedMotion`) keeps server and client markup identical.

## Project Structure

```
src/
  app/            layout.tsx (fonts, metadata), page.tsx, globals.css (tokens + keyframes)
  components/     Navbar, MobileMenu, Hero, HeroProductVisual, CapabilityStrip, Manifesto, Problems,
                  Services, ServiceCard, ProductShowcase, DashboardMockup, UseCases, Workflow,
                  HowItWorks, WhyRian, Metrics, CTA, Footer
    motion/       MotionProvider, Reveal, FadeIn, Stagger (StaggerContainer / StaggerItem)
    ui/           Button, SectionLabel, StatusDot, Logo, Counter
  lib/            motion presets, site config (nav + contact links), hooks, cn()
```

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and a skip link.
- Every control is a real link or button, with visible `:focus-visible` outlines.
- The mobile menu exposes `aria-expanded` and `aria-controls`, closes on Escape and locks page scroll while open.
- Decorative mockups have a text alternative or are hidden from assistive technology.
- Interactive pieces (the chart range toggle, workflow steps and the brief chips) use `aria-pressed`, `aria-current` or `aria-live` as appropriate.

## Placeholders

Contact CTAs point to `#contact` or to the public site. Social links point to the platform home pages. Update `src/lib/site.ts` and `src/components/Footer.tsx` with real destinations.

## Run Locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build

```bash
npm run build
npm start
```
