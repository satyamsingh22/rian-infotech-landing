"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "@/components/MobileMenu";
import { CONTACT_HREF, NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const [activeHref, setActiveHref] = useState<string | null>(null);

  // Scroll-spy: highlight the nav link for the section crossing the middle of the screen.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
          else setActiveHref((cur) => (cur === `#${entry.target.id}` ? null : cur));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 16;
    if (next !== scrolled) setScrolled(next);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Reading progress */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-accent to-accent-2"
        style={{ scaleX: progress }}
      />
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "mx-auto transition-[max-width,margin,padding,background-color,border-color,box-shadow,border-radius] duration-500 ease-[var(--ease-out-expo)]",
          scrolled || menuOpen
            ? "mt-0 max-w-full border-b border-line/80 bg-canvas/80 px-0 shadow-[0_8px_30px_-20px_rgb(17_19_24/0.25)] backdrop-blur-xl backdrop-saturate-150 md:mt-3 md:max-w-[1100px] md:rounded-2xl md:border"
            : "mt-0 max-w-[1280px] border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center justify-between px-5 transition-[height] duration-500 sm:px-8",
            scrolled || menuOpen ? "h-16 md:px-4 md:pl-5" : "h-[72px] xl:px-10",
          )}
        >
          <a href="#top" aria-label="Rian Infotech — back to top" className="rounded-lg">
            <Logo />
          </a>

          <ul
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  onFocus={() => setHovered(link.href)}
                  onBlur={() => setHovered(null)}
                  aria-current={activeHref === link.href ? "true" : undefined}
                  className={cn(
                    "relative block rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors hover:text-ink",
                    activeHref === link.href ? "text-ink" : "text-ink-2",
                  )}
                >
                  {hovered === link.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 -z-10 rounded-lg bg-ink/[0.05]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {link.label}
                  {activeHref === link.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden md:block">
              <ButtonLink href={CONTACT_HREF} size="md" arrow>
                Let&apos;s Build
              </ButtonLink>
            </span>
            <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
          </div>
        </nav>
      </motion.div>
    </header>
  );
}
