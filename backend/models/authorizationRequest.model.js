import mongoose from "mongoose";

const authorizationRequestSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  treatmentType: { type: String, required: true },
  insurancePlan: { type: String, required: true },
  dateOfService: { type: Date, required: true },
  diagnosisCode: { type: String, required: true },
  doctorNotes: { type: String },
  authStatus: { type: String, default: "pending" }, // pending/approved/denied
},{timestamps:true});

export const AuthorizationRequest = mongoose.model(
  "AuthorizationRequest",
  authorizationRequestSchema
);
