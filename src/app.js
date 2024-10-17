const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { globalLimiter } = require("./middleware/rateLimitMiddleware");
const config = require("./config");
const { CONSTANTS } = require("./constants");

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "same-site" },
  })
);

app.use(function (req, res, next) {
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, X-Requested-With, Content-Type, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  }
  next();
});

app.use(cookieParser());

// IP level rate-limiting middleware to limit number of requests to the app
app.use(globalLimiter);

// body-parser middleware to parse JSON data sent in the request body.
app.use(express.json());

// morgan middleware to log HTTP requests
if (config.ENVIRONMENT === CONSTANTS.ENVIRONMENTS.DEVELOPMENT) {
  app.use(morgan("dev"));
}

module.exports = app;
