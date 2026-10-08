"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  Headphones,
  LayoutGrid,
  Rocket,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { trackSpotlight } from "@/lib/spotlight";
import { CONTACT_HREF } from "@/lib/site";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------ visuals */

function PipelineVisual() {
  const cols = [
    { name: "New", items: 3 },
    { name: "Qualified", items: 2, hot: 0 },
    { name: "Booked", items: 1 },
  ];
  return (
    <div className="grid h-full grid-cols-3 gap-2 p-3">
      {cols.map((c) => (
        <div key={c.name} className="rounded-xl bg-white/70 p-2">
          <p className="mb-2 font-mono text-[9.5px] uppercase tracking-wider text-subtle">{c.name}</p>
          <div className="space-y-1.5">
            {Array.from({ length: c.items }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-lg border p-2",
                  c.hot === i ? "border-accent/30 bg-accent-soft shadow-[0_6px_16px_-8px_rgb(91_76_240/0.5)]" : "border-line bg-white",
                )}
              >
                <span className={cn("block h-1.5 w-3/4 rounded", c.hot === i ? "bg-accent/70" : "bg-ink/70")} />
                <span className="mt-1.5 block h-1 w-1/2 rounded bg-line" />
                {c.hot === i && <span className="mt-1.5 block font-mono text-[8.5px] text-accent">score 92</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SupportVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-4 text-[11.5px]">
      <div className="max-w-[80%] self-end rounded-2xl rounded-br-sm bg-ink px-3 py-2 text-white">
        Where&apos;s my order #4821?
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-line bg-white px-3 py-2 text-ink-2">
        It left our warehouse today — arriving Thursday. Want SMS updates?
      </div>
      <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-signal-soft px-2.5 py-1 text-[10.5px] font-semibold text-[#0b8a4f]">
        <Check className="size-3" strokeWidth={3} /> Resolved automatically
      </span>
    </div>
  );
}

function DocumentVisual() {
  return (
    <div className="flex h-full gap-3 p-4">
      <div className="flex-1 space-y-1.5 rounded-xl border border-line bg-white p-3">
        <span className="block h-2 w-1/2 rounded bg-ink/80" />
        <span className="block h-1 w-full rounded bg-line" />
        <span className="block h-1 w-5/6 rounded bg-line" />
        <span className="block h-2.5 w-2/3 rounded bg-accent/25 ring-1 ring-accent/40" />
        <span className="block h-1 w-full rounded bg-line" />
        <span className="block h-2.5 w-1/3 rounded bg-accent-2/25 ring-1 ring-accent-2/50" />
        <span className="block h-1 w-4/5 rounded bg-line" />
      </div>
      <div className="w-[46%] space-y-1.5 font-mono text-[9.5px]">
        {[
          ["vendor", "Northwind"],
          ["total", "$4,280.00"],
          ["due", "2026-11-02"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-line bg-white px-2 py-1.5">
            <span className="block text-subtle">{k}</span>
            <span className="text-ink">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolsVisual() {
  const rows = [
    ["Refund #311", "Approved", "signal"],
    ["Invoice #87", "Pending", "warn"],
    ["Access req.", "Approved", "signal"],
    ["PO #1042", "Review", "accent"],
  ] as const;
  const tone = {
    signal: "bg-signal-soft text-[#0b8a4f]",
    warn: "bg-[#fef3e2] text-[#b45309]",
    accent: "bg-accent-soft text-accent",
  };
  return (
    <div className="h-full p-3">
      <div className="overflow-hidden rounded-xl border border-line bg-white">
        {rows.map(([name, status, t], i) => (
          <div key={name} className={cn("flex items-center justify-between px-3 py-2 text-[11px]", i > 0 && "border-t border-line-soft")}>
            <span className="font-medium text-ink-2">{name}</span>
            <span className={cn("rounded-full px-2 py-0.5 text-[9.5px] font-semibold", tone[t])}>{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LaunchVisual() {
  const items = ["Auth & billing", "Core workflow", "Analytics", "Launch"];
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-4">
      {items.map((item, i) => (
        <div key={item} className="flex items-center gap-2.5 text-[11.5px]">
          <span
            className={cn(
              "grid size-4 place-items-center rounded-full",
              i < 3 ? "bg-accent text-white" : "border-2 border-accent bg-white",
            )}
          >
            {i < 3 ? <Check className="size-2.5" strokeWidth={3.5} /> : <span className="size-1.5 rounded-full bg-accent animate-blink" />}
          </span>
          <span className={i < 3 ? "text-ink-2" : "font-semibold text-ink"}>{item}</span>
          {i === 3 && <span className="ml-auto font-mono text-[10px] text-accent">in progress</span>}
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------- data */

type UseCase = { icon: LucideIcon; tag: string; title: string; body: string; outcome: string; visual: React.ReactNode };

const CASES: UseCase[] = [
  {
    icon: TrendingUp,
    tag: "Sales",
    title: "Lead capture & qualification",
    body: "Every inbound lead scored, enriched and routed in seconds — so sales talks to the right people first.",
    outcome: "Faster first response",
    visual: <PipelineVisual />,
  },
  {
    icon: Headphones,
    tag: "Support",
    title: "AI customer support",
    body: "Assistants that answer from your own knowledge and hand off to a human when it matters.",
    outcome: "Fewer repetitive tickets",
    visual: <SupportVisual />,
  },
  {
    icon: FileText,
    tag: "Operations",
    title: "Document intelligence",
    body: "Invoices, contracts and forms read, validated and pushed into the systems that need them.",
    outcome: "No more manual data entry",
    visual: <DocumentVisual />,
  },
  {
    icon: LayoutGrid,
    tag: "Internal",
    title: "Internal tools & dashboards",
    body: "Approvals, back-office workflows and live reporting your team actually enjoys using.",
    outcome: "One source of truth",
    visual: <ToolsVisual />,
  },
  {
    icon: Rocket,
    tag: "Product",
    title: "SaaS MVPs",
    body: "From validated idea to a launch-ready product — designed, built and instrumented properly.",
    outcome: "Ship, learn, iterate",
    visual: <LaunchVisual />,
  },
];

/* ------------------------------------------------------------- section */

export function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [distance, setDistance] = useState(0);
  const [index, setIndex] = useState(0);

  // How far the track must travel so its last card lands in view.
  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const measure = () =>
      setDistance(desktop ? Math.max(0, track.scrollWidth - viewport.clientWidth) : 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * distance);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(CASES.length - 1, Math.round(p * (CASES.length - 1)));
    if (next !== index) setIndex(next);
  });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="usecases-title"
      className="relative border-y border-line bg-white"
      style={distance ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="flex flex-col justify-center overflow-hidden py-24 sm:py-28 lg:sticky lg:top-0 lg:h-screen lg:py-0">
        <div className="container-page flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <SectionLabel index="04">Use cases</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="usecases-title"
                className="mt-6 max-w-2xl text-[clamp(2.1rem,1.2rem+3vw,3.75rem)] font-semibold leading-[1] tracking-[-0.045em] text-ink"
              >
                Built for the work that <span className="font-serif font-normal italic text-accent">slows you down.</span>
              </h2>
            </Reveal>
          </div>
          {/* Progress — desktop, where the track is scroll-driven */}
          <div className="hidden w-56 shrink-0 lg:block" aria-hidden>
            <div className="flex items-center justify-between font-mono text-[11.5px] uppercase tracking-[0.14em]">
              <span className="text-ink">
                0{index + 1} <span className="text-subtle">/ 0{CASES.length}</span>
              </span>
              <span className="text-subtle">{CASES[index].tag}</span>
            </div>
            <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-line">
              <motion.span className="block h-full origin-left rounded-full bg-ink" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle lg:hidden">Swipe to explore →</p>
        </div>

        <div ref={viewportRef} className="no-scrollbar mt-12 snap-x snap-mandatory overflow-x-auto lg:mt-14 lg:overflow-visible">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-4 px-5 sm:px-8 lg:gap-5 lg:px-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]"
          >
            {CASES.map(({ icon: Icon, tag, title, body, outcome, visual }, i) => (
              <article
                key={title}
                onPointerMove={trackSpotlight}
                className="spotlight group relative isolate flex w-[82vw] max-w-[400px] shrink-0 snap-start flex-col rounded-[24px] border border-line bg-canvas/60 p-5 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-accent/25 hover:bg-white hover:shadow-lift sm:p-6 lg:w-[400px]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-2.5 py-1 text-[11.5px] font-medium text-ink-2">
                    <Icon className="size-3.5 text-accent" aria-hidden />
                    {tag}
                  </span>
                  <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
                </div>
                <div aria-hidden className="mt-5 h-44 overflow-hidden rounded-2xl border border-line-soft bg-[linear-gradient(180deg,#f3f2fd,#f7f8fa)]">
                  {visual}
                </div>
                <h3 className="mt-6 text-[21px] font-semibold tracking-[-0.03em] text-ink">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{body}</p>
                <p className="mt-auto flex items-center gap-2 pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  <ArrowRight className="size-3.5" aria-hidden />
                  {outcome}
                </p>
              </article>
            ))}

            {/* Closing card */}
            <a
              href={CONTACT_HREF}
              className="group relative flex w-[82vw] max-w-[320px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[24px] bg-night p-6 text-white lg:w-[320px]"
            >
              <span aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-[radial-gradient(closest-side,rgb(91_76_240/0.6),transparent)] transition-transform duration-700 group-hover:scale-125" />
              <span className="relative font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">Something else?</span>
              <span className="relative">
                <span className="block text-[26px] font-semibold leading-[1.1] tracking-[-0.035em]">
                  Let&apos;s scope your idea together.
                </span>
                <span className="mt-6 inline-flex size-11 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="size-5" aria-hidden />
                </span>
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
