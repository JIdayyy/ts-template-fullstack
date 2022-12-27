import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"] as string;
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded !== "object") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
