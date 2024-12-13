import { Router } from "express";
import { authenticateToken } from "../middlewares/verifyGoogleToken";
import studentRoutes from "../student/routes/student.Routes";
import collegeRoutes from "../college/routes/college.Routes";
import companyRoutes from "../company/routes/company.Routes";
import { app } from "firebase-admin";
import facultyRoutes from "../college/routes/faculty.Routes";

const appRoutes = Router();

appRoutes.get("/", (req, res) => {
  return res.send("hello world");
});

// student routes

appRoutes.use("/student", studentRoutes);
appRoutes.use("/college", collegeRoutes);
appRoutes.use("/faculty", facultyRoutes);
appRoutes.use("/company", companyRoutes);

export default appRoutes;
