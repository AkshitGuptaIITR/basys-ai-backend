const catchAsync = require("../helper/catchAsync");
const utility = require("../helper/utility");
const Patient = require("../model/patientModel");

const createPatient = catchAsync(async (req, res) => {
  const { name, age, medicalHistory, healthRecords, condition, contactNumber } =
    req.body;
  const { _id: user_id } = req.user;

  if (
    typeof name !== "string" ||
    typeof age !== "number" ||
    !Array.isArray(medicalHistory) ||
    !Array.isArray(healthRecords) ||
    typeof contactNumber !== "number" ||
    typeof condition !== "string"
  ) {
    return utility.serverResponse(res, 400, { message: "Invalid Request" });
  }

  const patient = await Patient.create({
    provider: user_id,
    name,
    age,
    medicalHistory,
    healthRecords,
    contactNumber,
    condition,
  });

  return utility.serverResponse(res, 201, {
    message: "Patient created successfully",
    patient: patient?._doc,
  });
});

const getAllPatients = catchAsync(async (req, res) => {
  const patients = await Patient.find({}).populate("provider", "name");

  return utility.serverResponse(res, 200, { data: patients });
});

module.exports = {
  createPatient,
  getAllPatients,
};
