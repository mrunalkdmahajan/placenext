import { Router } from "express";
import verifyFaculty from "../middleware/verifyFaculty";
import { facultyLogin } from "../controller/faculty.controller";

const facultyRoutes = Router();

facultyRoutes.post("/login", facultyLogin);
