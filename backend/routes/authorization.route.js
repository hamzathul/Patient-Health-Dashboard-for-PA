import express from "express";
import { createAuthorization, getAuthorization } from "../controllers/authorization.controller.js";

const router = express.Router();

router.post("/", createAuthorization);
// router.get("/:id", getAuthorization );  /////////////////////////////////////////////

export default router;
