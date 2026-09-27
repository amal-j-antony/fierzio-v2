import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.js";
import { runWithRequestContext } from "../utils/request-context.js";

const requestIdHeader = "x-request-id";

const readIncomingRequestId = (req: Request): string | undefined => {
  const value = req.get(requestIdHeader);
  return value && value.trim().length > 0 ? value.trim() : undefined;
};

const resolveRoute = (req: Request): string =>
  (req.originalUrl ?? req.path).split("?")[0];

const shouldSkipLogging = (req: Request): boolean => req.path === "/health";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const requestId = readIncomingRequestId(req) ?? randomUUID();
  req.requestId = requestId;
  res.setHeader(requestIdHeader, requestId);

  const start = process.hrtime.bigint();

  res.on("finish", () => {
    if (shouldSkipLogging(req)) {
      return;
    }

    const duration = Number(process.hrtime.bigint() - start) / 1_000_000;
    const statusCode = res.statusCode;
    const level = statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";

    logger[level](
      {
        requestId,
        method: req.method,
        route: resolveRoute(req),
        statusCode,
        duration: Number(duration.toFixed(2)),
      },
      "Request completed",
    );
  });

  runWithRequestContext({ requestId }, () => {
    next();
  });
};
