"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Bot,
  ChartLine,
  Check,
  CircleCheck,
  Command,
  Database,
  LayoutDashboard,
  MessagesSquare,
  MousePointer2,
  Plug,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  UserPlus,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { StatusDot } from "@/components/ui/StatusDot";
import { Counter } from "@/components/ui/Counter";
import { useStepCycle } from "@/lib/useStepCycle";
import { EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ data */

const NAV: { icon: LucideIcon; label: string }[] = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Workflow, label: "Automations" },
  { icon: MessagesSquare, label: "Conversations" },
  { icon: ChartLine, label: "Analytics" },
  { icon: Plug, label: "Integrations" },
];

const RANGES = {
  "7D": { total: "1,284", data: [40, 55, 48, 70, 62, 85, 80, 96, 90, 110, 104, 128] },
  "30D": { total: "5,102", data: [30, 38, 52, 48, 66, 74, 70, 92, 98, 112, 126, 140] },
  "90D": { total: "14,870", data: [22, 30, 28, 46, 54, 60, 76, 80, 98, 108, 124, 152] },
} as const;
type Range = keyof typeof RANGES;

const FLOW: { icon: LucideIcon; label: string }[] = [
  { icon: UserPlus, label: "Lead captured" },
  { icon: Sparkles, label: "AI analysis" },
  { icon: Send, label: "Personalised reply" },
  { icon: Database, label: "CRM update" },
];

const ACTIVITY = [
  { text: "Lead qualified", detail: "Brightline Studio", time: "2m", tone: "accent" },
  { text: "Reply sent", detail: "J. Romero · score 88", time: "5m", tone: "signal" },
  { text: "CRM synced", detail: "24 records", time: "12m", tone: "signal" },
  { text: "Handed to a human", detail: "Refund request", time: "18m", tone: "warn" },
] as const;

/* -------------------------------------------------------------- helpers */

const W = 600;
const H = 200;

/** Smooth cubic path through points; same command count for every dataset so `d` can morph. */
function toPath(values: readonly number[]) {
  const step = W / (values.length - 1);
  const pts = values.map((v, i) => [i * step, H - 10 - v] as const);
  return pts.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = pts[i - 1];
    const mx = (px + x) / 2;
    return `${d} C${mx},${py} ${mx},${y} ${x},${y}`;
  }, "");
}

/* ---------------------------------------------------------- sub-blocks */

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgb(17_19_24/0.03)] transition-[box-shadow,border-color,transform] duration-300 hover:border-ink/10 hover:shadow-soft sm:p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

function StatCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Card>
        <p className="text-[12px] font-medium text-muted">Efficiency gain</p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-[28px] font-semibold leading-none tracking-[-0.04em] text-ink">
            <Counter to={42} prefix="+" suffix="%" />
          </p>
          <span className="inline-flex items-center gap-1 rounded-md bg-signal-soft px-1.5 py-0.5 text-[11px] font-semibold text-[#0b8a4f]">
            <TrendingUp className="size-3" aria-hidden /> vs. manual
          </span>
        </div>
      </Card>
      <Card>
        <p className="text-[12px] font-medium text-muted">Tasks automated</p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-[28px] font-semibold leading-none tracking-[-0.04em] text-ink">
            <Counter to={1284} />
          </p>
          <div className="flex h-7 items-end gap-[3px]" aria-hidden>
            {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
              <motion.span
                key={i}
                className="w-[5px] origin-bottom rounded-sm bg-accent/70"
                style={{ height: `${h}%` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.7, ease: EASE, delay: 0.4 + i * 0.05 }}
              />
            ))}
          </div>
        </div>
      </Card>
      <Card>
        <p className="text-[12px] font-medium text-muted">Success rate</p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-[28px] font-semibold leading-none tracking-[-0.04em] text-ink">
            <Counter to={96.8} decimals={1} suffix="%" />
          </p>
          <svg viewBox="0 0 36 36" className="size-8 -rotate-90" aria-hidden>
            <circle cx="18" cy="18" r="14" fill="none" stroke="#eef0f4" strokeWidth="4" />
            <motion.circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#12b76a"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 0.968 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
            />
          </svg>
        </div>
      </Card>
    </div>
  );
}

function ChartCard() {
  const [range, setRange] = useState<Range>("7D");
  const line = toPath(RANGES[range].data);
  const area = `${line} L${W},${H} L0,${H} Z`;

  return (
    <Card className="flex flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-medium text-muted">Automated tasks</p>
          <p className="mt-1 text-[20px] font-semibold tracking-[-0.03em] text-ink">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={range}
                className="inline-block"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                {RANGES[range].total}
              </motion.span>
            </AnimatePresence>
          </p>
        </div>
        <div role="group" aria-label="Chart range" className="flex rounded-lg border border-line bg-canvas p-0.5">
          {(Object.keys(RANGES) as Range[]).map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={range === r}
              onClick={() => setRange(r)}
              className={cn(
                "relative rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors",
                range === r ? "text-ink" : "text-subtle hover:text-ink-2",
              )}
            >
              {range === r && (
                <motion.span
                  layoutId="range-pill"
                  className="absolute inset-0 rounded-md bg-white shadow-[0_1px_3px_rgb(17_19_24/0.12)]"
                  transition={{ type: "spring", stiffness: 500, damping: 36 }}
                />
              )}
              <span className="relative">{r}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-4 min-h-40 flex-1 sm:min-h-48">
        {/* gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-px w-full bg-line-soft" />
          ))}
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#5b4cf0" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#5b4cf0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            fill="url(#dash-area)"
            initial={{ opacity: 0, d: area }}
            whileInView={{ opacity: 1 }}
            animate={{ d: area }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE }}
          />
          <motion.path
            fill="none"
            stroke="#5b4cf0"
            strokeWidth="2.25"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, d: line }}
            whileInView={{ pathLength: 1 }}
            animate={{ d: line }}
            viewport={VIEWPORT}
            transition={{ pathLength: { duration: 1.6, ease: EASE, delay: 0.2 }, d: { duration: 0.8, ease: EASE } }}
          />
        </svg>
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-subtle" aria-hidden>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </Card>
  );
}

function AssistantPanel() {
  // 0 idle · 1 cursor arrives · 2 click + thinking · 3 result · 4 hold
  const { ref, step } = useStepCycle<HTMLDivElement>({ total: 5, interval: 1500, restingStep: 3 });

  return (
    <div ref={ref} className="h-full">
      <Card className="flex h-full flex-col bg-gradient-to-b from-white to-accent-soft/40">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
            <span className="grid size-6 place-items-center rounded-md bg-gradient-to-br from-accent to-[#8a7dff] text-white">
              <Bot className="size-3.5" aria-hidden />
            </span>
            AI Assistant
          </p>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-subtle">
            <StatusDot pulse /> online
          </span>
        </div>

        <div className="mt-4 flex-1 space-y-2.5 text-[12.5px] leading-relaxed">
          <div className="rounded-xl rounded-tl-sm border border-line bg-white p-3 text-ink-2">
            3 high-intent leads haven&apos;t had a reply in 24h. Draft personalised follow-ups?
            <div className="mt-3 flex gap-2">
              <span className="relative">
                <span
                  className={cn(
                    "inline-flex rounded-lg bg-ink px-2.5 py-1.5 text-[11.5px] font-medium text-white transition-transform duration-150",
                    step === 2 && "scale-95 bg-accent",
                  )}
                >
                  Draft replies
                </span>
                {/* simulated cursor */}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 hidden text-ink drop-shadow md:block"
                  initial={false}
                  animate={step === 0 || step === 4 ? { x: 120, y: 70, opacity: 0 } : { x: 46, y: 16, opacity: 1 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <MousePointer2 className="size-4 fill-white" />
                </motion.span>
              </span>
              <span className="inline-flex rounded-lg border border-line bg-white px-2.5 py-1.5 text-[11.5px] font-medium text-ink-2">
                Review first
              </span>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {step === 2 && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1 rounded-xl border border-line bg-white px-3 py-2.5"
              >
                {[0, 1, 2].map((i) => (
                  <span key={i} className="size-1.5 rounded-full bg-accent animate-blink" style={{ animationDelay: `${i * 0.18}s` }} />
                ))}
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 rounded-xl border border-signal/25 bg-signal-soft px-3 py-2.5 font-medium text-[#0b8a4f]"
              >
                <CircleCheck className="size-4 shrink-0" aria-hidden />
                3 drafts ready for review
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2">
          <span className="flex-1 truncate text-[12px] text-subtle">Ask about your automations…</span>
          <span className="grid size-6 place-items-center rounded-md bg-ink text-white">
            <Send className="size-3" aria-hidden />
          </span>
        </div>
      </Card>
    </div>
  );
}

function FlowCard() {
  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-ink">Lead response workflow</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-soft px-2 py-0.5 text-[10.5px] font-semibold text-[#0b8a4f]">
          <StatusDot pulse /> Live
        </span>
      </div>
      <motion.ol
        className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:gap-0"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={{ visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } } }}
      >
        {FLOW.map(({ icon: Icon, label }, i) => (
          <motion.li
            key={label}
            className="flex items-center md:flex-1"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
            }}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-line bg-canvas/60 px-2.5 py-2 md:flex-col md:items-start md:gap-2 md:py-2.5">
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-lg",
                  i === 1 ? "bg-accent text-white" : "bg-white text-ink-2 ring-1 ring-line",
                )}
              >
                <Icon className="size-3.5" aria-hidden />
              </span>
              <span className="truncate text-[11.5px] font-medium text-ink-2">{label}</span>
              <Check className="ml-auto size-3.5 text-signal md:hidden" aria-hidden />
            </div>
            {i < FLOW.length - 1 && (
              <span aria-hidden className="relative mx-1.5 hidden h-px w-5 shrink-0 bg-line md:block lg:w-6">
                <span
                  className="absolute -top-[2px] left-0 size-[5px] rounded-full bg-accent animate-flow-x"
                  style={{ "--flow-distance": "18px", animationDelay: `${i * 0.5}s` } as React.CSSProperties}
                />
              </span>
            )}
          </motion.li>
        ))}
      </motion.ol>
      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line-soft pt-4 md:mt-auto">
        {[
          ["Avg. run", "2.4s"],
          ["Replies today", "86"],
          ["Escalations", "4"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-[10.5px] text-subtle">{k}</dt>
            <dd className="mt-0.5 font-mono text-[13px] font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function ActivityCard() {
  const tones = { accent: "bg-accent", signal: "bg-signal", warn: "bg-warn" };
  return (
    <Card>
      <p className="text-[13px] font-semibold text-ink">Recent activity</p>
      <motion.ul
        className="mt-3 divide-y divide-line-soft"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
      >
        {ACTIVITY.map((a) => (
          <motion.li
            key={a.text}
            className="flex items-center gap-3 py-2"
            variants={{
              hidden: { opacity: 0, x: 10 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
            }}
          >
            <span className={cn("size-1.5 shrink-0 rounded-full", tones[a.tone])} />
            <span className="min-w-0 flex-1 truncate text-[12px]">
              <span className="font-medium text-ink">{a.text}</span>
              <span className="text-subtle"> · {a.detail}</span>
            </span>
            <span className="font-mono text-[10px] text-subtle">{a.time}</span>
          </motion.li>
        ))}
      </motion.ul>
    </Card>
  );
}

/* ---------------------------------------------------------------- shell */

export function DashboardMockup() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-white shadow-float">
      {/* Top bar */}
      <div className="flex h-12 items-center gap-3 border-b border-line px-3 sm:px-4">
        <LogoMark className="size-6" />
        <p className="hidden truncate text-[12.5px] text-subtle sm:block">
          Workspace <span className="mx-1 text-line">/</span>
          <span className="font-medium text-ink">Automation Overview</span>
        </p>
        <div className="ml-auto hidden h-8 w-64 items-center gap-2 rounded-lg border border-line bg-canvas px-2.5 text-[12px] text-subtle lg:flex">
          <Search className="size-3.5" aria-hidden />
          Search or ask AI…
          <span className="ml-auto flex items-center gap-0.5 rounded border border-line bg-white px-1 font-mono text-[10px]">
            <Command className="size-2.5" aria-hidden />K
          </span>
        </div>
        <span className="ml-auto grid size-8 place-items-center rounded-lg text-muted lg:ml-0">
          <Bell className="size-4" aria-hidden />
        </span>
        <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-[#ffb86b] to-[#ff7a59] text-[10px] font-semibold text-white">
          AK
        </span>
      </div>

      <div className="grid md:grid-cols-[188px_1fr] lg:grid-cols-[208px_1fr]">
        {/* Sidebar */}
        <aside className="hidden border-r border-line bg-canvas/50 p-3 md:flex md:flex-col">
          <p className="px-2 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">Workspace</p>
          <ul className="space-y-0.5">
            {NAV.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2 py-2 text-[12.5px] font-medium",
                  i === 0 ? "bg-white text-ink shadow-[0_1px_2px_rgb(17_19_24/0.06)] ring-1 ring-line" : "text-muted",
                )}
              >
                <Icon className={cn("size-4", i === 0 ? "text-accent" : "text-subtle")} aria-hidden />
                {label}
                {label === "Conversations" && (
                  <span className="ml-auto rounded-full bg-accent px-1.5 text-[10px] font-semibold text-white">3</span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-auto rounded-xl border border-line bg-white p-3">
            <p className="text-[11px] font-medium text-ink-2">Monthly runs</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line-soft">
              <motion.span
                className="block h-full w-[68%] origin-left rounded-full bg-accent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
              />
            </div>
            <p className="mt-1.5 font-mono text-[10px] text-subtle">6.8k / 10k</p>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 space-y-3 bg-canvas/40 p-3 sm:space-y-4 sm:p-5 lg:p-6">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[18px] font-semibold tracking-[-0.03em] text-ink sm:text-[20px]">Automation Overview</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-subtle">
                <StatusDot pulse /> 12 automations running · updated just now
              </p>
            </div>
          </div>

          <StatCards />

          <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.55fr_1fr]">
            <ChartCard />
            <AssistantPanel />
          </div>

          <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.55fr_1fr]">
            <FlowCard />
            <ActivityCard />
          </div>
        </div>
      </div>
    </div>
  );
}
