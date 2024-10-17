const jwt = require("jsonwebtoken");
const config = require("../config");
const { CONSTANTS } = require("../constants");

module.exports = {
  serverResponse: (res, status, body) => {
    return res.status(status).json({
      status: status >= 200 && status <= 299 ? "success" : "fail",
      ...body,
    });
  },

  generateToken: function (userId) {
    const payload = {
      id: userId,
    };
    const accessToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: CONSTANTS.JWT_ACCESS_TOKEN_EXPIRY,
    });
    return accessToken;
  },

  getCookieOptions: function () {
    return {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: config.ENVIRONMENT === CONSTANTS.ENVIRONMENTS.PRODUCTION, // This ensures the cookie is sent only over HTTPS for production environment
      sameSite: "Strict", // or 'Strict' or 'None or "Lax"
    };
  },
};
