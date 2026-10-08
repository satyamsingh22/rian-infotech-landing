import { Brain, CodeXml, TrendingUp, Workflow, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

type Capability = { icon: LucideIcon; label: string; detail: string };

const CAPABILITIES: Capability[] = [
  { icon: Brain, label: "AI", detail: "Models connected to real work" },
  { icon: Workflow, label: "Automation", detail: "Processes that run themselves" },
  { icon: CodeXml, label: "Software", detail: "Products engineered to last" },
  { icon: TrendingUp, label: "Scale", detail: "Architecture that grows with you" },
];

const STACK = [
  "Next.js",
  "React Native",
  "TypeScript",
  "Python",
  "Node.js",
  "LLM APIs",
  "Vector search",
  "PostgreSQL",
  "Cloud infrastructure",
  "Workflow engines",
  "REST & GraphQL",
  "CI/CD",
];

export function CapabilityStrip() {
  return (
    <section aria-labelledby="capabilities-title" className="relative py-16 sm:py-20">
      <div className="container-page">
        <div className="grid items-center gap-10 border-y border-line py-10 lg:grid-cols-12 lg:gap-8 lg:py-12">
          <Reveal className="lg:col-span-4">
            <h2
              id="capabilities-title"
              className="max-w-xs text-[26px] font-semibold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[30px]"
            >
              From idea to{" "}
              <span className="font-serif font-normal italic text-accent">intelligent</span> product.
            </h2>
          </Reveal>

          <StaggerContainer
            as="ul"
            className="grid grid-cols-2 gap-y-8 lg:col-span-8 lg:grid-cols-4"
            stagger={0.08}
          >
            {CAPABILITIES.map(({ icon: Icon, label, detail }, i) => (
              <StaggerItem
                as="li"
                key={label}
                className={`group relative px-4 sm:px-6 ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 0 ? "lg:border-l lg:border-line" : "lg:pl-0"}`}
              >
                <span className="grid size-9 place-items-center rounded-xl border border-line bg-white text-ink-2 shadow-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/30 group-hover:text-accent">
                  <Icon className="size-4 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" aria-hidden />
                </span>
                <p className="mt-4 text-[17px] font-semibold tracking-[-0.02em] text-ink">{label}</p>
                <p className="mt-1 text-[13.5px] leading-snug text-muted">{detail}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* What we build with — a slow, pausable ticker */}
        <Reveal delay={0.1} className="mt-8 flex items-center gap-6">
          <p className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle sm:block">
            Built with
          </p>
          <div className="group relative flex-1 overflow-hidden mask-fade-x">
            <ul className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]" aria-label="Technologies we work with">
              {[...STACK, ...STACK].map((item, i) => (
                <li
                  key={`${item}-${i}`}
                  aria-hidden={i >= STACK.length}
                  className="flex items-center gap-10 whitespace-nowrap text-[14px] font-medium text-ink-2/70"
                >
                  {item}
                  <span aria-hidden className="size-1 rounded-full bg-line" />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
