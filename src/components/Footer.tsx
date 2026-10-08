import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "AI & Automation", href: "#services" },
      { label: "Product Development", href: "#services" },
      { label: "Web & App Development", href: "#services" },
      { label: "AI Solutions", href: "#solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#top" },
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Connect",
    // Placeholder profile links — replace with the real accounts.
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/", external: true },
      { label: "Instagram", href: "https://www.instagram.com/", external: true },
      { label: "X", href: "https://x.com/", external: true },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-white pt-16 sm:pt-20">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted">
              AI, software and automation for ambitious businesses.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => {
                    const external = "external" in link && link.external;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="group inline-flex items-center gap-1 text-[14.5px] text-ink-2 transition-colors hover:text-accent"
                        >
                          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                            {link.label}
                          </span>
                          {external && (
                            <ArrowUpRight
                              aria-hidden
                              className="size-3.5 opacity-50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                            />
                          )}
                          {external && <span className="sr-only"> (opens in a new tab)</span>}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line py-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Rian Infotech. All rights reserved.</p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
            Back to top
            <ArrowUpRight aria-hidden className="size-3.5 -rotate-45" />
          </a>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the page edge */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.22em] select-none whitespace-nowrap text-center text-[13.5vw] font-semibold leading-none tracking-[-0.07em] text-transparent [-webkit-text-stroke:1px_var(--color-line)]"
      >
        Rian Infotech
      </p>
    </footer>
  );
}
