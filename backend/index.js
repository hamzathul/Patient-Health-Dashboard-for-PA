import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path'

import { connectDB } from "./db/connectDB.js";
import patientRoutes from "./routes/patient.route.js";
import authorizationRoutes from './routes/authorization.route.js'
import authRoutes from './routes/auth.route.js'
import job from "./cron.js";

job.start()
// import { seedPatients } from "./seeder.js";
// seedPatients()

const __dirname = path.resolve()

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const corsURI = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: corsURI, credentials: true })); //This middleware enables Cross-Origin Resource Sharing (CORS), which allows or restricts requests from other domains

app.use(express.json()); // allows to parse incoming requests : req.body
app.use(cookieParser()); // to parse the incoming cookies from req.cookies

app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/authorization", authorizationRoutes);

// For Deployement
app.use(express.static(path.join(__dirname, "frontend/dist")))
app.get("*", (req, res)=>{
  res.sendFile(path.join(__dirname,"frontend/dist","index.html"))
})

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
