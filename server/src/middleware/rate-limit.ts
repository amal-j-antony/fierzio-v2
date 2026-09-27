import type { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { logger } from "../utils/logger.js";

const createRateLimitHandler =
  (message: string) =>
  (req: Request, res: Response): void => {
    logger.warn(
      {
        method: req.method,
        route: req.path,
      },
      "Rate limit exceeded",
    );
    res.status(429).json({ error: { message } });
  };

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: createRateLimitHandler("Too many requests. Please try again later."),
});

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: createRateLimitHandler("Too many login attempts. Please try again later."),
});
