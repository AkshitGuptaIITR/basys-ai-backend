const { Router } = require("express");
const { login } = require("../controllers/authController");
const { loginLimiter } = require("../middleware/rateLimitMiddleware");

const router = Router();

router.post("/login", loginLimiter, login);

module.exports = router;
