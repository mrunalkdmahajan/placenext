import { Router } from "express";
import verifyFaculty from "../middleware/verifyFaculty";
import { facultyLogin, selectCollege } from "../controller/faculty.controller";
import { authenticateToken } from "../../middlewares/verifyGoogleToken";

const facultyRoutes = Router();

facultyRoutes.post("/login", facultyLogin);
facultyRoutes.post("/select-college", authenticateToken, selectCollege);

export default facultyRoutes;
