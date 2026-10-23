import { languages, useI18n } from "@/lib/i18n";

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t.nav.language} className={`flex rounded-full bg-light p-1 ${className}`}>
      {languages.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1 text-[0.75rem] font-semibold transition-colors duration-200 ${
            lang === l ? "bg-white text-dark shadow-card" : "text-gray hover:text-dark"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
