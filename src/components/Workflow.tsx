"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Database,
  FileText,
  GitBranch,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatusDot } from "@/components/ui/StatusDot";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { useStepCycle } from "@/lib/useStepCycle";
import { CONTACT_HREF } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Node = {
  icon: LucideIcon;
  title: string;
  caption: string;
  payload: [string, string][];
};

const NODES: Node[] = [
  {
    icon: MessageSquare,
    title: "Customer message",
    caption: "Email, chat or form",
    payload: [
      ["channel", '"email"'],
      ["text", '"Order arrived damaged — can I get a replacement?"'],
      ["order_id", '"#4821"'],
    ],
  },
  {
    icon: Brain,
    title: "AI understands intent",
    caption: "Classify · extract · score",
    payload: [
      ["intent", '"replacement_request"'],
      ["confidence", "0.94"],
      ["sentiment", '"frustrated"'],
    ],
  },
  {
    icon: GitBranch,
    title: "Decision engine",
    caption: "Your rules, applied consistently",
    payload: [
      ["rule", '"order_age < 30d"'],
      ["result", '"auto_approve"'],
      ["human_review", "false"],
    ],
  },
  {
    icon: Database,
    title: "CRM / Database",
    caption: "Records stay in sync",
    payload: [
      ["ticket", '"#4821 → resolved"'],
      ["customer.tag", '"priority"'],
      ["synced", "true"],
    ],
  },
  {
    icon: Rocket,
    title: "Action",
    caption: "Done — and logged",
    payload: [
      ["replacement", '"dispatched"'],
      ["reply_sent", "true"],
      ["elapsed", '"3.2s"'],
    ],
  },
];

const POINTS: { icon: LucideIcon; text: string }[] = [
  { icon: FileText, text: "Understands messy input — emails, chats, documents" },
  { icon: Zap, text: "Decides with rules you control, and AI where it helps" },
  { icon: ShieldCheck, text: "Acts across your tools, with a human in the loop" },
];

export function Workflow() {
  const [hovering, setHovering] = useState(false);
  const { ref, step, setStep } = useStepCycle<HTMLDivElement>({
    total: NODES.length,
    interval: 2000,
    restingStep: 1,
    paused: hovering,
  });
  const active = NODES[step];

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-title"
      className="relative isolate overflow-hidden bg-night py-24 text-white sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-night [mask-image:radial-gradient(ellipse_80%_70%_at_70%_50%,#000_20%,transparent_75%)]" />
        <div className="absolute right-[-10%] top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(91_76_240/0.28),transparent)] blur-2xl" />
      </div>

      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel index="05" tone="dark">
              Automation
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="solutions-title"
              className="mt-6 text-[clamp(2.1rem,1.2rem+3vw,3.75rem)] font-semibold leading-[1] tracking-[-0.045em]"
            >
              Turn complex workflows into{" "}
              <span className="font-serif font-normal italic text-[#a99fff]">intelligent</span> systems.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-white/60">
              We map how work actually moves through your business, then build automations that read, decide
              and act — reliably, and in plain sight.
            </p>
          </Reveal>
          <StaggerContainer as="ul" className="mt-8 space-y-3.5" delay={0.2}>
            {POINTS.map(({ icon: Icon, text }) => (
              <StaggerItem as="li" key={text} className="flex items-center gap-3 text-[14.5px] text-white/80">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#a99fff]">
                  <Icon className="size-4" aria-hidden />
                </span>
                {text}
              </StaggerItem>
            ))}
          </StaggerContainer>
          <Reveal delay={0.3} className="mt-10">
            <ButtonLink href={CONTACT_HREF} variant="inverse" arrow>
              Automate a workflow
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={40} className="lg:col-span-7">
          <div
            ref={ref}
            className="rounded-[24px] border border-night-line bg-night-2/80 p-4 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)] backdrop-blur sm:p-6"
          >
            <div className="flex items-center justify-between gap-3 border-b border-night-line pb-4">
              <p className="flex items-center gap-2.5 text-[13px] font-semibold">
                <StatusDot pulse />
                Support → Resolution
              </p>
              <p className="font-mono text-[10.5px] text-white/40">run 7f3a · live</p>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-[1.1fr_1fr]">
              {/* Nodes */}
              <ol
                aria-label="Workflow steps — hover or focus a step to inspect it"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                {NODES.map((node, i) => {
                  const Icon = node.icon;
                  const isActive = i === step;
                  const isPast = i < step;
                  return (
                    <li key={node.title} className="relative">
                      <button
                        type="button"
                        aria-current={isActive ? "step" : undefined}
                        onMouseEnter={() => setStep(i)}
                        onFocus={() => {
                          setHovering(true);
                          setStep(i);
                        }}
                        onBlur={() => setHovering(false)}
                        onClick={() => setStep(i)}
                        className={cn(
                          "relative flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-[background-color,border-color,box-shadow] duration-300",
                          isActive
                            ? "border-accent/50 bg-accent/15 shadow-[0_0_0_4px_rgb(91_76_240/0.12),0_10px_30px_-10px_rgb(91_76_240/0.6)]"
                            : "border-transparent hover:border-white/10 hover:bg-white/[0.03]",
                        )}
                      >
                        <span
                          className={cn(
                            "relative grid size-9 shrink-0 place-items-center rounded-lg border transition-colors duration-300",
                            isActive
                              ? "border-accent bg-accent text-white"
                              : isPast
                                ? "border-accent/40 bg-accent/10 text-[#a99fff]"
                                : "border-white/10 bg-white/[0.04] text-white/50",
                          )}
                        >
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className={cn("block text-[13.5px] font-semibold", isActive ? "text-white" : "text-white/75")}>
                            {node.title}
                          </span>
                          <span className="block truncate text-[11.5px] text-white/40">{node.caption}</span>
                        </span>
                      </button>

                      {i < NODES.length - 1 && (
                        <span aria-hidden className="relative ml-[29px] block h-4 w-px bg-white/10">
                          <span
                            className={cn(
                              "absolute inset-0 origin-top bg-accent transition-transform duration-500",
                              isPast || isActive ? "scale-y-100" : "scale-y-0",
                            )}
                          />
                          {isActive && (
                            <span
                              className="absolute -left-[2px] top-0 size-[5px] rounded-full bg-[#a99fff] shadow-[0_0_10px_2px_rgb(169_159_255/0.7)] animate-flow-y"
                              style={{ "--flow-distance": "14px", animationDuration: "1s" } as React.CSSProperties}
                            />
                          )}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>

              {/* Inspector */}
              <div className="flex flex-col rounded-2xl border border-night-line bg-night/70 p-4" aria-live="polite">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/40">Inspector</p>
                  <p className="font-mono text-[10.5px] text-white/40">
                    step {step + 1}/{NODES.length}
                  </p>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="mt-4 flex-1"
                  >
                    <p className="text-[15px] font-semibold">{active.title}</p>
                    <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words rounded-xl border border-white/[0.06] bg-black/30 p-3 font-mono text-[11.5px] leading-[1.7]">
                      <span className="text-white/35">{"{"}</span>
                      {active.payload.map(([k, v], idx) => (
                        <span key={k} className="block pl-3">
                          <span className="text-[#a99fff]">&quot;{k}&quot;</span>
                          <span className="text-white/35">: </span>
                          <span className={v.startsWith('"') ? "text-[#7ee0b5]" : "text-[#7cc8f2]"}>{v}</span>
                          {idx < active.payload.length - 1 && <span className="text-white/35">,</span>}
                        </span>
                      ))}
                      <span className="text-white/35">{"}"}</span>
                    </pre>
                  </motion.div>
                </AnimatePresence>
                {/* Step progress */}
                <div className="mt-4 flex gap-1" aria-hidden>
                  {NODES.map((n, i) => (
                    <span
                      key={n.title}
                      className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i <= step ? "bg-accent" : "bg-white/10")}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
