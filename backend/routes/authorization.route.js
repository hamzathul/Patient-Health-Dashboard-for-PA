import express from "express";
import { createAuthorization, getAuthorization } from "../controllers/authorization.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createAuthorization);
router.get("/:id", protectRoute, getAuthorization);  

export default router;
