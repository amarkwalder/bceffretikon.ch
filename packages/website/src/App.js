import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { TinaProvider, TinaCMS } from "tinacms";
import { HelmetProvider } from "react-helmet-async";
import {
  GithubClient,
  GithubMediaStore,
  TinacmsGithubProvider,
} from "react-tinacms-github";

import { useContent } from "./utils/content";
import { CheckLogin } from "./utils/login";

import { SiteLayout } from "./layouts/SiteLayout";

import Authorizing from "./Authorize";
import Page from "./templates/Page";

import { Error } from "./components/Error";
import { Loading } from "./components/Loading";

import {
  GITHUB_CLIENT_ID,
  GITHUB_SOURCE_REPO_OWNER,
  GITHUB_SOURCE_REPO_NAME,
} from "./constants";

const githubClient = new GithubClient({
  proxy: "/api/proxy-github",
  authCallbackRoute: "/api/create-github-access-token",
  clientId: GITHUB_CLIENT_ID,
  baseRepoFullName: GITHUB_SOURCE_REPO_OWNER + "/" + GITHUB_SOURCE_REPO_NAME,
});

const preview = process.env.REACT_APP_RUNTIME_ENV === "preview";

const App = () => {
  const tinaConfig = {
    enabled: preview,
    toolbar: preview,
    sidebar: false,
    media: new GithubMediaStore(githubClient),
    apis: {
      github: githubClient,
    },
  };

  const cms = React.useMemo(() => new TinaCMS(tinaConfig), [tinaConfig]);

  const enterEditMode = async () => {};
  const exitEditMode = () => {};

  return (
    <Router>
      <Switch>
        <Route path="/github/authorizing">
          <Authorizing />
        </Route>

        <Route path="/">
          <Site
            cms={cms}
            enterEditMode={enterEditMode}
            exitEditMode={exitEditMode}
          />
        </Route>
      </Switch>
    </Router>
  );
};

const Site = ({ cms, enterEditMode, exitEditMode }) => {
  return (
    <TinaProvider cms={cms}>
      <CheckLogin>
        <TinacmsGithubProvider onLogin={enterEditMode} onLogout={exitEditMode}>
          <HelmetProvider>
            <SiteLayout>
              <SiteRouter />
            </SiteLayout>
          </HelmetProvider>
        </TinacmsGithubProvider>
      </CheckLogin>
    </TinaProvider>
  );
};

const SiteRouter = () => {
  const content = useContent("content/settings/routes.json", true);

  if (content.error) {
    return <Error message={content.error} />;
  }

  if (content.loading) {
    return <Loading />;
  }

  return (
    <Switch>
      {content.data.routes.map((route, index) => {
        return (
          <Route key={"route-" + index} exact={route.exact} path={route.path}>
            <Page route={route} contentPath={route.data} />
          </Route>
        );
      })}
    </Switch>
  );
};

export default App;
