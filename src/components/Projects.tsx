
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { projects, type Project } from "@/lib/content";
import { duration, ease } from "@/lib/motion";
import { Text } from "./Placeholder";
import { Section } from "./Section";

export function Projects() {
  const [open, setOpen] = useState<string | null>(projects[0].id);

  return (
    <Section
      id="projects"
      title="Selected Work"
      intro="Case studies rather than screenshots: the problem, the decisions, and how each system is put together."
    >
      <ul className="border-b border-line">
        {projects.map((p) => (
          <CaseStudy key={p.id} p={p} open={open === p.id} onToggle={() => setOpen(open === p.id ? null : p.id)} />
        ))}
      </ul>
    </Section>
  );
}

function CaseStudy({ p, open, onToggle }: { p: Project; open: boolean; onToggle: () => void }) {
  const panelId = `case-${p.id}`;
  return (
    <li className="border-t border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group grid w-full gap-4 py-8 text-left md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
        >
          <span className="md:col-span-5">
            <span className="block text-[1.75rem] font-semibold tracking-[-0.03em] text-fg transition-colors duration-200 group-hover:text-signal md:text-[2.1rem]">
              {p.name}
            </span>
            <span className="mt-1.5 block text-[0.9rem] text-muted">{p.category}</span>
          </span>
          <span className="text-[1rem] leading-relaxed text-muted md:col-span-5">{p.summary}</span>
          <span className="flex items-center gap-3 text-[0.875rem] text-fg md:col-span-2 md:justify-self-end">
            {open ? "Close" : "Case study"}
            <span
              aria-hidden
              className={`relative flex h-7 w-7 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-signal`}
            >
              <span className="absolute h-px w-3 bg-fg" />
              <span className={`absolute h-3 w-px bg-fg transition-transform duration-300 ${open ? "scale-y-0" : ""}`} />
            </span>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: duration.slow, ease }}
            className="overflow-hidden"
          >
            <div className="grid gap-10 pb-12 md:grid-cols-12 md:gap-8">
              <div className="space-y-8 md:col-span-5">
                <Block label="Problem">{p.problem}</Block>
                <Block label="Solution">{p.solution}</Block>
                <Block label="My role"><Text value={p.role} /></Block>
                <div>
                  <p className="text-[0.85rem] font-medium text-fg">Technologies</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-xs border border-line px-2.5 py-1 font-mono text-[0.72rem] text-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-8 md:col-span-7">
                <ArchitecturePreview nodes={p.architecture} />
                <div>
                  <p className="text-[0.85rem] font-medium text-fg">Key technical decisions</p>
                  <ol className="mt-4 space-y-4">
                    {p.decisions.map((d, i) => (
                      <li key={d} className="grid grid-cols-[2rem_1fr] text-[0.975rem] leading-relaxed text-fg/85">
                        <span className="font-mono text-[0.72rem] leading-[1.9] text-signal">{String(i + 1).padStart(2, "0")}</span>
                        {d}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {p.github && <ProjectLink href={p.github} label="GitHub" />}
                  {p.demo && <ProjectLink href={p.demo} label="Live demo" primary />}
                  {p.note && <p className="text-[0.875rem] text-muted">{p.note}</p>}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[0.85rem] font-medium text-fg">{label}</p>
      <p className="mt-2 max-w-[58ch] text-[0.975rem] leading-relaxed text-muted">{children}</p>
    </div>
  );
}

function ArchitecturePreview({ nodes }: { nodes: string[] }) {
  return (
    <figure className="rounded-lg border border-line bg-panel p-5 shadow-panel">
      <figcaption className="mb-5 font-mono text-[0.72rem] text-muted">architecture</figcaption>
      <ol className="flex flex-col gap-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-3">
        {nodes.map((n, i) => (
          <li key={n} className="flex flex-col sm:flex-row sm:items-center">
            <span className="rounded-sm border border-line-strong bg-raised px-2.5 py-1.5 text-[0.8rem] text-fg">{n}</span>
            {i < nodes.length - 1 && (
              <span aria-hidden className="ml-5 h-4 w-px bg-line-strong sm:ml-0 sm:h-px sm:w-4" />
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function ProjectLink({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  const pending = href.includes("[");
  const cls = primary
    ? "bg-fg text-ink hover:bg-white"
    : "border border-line-strong text-fg hover:border-signal hover:text-signal";
  if (pending) {
    return (
      <span
        title="Placeholder: add the URL in lib/content.ts"
        className="inline-flex h-10 items-center rounded-sm border border-dashed border-line-strong px-4 text-[0.875rem] text-muted"
      >
        {label} (add link)
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex h-10 items-center rounded-sm px-4 text-[0.875rem] transition-colors ${cls}`}>
      {label}
    </a>
  );
}
