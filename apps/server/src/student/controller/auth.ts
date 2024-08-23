import { Request, Response } from "express";
import admin from "../../config/firebaseAdmin";
import Student from "../models/student";

export const signup = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    res.status(200).json({ success: true, user });
  } catch (error: any) {
    console.log("Error in signup", error.message);

    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const isFirstSignIn = async (req: Request, res: Response) => {
  try {
    // here we will check if the user is signing in for the first time
    // the main logic is the student model should exsist having this id as jwt id
    // if the student model does not exsist then we will return true
    // @ts-ignore
    const user = req.user;

    const student = await Student.findOne({ googleId: user.uid });
    if (!student) {
      return res.status(200).json({ success: true, isFirstSignIn: true });
    }
  } catch (error: any) {
    console.log("Error in isFirstSignIn", error.message);

    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
