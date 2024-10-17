const { Router } = require("express");
const { login, getLoggedInUser } = require("../controllers/authController");
const { loginLimiter } = require("../middleware/rateLimitMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");

const router = Router();

router.post("/login", loginLimiter, login);
router.get("/getLoggedInUser", verifyToken, getLoggedInUser);

module.exports = router;
