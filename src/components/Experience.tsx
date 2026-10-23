import { useI18n } from "@/lib/i18n";
import { Text } from "./Placeholder";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  const { t, c } = useI18n();
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          id="experience"
          badge={t.experience.badge}
          title={t.experience.title}
          intro={t.experience.intro}
        />
        <ol className="relative max-w-[52rem] border-l border-line pl-8 md:pl-10">
          {c.experience.map((e, i) => (
            <li key={e.company} className="relative pb-12 last:pb-0">
              <span aria-hidden className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-dark ring-4 ring-white md:-left-[45px]" />
              <Reveal delay={i * 0.04}>
                <p className="text-[0.85rem] text-gray"><Text value={e.period} /> · {e.sector}</p>
                <h3 className="mt-1 text-[1.125rem] font-semibold text-dark">{e.role}</h3>
                <p className="text-[0.95rem] font-medium text-primary"><Text value={e.company} /></p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.95rem] leading-6 text-gray marker:text-line">
                  {e.responsibilities.map((r) => <li key={r}>{r}</li>)}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {e.tech.map((t) => (
                    <li key={t} className="rounded-md bg-light px-2 py-0.5 text-[0.75rem] text-gray">{t}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
