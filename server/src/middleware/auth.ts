import { getAuth } from "@clerk/express";
import type { NextFunction, Request, Response } from "express";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  req.userId = userId; // now any controller can simply do: const userId = req.userId;

  next();
};
