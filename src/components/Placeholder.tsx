/**
 * Renders text, marking any [bracketed] segment as a placeholder
 * with a dashed underline so unfinished content is easy to spot.
 */
export function Text({ value, className }: { value: string; className?: string }) {
  const parts = value.split(/(\[[^\]]+\])/g).filter(Boolean);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.startsWith("[") && p.endsWith("]") ? (
          <span
            key={i}
            title="Placeholder: replace in lib/content.ts"
            className="text-muted underline decoration-dashed decoration-dim underline-offset-4"
          >
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </span>
  );
}
