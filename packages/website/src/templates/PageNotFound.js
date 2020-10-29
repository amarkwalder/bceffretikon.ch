import React from "react";
import { useLocation, navigate } from "@reach/router";
import { useCurrentLanguage } from "../utils/language";
import Error from "../components/Error";

export const PageNotFound = () => {
  const { pathname } = useLocation();

  const currentLang = useCurrentLanguage();
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

  navigate(redirectPath);
  return null;
};

export default PageNotFound;
