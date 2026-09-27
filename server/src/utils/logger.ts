import pino from "pino";
import { env } from "../config/env.js";
import { getRequestId } from "./request-context.js";

const isProduction = env.NODE_ENV === "production";
const isTest = env.NODE_ENV === "test";

export const logger = pino({
  level: isTest ? "silent" : env.LOG_LEVEL,
  base: { service: "fierzio-api" },
  redact: {
    paths: [
      "password",
      "passwordHash",
      "currentPassword",
      "newPassword",
      "passwordConfirmation",
      "token",
      "accessToken",
      "refreshToken",
      "authorization",
      "cookie",
      "*.password",
      "*.passwordHash",
      "*.currentPassword",
      "*.newPassword",
      "*.passwordConfirmation",
      "*.token",
      "*.accessToken",
      "*.refreshToken",
      "*.authorization",
      "*.cookie",
      "req.headers.authorization",
      "req.headers.cookie",
      "res.headers['set-cookie']",
    ],
    censor: "[Redacted]",
  },
  mixin() {
    const requestId = getRequestId();
    return requestId ? { requestId } : {};
  },
  transport:
    !isProduction && !isTest
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,
});

export const createModuleLogger = (module: string) => logger.child({ module });
