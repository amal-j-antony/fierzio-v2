import type { Request, Response } from "express";
import { env } from "../config/env.js";
import { AppError } from "../utils/errors.js";
import { clearAuthCookies, setAuthCookies } from "./cookies.js";
import {
  changePassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAuth,
  registerUser,
  requestPasswordReset,
  resetPassword,
} from "./auth.service.js";

const readRefreshToken = (req: Request): string | undefined => {
  const token = req.cookies?.[env.REFRESH_TOKEN_COOKIE_NAME];
  return typeof token === "string" ? token : undefined;
};

export const registerHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };
  const result = await registerUser({ email, password });
  setAuthCookies(res, result.accessToken, result.refreshToken);
  res.status(201).json({ user: result.user });
};

export const loginHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };
  const result = await loginUser({ email, password });
  setAuthCookies(res, result.accessToken, result.refreshToken);
  res.status(200).json({ user: result.user });
};

export const logoutHandler = async (req: Request, res: Response): Promise<void> => {
  await logoutUser(readRefreshToken(req));
  clearAuthCookies(res);
  res.status(200).json({ success: true });
};

export const refreshHandler = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = readRefreshToken(req);
  if (!refreshToken) {
    throw new AppError(401, "Invalid or expired session.");
  }

  const result = await refreshAuth(refreshToken);
  setAuthCookies(res, result.accessToken, result.refreshToken);
  res.status(200).json({ success: true });
};

export const meHandler = async (req: Request, res: Response): Promise<void> => {
  const user = await getCurrentUser(req.auth!.user.id);
  res.status(200).json({ user });
};

export const changePasswordHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { currentPassword, newPassword } = req.body as {
    currentPassword: string;
    newPassword: string;
  };
  await changePassword(req.auth!.user.id, currentPassword, newPassword);
  res.status(200).json({ success: true });
};

export const forgotPasswordHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email } = req.body as { email: string };
  const result = await requestPasswordReset(email);

  if (result.token && env.NODE_ENV !== "production") {
    res.status(200).json({
      message:
        "If an account exists for this email, password reset instructions have been sent.",
      devResetToken: result.token,
    });
    return;
  }

  res.status(200).json({
    message:
      "If an account exists for this email, password reset instructions have been sent.",
  });
};

export const resetPasswordHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { token, newPassword } = req.body as { token: string; newPassword: string };
  await resetPassword(token, newPassword);
  res.status(200).json({ success: true });
};
