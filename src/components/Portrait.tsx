import { useState } from "react";
import { profile } from "@/lib/content";

/**
 * Professional portrait framed as a "selected node" in a system diagram.
 * Falls back to a monogram card until public/images/ignatius-andri.jpg exists.
 */
export function Portrait({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const { src, alt, width, height } = profile.photo;

  return (
    <figure className={`group relative ${className}`}>
      {/* node selection corners */}
      {["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-bottom-1.5 -left-1.5", "-bottom-1.5 -right-1.5"].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`absolute z-10 h-3 w-3 rounded-[2px] border border-signal/70 bg-ink transition-colors duration-300 group-hover:bg-signal ${pos}`}
        />
      ))}

      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line-strong bg-panel shadow-panel">
        {!failed ? (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-[50%_25%] contrast-[1.03] grayscale-[35%] transition-[filter,transform] duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.02] group-hover:grayscale-0"
          />
        ) : (
          <MonogramFallback />
        )}

        {/* cool tone wash so any photo sits inside the palette */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: "#7d9dff22" }} />

        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
          <span>
            <span className="block text-[1.05rem] font-semibold tracking-[-0.01em] text-fg">{profile.name}</span>
            <span className="mt-0.5 block text-[0.85rem] text-fg/70">Fullstack Developer</span>
          </span>
          <span className="flex items-center gap-2 rounded-xs border border-line-strong bg-ink/70 px-2 py-1 font-mono text-[0.68rem] text-fg/80 backdrop-blur-sm">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
            available
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

/** Small round avatar used next to the name in the hero. */
export function Avatar({ size = 40 }: { size?: number }) {
  const [failed, setFailed] = useState(false);
  const { src } = profile.photo;
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-line-strong bg-raised"
      style={{ width: size, height: size }}
    >
      {!failed ? (
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          decoding="async"
          fetchPriority="high"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-[50%_25%]"
        />
      ) : (
        <span className="text-[0.7rem] font-semibold tracking-wide text-muted">IA</span>
      )}
      <span aria-hidden className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-ink bg-ok" />
    </span>
  );
}

function MonogramFallback() {
  return (
    <div className="node-field-static relative flex h-full w-full items-center justify-center">
      <span className="text-[5.5rem] font-semibold tracking-[-0.06em] text-line-strong">IA</span>
      <span className="absolute left-5 top-5 font-mono text-[0.68rem] text-dim">
        public/images/ignatius-andri.jpg
      </span>
    </div>
  );
}
