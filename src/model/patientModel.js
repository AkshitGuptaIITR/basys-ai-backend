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
    condition: {
      type: String,
      required: [true, "Please enter condition"],
    },
    contactNumber: {
      type: Number,
      min: [1000000000, "Phone number must be 10 digits"],
      max: [9999999999, "Phone number must be 10 digits"],
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
