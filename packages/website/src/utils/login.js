import React, { useEffect, useState } from "react";

const preview = process.env.RUNTIME_ENV === "preview";

export const useCheckLogin = (githubClient) => {
  //const githubClient = useGithubClient();
  const [loggedIn, setLoggedIn] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (!preview) return;

    const token = localStorage.getItem("tinacms-github-token") || null;

    const authenticate = () => {
      githubClient
        .authenticate()
        .then(() => githubClient.isAuthenticated())
        .then((user) => setLoggedIn(user !== undefined))
        .catch((error) => setError(error));
    };

    if (token) {
      githubClient
        .isAuthenticated()
        .then((user) => {
          if (user) setLoggedIn(true);
          else authenticate();
        })
        .catch((error) => setError(error));
    } else {
      authenticate();
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
