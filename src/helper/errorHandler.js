const config = require("../config");
const { CONSTANTS } = require("../constants");

const globalErrorHandler = (err, req, res, next) => {
  res.status(500).json({
    status: "InternalError",
    message: "Something went wrong",
    stack:
      config.ENVIRONMENT === CONSTANTS.ENVIRONMENTS.DEVELOPMENT
        ? err.stack
        : {},
  });
};

module.exports = { globalErrorHandler };
