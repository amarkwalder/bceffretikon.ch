import React from "react";
import { Root } from "react-static";
import { Router } from "components/Router";

import Authorizing from "./components/Authorizing";
import Loading from "./components/Loading";
import Site from "./templates/Site";

const preview = process.env.RUNTIME_ENV === "preview";

const App = () => {
  return (
    <Root>
      <React.Suspense fallback={<Loading />}>
        <Router>
          {preview && <Authorizing path="/github/authorizing" />}
          <Site path="*" />
        </Router>
      </React.Suspense>
    </Root>
  );
};

export default App;
