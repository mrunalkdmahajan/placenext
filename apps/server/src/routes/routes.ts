import { Router } from "express";
import { authenticateToken } from "../middlewares/verifyGoogleToken";
import studentRoutes from "../student/routes/student.Routes";
import collegeRoutes from "../college/routes/college.Routes";

const appRoutes = Router();

appRoutes.get("/", (req, res) => {
  return res.send("hello world");
});

// student routes

appRoutes.use("/student", studentRoutes);
appRoutes.use("/college", collegeRoutes);

export default appRoutes;
