const mongoose = require("mongoose");

const authorizationRequestSchema = new mongoose.Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    treatmentType: {
      type: String,
      required: true,
    },
    insurancePlan: {
      type: String,
      required: true,
    },
    dateOfService: {
      type: Date,
      required: true,
    },
    diagnosisCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
    },
    doctorNotes: {
      type: String,
    },
  },
  { timestamps: true }
);

const AuthorizationRequest = mongoose.model(
  "AuthorizationRequest",
  authorizationRequestSchema
);
module.exports = AuthorizationRequest;
