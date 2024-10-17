const catchAsync = require("../helper/catchAsync");
const utility = require("../helper/utility");
const User = require("../model/userModel");

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return utility.serverResponse(res, 401, { message: "Invalid Credentials" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return utility.serverResponse(res, 401, {
      message: "Incorrect email or password",
    });
  }

  const token = utility.generateToken(user._id);

  res.cookie("access_token", token, utility.getCookieOptions());

  delete user?._doc?.password;

  return utility.serverResponse(res, 200, user?._doc);
});

module.exports = {
  login,
};
