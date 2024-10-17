const config = require("../config");
const { CONSTANTS } = require("../constants");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return { message, status: 400 };
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/);
  const message = `Duplicate key value: ${value[0]}. Please use different value`;
  return { message, status: 400 };
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((det) => {
    return det.message;
  });
  const message = `Invalid input data. ${errors.join(". ")}`;
  return { message, status: 400 };
};

const handleJWTError = () => {
  return {
    message: "Invalid Token. Please Login Again",
    status: 401,
  };
};

const handleJWTExpired = () => {
  return {
    message: "Token Expired. Please Login Again",
    status: 401,
  };
};

const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err, message: err.message, name: err.name };

  if (error.name === "CastError") {
    error = handleCastErrorDB(error);
  }
  if (error.code === 11000) {
    error = handleDuplicateFieldsDB(error);
  }
  if (error.name === "ValidationError") {
    error = handleValidationErrorDB(error);
  }
  if (error.name === "JsonWebTokenError") {
    error = handleJWTError();
  }
  if (error.name === "TokenExpiredError") {
    error = handleJWTExpired();
  }

  res.status(error?.status || 500).json({
    status: "InternalError",
    message: error?.message || "Something went wrong",
    stack:
      config.ENVIRONMENT === CONSTANTS.ENVIRONMENTS.DEVELOPMENT
        ? err.stack
        : {},
  });
};

module.exports = { globalErrorHandler };
