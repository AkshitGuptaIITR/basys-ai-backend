const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    age: {
      type: Number,
      required: [true, "Please enter age"],
    },
    medicalHistory: [
      {
        condition: String,
        treatment: String,
        medication: String,
        date: Date,
      },
    ],
    healthRecords: [
      {
        labResults: String,
        treatmentPlan: String,
        diagnosisCode: String,
        date: Date,
      },
    ],
    provider: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
