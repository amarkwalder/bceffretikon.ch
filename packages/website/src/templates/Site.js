import React, { useEffect, useState } from "react";
import { Routes, useSiteData } from "react-static";

import { TinaProvider, TinaCMS } from "tinacms";
import { BrowserStorageClient } from "@tinacms/browser-storage";
import { HelmetProvider, Helmet } from "react-helmet-async";
import {
  GithubClient,
  GithubMediaStore,
  TinacmsGithubProvider,
} from "react-tinacms-github";

import { useMatch } from "../components/Router";

import { useCheckLogin } from "../utils/login";

import { TranslationProvider } from "../components/Translation";
import { ThemeProvider } from "../components/Theme";
import { CookieConsent } from "../components/CookieConsent";

import { SiteLayout } from "../layouts/SiteLayout";

import { Error } from "../components/Error";
import { Loading } from "../components/Loading";

import {
  GITHUB_CLIENT_ID,
  GITHUB_SOURCE_REPO_OWNER,
  GITHUB_SOURCE_REPO_NAME,
} from "../constants";

const preview = process.env.RUNTIME_ENV === "preview";

export const Site = () => {
  const githubClient = React.useMemo(
    () =>
      new GithubClient({
        proxy: "/api/proxy-github",
        authCallbackRoute: "/api/create-github-access-token",
        clientId: GITHUB_CLIENT_ID,
        baseRepoFullName:
          GITHUB_SOURCE_REPO_OWNER + "/" + GITHUB_SOURCE_REPO_NAME,
      }),
    []
  );

  const cms = React.useMemo(
    () =>
      new TinaCMS({
        enabled: preview,
        toolbar: preview,
        sidebar: false,
        media: new GithubMediaStore(githubClient),
        apis: {
          github: githubClient,
        },
      }),
    [githubClient]
  );

  const cacheNamespace = getCacheNamespace();
  registerBrowserStorageApi(cms, cacheNamespace);

  const [clearCache, setClearCache] = useState(true);
  useEffect(() => {
    if (clearCache) {
      window.localStorage.removeItem(cacheNamespace);
      setClearCache(false);
    }
  }, [clearCache]);

  const enterEditMode = async () => {};
  const exitEditMode = async () => {};

  const { loggedIn, error } = useCheckLogin(githubClient);

  const siteData = useSiteData();
  const { availableLanguages, defaultLanguage } = siteData.translations.data;
  const theme = siteData.theme.data;

  const match = useMatch("/:currentLanguage/*");
  const language =
    match &&
    availableLanguages.find((value) => value === match.currentLanguage);

  const currentLanguage = language || defaultLanguage;

  if (preview && error) {
    return <Error message={error} />;
  }

  if (preview && !loggedIn) {
    return <Loading message={"Try to login to Github"} />;
  }

  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider onLogin={enterEditMode} onLogout={exitEditMode}>
        <TranslationProvider currentLanguage={currentLanguage}>
          <ThemeProvider theme={theme}>
            <HelmetProvider>
              <Helmet>
                <script src="https://cdn.jsdelivr.net/npm/focus-visible@5.1.0/dist/focus-visible.min.js"></script>
              </Helmet>
              <CookieConsent />
              <SiteLayout>
                <Routes default />
              </SiteLayout>
            </HelmetProvider>
          </ThemeProvider>
        </TranslationProvider>
      </TinacmsGithubProvider>
    </TinaProvider>
  );
};

export default Site;

const getCacheNamespace = () => {
  const isSSR = typeof document === "undefined";
  if (isSSR) return `tina-local-storage:SSR`;
  return `tina-local-storage:${window.location.hostname}`;
};

const registerBrowserStorageApi = (cms, cacheNamespace) => {
  const isSSR = typeof document === "undefined";
  if (isSSR) return;

  cms.registerApi(
    "storage",
    new BrowserStorageClient(window.localStorage, cacheNamespace)
  );
};
