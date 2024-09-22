import Router from "express";
import {
  applicationFrom,
  getAllStudentList,
  getStudentById,
  isFirstSignIn,
  signup,
} from "../controller/college.controller";
import { authenticateToken } from "../../middlewares/verifyGoogleToken";

const collegeRoutes = Router();

collegeRoutes.get("/is_first_signin", authenticateToken, isFirstSignIn);

collegeRoutes.post("/google_login", authenticateToken, signup);

collegeRoutes.post("/applicationForm", authenticateToken, applicationFrom);

// student routes
collegeRoutes.get("/get_students", authenticateToken, getAllStudentList);
collegeRoutes.get("/get_student/:id", authenticateToken, getStudentById);

// general routes
// collegeRoutes.get("/get_colleges", authenticateToken, getAllCollegeList);

export default collegeRoutes;
