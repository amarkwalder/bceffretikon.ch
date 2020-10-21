const { AES, enc } = require("crypto-js");
const AWS = require("aws-sdk");

const { CSRF_TOKEN_KEY } = require("../constants");

exports.PipelineHandlerRoute = (signingKey, awsCodePipeline) => (req, res) => {
  if (!signingKey) {
    const message = "The Pipeline Handler was created without a signing key.";
    console.error(message);
    return res.status(500).json({ message });
  }
  if (!awsCodePipeline) {
    const message =
      "The Pipeline Handler was created without a AWS Code Pipeline.";
    console.error(message);
    return res.status(500).json({ message });
  }

  // Parse out the amalgamated token
  const token = (req.headers["authorization"] || "").split(" ")[1] || null;

  const expectedCSRFToken = req.cookies && req.cookies[CSRF_TOKEN_KEY];

  if (token && expectedCSRFToken) {
    const decryptedToken = AES.decrypt(token, signingKey).toString(enc.Utf8);
    const [csrfToken] = decryptedToken.split(".");

    if (csrfToken === expectedCSRFToken) {
      var codepipeline = new AWS.CodePipeline();
      codepipeline.getPipelineState({ name: awsCodePipeline }, function (
        err,
        data
      ) {
        if (err) {
          res.status(200).json(err);
          return;
        }

        const result = [];
        const stageStates = data?.stageStates || [];
        stageStates.forEach((stageState) => {
          const actionStates = stageState.actionStates || [];
          actionStates.forEach((actionState) => {
            result.push({
              stageName: stageState?.stageName || "n/a",
              actionName: actionState?.actionName || "n/a",
              status: actionState?.latestExecution?.status || "n/a",
              entityUrl: actionState?.entityUrl,
            });
          });
        });
        res.status(200).json(result);
      });
    } else {
      res.status(401).json({ message: "Invalid CSRF Token: Please try again" });
    }
  } else {
    res.status(401).json({ message: "Missing Credentials: Please try again" });
  }
};
