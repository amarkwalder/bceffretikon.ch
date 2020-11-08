import React from "react";

import { useGithubAuthRedirect } from "react-tinacms-github";
import Loading from "../components/Loading";

export const Authorizing = () => {
  useGithubAuthRedirect();
  return <Loading message="Authorizing with GitHub" />;
};

export default Authorizing;
