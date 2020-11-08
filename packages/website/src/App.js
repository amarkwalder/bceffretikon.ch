import React from "react";
import { Root, Routes } from "react-static";
import { Router } from "components/Router";

import Loading from "./components/Loading";
import Site from "./templates/Site";

const preview = process.env.RUNTIME_ENV === "preview";

const App = () => {
  return (
    <Root>
      <React.Suspense fallback={<Loading message="Loading Data" />}>
        <Router>
          {preview && <Routes path="/github/authorizing" />}
          <Site default />
        </Router>
      </React.Suspense>
    </Root>
  );
};

export default App;
