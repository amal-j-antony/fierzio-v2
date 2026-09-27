import { logger } from "../utils/logger.js";

const dbErrorLoggedSymbol = Symbol.for("fierzio.dbErrorLogged");

export const wasDbErrorLogged = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  Boolean((error as Record<symbol, unknown>)[dbErrorLoggedSymbol]);

export const withDbOperation = async <T>(
  operation: string,
  context: Record<string, unknown>,
  fn: () => Promise<T>,
): Promise<T> => {
  try {
    return await fn();
  } catch (err) {
    if (typeof err === "object" && err !== null) {
      Object.defineProperty(err, dbErrorLoggedSymbol, {
        value: true,
        enumerable: false,
        configurable: true,
      });
    }

    logger.error({ err, operation, ...context }, "Database operation failed");
    throw err;
  }
};
