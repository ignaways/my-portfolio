import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { duration, ease } from "@/lib/motion";
import { ArrowRight } from "./Icons";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";

export function Nav() {
  const { t, c } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item of the section currently in view.
  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter((s): s is HTMLElement => !!s);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-white/90 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-md" : "bg-white"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-dark focus:px-3 focus:py-2 focus:text-white"
      >
        {t.nav.skip}
      </a>
      <nav aria-label="Primary" className="container-page flex h-[72px] items-center justify-between">
        <a href="#top" aria-label={t.nav.backToTop}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {c.nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className={`rounded-lg px-4 py-2 text-[0.875rem] font-medium transition-colors duration-200 hover:text-primary ${
                  active === n.id ? "text-primary" : "text-dark"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <a href="#contact" className="btn-primary hidden h-11 px-5 text-[0.875rem] md:inline-flex">
            {t.nav.letsTalk} <ArrowRight width={16} height={16} />
          </a>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`absolute h-0.5 w-5 rounded bg-dark transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-5 rounded bg-dark transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-0.5 w-5 rounded bg-dark transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: duration.base, ease }}
            className="h-[calc(100dvh-72px)] overflow-y-auto bg-white px-5 pb-10 pt-4 md:hidden"
          >
            <ul className="flex flex-col">
              {c.nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-[1.125rem] font-medium ${active === n.id ? "text-primary" : "text-dark"}`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-6 w-full">
              {t.nav.letsTalk} <ArrowRight width={16} height={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
