require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const express = require("express");

const { AuthHandlerRoute } = require("./routes/create-github-access-token");
const { ApiProxyRoute } = require("./routes/proxy-github");
const { PipelineHandlerRoute } = require("./routes/pipeline");

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  SIGNING_KEY,
  AWS_CODE_PIPELINE,
} = require("./constants");

const app = express();
app.use(bodyParser.text());
app.use(cookieParser());

app.use("/api/proxy-github", ApiProxyRoute(SIGNING_KEY));

app.use(
  "/api/create-github-access-token",
  AuthHandlerRoute(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SIGNING_KEY)
);

app.use("/api/pipeline", PipelineHandlerRoute(SIGNING_KEY, AWS_CODE_PIPELINE));

console.log("Listening on http://localhost:4000");
app.listen(4000);
