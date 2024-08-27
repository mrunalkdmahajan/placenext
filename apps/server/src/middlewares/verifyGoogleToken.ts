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
  console.log("Token:", token);

  try {
    const decodedUser = await admin.auth().verifyIdToken(token);
    if (decodedUser.exp * 1000 < Date.now()) {
      // Token has expired

      return res.status(403).json({ error: "Token Expired" });
    }

    // @ts-ignore
    req.user = decodedUser;
    next();
  } catch (error: any) {
    if (error.code === "auth/id-token-expired") {
      // Refresh token logic here
      console.error("Token expired, need to refresh");
    } else {
      console.error("Error verifying token:", error);
      return res.status(403).json({ error: "Invalid Token" });
    }
  }
};
