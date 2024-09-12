import { Request, Response } from "express";
import College from "../models/college";

export const isFirstSignIn = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    const student = await College.findOne({ googleId: user.uid });

    return res.status(200).json({ success: true, isFirstSignIn: !student });
  } catch (error: any) {
    console.log("Error in isFirstSignIn", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const isFirstSignInWithEmail = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    const student = await College.findOne({ email: user.email });

    return res.status(200).json({ success: true, isFirstSignIn: !student });
  } catch (error: any) {
    console.log("Error in isFirstSignIn", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
