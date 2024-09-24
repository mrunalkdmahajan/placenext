
import company from "../models/company";
import { Request, Response } from "express";

export const isFirstSignIn = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    const existingCompany = await company.findOne({ googleId: user.uid });

    return res.status(200).json({ success: true, isFirstSignIn: !existingCompany });
  } catch (error: any) {
    console.log("Error in isFirstSignIn", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const applicationFrom = async (req: Request, res: Response) => {
  
