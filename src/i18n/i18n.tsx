import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import zhCN, { type TranslationKeys } from "./zh-CN";
import enUS from "./en-US";

export type Locale = "zh-CN" | "en-US";

const LOCALE_STORAGE_KEY = "mdeditor-locale";

const messages: Record<Locale, Record<TranslationKeys, string>> = {
  "zh-CN": zhCN,
  "en-US": enUS,
};

type TranslateFn = (key: TranslationKeys) => string;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslateFn;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === "zh-CN" || stored === "en-US") {
    return stored;
  }
  // Auto-detect from browser language
  const browserLang = navigator.language;
  if (browserLang.startsWith("zh")) {
    return "zh-CN";
  }
  return "en-US";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  }, []);

  const t: TranslateFn = useCallback(
    (key: TranslationKeys) => {
      return messages[locale][key] ?? key;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
