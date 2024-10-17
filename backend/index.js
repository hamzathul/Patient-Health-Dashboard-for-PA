import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./db/connectDB.js";
import patientRoutes from "./routes/patient.route.js";
import authorizationRoutes from './routes/authorization.route.js'
// import { seedPatients } from "./seeder.js";
// seedPatients()


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const corsURI = "http://localhost:5173";
app.use(cors({ origin: corsURI, credentials: true })); //This middleware enables Cross-Origin Resource Sharing (CORS), which allows or restricts requests from other domains

app.use(express.json()); // allows to parse incoming requests : req.body

app.use("/api/patient", patientRoutes);
app.use("/api/authorization", authorizationRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
