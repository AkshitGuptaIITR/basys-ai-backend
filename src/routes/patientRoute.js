const { Router } = require("express");
const {
  createPatient,
  getAllPatients,
} = require("../controllers/patientController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = Router();

router.post("/createPatient", verifyToken, createPatient);
router.get("/getAllPatients", verifyToken, getAllPatients);

module.exports = router;
