import type { CookieOptions, Response } from "express";
import { cookieSameSite, cookieSecure, env } from "../config/env.js";
import { parseDurationMs } from "../utils/duration.js";

const baseCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: cookieSecure,
  sameSite: cookieSameSite,
  path: "/",
});

const accessMaxAgeMs = (): number => parseDurationMs(env.ACCESS_TOKEN_EXPIRES_IN);

const refreshMaxAgeMs = (): number => parseDurationMs(env.REFRESH_TOKEN_EXPIRES_IN);

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
): void => {
  res.cookie(env.ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    ...baseCookieOptions(),
    maxAge: accessMaxAgeMs(),
  });
  res.cookie(env.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    ...baseCookieOptions(),
    maxAge: refreshMaxAgeMs(),
  });
};

export const clearAuthCookies = (res: Response): void => {
  const options = baseCookieOptions();
  res.clearCookie(env.ACCESS_TOKEN_COOKIE_NAME, options);
  res.clearCookie(env.REFRESH_TOKEN_COOKIE_NAME, options);
};
