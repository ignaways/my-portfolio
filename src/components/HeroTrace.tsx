
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { heroLayers } from "@/lib/content";
import { duration, ease } from "@/lib/motion";

/** Interactive stack: one request traced Frontend → API → Backend → Database. */
export function HeroTrace() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (touched || reduce || !inView) return;
    const t = setInterval(() => setActive((a) => (a + 1) % heroLayers.length), 2400);
    return () => clearInterval(t);
  }, [touched, reduce, inView]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };
  const layer = heroLayers[active];

  return (
    <div
      ref={ref}
      className="relative rounded-lg border border-line bg-panel/80 shadow-panel backdrop-blur-sm"
      onMouseLeave={() => setTouched(false)}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <p className="font-mono text-[0.72rem] text-muted">request trace</p>
        <p className="flex items-center gap-2 font-mono text-[0.72rem] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
          {active + 1}/{heroLayers.length}
        </p>
      </div>

      <ol className="p-3" aria-label="Application layers">
        {heroLayers.map((l, i) => {
          const on = i === active;
          const passed = i < active;
          return (
            <li key={l.id}>
              <button
                type="button"
                onMouseEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
                aria-pressed={on}
                className={`group flex w-full items-center justify-between rounded-md border px-4 py-3.5 text-left transition-[border-color,background-color] duration-200 ${
                  on ? "border-signal/60 bg-signal-soft" : "border-line bg-raised/40 hover:border-line-strong"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={`h-2 w-2 rounded-[2px] border transition-colors ${
                      on ? "border-signal bg-signal" : passed ? "border-signal/60" : "border-line-strong"
                    }`}
                  />
                  <span className="text-[0.95rem] font-medium text-fg">{l.name}</span>
                </span>
                <span className={`font-mono text-[0.72rem] transition-colors ${on ? "text-signal" : "text-muted"}`}>
                  {l.tech}
                </span>
              </button>
              {i < heroLayers.length - 1 && (
                <div aria-hidden className="relative ml-[1.3rem] h-5 w-px bg-line" style={{ ["--len" as string]: "20px" }}>
                  {i === active && !reduce && (
                    <span className="packet absolute -left-[2px] top-0 h-[5px] w-[5px] rounded-full bg-signal" />
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="border-t border-line px-4 py-4" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: duration.base, ease }}
          >
            <p className="text-[0.9rem] leading-relaxed text-fg/90">{layer.detail}</p>
            <p className="mt-3 overflow-x-auto whitespace-nowrap font-mono text-[0.75rem] text-muted">
              <span className="text-signal">$</span> {layer.trace}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
