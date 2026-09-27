import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { wasDbErrorLogged } from "../db/with-db-operation.js";
import { isAppError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (isAppError(error)) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
        code: error.code,
      },
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      error: {
        message: "Validation failed.",
        code: "VALIDATION_ERROR",
      },
    });
    return;
  }

  if (!wasDbErrorLogged(error)) {
    logger.error(
      {
        err: error,
        method: req.method,
        route: req.route?.path ?? req.path,
        statusCode: 500,
        userId: req.auth?.user.id,
      },
      "Unhandled request error",
    );
  }

  res.status(500).json({
    error: {
      message: "Internal server error.",
    },
  });
};
