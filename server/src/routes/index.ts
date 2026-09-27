import { Router } from "express";
import {
  changePasswordHandler,
  forgotPasswordHandler,
  loginHandler,
  logoutHandler,
  meHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
} from "../auth/auth.controller.js";
import {
  changePasswordBodySchema,
  forgotPasswordBodySchema,
  loginBodySchema,
  registerBodySchema,
  resetPasswordBodySchema,
} from "../auth/auth.validation.js";
import { listUsersHandler } from "../admin/admin.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/require-admin.js";
import { authRateLimiter, loginRateLimiter } from "../middleware/rate-limit.js";
import { validateBody } from "../middleware/validate.js";
import { asyncHandler } from "../utils/async-handler.js";

export const apiRouter = Router();

const authRouter = Router();
authRouter.use(authRateLimiter);

authRouter.post(
  "/register",
  validateBody(registerBodySchema),
  asyncHandler(registerHandler),
);
authRouter.post(
  "/login",
  loginRateLimiter,
  validateBody(loginBodySchema),
  asyncHandler(loginHandler),
);
authRouter.post("/logout", asyncHandler(logoutHandler));
authRouter.post("/refresh", asyncHandler(refreshHandler));
authRouter.get("/me", authenticate, asyncHandler(meHandler));
authRouter.post(
  "/change-password",
  authenticate,
  validateBody(changePasswordBodySchema),
  asyncHandler(changePasswordHandler),
);
authRouter.post(
  "/forgot-password",
  validateBody(forgotPasswordBodySchema),
  asyncHandler(forgotPasswordHandler),
);
authRouter.post(
  "/reset-password",
  validateBody(resetPasswordBodySchema),
  asyncHandler(resetPasswordHandler),
);

apiRouter.use("/auth", authRouter);

const adminRouter = Router();
adminRouter.get(
  "/users",
  authenticate,
  requireAdmin,
  asyncHandler(listUsersHandler),
);
apiRouter.use("/admin", adminRouter);
