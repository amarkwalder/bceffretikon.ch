const path = require("path");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = 3000;

const app = express();

const apiProxy = createProxyMiddleware("http://localhost:4000");
app.use("/api", apiProxy);

const staticPath = "dist";
app.use(express.static(staticPath));

const server = app.listen(PORT);
console.log("Listening on port " + PORT);
