import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseAdmin";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    const decodedUser = await admin.auth().verifyIdToken(token);
    // @ts-ignore
    req.user = decodedUser;
    // @ts-ignore

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ error: "Invalid Token" });
  }
};
