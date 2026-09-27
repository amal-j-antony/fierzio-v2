import type { NextFunction, Request, Response } from "express";
import { clientOrigins } from "../config/env.js";
import { AppError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";

const mutatingMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export const validateMutatingOrigin = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  if (!mutatingMethods.has(req.method)) {
    next();
    return;
  }

  const origin = req.get("origin");
  if (!origin) {
    next();
    return;
  }

  if (!clientOrigins.includes(origin)) {
    logger.warn(
      {
        method: req.method,
        route: req.path,
        origin,
      },
      "CSRF origin rejected",
    );
    next(new AppError(403, "Forbidden."));
    return;
  }

  next();
};
