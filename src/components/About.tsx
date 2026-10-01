import { principlesShort } from "@/lib/content";
import { Portrait } from "./Portrait";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" title="More Than a Developer.">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <div className="mx-auto max-w-[360px] lg:sticky lg:top-24 lg:max-w-none">
            <Portrait />
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="text-[1.5rem] font-medium leading-[1.35] tracking-[-0.02em] text-fg md:text-[1.9rem]">
              I work across the whole application: the interface people use, the API that serves it,
              the rules behind it and the data underneath.
            </p>
            <div className="mt-8 max-w-[60ch] space-y-5 text-[1.0625rem] leading-relaxed text-muted">
              <p>
                My background is in frontend engineering, and I&apos;ve grown deliberately toward the backend:
                API design, database modelling and application architecture. Much of my work has been on
                business systems, where correctness matters more than novelty and the hard part is understanding
                the workflow before writing the code.
              </p>
              <p>
                I care about clean, maintainable code, about working well with analysts, designers and other
                engineers, and about keeping on learning, because the best systems are built by people who
                understand why each layer exists.
              </p>
            </div>
          </Reveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {principlesShort.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05} className="h-full">
                <li className="group h-full bg-ink p-6 transition-colors duration-300 hover:bg-panel">
                  <p className="text-[1.2rem] font-semibold tracking-[-0.02em] text-fg transition-colors duration-200 group-hover:text-signal">
                    {p.title}
                  </p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
