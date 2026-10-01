import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { insights, profile } from "@/lib/content";
import NotFound from "./NotFound";

export default function Article() {
  const { slug } = useParams();
  const a = insights.find((x) => x.slug === slug);

  useEffect(() => {
    if (a) document.title = `${a.title} | ${profile.name}`;
    window.scrollTo(0, 0);
  }, [a]);

  if (!a) return <NotFound />;

  return (
    <main className="mx-auto max-w-[720px] px-5 py-24 md:py-36">
      <Link to="/#insights" className="text-[0.9rem] text-muted underline decoration-line-strong underline-offset-4 hover:text-fg">
        Back to insights
      </Link>
      <p className="mt-16 text-[0.9rem] text-signal">{a.topic}</p>
      <h1 className="mt-3 text-title font-semibold tracking-[-0.035em]">{a.title}</h1>
      <p className="mt-6 text-[1.2rem] leading-relaxed text-muted">{a.dek}</p>
      <div className="mt-16 rounded-lg border border-dashed border-line-strong p-8 text-[1rem] leading-relaxed text-muted">
        This article is being written. Add its content (MDX or a CMS) and render it here.
      </div>
    </main>
  );
}
