import { useMatch } from "@reach/router";
import { useSiteData } from "react-static";

export const useCurrentLanguage = () => {
  const siteData = useSiteData();
  const { availableLanguages, defaultLanguage } = siteData?.translations?.data;

  const match = useMatch("/:currentLang/*");
  const currentLang = match?.currentLang || defaultLanguage;

  const result = availableLanguages?.find((lang) => currentLang === lang);
  if (!result) return defaultLanguage;

  return result;
};
