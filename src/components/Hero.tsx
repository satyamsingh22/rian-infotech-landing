"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { StatusDot } from "@/components/ui/StatusDot";
import { FadeIn } from "@/components/motion/FadeIn";
import { HeroProductVisual } from "@/components/HeroProductVisual";
import { CONTACT_HREF } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { trackSpotlight } from "@/lib/spotlight";

const TRUST_POINTS = ["Strategy to deployment", "AI-native engineering", "Architected to scale"];

/** One headline line that slides up from behind a mask. */
function MaskLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={trackSpotlight}
      className="group/hero relative isolate pt-28 pb-20 sm:pt-36 lg:pt-40 lg:pb-28">
      {/* Background: a faded engineering grid and one quiet glow behind the product */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid mask-radial opacity-80" />
        <div className="absolute inset-0 bg-grid-accent opacity-0 transition-opacity duration-500 [mask-image:radial-gradient(260px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),#000,transparent)] group-hover/hero:opacity-100" />
        <div className="absolute right-[-10%] top-[8%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgb(91_76_240/0.16),transparent)] blur-2xl" />
        <div className="absolute left-[-15%] bottom-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(47_181_232/0.08),transparent)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <FadeIn delay={0.05}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 py-1.5 pl-2.5 pr-3.5 text-[12.5px] font-medium text-ink-2 shadow-soft backdrop-blur">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-soft px-2 py-0.5 text-[11px] font-semibold text-[#0b8a4f]">
                <StatusDot pulse />
                Studio
              </span>
              AI, automation &amp; product engineering
            </p>
          </FadeIn>

          <h1
            id="hero-title"
            className="mt-7 text-[clamp(2.6rem,1.15rem+5.2vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink"
          >
            <MaskLine delay={0.15}>Build intelligent products.</MaskLine>
            <MaskLine delay={0.27}>
              Automate{" "}
              <span className="whitespace-nowrap font-serif text-[1.08em] font-normal italic tracking-[-0.02em] text-accent">
                what matters.
              </span>
            </MaskLine>
          </h1>

          <FadeIn delay={0.45}>
            <p className="mt-7 max-w-[30rem] text-[17px] leading-relaxed text-muted sm:text-lg">
              Rian Infotech helps ambitious businesses turn complex ideas into scalable software,
              AI-powered automation and digital products people actually use.
            </p>
          </FadeIn>

          <FadeIn delay={0.55} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={CONTACT_HREF} arrow>
              Start a Project
            </ButtonLink>
            <ButtonLink href="#work" variant="secondary">
              Explore Our Work
            </ButtonLink>
          </FadeIn>

          <FadeIn delay={0.7}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2 text-[13px] font-medium text-ink-2">
                  <span className="grid size-4 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check aria-hidden className="size-2.5" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <div className="lg:col-span-6">
          <HeroProductVisual />
        </div>
      </div>
    </section>
  );
}
