import express from "express";
import { getAllPatients, getPatientById } from "../controllers/patient.controller.js";

const router = express.Router();

router.get("/all", getAllPatients);
router.get('/:id', getPatientById)

export default router