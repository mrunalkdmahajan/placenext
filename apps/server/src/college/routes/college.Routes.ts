import Router from "express";
import {
  applicationFrom,
  isFirstSignIn,
  signup,
} from "../controller/college.controller";
import { authenticateToken } from "../../middlewares/verifyGoogleToken";

const collegeRoutes = Router();

collegeRoutes.get("/is_first_signin", authenticateToken, isFirstSignIn);

collegeRoutes.post("/google_login", authenticateToken, signup);

collegeRoutes.post("/applicationForm", authenticateToken, applicationFrom);

// general routes
// collegeRoutes.get("/get_colleges", authenticateToken, getAllCollegeList);

export default collegeRoutes;
