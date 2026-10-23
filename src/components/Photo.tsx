import { useState, type ReactNode } from "react";
import { profile } from "@/lib/content";

type Image = { src: string; alt: string; width: number; height: number };

/**
 * Cut-out portrait sitting on a soft blob, with an optional overlay (badges).
 * "fit" shows the whole image anchored to the bottom; "crop" anchors a tall,
 * full-body image to the top and clips it at the waist.
 */
export function Photo({
  children,
  image = profile.photo,
  mode = "fit",
  priority = false,
}: {
  children?: ReactNode;
  image?: Image;
  mode?: "fit" | "crop";
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const { src, alt, width, height } = image;

  return (
    <figure className="relative aspect-[4/4.4]">
      <div aria-hidden className="absolute inset-x-0 bottom-0 top-[8%] bg-light [border-radius:var(--radius-blob)]" />
      <div className="absolute inset-0 overflow-hidden [border-radius:0_0_44%_40%/0_0_20%_22%]">
        {!failed ? (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            fetchPriority={priority ? "high" : undefined}
            loading={priority ? undefined : "lazy"}
            decoding="async"
            onError={() => setFailed(true)}
            className={
              mode === "fit"
                ? "absolute bottom-0 left-1/2 h-[100%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
                : "absolute left-1/2 top-[2%] h-auto w-[72%] max-w-none -translate-x-1/2"
            }
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[5rem] font-bold text-line">IA</span>
        )}
      </div>
      {children}
    </figure>
  );
}
