
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/content";
import { duration, ease } from "@/lib/motion";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [route, setRoute] = useState("/");
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Signature: the nav reports which "endpoint" (section) is currently in view.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-route]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRoute(e.target.getAttribute("data-route") ?? "/");
            setActive(e.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-fg focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-[1200px] items-center justify-between px-5 transition-[height] duration-300 md:px-10 ${
          scrolled ? "h-14" : "h-20"
        }`}
      >
        <div className="flex items-center gap-4">
          <a href="#top" className="text-[0.95rem] font-semibold tracking-[-0.01em] text-fg">
            {profile.name}
          </a>
          <span
            aria-live="polite"
            className="hidden items-center gap-2 rounded-xs border border-line px-2 py-1 font-mono text-[0.7rem] text-muted lg:inline-flex"
          >
            <span className="text-signal">GET</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={route}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: duration.fast, ease }}
                className="min-w-[7.5ch] text-fg"
              >
                {route}
              </motion.span>
            </AnimatePresence>
            <span className="text-ok">200</span>
          </span>
        </div>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className={`rounded-sm px-3 py-2 text-[0.875rem] transition-colors duration-200 hover:text-fg ${
                  active === n.id ? "text-fg" : "text-muted"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href="#contact"
              className="rounded-sm border border-line-strong px-4 py-2 text-[0.875rem] text-fg transition-colors duration-200 hover:border-signal hover:text-signal"
            >
              Let&apos;s Talk
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-sm border border-line md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
          <span className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease }}
            className="h-[calc(100dvh-3.5rem)] overflow-y-auto bg-ink px-5 pb-10 pt-6 md:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: duration.base, ease }}
                  className="border-b border-line"
                >
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 text-[1.75rem] font-medium tracking-[-0.02em] text-fg"
                  >
                    {n.label}
                    <span className="font-mono text-xs text-dim">/{n.id}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-8 flex h-12 items-center justify-center rounded-sm bg-fg font-medium text-ink"
            >
              Let&apos;s Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
