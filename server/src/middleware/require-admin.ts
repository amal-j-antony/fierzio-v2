import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";

export const requireAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  if (!req.auth?.user) {
    next(new AppError(401, "Authentication required."));
    return;
  }

  if (req.auth.user.globalRole !== "ADMIN") {
    logger.warn(
      {
        userId: req.auth.user.id,
        method: req.method,
        route: req.path,
      },
      "Authorization denied",
    );
    next(new AppError(403, "Forbidden."));
    return;
  }

  next();
};
