import { experience } from "@/lib/content";
import { Text } from "./Placeholder";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" title="Experience" intro="Knowledge grows through experience. I learn by building, solving, and improving.">
      <ol className="relative ml-1 border-l border-line md:ml-0 md:border-l-0">
        {experience.map((e, i) => (
          <Reveal key={i}>
            <li className="relative grid gap-4 pb-16 pl-8 last:pb-0 md:grid-cols-[11rem_3rem_1fr] md:gap-0 md:pl-0">
              {/* timeline rail on desktop sits in the middle column */}
              <span aria-hidden className="absolute bottom-0 left-[12.5rem] top-2 hidden w-px bg-line md:block" />
              <span
                aria-hidden
                className={`absolute left-[-5px] top-2 h-[9px] w-[9px] rounded-[2px] border md:left-[calc(12.5rem-4px)] ${
                  i === 0 ? "border-signal bg-signal" : "border-line-strong bg-ink"
                }`}
              />
              <div>
                <p className="font-mono text-[0.78rem] text-muted"><Text value={e.period} /></p>
                <p className="mt-1 text-[0.875rem] text-dim">{e.sector}</p>
              </div>
              <div className="md:col-start-3">
                <h3 className="text-[1.4rem] font-semibold tracking-[-0.02em] text-fg">
                  <Text value={e.role} />
                </h3>
                <p className="mt-1 text-[1rem] text-muted"><Text value={e.company} /></p>
                <ul className="mt-5 space-y-2.5">
                  {e.responsibilities.map((r) => (
                    <li key={r} className="grid grid-cols-[1rem_1fr] text-[0.975rem] leading-relaxed text-fg/85">
                      <span aria-hidden className="mt-[0.7em] h-px w-2 bg-dim" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-l-2 border-signal/50 pl-4 text-[0.95rem] leading-relaxed text-fg/90">
                  <span className="text-muted">Impact: </span>
                  <Text value={e.impact} />
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {e.tech.map((t) => (
                    <li key={t} className="rounded-xs border border-line px-2.5 py-1 font-mono text-[0.72rem] text-muted">{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
