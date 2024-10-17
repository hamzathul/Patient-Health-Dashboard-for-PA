import express from "express";
import { getAllPatients, getPatientById } from "../controllers/patient.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/all", protectRoute, getAllPatients);
router.get("/:id", protectRoute, getPatientById);

export default router