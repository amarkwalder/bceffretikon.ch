import React from "react";

import { useGithubAuthRedirect } from "react-tinacms-github";

export const Authorizing = () => {
  useGithubAuthRedirect();
  return <h2>Authorizing with GitHub, please wait...</h2>;
};

export default Authorizing;
