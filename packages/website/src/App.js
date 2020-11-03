import React from "react";
import { Root, Routes } from "react-static";
import { Router } from "components/Router";

import Loading from "./components/Loading";
import Site from "./templates/Site";

const preview = true; //process.env.RUNTIME_ENV === "preview";

const App = () => {
  return (
    <Root>
      <React.Suspense fallback={<Loading />}>
        <Router>
          {preview && <Routes path="/github/authorizing" />}
          <Site path="*" />
        </Router>
      </React.Suspense>
    </Root>
  );
};

export default App;
