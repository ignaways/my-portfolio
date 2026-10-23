import type { Project } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const themes = [
  { bg: "from-[#e0e7ff] to-[#c7d2fe]", accent: "bg-primary" },
  { bg: "from-[#e5e7eb] to-[#d1d5db]", accent: "bg-dark" },
  { bg: "from-[#3b2a20] to-[#1f1712]", accent: "bg-[#d4a373]" },
];

/** A real link is one without a [placeholder]. */
const link = (p: Project) => [p.demo, p.github].find((u) => u && !u.includes("["));

export function Projects() {
  const { t, c } = useI18n();
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          id="projects"
          badge={t.projects.badge}
          title={t.projects.title}
          intro={t.projects.intro}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.projects.map((p, i) => {
            const href = link(p);
            return (
              <Reveal key={p.id} delay={i * 0.06}>
                <article className="card group flex h-full flex-col overflow-hidden p-3 transition-shadow duration-300 hover:shadow-lift">
                  <Thumbnail theme={themes[i % themes.length]} />
                  <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                    <span className="self-start rounded-md bg-light px-2 py-0.5 text-[0.72rem] font-medium text-gray">
                      {p.category}
                    </span>
                    <h3 className="mt-3 text-[1.125rem] font-semibold text-dark">{p.name}</h3>
                    <p className="mt-1.5 text-[0.9rem] leading-6 text-gray">{p.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <li key={s} className="rounded-md border border-line px-2 py-0.5 text-[0.72rem] text-gray">{s}</li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-end justify-between gap-4 pt-5">
                      <p className="text-[0.8rem] text-gray">{p.note ?? p.role}</p>
                      {href && (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t.projects.open(p.name)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white"
                        >
                          <ArrowRight width={16} height={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Abstract app mock-up used until real project screenshots exist. */
function Thumbnail({ theme }: { theme: (typeof themes)[number] }) {
  return (
    <div aria-hidden className={`relative aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-br ${theme.bg}`}>
      <div className="absolute left-[10%] top-[16%] h-full w-[86%] rounded-lg bg-white/95 p-3 shadow-lift transition-transform duration-500 ease-[var(--ease-soft)] group-hover:-translate-y-1">
        <div className="flex gap-1">
          {[0, 1, 2].map((d) => <span key={d} className="h-1.5 w-1.5 rounded-full bg-line" />)}
        </div>
        <div className="mt-3 flex gap-3">
          <div className="w-1/4 space-y-1.5">
            {[0, 1, 2, 3].map((r) => <span key={r} className={`block h-1.5 rounded ${r === 0 ? theme.accent : "bg-light"}`} />)}
          </div>
          <div className="flex-1 space-y-2">
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((c) => <span key={c} className="h-6 rounded bg-light" />)}
            </div>
            <span className={`block h-1.5 w-2/3 rounded opacity-70 ${theme.accent}`} />
            <span className="block h-1.5 w-1/2 rounded bg-light" />
            <span className="block h-10 rounded bg-light" />
          </div>
        </div>
      </div>
    </div>
  );
}
