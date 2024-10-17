const { Router } = require("express");
const {
  createAuthorizationRequest,
  getAllAuthorizationRequests,
} = require("../controllers/authorizationRequestsController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = Router();

router.post(
  "/createAuthorizationRequest/:patientId",
  verifyToken,
  createAuthorizationRequest
);
router.get(
  "/getAllAuthorizationRequests",
  verifyToken,
  getAllAuthorizationRequests
);

module.exports = router;
