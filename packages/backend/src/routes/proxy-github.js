const { AES, enc } = require("crypto-js");
const axios = require("axios");

const { CSRF_TOKEN_KEY } = require("../constants");

exports.ApiProxyRoute = (signingKey) => (req, res) => {
  if (!signingKey) {
    const message = "The API Proxy was created without a signing key.";
    console.error(message);
    return res.status(500).json({ message });
  }

  console.log("ApiProxyRoute", req.body);

  const { headers, ...data } = JSON.parse(req.body);

  // Parse out the amalgamated token
  const token = (req.headers["authorization"] || "").split(" ")[1] || null;

  const expectedCSRFToken = req.cookies && req.cookies[CSRF_TOKEN_KEY];

  if (token && expectedCSRFToken) {
    const decryptedToken = AES.decrypt(token, signingKey).toString(enc.Utf8);

    const [csrfToken, authToken] = decryptedToken.split(".");

    if (csrfToken === expectedCSRFToken) {
      axios({
        ...data,
        headers: {
          ...headers,
          Authorization: "token " + authToken,
        },
      })
        .then((resp) => {
          res.status(resp.status).json(resp.data);
        })
        .catch((err) => {
          res.status(err.response.status).json(err.response.data);
        });
    } else {
      res.status(401).json({ message: "Invalid CSRF Token: Please try again" });
    }
  } else {
    res.status(401).json({ message: "Missing Credentials: Please try again" });
  }
};
