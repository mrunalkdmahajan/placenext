import { Router } from "express";
import { authenticateToken } from "../middlewares/verifyGoogleToken";
import studentRoutes from "../student/routes/student.Routes";

const appRoutes = Router();

appRoutes.get("/", (req, res) => {
  return res.send("hello world");
});

// student routes

appRoutes.use("/student", studentRoutes);
export default appRoutes;
