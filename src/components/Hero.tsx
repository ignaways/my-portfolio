
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/content";
import { ease } from "@/lib/motion";
import { HeroTrace } from "./HeroTrace";
import { Avatar } from "./Portrait";

export function Hero() {
  const reduce = useReducedMotion();
  const words = profile.headline.split(" ");
  const up = (d: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease, delay: d } };

  return (
    <section id="top" data-route="/" aria-labelledby="hero-title" className="relative overflow-hidden pt-32 md:pt-40">
      <div aria-hidden className="node-field absolute inset-0 -z-0" />
      <HeroConnections />

      <div className="relative mx-auto grid max-w-[1200px] gap-14 px-5 pb-24 md:px-10 md:pb-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.div {...up(0)} className="mb-10 flex items-center gap-4">
            <Avatar size={44} />
            <div>
              <p className="text-[0.95rem] font-medium text-fg">{profile.name}</p>
              <p className="text-[0.875rem] text-muted">{profile.role}</p>
            </div>
          </motion.div>

          <h1 id="hero-title" className="text-display font-semibold tracking-[-0.045em] text-fg">
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="mr-[0.22em] inline-block"
                initial={reduce ? false : { opacity: 0, y: "0.35em" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.08 + i * 0.06 }}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p {...up(0.55)} className="mt-8 max-w-[52ch] text-[1.125rem] leading-relaxed text-muted md:text-[1.2rem]">
            {profile.summary}
          </motion.p>

          <motion.div {...up(0.65)} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex h-12 items-center rounded-sm bg-fg px-6 text-[0.95rem] font-medium text-ink transition-colors duration-200 hover:bg-white"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-sm border border-line-strong px-6 text-[0.95rem] text-fg transition-colors duration-200 hover:border-signal hover:text-signal"
            >
              Let&apos;s Talk
            </a>
          </motion.div>

          <motion.p {...up(0.75)} className="mt-8 flex items-center gap-2.5 text-[0.875rem] text-muted">
            <span className="status-dot h-2 w-2 rounded-full bg-ok" aria-hidden />
            {profile.availability}
          </motion.p>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.4 }}
          className="lg:col-span-5 lg:pt-16"
        >
          <HeroTrace />
          <pre
            aria-hidden
            className="mt-4 hidden overflow-hidden rounded-md border border-line bg-ink/70 p-4 font-mono text-[0.7rem] leading-relaxed text-dim md:block"
          >
{`app.get("/api/projects", async (req, res) => {
  const items = await projectService.list(req.query);
  res.status(200).json({ items });
});`}
          </pre>
        </motion.div>
      </div>
    </section>
  );
}

/** Faint node-and-edge lines behind the hero: the site's system motif. */
function HeroConnections() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" preserveAspectRatio="none" viewBox="0 0 1200 800">
      <g stroke="#ffffff" strokeOpacity="0.05" fill="none">
        <path d="M-20 760 H60 V120 H110" />
        <path d="M1220 140 H980 V300 H760" />
        <path d="M600 820 V700 H900 V560" />
      </g>
      <g fill="#7d9dff" fillOpacity="0.35">
        <rect x="56" y="116" width="8" height="8" rx="1" />
        <rect x="976" y="296" width="8" height="8" rx="1" />
        <rect x="896" y="556" width="8" height="8" rx="1" />
      </g>
    </svg>
  );
}
