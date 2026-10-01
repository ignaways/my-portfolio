import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

/** Reports the real page load time from the Navigation Timing API. */
export function Footer() {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const read = () => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (nav && nav.loadEventEnd > 0) setMs(Math.round(nav.loadEventEnd));
    };
    if (document.readyState === "complete") read();
    else window.addEventListener("load", () => setTimeout(read, 0), { once: true });
  }, []);

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-8 text-[0.85rem] text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="flex items-center gap-2 font-mono text-[0.72rem]">
          <span className={`h-1.5 w-1.5 rounded-full ${ms === null ? "bg-line-strong" : "bg-ok"}`} aria-hidden />
          {ms === null ? "measuring page load" : `page loaded in ${ms} ms`}
        </p>
        <p>Built with React, TypeScript, Tailwind CSS and Framer Motion</p>
      </div>
    </footer>
  );
}
