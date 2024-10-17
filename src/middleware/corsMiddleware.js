const cors = require("cors");
const { CLIENT_URL } = require("../config");
const utility = require("../helper/utility");

const allowedOrigins = [CLIENT_URL];

const restrictedCors = (req, res, next) => {
  const requestedUrl = req.url;

  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        const errorMessage = origin
          ? `Not allowed by CORS for origin: ${origin}, requested URL: ${requestedUrl}`
          : `Not allowed by CORS. No 'Origin' header provided, requested URL: ${requestedUrl}`;

        res.blockSentryTracking = true;
        callback(
          utility.serverResponse(res, 401, {
            message: errorMessage,
          }),
          false
        );
      }
    },
  })(req, res, next);
};

module.exports = { restrictedCors };
