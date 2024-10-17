import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    condition: { type: String, required: true },
    medicalHistory: { type: [String] }, // Array of past treatments/medications
    treatmentPlan: { type: String },
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", PatientSchema)