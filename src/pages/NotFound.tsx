import { Link } from "react-router-dom";
import { ArrowRight } from "@/components/Icons";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <main className="mx-auto flex min-h-dvh max-w-[720px] flex-col justify-center px-5">
      <span className="badge self-start">404</span>
      <h1 className="mt-4 text-h2 font-bold tracking-[-0.03em] text-dark">{t.notFound.title}</h1>
      <p className="mt-3 text-gray">{t.notFound.body}</p>
      <Link to="/" className="btn-primary mt-8 self-start">
        {t.notFound.home} <ArrowRight width={16} height={16} />
      </Link>
    </main>
  );
}
