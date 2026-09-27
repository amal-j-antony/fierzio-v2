import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { clientOrigins } from "./config/env.js";
import { validateMutatingOrigin } from "./middleware/csrf-origin.js";
import { errorHandler } from "./middleware/error-handler.js";
import { requestLogger } from "./middleware/request-logger.js";
import { apiRouter } from "./routes/index.js";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: clientOrigins,
      credentials: true,
    }),
  );
  app.use(cookieParser());
  app.use(requestLogger);
  app.use(express.json({ limit: "1mb" }));
  app.use(validateMutatingOrigin);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(apiRouter);
  app.use(errorHandler);

  return app;
};
