import React, { useEffect, useState } from "react";
import { useGithubClient } from "react-tinacms-github";

const preview = process.env.REACT_APP_RUNTIME_ENV === "preview";

export const useCheckLogin = () => {
  const githubClient = useGithubClient();

  const [loggedIn, setLoggedIn] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (preview) {
      githubClient
        .isAuthenticated()
        .then((user) => {
          if (user) {
            setLoggedIn(true);
            return;
          }

          githubClient
            .authenticate()
            .then(() => githubClient.isAuthenticated())
            .then((user) => setLoggedIn(user !== undefined))
            .catch((error) => setError(error));
        })
        .catch((error) => setError(error));
    }
  }, [githubClient]);

  if (!preview) {
    return { loggedIn: false, error: undefined };
  }

  return { loggedIn, error };
};

export const CheckLogin = ({ children }) => {
  const result = useCheckLogin();

  if (!preview) return <>{children}</>;
  if (!result.loggedIn) return <></>;
  return <>{children}</>;
};

export default useCheckLogin;
