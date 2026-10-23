import { Link } from "react-router-dom";
import type { Insight } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { ArrowRight } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const covers: Record<Insight["tone"], string> = {
  blue: "from-[#dbeafe] to-[#bfdbfe]",
  dark: "from-[#1f2937] to-[#111827]",
  violet: "from-[#ede9fe] to-[#ddd6fe]",
  gray: "from-[#f3f4f6] to-[#e5e7eb]",
  green: "from-[#dcfce7] to-[#bbf7d0]",
};

export function Insights() {
  const { t, c } = useI18n();
  const [shown, rest] = [c.insights.slice(0, 3), c.insights.slice(3)];
  return (
    <section id="insights" aria-labelledby="insights-title" className="bg-light/60 py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          id="insights"
          badge={t.insights.badge}
          title={t.insights.title}
          intro={t.insights.intro}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06}>
              <Link to={`/insights/${a.slug}`} className="group block">
                <div className={`flex aspect-[16/10] items-end overflow-hidden rounded-card bg-gradient-to-br p-5 ${covers[a.tone]}`}>
                  <span className={`text-[1.4rem] font-bold leading-tight tracking-[-0.02em] transition-transform duration-500 group-hover:-translate-y-1 ${a.tone === "dark" ? "text-white" : "text-dark/80"}`}>
                    {a.title}
                  </span>
                </div>
                <p className="mt-4 text-[0.8rem] font-medium text-primary">{a.topic}</p>
                <h3 className="mt-1 text-[1.05rem] font-semibold leading-6 text-dark transition-colors group-hover:text-primary">{a.title}</h3>
                <p className="mt-1.5 text-[0.9rem] leading-6 text-gray">{a.dek}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        {rest.length > 0 && (
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {rest.map((a) => (
              <li key={a.slug}>
                <Link to={`/insights/${a.slug}`} className="group flex items-center justify-between gap-6 py-4">
                  <span>
                    <span className="block text-[0.95rem] font-medium text-dark transition-colors group-hover:text-primary">{a.title}</span>
                    <span className="block text-[0.8rem] text-gray">{a.topic}</span>
                  </span>
                  <ArrowRight className="shrink-0 text-gray transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
