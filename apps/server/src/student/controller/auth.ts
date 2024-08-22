import { Request, Response } from "express";

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
