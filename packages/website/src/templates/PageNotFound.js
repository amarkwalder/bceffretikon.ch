import React, { useContext } from "react";
import { useSiteData } from "react-static";
import { useLocation, useMatch, navigate } from "../components/Router";

import Error from "../components/Error";
import { TranslationContext } from "../components/Translation";

export const PageNotFound = () => {
  const { pathname } = useLocation();
  const { currentLanguage } = useContext(TranslationContext);

  const redirectPath = "/" + currentLanguage + "/404";
  if (pathname === redirectPath) {
    const message =
      "Could not find localized 'PageNotFound' page. " +
      "This is a misconfiguration of the 404 pages.";
    return <Error message={message} />;
  }

  navigate(redirectPath);
  return null;
};

export default PageNotFound;
