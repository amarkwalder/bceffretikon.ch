import React from "react";
import { useSiteData } from "react-static";

export const TranslationContext = React.createContext();

export const TranslationProvider = ({ currentLanguage, children }) => {
  const siteData = useSiteData();

  const {
    defaultLanguage,
    availableLanguages,
    translations,
  } = siteData.translations.data;

  const tr = (code, language) =>
    translate(code, language ? language : currentLanguage, translations);

  return (
    <TranslationContext.Provider
      value={{
        currentLanguage: currentLanguage,
        defaultLanguage: defaultLanguage,
        availableLanguages: availableLanguages,
        translations: translations,
        tr: tr,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

const translate = (code, language, translations) => {
  const result = translations.find((value) => value.code === code);
  if (!result || !result.translation) return "!!" + code;
  return result.translation.find((value) => value.language === language)?.text;
};
