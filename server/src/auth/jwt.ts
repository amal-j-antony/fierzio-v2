import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { parseDurationMs } from "../utils/duration.js";

const expiresInSeconds = (value: string): number =>
  Math.floor(parseDurationMs(value) / 1000);

export type AccessTokenPayload = {
  sub: string;
  type: "access";
};

export type RefreshTokenPayload = {
  sub: string;
  type: "refresh";
  sid: string;
  fid: string;
};

export const signAccessToken = (userId: string): string =>
  jwt.sign({ sub: userId, type: "access" satisfies AccessTokenPayload["type"] }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiresInSeconds(env.ACCESS_TOKEN_EXPIRES_IN),
  });

export const signRefreshToken = (
  userId: string,
  sessionId: string,
  familyId: string,
): string =>
  jwt.sign(
    {
      sub: userId,
      type: "refresh",
      sid: sessionId,
      fid: familyId,
    } satisfies Omit<RefreshTokenPayload, "sub"> & { sub: string },
    env.REFRESH_TOKEN_SECRET,
    { expiresIn: expiresInSeconds(env.REFRESH_TOKEN_EXPIRES_IN) },
  );

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
  if (typeof payload !== "object" || payload === null) {
    throw new Error("Invalid access token payload");
  }
  const { sub, type } = payload as AccessTokenPayload;
  if (type !== "access" || typeof sub !== "string") {
    throw new Error("Invalid access token payload");
  }
  return { sub, type };
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  const payload = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
  if (typeof payload !== "object" || payload === null) {
    throw new Error("Invalid refresh token payload");
  }
  const { sub, type, sid, fid } = payload as RefreshTokenPayload;
  if (
    type !== "refresh" ||
    typeof sub !== "string" ||
    typeof sid !== "string" ||
    typeof fid !== "string"
  ) {
    throw new Error("Invalid refresh token payload");
  }
  return { sub, type, sid, fid };
};

export const refreshTokenExpiresAt = (): Date =>
  new Date(Date.now() + parseDurationMs(env.REFRESH_TOKEN_EXPIRES_IN));

export const passwordResetExpiresAt = (): Date =>
  new Date(Date.now() + parseDurationMs(env.PASSWORD_RESET_TOKEN_EXPIRES_IN));
