
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { journey } from "@/lib/content";
import { Section } from "./Section";

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      id="journey"
      title="From Interface to Infrastructure"
      intro="I didn't switch from frontend to backend. Each layer led naturally to the one beneath it."
    >
      <ol ref={ref} className="relative grid gap-10 pl-8 lg:grid-cols-5 lg:gap-6 lg:pl-0 lg:pt-10">
        {/* rail: vertical on mobile, horizontal on desktop */}
        <span aria-hidden className="absolute bottom-0 left-[3px] top-0 w-px bg-line lg:bottom-auto lg:left-0 lg:right-0 lg:h-px lg:w-auto" />
        <motion.span
          aria-hidden
          style={{ scaleY: fill }}
          className="absolute bottom-0 left-[3px] top-0 w-px origin-top bg-signal lg:hidden"
        />
        <motion.span
          aria-hidden
          style={{ scaleX: fill }}
          className="absolute left-0 right-0 top-0 hidden h-px origin-left bg-signal lg:block"
        />
        {journey.map((j, i) => (
          <li key={j.stage} className="relative">
            <span aria-hidden className="absolute -left-8 top-1.5 h-[7px] w-[7px] rounded-[2px] border border-signal bg-ink lg:-top-[2.6rem] lg:left-0" />
            <p className="font-mono text-[0.72rem] text-signal">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-[1.25rem] font-semibold tracking-[-0.02em] text-fg">{j.stage}</h3>
            <p className="mt-3 max-w-[40ch] text-[0.95rem] leading-relaxed text-muted">{j.story}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
