import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/connectDB.js";
import patientRoutes from './routes/patient.route.js'
// import authorizationRoutes from './routes/authorization.route.js'
// import { seedPatients } from "./seeder.js";
// seedPatients()

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()) // allows to parse incoming requests : req.body

app.use("/api/patient", patientRoutes);
// app.use("/api/authorization", authorizationRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
