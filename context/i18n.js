import { useRouter } from "next/router";
import { createContext, useCallback, useContext } from "react";
import es from "translations/es.json";
import en from "translations/en.json";

export const I18nContext = createContext();

const languages = { es, en };

export function I18nProvider({ children }) {
  const { locale } = useRouter();
  const t = useCallback((key, ...args) => {
    let translation = languages[locale][key];
    console.log(translation)
    if (args.length === 0) return translation
    
    args.forEach((value, index) => {
      translation = translation.replace(`\${${index + 1}}`, value);
    })
    return translation
  }, [locale]);

  return (
    <I18nContext.Provider value={{ t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within a I18nProvider");
  }
  return context;
}