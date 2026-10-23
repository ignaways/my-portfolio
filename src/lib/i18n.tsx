import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { content } from "./content";
import { contentId } from "./content.id";
import { ui } from "./ui";

export type Lang = "en" | "id";
export const languages: Lang[] = ["en", "id"];

const STORAGE_KEY = "lang";

/** Saved choice first, then the browser's language. */
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "id") return saved;
  } catch {
    // storage can be blocked; fall through to the browser language
  }
  return navigator.language?.toLowerCase().startsWith("id") ? "id" : "en";
}

const LanguageContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void } | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // not persisting is fine
    }
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** The active language, its interface strings (t) and its site content (c). */
export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return { ...ctx, t: ui[ctx.lang], c: ctx.lang === "id" ? contentId : content };
}
