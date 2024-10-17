const config = require("../config");
const catchAsync = require("../helper/catchAsync");
const User = require("../model/userModel");

const verifyToken = catchAsync(async (req, res, next) => {
  const { access_token } = req.cookies || {};

  if (!access_token) {
    return utility.serverResponse(res, 401, {
      message: "Access token not found",
    });
  }

  const decoded = jwt.verify(access_token, config.JWT_SECRET);

  if (!decoded?.id) {
    return utility.serverResponse(res, 401, {
      message: "Invalid access token",
    });
  }

  const user = await User.findById(decoded?.id);

  if (!user) {
    return utility.serverResponse(res, 401, {
      message: "Invalid access token",
    });
  }

  req.user = user;
  next();
});

module.exports = { verifyToken };
