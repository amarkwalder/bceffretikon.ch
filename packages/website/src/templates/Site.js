import React from "react";
import { Routes, useSiteData } from "react-static";

import { TinaProvider, TinaCMS } from "tinacms";
import { BrowserStorageClient } from "@tinacms/browser-storage";
import { HelmetProvider } from "react-helmet-async";
import {
  GithubClient,
  GithubMediaStore,
  TinacmsGithubProvider,
} from "react-tinacms-github";

import { useCheckLogin } from "../utils/login";

import { SiteLayout } from "../layouts/SiteLayout";

import { Error } from "../components/Error";
import { Loading } from "../components/Loading";

import {
  GITHUB_CLIENT_ID,
  GITHUB_SOURCE_REPO_OWNER,
  GITHUB_SOURCE_REPO_NAME,
} from "../constants";

const preview = process.env.RUNTIME_ENV === "preview";

export const Site = (props) => {
  return preview ? <PreviewSite {...props} /> : <StaticSite {...props} />;
};

export default Site;

const PreviewSite = () => {
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

  const isSSR = typeof document === "undefined";
  if (!isSSR) {
    cms.registerApi("storage", new BrowserStorageClient(window.localStorage));
  }

  const enterEditMode = async () => {};
  const exitEditMode = async () => {};

  const { loggedIn, error } = useCheckLogin(githubClient);

  const siteData = useSiteData();
  const { availableLanguages } = siteData.translations.data;

  if (preview && error) {
    return <Error message={error} />;
  }

  if (preview && !loggedIn) {
    return <Loading message={"Try to login to Github"} />;
  }

  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider onLogin={enterEditMode} onLogout={exitEditMode}>
        <HelmetProvider>
          {availableLanguages &&
            availableLanguages.map((lang) => (
              <SiteLayout
                key={"site-" + lang}
                currentLanguage={lang}
                path={"/" + lang + "/*"}
              >
                <Routes path="*" />
              </SiteLayout>
            ))}
        </HelmetProvider>
      </TinacmsGithubProvider>
    </TinaProvider>
  );
};

const StaticSite = () => {
  const siteData = useSiteData();
  const { availableLanguages } = siteData.translations.data;

  return (
    <HelmetProvider>
      {availableLanguages &&
        availableLanguages.map((lang) => (
          <SiteLayout
            key={"site-" + lang}
            currentLanguage={lang}
            path={"/" + lang + "/*"}
          >
            <Routes path="*" />
          </SiteLayout>
        ))}
    </HelmetProvider>
  );
};
