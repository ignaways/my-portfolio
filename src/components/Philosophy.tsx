import { philosophy } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Philosophy() {
  return (
    <Section id="principles" title="Engineering Philosophy">
      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
        {philosophy.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05} className="h-full">
            <article className="group flex h-full min-h-[18rem] flex-col justify-between bg-ink p-8 transition-colors duration-300 hover:bg-panel md:p-12">
              <div>
                <h3 className="text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] text-fg md:text-[2.75rem]">
                  {p.title}
                </h3>
                <p className="mt-5 max-w-[40ch] text-[1.0625rem] leading-relaxed text-muted">{p.body}</p>
              </div>
              <p className="mt-10 font-mono text-[0.75rem] text-dim transition-colors duration-300 group-hover:text-signal">
                {p.code}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
