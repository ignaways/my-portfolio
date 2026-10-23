import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Badge + title + optional intro, with an optional slot on the right (e.g. "View All"). */
export function SectionHeader({
  id,
  badge,
  title,
  intro,
  aside,
}: {
  id: string;
  badge: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Reveal className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-[40rem]">
        <span className="badge">{badge}</span>
        <h2 id={`${id}-title`} className="mt-4 text-h2 font-bold tracking-[-0.03em] text-dark">
          {title}
        </h2>
        {intro && <p className="mt-4 text-[1rem] leading-6 text-gray">{intro}</p>}
      </div>
      {aside && <div className="md:max-w-[22rem] md:pb-2">{aside}</div>}
    </Reveal>
  );
}
