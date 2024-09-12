import Router from "express";
import { isFirstSignIn, isFirstSignInWithEmail } from "../controller/auth";

const collegeRoutes = Router();

collegeRoutes.get("/is_first_signin", isFirstSignIn);

collegeRoutes.get("/is_first_signin_with_email", isFirstSignInWithEmail);

export default collegeRoutes;
