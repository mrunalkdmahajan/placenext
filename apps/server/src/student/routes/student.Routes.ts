import { Router } from "express";
import { authenticateToken } from "../../middlewares/verifyGoogleToken";
import { isFirstSignIn, signup } from "../controller/auth";

const studentRoutes = Router();

studentRoutes.post("/google_login", authenticateToken, signup);

studentRoutes.get("/is_first_signin", authenticateToken, isFirstSignIn);

export default studentRoutes;
