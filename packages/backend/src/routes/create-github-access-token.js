const { AES } = require("crypto-js");
const axios = require("axios");

const { v4 } = require("uuid");
const uuidv4 = v4;
const qs = require("qs");
const { serialize } = require("cookie");

const { CSRF_TOKEN_KEY } = require("../constants");

exports.AuthHandlerRoute = (clientId, secret, signingKey) => (req, res) => {
  if (!signingKey) {
    const message = "CreateAuthHandler was called without a signing key.";
    console.error(message);
    return res.status(500).json({ message });
  }

  createAccessToken(clientId, secret, req.query.code, req.query.state).then(
    (tokenResp) => {
      const { access_token, error } = qs.parse(tokenResp.data);

      console.log("AuthHandlerRoute", access_token, error);

      if (error) {
        res.status(400).json({ error });
      } else {
        // Generate the csrf token
        const csrfToken = uuidv4();

        // Sign the amalgamated token
        const unsignedToken = `${csrfToken}.${access_token}`;
        const signedToken = AES.encrypt(unsignedToken, signingKey).toString();

        // Set the csrf token as an httpOnly cookie
        res.setHeader(
          "Set-Cookie",
          serialize(CSRF_TOKEN_KEY, csrfToken, {
            path: "/",
            httpOnly: true,
          })
        );

        // Return the amalgamated token
        res.status(200).json({ signedToken });
      }
    }
  );
};

const createAccessToken = (clientId, clientSecret, code, state) => {
  return axios.post(
    `https://github.com/login/oauth/access_token`,
    qs.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      state,
    })
  );
};
