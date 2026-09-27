import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../auth/jwt.js";
import { getCurrentUser } from "../auth/auth.service.js";
import { env } from "../config/env.js";
import { AppError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  let reason = "invalid_token";

  try {
    const token = req.cookies?.[env.ACCESS_TOKEN_COOKIE_NAME];
    if (!token || typeof token !== "string") {
      reason = "missing_token";
      throw new AppError(401, "Authentication required.");
    }

    const payload = verifyAccessToken(token);
    const user = await getCurrentUser(payload.sub);
    req.auth = { user };
    next();
  } catch (error) {
    const appError =
      error instanceof AppError ? error : new AppError(401, "Authentication required.");

    logger.warn(
      {
        method: req.method,
        route: req.path,
        reason,
      },
      "Authentication failed",
    );

    next(appError);
  }
};
