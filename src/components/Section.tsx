import type { ReactNode } from "react";
import { routes } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Section({
  id,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-route={routes[id]}
      aria-labelledby={`${id}-title`}
      className={`relative border-t border-line py-24 md:py-36 ${className}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <Reveal>
          <header className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
            <h2
              id={`${id}-title`}
              className="text-title font-semibold tracking-[-0.035em] text-fg md:col-span-7"
            >
              {title}
            </h2>
            {intro && (
              <div className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted md:col-span-5 md:justify-self-end">
                {intro}
              </div>
            )}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
