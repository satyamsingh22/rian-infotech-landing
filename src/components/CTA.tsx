"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { EXTERNAL_CONTACT_HREF } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

const PROJECT_TYPES = ["AI automation", "SaaS product", "Web app", "Mobile app", "AI assistant", "Not sure yet"];

/** A tiny, playful "brief builder" — lets the visitor start shaping their project right here. */
function BriefCard() {
  const [selected, setSelected] = useState<string[]>(["AI automation"]);

  function toggle(type: string) {
    setSelected((cur) => (cur.includes(type) ? cur.filter((t) => t !== type) : [...cur, type]));
  }

  return (
    <div className="relative rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)] backdrop-blur-md sm:p-6">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-[13px] font-semibold">
          <span className="grid size-6 place-items-center rounded-md bg-accent">
            <Sparkles className="size-3.5" aria-hidden />
          </span>
          New project
        </p>
        <p className="font-mono text-[10.5px] text-white/40">step 1 of 3</p>
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden>
        <motion.span
          className="block h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
          animate={{ width: selected.length ? "33%" : "8%" }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </div>

      <fieldset className="mt-6">
        <legend className="text-[17px] font-semibold tracking-[-0.02em]">What are you building?</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {PROJECT_TYPES.map((type) => {
            const on = selected.includes(type);
            return (
              <motion.button
                key={type}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(type)}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
                  on
                    ? "border-accent bg-accent text-white"
                    : "border-white/15 text-white/75 hover:border-white/35 hover:text-white",
                )}
              >
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="inline-flex overflow-hidden"
                    >
                      <Check className="size-3.5" strokeWidth={3} aria-hidden />
                    </motion.span>
                  )}
                </AnimatePresence>
                {type}
              </motion.button>
            );
          })}
        </div>
      </fieldset>

      <p className="mt-6 min-h-[2.5rem] border-t border-white/10 pt-4 text-[12.5px] leading-relaxed text-white/50" aria-live="polite">
        {selected.length
          ? `Great — we'll come prepared to talk ${selected.join(", ")}.`
          : "Pick anything that sounds close. We'll figure out the rest together."}
      </p>
    </div>
  );
}

export function CTA() {
  return (
    <section id="contact" aria-labelledby="cta-title" className="pb-24 sm:pb-32">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[28px] bg-night px-5 py-16 text-white sm:rounded-[36px] sm:px-12 sm:py-20 lg:px-16 lg:py-24">
          {/* Slow-drifting light — a single transformed layer, cheap to animate */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -inset-[20%] animate-gradient bg-[radial-gradient(40%_50%_at_25%_30%,rgb(91_76_240/0.55),transparent_70%),radial-gradient(35%_45%_at_80%_75%,rgb(47_181_232/0.28),transparent_70%)]" />
            <div className="absolute inset-0 bg-grid-night [mask-image:radial-gradient(ellipse_70%_80%_at_50%_50%,#000,transparent_80%)]" />
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel index="09" tone="dark">
                  Let&apos;s talk
                </SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2
                  id="cta-title"
                  className="mt-6 text-[clamp(2.6rem,1.3rem+4.6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
                >
                  Have an idea{" "}
                  <span className="font-serif font-normal italic tracking-[-0.02em] text-[#b3aaff]">worth building?</span>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 max-w-md text-[17px] leading-relaxed text-white/65">
                  Let&apos;s turn your next product, workflow or AI idea into something people can actually use.
                </p>
              </Reveal>
              <Reveal delay={0.24} className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={EXTERNAL_CONTACT_HREF} target="_blank" rel="noopener noreferrer" variant="inverse" arrow>
                  Start a Conversation
                </ButtonLink>
                <ButtonLink href="#services" variant="ghost-inverse">
                  Explore Services
                </ButtonLink>
              </Reveal>
            </div>

            <Reveal delay={0.2} y={32} className="lg:col-span-5">
              <BriefCard />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
