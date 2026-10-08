"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Plug, Users, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { DashboardMockup } from "@/components/DashboardMockup";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

const PRINCIPLES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Users, title: "Designed for real users", body: "Interfaces shaped around the people who use them every day." },
  { icon: Plug, title: "Connected to your stack", body: "CRMs, inboxes, databases and APIs — wired together, not copy-pasted." },
  { icon: Activity, title: "Observable by default", body: "Every automation is measurable, auditable and easy to improve." },
];

export function ProductShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion();

  // The dashboard tilts up and settles as it scrolls into place.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0.35, 1]);

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <SectionLabel index="03">Product</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="work-title"
              className="mt-6 text-[clamp(2.1rem,1.2rem+3vw,3.75rem)] font-semibold leading-[1] tracking-[-0.045em] text-ink text-balance-safe"
            >
              Where ideas become <span className="font-serif font-normal italic text-accent">working</span> products.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-muted">
              The kind of systems we design and ship: clear interfaces on top of connected data, with AI doing
              the busywork in the background.
            </p>
          </Reveal>
        </div>

        <div ref={stageRef} className="relative mt-14 sm:mt-20 [perspective:2000px]">
          {/* Stage: soft tinted plate with a faded grid */}
          <div
            aria-hidden
            className="absolute inset-x-0 -inset-y-6 -z-10 overflow-hidden rounded-[32px] border border-line bg-gradient-to-b from-accent-soft/70 via-white to-canvas sm:-inset-x-4 lg:-inset-x-8 lg:-inset-y-10 xl:-inset-x-10"
          >
            <div className="absolute inset-0 bg-grid opacity-70 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
          </div>

          <motion.figure style={{ rotateX, scale, opacity }} className="origin-top will-change-transform">
            <DashboardMockup />
            <figcaption className="mt-4 text-center font-mono text-[11px] text-subtle">
              Illustrative interface · sample data
            </figcaption>
          </motion.figure>
        </div>

        <StaggerContainer as="ul" className="mt-20 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:mt-24">
          {PRINCIPLES.map(({ icon: Icon, title, body }) => (
            <StaggerItem as="li" key={title} className="group flex gap-4 sm:flex-col">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-white text-ink-2 shadow-soft transition-[color,transform,border-color] duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/30 group-hover:text-accent">
                <Icon className="size-[18px]" aria-hidden />
              </span>
              <div>
                <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-ink">{title}</h3>
                <p className="mt-1.5 max-w-xs text-[14.5px] leading-relaxed text-muted">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
