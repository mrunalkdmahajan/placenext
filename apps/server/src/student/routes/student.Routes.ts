import { Router } from "express";
import { authenticateToken } from "../../middlewares/verifyGoogleToken";
import { signup } from "../controller/auth";

const studentRoutes = Router();

studentRoutes.post("/google_login", authenticateToken, signup);

export default studentRoutes;
