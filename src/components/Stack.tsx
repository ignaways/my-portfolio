
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { stack, type Tech } from "@/lib/content";
import { duration, ease } from "@/lib/motion";
import { Text } from "./Placeholder";
import { Section } from "./Section";

export function Stack() {
  const [sel, setSel] = useState<{ layer: string; tech: Tech }>({ layer: stack[0].id, tech: stack[0].items[0] });

  return (
    <Section
      id="stack"
      title="My Engineering Stack"
      intro="Organised the way a system is: by layer. Hover or focus any technology to see how and where I use it."
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ol className="relative">
            {stack.map((layer, li) => (
              <li key={layer.id} className="relative">
                <div className="grid gap-5 border-t border-line py-8 md:grid-cols-[180px_1fr] md:gap-8">
                  <div>
                    <p className="flex items-center gap-3 text-[1.05rem] font-semibold text-fg">
                      <span className="font-mono text-[0.7rem] font-normal text-dim">L{li + 1}</span>
                      {layer.name}
                    </p>
                    <p className="mt-1 pl-8 text-[0.875rem] text-muted">{layer.role}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {layer.items.map((t) => {
                      const on = sel.tech.name === t.name;
                      return (
                        <li key={t.name}>
                          <button
                            type="button"
                            onMouseEnter={() => setSel({ layer: layer.id, tech: t })}
                            onFocus={() => setSel({ layer: layer.id, tech: t })}
                            onClick={() => setSel({ layer: layer.id, tech: t })}
                            aria-pressed={on}
                            className={`flex items-center gap-2 rounded-sm border px-3.5 py-2.5 text-[0.9rem] transition-[border-color,color,background-color] duration-200 ${
                              on
                                ? "border-signal/70 bg-signal-soft text-fg"
                                : "border-line text-fg/80 hover:border-line-strong hover:text-fg"
                            }`}
                          >
                            <span
                              aria-hidden
                              className={`h-1.5 w-1.5 rounded-full ${on ? "bg-signal" : "bg-line-strong"}`}
                            />
                            {t.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {sel.layer === layer.id && (
                  <div className="pb-8 lg:hidden">
                    <Detail tech={sel.tech} layer={layer.name} />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        <aside className="hidden lg:col-span-4 lg:block" aria-live="polite">
          <div className="sticky top-24">
            <Detail tech={sel.tech} layer={stack.find((s) => s.id === sel.layer)?.name ?? ""} />
          </div>
        </aside>
      </div>
    </Section>
  );
}

function Detail({ tech, layer }: { tech: Tech; layer: string }) {
  return (
    <div className="rounded-lg border border-line bg-panel shadow-panel">
      <AnimatePresence mode="wait" initial={false}>
        <motion.dl
          key={tech.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.fast, ease }}
          className="divide-y divide-line"
        >
          <div className="p-5">
            <dt className="sr-only">Technology</dt>
            <dd className="text-[1.5rem] font-semibold tracking-[-0.02em] text-fg">{tech.name}</dd>
            <dd className="mt-1 font-mono text-[0.72rem] text-muted">layer: {layer.toLowerCase()}</dd>
          </div>
          <div className="grid grid-cols-[110px_1fr] gap-3 p-5 text-[0.9rem]">
            <dt className="text-muted">Experience</dt>
            <dd className="text-fg"><Text value={tech.years} /></dd>
          </div>
          <div className="grid grid-cols-[110px_1fr] gap-3 p-5 text-[0.9rem]">
            <dt className="text-muted">Used for</dt>
            <dd className="leading-relaxed text-fg/90">{tech.usage}</dd>
          </div>
          {/*<div className="grid grid-cols-[110px_1fr] gap-3 p-5 text-[0.9rem]">*/}
          {/*  <dt className="text-muted">Example</dt>*/}
          {/*  <dd className="text-fg"><Text value={tech.example} /></dd>*/}
          {/*</div>*/}
        </motion.dl>
      </AnimatePresence>
    </div>
  );
}
