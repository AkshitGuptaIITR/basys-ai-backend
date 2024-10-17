const catchAsync = require("../helper/catchAsync");
const utility = require("../helper/utility");
const AuthorizationRequest = require("../model/authorizationRequestsModel");
const Patient = require("../model/patientModel");

const createAuthorizationRequest = catchAsync(async (req, res) => {
  const {
    treatmentType,
    insurancePlan,
    dateOfService,
    diagnosisCode,
    status,
    doctorNotes,
  } = req.body;
  const { patientId } = req.params;
  const { _id: user_id } = req.user;

  if (!treatmentType || !insurancePlan || !dateOfService || !diagnosisCode) {
    return utility.serverResponse(res, 400, { message: "Invalid Request" });
  }

  const patientRecord = await Patient.findById(patientId);

  if (!patientRecord) {
    return utility.serverResponse(res, 404, {
      message: "Patient not found",
    });
  }

  const authorizationRequest = await AuthorizationRequest.create({
    patient: patientRecord?._id,
    provider: user_id,
    treatmentType,
    insurancePlan,
    dateOfService,
    diagnosisCode,
    status,
    doctorNotes,
  });

  return utility.serverResponse(res, 201, {
    message: "Authorization request created successfully",
    authorizationRequest: authorizationRequest?._doc,
  });
});

const getAllAuthorizationRequests = catchAsync(async (req, res) => {
  const authorizationRequests = await AuthorizationRequest.find({})
    .populate("patient", "name")
    .populate("provider", "name");

  return utility.serverResponse(res, 200, {
    message: "Authorization requests fetched successfully",
    data: authorizationRequests,
  });
});

module.exports = {
  createAuthorizationRequest,
  getAllAuthorizationRequests,
};
