"use client";

import { motion } from "framer-motion";
import { Bot, Check, Layers, MonitorSmartphone, Search, Sparkles, Workflow } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatusDot } from "@/components/ui/StatusDot";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { EASE, VIEWPORT } from "@/lib/motion";
import { CONTACT_HREF } from "@/lib/site";
import { cn } from "@/lib/cn";

/* ---------------------------------------------------------------- visuals */

const AUTOMATIONS = [
  { name: "Inbox triage", runs: "312 runs" },
  { name: "Invoice extraction", runs: "86 runs" },
  { name: "Lead routing", runs: "148 runs" },
];
const BARS = [38, 52, 46, 70, 64, 88, 76];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function AutomationVisual() {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <ul className="space-y-2">
        {AUTOMATIONS.map((a, i) => (
          <motion.li
            key={a.name}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.1 }}
            className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5"
          >
            <span className="flex items-center gap-2.5 text-[13px] font-medium text-white/90">
              <StatusDot pulse={i === 0} />
              {a.name}
            </span>
            <span className="flex items-center gap-3">
              <span className="hidden font-mono text-[10.5px] text-white/40 sm:inline">{a.runs}</span>
              {/* toggle, on */}
              <span className="relative h-[18px] w-8 rounded-full bg-accent">
                <span className="absolute right-[2px] top-[2px] size-[14px] rounded-full bg-white shadow" />
              </span>
            </span>
          </motion.li>
        ))}
      </ul>

      <div className="flex flex-1 flex-col rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5">
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider text-white/45">Tasks automated · this week</p>
          <p className="font-mono text-[11px] text-signal">▲ trending</p>
        </div>
        <div className="mt-4 flex min-h-28 flex-1 items-end gap-2 sm:min-h-32">
          {BARS.map((h, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <motion.span
                className={cn(
                  "w-full origin-bottom rounded-md",
                  i === 5 ? "bg-gradient-to-t from-accent to-[#8f84ff]" : "bg-white/15",
                )}
                style={{ height: `${h}%` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, ease: EASE, delay: 0.35 + i * 0.06 }}
              />
              <span className="font-mono text-[9.5px] text-white/35">{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const MILESTONES = [
  { label: "Discovery", state: "done" },
  { label: "MVP", state: "done" },
  { label: "Beta", state: "active" },
  { label: "v1.0", state: "next" },
] as const;

function ProductVisual() {
  return (
    <div className="rounded-2xl border border-line-soft bg-canvas/70 p-4">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-medium text-ink-2">Product roadmap</span>
        <span className="rounded-md bg-accent-soft px-1.5 py-0.5 font-mono text-[10px] text-accent">Sprint 06</span>
      </div>
      <div className="relative mx-5 mt-5 h-[42px]">
        <span className="absolute inset-x-0 top-[7px] h-px bg-line" />
        <motion.span
          className="absolute left-0 top-[7px] h-px w-2/3 origin-left bg-accent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
        />
        <ol>
          {MILESTONES.map((m, i) => (
            <li
              key={m.label}
              className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-2"
              style={{ left: `${(i / (MILESTONES.length - 1)) * 100}%` }}
            >
              <span
                className={cn(
                  "grid size-[15px] place-items-center rounded-full border-2",
                  m.state === "done" && "border-accent bg-accent text-white",
                  m.state === "active" && "border-accent bg-white",
                  m.state === "next" && "border-line bg-white",
                )}
              >
                {m.state === "done" && <Check className="size-2" strokeWidth={4} />}
                {m.state === "active" && <span className="size-1.5 rounded-full bg-accent animate-blink" />}
              </span>
              <span className={cn("whitespace-nowrap text-[11px] font-medium", m.state === "next" ? "text-subtle" : "text-ink-2")}>
                {m.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function WebAppVisual() {
  return (
    <div className="flex items-end gap-3">
      <div className="flex-1 overflow-hidden rounded-xl border border-line-soft bg-canvas/70">
        <div className="flex items-center gap-1.5 border-b border-line-soft px-3 py-2">
          <span className="size-1.5 rounded-full bg-line" />
          <span className="size-1.5 rounded-full bg-line" />
          <span className="ml-2 h-3 flex-1 rounded bg-white" />
        </div>
        <div className="space-y-2 p-3">
          <span className="block h-2 w-2/3 rounded bg-ink/80" />
          <span className="block h-1.5 w-full rounded skeleton" />
          <span className="block h-1.5 w-5/6 rounded skeleton" />
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <span className="h-7 rounded-md bg-accent-soft" />
            <span className="h-7 rounded-md bg-white" />
            <span className="h-7 rounded-md bg-white" />
          </div>
        </div>
      </div>
      <div className="w-[68px] shrink-0 overflow-hidden rounded-[14px] border-[3px] border-ink bg-white transition-transform duration-500 group-hover:-translate-y-1.5">
        <div className="mx-auto mt-1 h-1 w-5 rounded-full bg-ink" />
        <div className="space-y-1.5 p-2">
          <span className="block h-1.5 w-3/4 rounded bg-ink/80" />
          <span className="block h-6 rounded bg-accent-soft" />
          <span className="block h-1 w-full rounded skeleton" />
          <span className="block h-1 w-2/3 rounded skeleton" />
          <span className="block h-3 rounded bg-ink" />
        </div>
      </div>
    </div>
  );
}

function AIExperienceVisual() {
  return (
    <div className="rounded-2xl border border-line-soft bg-canvas/70 p-4 sm:p-5">
      <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5 shadow-soft">
        <Search className="size-4 text-subtle" />
        <span className="flex-1 truncate text-[13px] text-ink-2">Which plan fits a 20-person team?</span>
        <span className="hidden rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:inline">↵</span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
        className="mt-3 flex gap-3"
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-accent to-[#8a7dff] text-white">
          <Sparkles className="size-3.5" />
        </span>
        <div className="min-w-0 flex-1 rounded-xl rounded-tl-sm border border-line bg-white p-3 text-[13px] leading-relaxed text-ink-2">
          The <span className="font-semibold text-ink">Team plan</span> fits best — shared workspaces, SSO and
          room to grow to 50 seats.
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {["Compare plans", "Talk to sales", "Start trial"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-line bg-canvas px-2.5 py-1 text-[11px] font-medium text-ink-2"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
      <p className="mt-3 flex items-center gap-2 pl-10 font-mono text-[10.5px] text-subtle">
        <span className="size-1 rounded-full bg-signal" />
        grounded in 3 sources · 640ms
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- section */

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="02">Services</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="services-title"
                className="mt-6 text-[clamp(2.1rem,1.2rem+3vw,3.75rem)] font-semibold leading-[1] tracking-[-0.045em] text-ink"
              >
                Technology built around <span className="font-serif font-normal italic text-accent">your</span>{" "}
                business.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-5">
            <p className="max-w-md text-[16.5px] leading-relaxed text-muted lg:ml-auto">
              Four disciplines, one team. We pick the right mix for the problem in front of you — not the
              other way around.
            </p>
          </Reveal>
        </div>

        <StaggerContainer className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5" stagger={0.1}>
          <StaggerItem className="md:col-span-2 lg:col-span-7 lg:row-span-2">
            <ServiceCard
              index="01"
              icon={Workflow}
              tone="dark"
              title="AI & Automation"
              description="Automate repetitive workflows and build intelligent systems that work around the clock."
              href={CONTACT_HREF}
              visual={<AutomationVisual />}
            />
          </StaggerItem>
          <StaggerItem className="lg:col-span-5">
            <ServiceCard
              index="02"
              icon={Layers}
              title="Product Development"
              description="From MVP to production — scalable digital products designed for real users."
              href={CONTACT_HREF}
              visual={<ProductVisual />}
            />
          </StaggerItem>
          <StaggerItem className="lg:col-span-5">
            <ServiceCard
              index="03"
              icon={MonitorSmartphone}
              title="Web & App Development"
              description="Fast, responsive and reliable applications built around your business goals."
              href={CONTACT_HREF}
              visual={<WebAppVisual />}
            />
          </StaggerItem>
          <StaggerItem className="md:col-span-2 lg:col-span-12">
            <ServiceCard
              index="04"
              icon={Bot}
              layout="split"
              title="AI-Powered Experiences"
              description="Conversational AI, intelligent search, recommendations and assistants — built into the product, not bolted on."
              href={CONTACT_HREF}
              visual={<AIExperienceVisual />}
            />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
