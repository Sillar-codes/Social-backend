import { NextFunction, Response } from "express";
import { JWT_SECRET } from "../system/config";
import jwt from "jsonwebtoken";
import { AuthRequest, UserInToken } from "../types/user";

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      res.status(401).json({ error: "No token found" });
      return;
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        res.sendStatus(400).json({ error: err.message });
        return;
      }
      req.user = user as UserInToken;
      next();
    });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
