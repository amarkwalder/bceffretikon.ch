import React from "react";
import { useLocation, useMatch, navigate } from "../components/Router";
import Error from "../components/Error";
import { useSiteData } from "react-static";

export const PageNotFound = () => {
  const { pathname } = useLocation();

  const siteData = useSiteData();
  const { defaultLanguage, availableLanguages } = siteData.translations.data;

  // TODO useContext(TranslationContext).currentLanguage --> maybe works
  const match = useMatch("/:currentLanguage/*");
  const language =
    match &&
    availableLanguages.find((value) => value === match.currentLanguage);

  const currentLang = language || defaultLanguage;

  if (!currentLang) {
    return (
      <Error
        message={
          "Current language cannot be extracted. This is a misconfiguration of the 404 pages."
        }
      />
    );
  }

  const redirectPath = "/" + currentLang + "/404";
  if (pathname === redirectPath) {
    return (
      <Error
        message={
          "Could not find localized 'PageNotFound' page. This is a misconfiguration of the 404 pages."
        }
      />
    );
  }

  // TODO Redirect Path must be fully qualifed (most probably, try it out on AWS)
  navigate(redirectPath);
  return null;
};

export default PageNotFound;
