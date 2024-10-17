const { rateLimit } = require("express-rate-limit");

const LIMITER_ERROR_MESSAGE = {
  GLOBAL: "Too many requests. Please try again in a few minutes.",
  GENERAL: "Too many attempts. Please try again after 15 minutes.",
  LOGIN: "Too many login attempts. Please try again after 15 minutes.",
};

const getLimiterProperties = (max, message) => ({
  windowMs: 1 * 60 * 60 * 1000,
  max: max || 200, // limit each IP to max/100 requests per windowMs
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    return utility.rateLimitErrorResponse(res, {
      message: message || LIMITER_ERROR_MESSAGE.GENERAL,
    });
  },
});

// Global rate limiter that will be applied to all routes.
const globalLimiter = rateLimit(
  getLimiterProperties(200, LIMITER_ERROR_MESSAGE.GLOBAL)
);

const loginLimiter = rateLimit(
  getLimiterProperties(10, LIMITER_ERROR_MESSAGE.LOGIN)
);

module.exports = {
  globalLimiter,
  loginLimiter,
};
