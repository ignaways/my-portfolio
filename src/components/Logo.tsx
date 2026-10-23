import { profile } from "@/lib/content";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`text-[1.35rem] font-bold tracking-[-0.03em] text-dark ${className}`}>
      {profile.brand}
      <span className="text-primary">.</span>
    </span>
  );
}
