
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { systemNodes } from "@/lib/content";
import { duration, ease } from "@/lib/motion";
import { Section } from "./Section";

const RESPONSE = systemNodes.length; // final step: response travels back to the user

export function SystemDiagram() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reduce) setPlaying(false);
  }, [reduce]);

  useEffect(() => {
    if (!playing || !inView) return;
    const wait = step === RESPONSE ? 2800 : 1300;
    const t = setTimeout(() => setStep((s) => (s >= RESPONSE ? 0 : s + 1)), wait);
    return () => clearTimeout(t);
  }, [step, playing, inView]);

  const select = (i: number) => {
    setPlaying(false);
    setStep(i);
  };
  const focus = Math.min(step, systemNodes.length - 1);

  return (
    <Section
      id="architecture"
      title="How I Think About Software"
      intro="A feature is never one component. Below is a single payment request, traced from the user's click to the database and out to external services, and back."
    >
      <div ref={ref} className="grid gap-10 lg:grid-cols-12">
        {/* Diagram */}
        <ol className="lg:col-span-5" aria-label="System layers, in request order">
          {systemNodes.map((n, i) => {
            const on = i === focus && step !== RESPONSE;
            const done = i < step || step === RESPONSE;
            return (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={on}
                  className={`relative w-full rounded-md border px-5 py-4 text-left transition-[border-color,background-color,box-shadow] duration-300 ${
                    on
                      ? "border-signal/70 bg-signal-soft shadow-glow"
                      : done
                        ? "border-line-strong bg-panel"
                        : "border-line bg-panel/50 hover:border-line-strong"
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="flex items-baseline gap-4">
                      <span className={`font-mono text-[0.72rem] ${on || done ? "text-signal" : "text-dim"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[1.1rem] font-medium text-fg">{n.name}</span>
                    </span>
                    <NodeGlyph id={n.id} on={on} />
                  </span>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: duration.base, ease }}
                        className="block overflow-hidden pl-9 text-[0.9rem] leading-relaxed text-muted"
                      >
                        <span className="block pt-2">{n.note}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                {i < systemNodes.length - 1 && (
                  <div
                    aria-hidden
                    className={`relative ml-[1.85rem] h-7 w-px transition-colors duration-300 ${
                      step === RESPONSE ? "bg-signal/60" : i < step ? "bg-line-strong" : "bg-line"
                    }`}
                    style={{ ["--len" as string]: "28px" }}
                  >
                    {playing && i === step && step !== RESPONSE && (
                      <span className="packet absolute -left-[2px] top-0 h-[5px] w-[5px] rounded-full bg-signal" />
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        {/* Explanation + log */}
        <div className="flex flex-col gap-8 lg:col-span-7 lg:col-start-7">
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              ["Contracts first", "Frontend and backend agree on a typed payload before either is built."],
              ["Rules in one place", "Validation happens at the edge; business rules live in one layer."],
              ["Data stays correct", "Writes that belong together commit together, or not at all."],
              ["Failure is designed", "External calls are retried safely and never block the user."],
            ].map(([t, b]) => (
              <div key={t} className="border-l border-line pl-5">
                <p className="text-[1rem] font-medium text-fg">{t}</p>
                <p className="mt-1.5 text-[0.925rem] leading-relaxed text-muted">{b}</p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-lg border border-line bg-ink shadow-panel">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <p className="font-mono text-[0.72rem] text-muted">trace: POST /api/payments</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  className="rounded-xs border border-line px-2.5 py-1 font-mono text-[0.7rem] text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  {playing ? "Pause" : "Play"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep(0);
                    setPlaying(true);
                  }}
                  className="rounded-xs border border-line px-2.5 py-1 font-mono text-[0.7rem] text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  Replay
                </button>
              </div>
            </div>
            <ol className="min-h-[15rem] overflow-x-auto p-4 font-mono text-[0.78rem] leading-[1.9]" aria-live="off">
              {systemNodes.slice(0, Math.min(step, systemNodes.length - 1) + 1).map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: duration.base, ease }}
                  className="flex gap-4 whitespace-nowrap"
                >
                  <span className="w-[8.5rem] shrink-0 text-dim">{n.name.toLowerCase()}</span>
                  <span className={i === focus && step !== RESPONSE ? "text-fg" : "text-muted"}>{n.log}</span>
                </motion.li>
              ))}
              {step === RESPONSE && (
                <motion.li
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4 whitespace-nowrap"
                >
                  <span className="w-[8.5rem] shrink-0 text-dim">response</span>
                  <span className="text-ok">← 201 Created, UI updated</span>
                </motion.li>
              )}
              <li aria-hidden className="text-signal">
                <span className="caret">▍</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}

/** Tiny line glyphs that hint at each node's nature. */
function NodeGlyph({ id, on }: { id: string; on: boolean }) {
  const c = on ? "#7d9dff" : "#5f656e";
  const common = { width: 18, height: 18, viewBox: "0 0 18 18", fill: "none", stroke: c, strokeWidth: 1.2, "aria-hidden": true } as const;
  switch (id) {
    case "user":
      return <svg {...common}><circle cx="9" cy="6" r="3" /><path d="M3 16c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5" /></svg>;
    case "frontend":
      return <svg {...common}><rect x="2" y="3" width="14" height="11" rx="1.5" /><path d="M2 6.5h14" /></svg>;
    case "api":
      return <svg {...common}><path d="M6 4 2 9l4 5M12 4l4 5-4 5" /></svg>;
    case "logic":
      return <svg {...common}><rect x="3" y="3" width="5" height="5" /><rect x="10" y="10" width="5" height="5" /><path d="M8 5.5h4.5V10" /></svg>;
    case "db":
      return <svg {...common}><ellipse cx="9" cy="4.5" rx="6" ry="2" /><path d="M3 4.5v9c0 1.1 2.7 2 6 2s6-.9 6-2v-9M3 9c0 1.1 2.7 2 6 2s6-.9 6-2" /></svg>;
    default:
      return <svg {...common}><circle cx="9" cy="9" r="6.5" /><path d="M2.5 9h13M9 2.5c2 2 2 11 0 13M9 2.5c-2 2-2 11 0 13" /></svg>;
  }
}
