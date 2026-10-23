import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "@/components/Icons";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Logo } from "@/components/Logo";
import { useI18n } from "@/lib/i18n";
import NotFound from "./NotFound";

export default function Article() {
  const { slug } = useParams();
  const { t, c } = useI18n();
  const a = c.insights.find((x) => x.slug === slug);

  useEffect(() => {
    if (a) document.title = `${a.title} | ${c.profile.name}`;
  }, [a, c.profile.name]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!a) return <NotFound />;

  return (
    <>
      <header className="container-page flex h-[72px] items-center justify-between">
        <Link to="/"><Logo /></Link>
        <LanguageSwitch />
      </header>
      <main className="mx-auto max-w-[720px] px-5 py-16 md:py-24">
        <Link to="/#insights" className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-gray hover:text-primary">
          <ArrowLeft width={16} height={16} /> {t.article.back}
        </Link>
        <span className="badge mt-12">{a.topic}</span>
        <h1 className="mt-4 text-h2 font-bold tracking-[-0.03em] text-dark">{a.title}</h1>
        <p className="mt-6 text-[1.15rem] leading-relaxed text-gray">{a.dek}</p>
        <div className="mt-12 rounded-card border border-dashed border-line bg-light/60 p-8 text-[1rem] leading-relaxed text-gray">
          {t.article.draft}
        </div>
      </main>
      <Footer home={false} />
    </>
  );
}
