import { Link } from "react-router-dom";
import { insights } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Insights() {
  const featured = insights.find((a) => a.featured)!;
  const rest = insights.filter((a) => !a.featured);

  return (
    <Section id="insights" title="What I Think About" intro="Notes on the problems that show up once software meets real data and real users.">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <article className="group h-full rounded-lg border border-line bg-panel shadow-panel transition-colors hover:border-line-strong">
            <Link to={`/insights/${featured.slug}`} className="flex h-full flex-col p-6 md:p-8">
              <p className="text-[0.85rem] text-signal">{featured.topic}</p>
              <h3 className="mt-3 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-fg">{featured.title}</h3>
              <p className="mt-4 text-[1rem] leading-relaxed text-muted">{featured.dek}</p>
              <PlanVisual />
              <span className="mt-auto pt-8 text-[0.9rem] text-fg underline decoration-line-strong underline-offset-4 transition-colors group-hover:decoration-signal">
                Read article
              </span>
            </Link>
          </article>
        </Reveal>

        <ul className="border-t border-line lg:col-span-7">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.03}>
              <li className="border-b border-line">
                <Link to={`/insights/${a.slug}`} className="group grid gap-2 py-6 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
                  <p className="text-[0.85rem] text-muted">{a.topic}</p>
                  <div>
                    <h3 className="text-[1.2rem] font-medium tracking-[-0.015em] text-fg transition-colors group-hover:text-signal">{a.title}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{a.dek}</p>
                  </div>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/** Illustrative execution-plan comparison (qualitative, no invented numbers). */
function PlanVisual() {
  return (
    <div aria-hidden className="mt-8 space-y-4 rounded-md border border-line bg-ink p-4 font-mono text-[0.72rem]">
      <div>
        <p className="flex justify-between text-muted"><span>Clustered Index Scan</span><span>reads every row</span></p>
        <div className="mt-2 grid grid-cols-[repeat(24,1fr)] gap-[3px]">
          {Array.from({ length: 24 }).map((_, i) => <span key={i} className="h-2 rounded-[1px] bg-muted/50" />)}
        </div>
      </div>
      <div>
        <p className="flex justify-between text-muted"><span className="text-fg">Index Seek</span><span>reads matching rows</span></p>
        <div className="mt-2 grid grid-cols-[repeat(24,1fr)] gap-[3px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className={`h-2 rounded-[1px] ${i >= 9 && i <= 11 ? "bg-signal" : "bg-line"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
