"use client";

import { motion, useSpring } from "framer-motion";
import {
  Brain,
  CalendarCheck,
  Check,
  Database,
  Inbox,
  LoaderCircle,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useStepCycle } from "@/lib/useStepCycle";
import { StatusDot } from "@/components/ui/StatusDot";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";

type Step = { icon: LucideIcon; title: string; meta: string; time: string };

const STEPS: Step[] = [
  { icon: Inbox, title: "Lead received", meta: "Website form · Acme Retail", time: "0.2s" },
  { icon: Brain, title: "AI qualification", meta: "Intent: high · Score 92", time: "1.1s" },
  { icon: Database, title: "CRM updated", meta: "Deal created · Pipeline A", time: "0.4s" },
  { icon: CalendarCheck, title: "Meeting booked", meta: "Thu 10:30 · Discovery", time: "0.3s" },
];

// 4 working steps + 2 "everything complete" beats before looping.
const CYCLE = STEPS.length + 2;

const SPARK = "M0 34 L18 30 L36 32 L54 22 L72 25 L90 14 L108 18 L126 8 L144 11 L160 4";

export function HeroProductVisual() {
  const reduce = useSafeReducedMotion();
  const { ref, step } = useStepCycle<HTMLDivElement>({ total: CYCLE, restingStep: STEPS.length });

  // Gentle pointer parallax — springs keep it soft, disabled for reduced motion.
  const rotateX = useSpring(0, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 20 });

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 5);
    rotateX.set(py * -5);
  }

  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const allDone = step >= STEPS.length;

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto w-full max-w-[580px] [perspective:1400px]"
      role="img"
      aria-label="Product preview: an AI automation workflow that receives a lead, qualifies it with AI, updates the CRM and books a meeting, with live status and run metrics."
    >
      <motion.div
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
        className="relative will-change-transform"
      >
        {/* Main window */}
        <div className="beam-border relative overflow-hidden rounded-[22px] border border-line bg-white shadow-float">
          <div className="flex items-center justify-between gap-3 border-b border-line-soft px-4 py-3.5 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-[10px] bg-ink text-white">
                <Workflow className="size-4" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold tracking-[-0.01em] text-ink">AI Automation</p>
                <p className="truncate font-mono text-[10.5px] text-subtle">lead-to-meeting · v2.4</p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-signal/20 bg-signal-soft px-2.5 py-1 text-[11px] font-semibold text-[#0b8a4f]">
              <StatusDot pulse />
              Workflow active
            </span>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-[1.35fr_1fr] sm:p-5">
            {/* Workflow steps */}
            <motion.ol
              className="relative"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.75 } } }}
            >
              {STEPS.map((s, i) => {
                const done = i < step;
                const running = i === step;
                const Icon = s.icon;
                return (
                  <motion.li
                    key={s.title}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                    className="relative pb-3 last:pb-0"
                  >
                    {i < STEPS.length - 1 && (
                      <span aria-hidden className="absolute left-[25px] top-[38px] -bottom-[8px] w-px bg-line">
                        <motion.span
                          className="absolute inset-0 origin-top bg-accent"
                          animate={{ scaleY: done ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                        />
                        {running && (
                          <span
                            className="absolute -left-[2px] top-0 size-[5px] rounded-full bg-accent shadow-[0_0_8px_2px_rgb(91_76_240/0.5)] animate-flow-y"
                            style={{ "--flow-distance": "26px" } as React.CSSProperties}
                          />
                        )}
                      </span>
                    )}
                    <div
                      className={cn(
                        "relative flex items-center gap-3 rounded-xl border px-2 py-2 transition-[background-color,border-color,box-shadow] duration-500",
                        running
                          ? "border-accent/25 bg-accent-soft/60 shadow-[0_6px_20px_-12px_rgb(91_76_240/0.6)]"
                          : "border-transparent",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-[26px] shrink-0 place-items-center rounded-lg border transition-colors duration-500 ml-[3px]",
                          done || running ? "border-accent/20 bg-white text-accent" : "border-line bg-canvas text-subtle",
                        )}
                      >
                        <Icon className="size-3.5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12.5px] font-semibold text-ink">{s.title}</p>
                        <p className="truncate text-[11px] text-muted">{s.meta}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[10px]">
                        {done ? (
                          <span className="inline-flex items-center gap-1 text-[#0b8a4f]">
                            <Check className="size-3" strokeWidth={3} aria-hidden />
                            {s.time}
                          </span>
                        ) : running ? (
                          <span className="inline-flex items-center gap-1 text-accent">
                            <LoaderCircle className="size-3 animate-spin" aria-hidden />
                            <span className="hidden sm:inline">running</span>
                          </span>
                        ) : (
                          <span className="text-subtle">queued</span>
                        )}
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ol>

            {/* Side metrics */}
            <motion.div
              className="grid grid-cols-2 gap-3 sm:grid-cols-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1.05 }}
            >
              <div className="rounded-xl border border-line-soft bg-canvas/60 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10.5px] font-medium uppercase tracking-wider text-subtle">Runs today</p>
                  <span className="font-mono text-[10px] text-[#0b8a4f]">+18%</span>
                </div>
                <p className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-ink">248</p>
                <svg viewBox="0 0 160 40" className="mt-1 h-9 w-full" aria-hidden preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="hero-spark" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#5b4cf0" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#5b4cf0" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={`${SPARK} L160 40 L0 40 Z`}
                    fill="url(#hero-spark)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.8 }}
                  />
                  <motion.path
                    d={SPARK}
                    fill="none"
                    stroke="#5b4cf0"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, ease: EASE, delay: 1.2 }}
                  />
                </svg>
              </div>

              <div className="rounded-xl border border-line-soft bg-canvas/60 p-3">
                <p className="text-[10.5px] font-medium uppercase tracking-wider text-subtle">Lead score</p>
                <div className="mt-2 flex items-center gap-3">
                  <svg viewBox="0 0 36 36" className="size-11 -rotate-90" aria-hidden>
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#eef0f4" strokeWidth="3.5" />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#5b4cf0"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 0.92 }}
                      transition={{ duration: 1.4, ease: EASE, delay: 1.35 }}
                    />
                  </svg>
                  <div>
                    <p className="text-[20px] font-semibold leading-none tracking-[-0.03em] text-ink">92</p>
                    <p className="mt-1 text-[10.5px] text-muted">High intent</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between gap-3 border-t border-line-soft bg-canvas/50 px-4 py-2.5 sm:px-5">
            <p className="flex items-center gap-2 text-[11.5px] font-medium text-ink-2">
              <StatusDot tone={allDone ? "signal" : "accent"} pulse />
              Status: <span className={allDone ? "text-[#0b8a4f]" : "text-accent"}>{allDone ? "Completed" : "Running"}</span>
            </p>
            <div className="flex items-end gap-[3px]" aria-hidden>
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className={cn("w-[3px] rounded-full", i === 11 ? "h-2 bg-warn/70" : "h-3 bg-signal/60")}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating satellite: AI agent */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.15 }}
          className="absolute -top-11 right-6 hidden sm:block lg:right-4"
        >
          <div className="animate-float rounded-2xl border border-line bg-white/95 p-3 pr-4 shadow-lift backdrop-blur">
            <div className="flex items-center gap-2.5">
              <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-accent to-[#8a7dff] text-white">
                <Sparkles className="size-3.5" aria-hidden />
              </span>
              <div>
                <p className="text-[11.5px] font-semibold text-ink">AI Agent</p>
                <p className="flex items-center gap-1 text-[10.5px] text-muted">
                  Reading intent
                  <span className="inline-flex gap-0.5">
                    <span className="size-1 rounded-full bg-accent animate-blink" />
                    <span className="size-1 rounded-full bg-accent animate-blink [animation-delay:0.2s]" />
                    <span className="size-1 rounded-full bg-accent animate-blink [animation-delay:0.4s]" />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating satellite: outcome */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.35 }}
          className="absolute -bottom-[52px] left-6 hidden sm:block lg:-left-6"
        >
          <div className="animate-float-slow rounded-2xl border border-line bg-white/95 p-3 pr-4 shadow-lift backdrop-blur [animation-delay:-3s]">
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-lg bg-signal-soft text-[#0b8a4f]">
                <CalendarCheck className="size-4" aria-hidden />
              </span>
              <div>
                <p className="text-[11.5px] font-semibold text-ink">Meeting booked</p>
                <p className="text-[10.5px] text-muted">Zero manual steps · 2.0s end to end</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
