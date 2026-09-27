import { randomUUID } from "node:crypto";
import {
  createPasswordResetToken,
  findValidPasswordResetToken,
  markPasswordResetTokenUsed,
} from "../db/repositories/password-reset.repository.js";
import {
  createRefreshSession,
  findRefreshSessionById,
  revokeRefreshSession,
  revokeRefreshSessionFamily,
  updateRefreshSessionToken,
} from "../db/repositories/session.repository.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserPassword,
} from "../db/repositories/user.repository.js";
import { withDbOperation } from "../db/with-db-operation.js";
import { AppError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { generateOpaqueToken, hashToken } from "../utils/token-hash.js";
import {
  passwordResetExpiresAt,
  refreshTokenExpiresAt,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "./jwt.js";
import { toPublicUser } from "./user-mapper.js";

const invalidCredentialsMessage = "Invalid email or password.";

const issueSessionTokens = async (userId: string) => {
  const sessionId = randomUUID();
  const familyId = randomUUID();
  const expiresAt = refreshTokenExpiresAt();
  const refreshToken = signRefreshToken(userId, sessionId, familyId);

  await withDbOperation("createRefreshSession", { userId, sessionId }, () =>
    createRefreshSession({
      id: sessionId,
      userId,
      tokenHash: hashToken(refreshToken),
      familyId,
      expiresAt,
    }),
  );

  const accessToken = signAccessToken(userId);
  return { accessToken, refreshToken, sessionId };
};

export const registerUser = async (input: {
  email: string;
  password: string;
}) => {
  const normalizedEmail = input.email.toLowerCase();
  const existing = await withDbOperation(
    "findUserByEmail",
    { email: normalizedEmail },
    () => findUserByEmail(normalizedEmail),
  );
  if (existing) {
    throw new AppError(409, "An account with this email already exists.");
  }

  const passwordHash = await hashPassword(input.password);
  const user = await withDbOperation("createUser", { email: normalizedEmail }, () =>
    createUser({
      email: normalizedEmail,
      passwordHash,
    }),
  );

  const tokens = await issueSessionTokens(user.id);
  logger.info({ userId: user.id }, "User registered");
  return { user: toPublicUser(user), ...tokens };
};

export const loginUser = async (input: { email: string; password: string }) => {
  const normalizedEmail = input.email.toLowerCase();
  const user = await withDbOperation(
    "findUserByEmail",
    { email: normalizedEmail },
    () => findUserByEmail(normalizedEmail),
  );
  if (!user) {
    logger.warn({ email: normalizedEmail }, "Login failed");
    throw new AppError(401, invalidCredentialsMessage);
  }

  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) {
    logger.warn({ userId: user.id, email: normalizedEmail }, "Login failed");
    throw new AppError(401, invalidCredentialsMessage);
  }

  const tokens = await issueSessionTokens(user.id);
  logger.info({ userId: user.id }, "User logged in");
  return { user: toPublicUser(user), ...tokens };
};

export const refreshAuth = async (refreshTokenJwt: string) => {
  let payload;
  try {
    payload = verifyRefreshToken(refreshTokenJwt);
  } catch {
    logger.warn({ reason: "invalid_token" }, "Token refresh failed");
    throw new AppError(401, "Invalid or expired session.");
  }

  const session = await withDbOperation(
    "findRefreshSessionById",
    { sessionId: payload.sid },
    () => findRefreshSessionById(payload.sid),
  );
  if (!session || session.userId !== payload.sub) {
    logger.warn({ sessionId: payload.sid }, "Token refresh failed");
    throw new AppError(401, "Invalid or expired session.");
  }

  if (session.revokedAt) {
    await withDbOperation("revokeRefreshSessionFamily", { familyId: session.familyId }, () =>
      revokeRefreshSessionFamily(session.familyId),
    );
    logger.warn(
      { userId: payload.sub, sessionId: session.id, reason: "revoked" },
      "Token refresh failed",
    );
    throw new AppError(401, "Invalid or expired session.");
  }

  if (session.expiresAt <= new Date()) {
    await withDbOperation("revokeRefreshSession", { sessionId: session.id }, () =>
      revokeRefreshSession(session.id),
    );
    logger.warn(
      { userId: payload.sub, sessionId: session.id, reason: "expired" },
      "Token refresh failed",
    );
    throw new AppError(401, "Invalid or expired session.");
  }

  if (hashToken(refreshTokenJwt) !== session.tokenHash) {
    await withDbOperation("revokeRefreshSessionFamily", { familyId: session.familyId }, () =>
      revokeRefreshSessionFamily(session.familyId),
    );
    logger.warn(
      { userId: payload.sub, sessionId: session.id, reason: "token_mismatch" },
      "Token refresh failed",
    );
    throw new AppError(401, "Invalid or expired session.");
  }

  const newExpiresAt = refreshTokenExpiresAt();
  const newRefreshJwt = signRefreshToken(payload.sub, session.id, session.familyId);
  await withDbOperation(
    "updateRefreshSessionToken",
    { userId: payload.sub, sessionId: session.id },
    () => updateRefreshSessionToken(session.id, hashToken(newRefreshJwt), newExpiresAt),
  );

  const accessToken = signAccessToken(payload.sub);
  logger.debug({ userId: payload.sub, sessionId: session.id }, "Token refreshed");
  return { accessToken, refreshToken: newRefreshJwt, sessionId: session.id };
};

export const logoutUser = async (refreshTokenJwt: string | undefined) => {
  if (!refreshTokenJwt) {
    return;
  }

  try {
    const payload = verifyRefreshToken(refreshTokenJwt);
    await withDbOperation("revokeRefreshSession", { userId: payload.sub, sessionId: payload.sid }, () =>
      revokeRefreshSession(payload.sid),
    );
    logger.info({ userId: payload.sub, sessionId: payload.sid }, "User logged out");
  } catch {
    // Ignore invalid tokens on logout.
  }
};

export const getCurrentUser = async (userId: string) => {
  const user = await withDbOperation("findUserById", { userId }, () =>
    findUserById(userId),
  );
  if (!user) {
    throw new AppError(401, "Authentication required.");
  }
  return toPublicUser(user);
};

export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await withDbOperation("findUserById", { userId }, () =>
    findUserById(userId),
  );
  if (!user) {
    throw new AppError(401, "Authentication required.");
  }

  const valid = await verifyPassword(currentPassword, user.passwordHash);
  if (!valid) {
    logger.warn({ userId }, "Password change failed");
    throw new AppError(401, "Current password is incorrect.");
  }

  const passwordHash = await hashPassword(newPassword);
  await withDbOperation("updateUserPassword", { userId }, () =>
    updateUserPassword(userId, passwordHash),
  );
  logger.info({ userId }, "Password changed");
};

export const requestPasswordReset = async (email: string) => {
  const normalizedEmail = email.toLowerCase();
  const user = await withDbOperation(
    "findUserByEmail",
    { email: normalizedEmail },
    () => findUserByEmail(normalizedEmail),
  );
  if (!user) {
    return { token: null as string | null };
  }

  const token = generateOpaqueToken();
  await withDbOperation("createPasswordResetToken", { userId: user.id }, () =>
    createPasswordResetToken({
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt: passwordResetExpiresAt(),
    }),
  );

  logger.info({ userId: user.id }, "Password reset requested");
  return { token };
};

export const resetPassword = async (token: string, newPassword: string) => {
  const record = await withDbOperation(
    "findValidPasswordResetToken",
    {},
    () => findValidPasswordResetToken(hashToken(token)),
  );
  if (!record) {
    logger.warn({ reason: "invalid_token" }, "Password reset failed");
    throw new AppError(400, "Invalid or expired reset token.");
  }

  const passwordHash = await hashPassword(newPassword);
  await withDbOperation("updateUserPassword", { userId: record.userId }, () =>
    updateUserPassword(record.userId, passwordHash),
  );
  await withDbOperation("markPasswordResetTokenUsed", { userId: record.userId }, () =>
    markPasswordResetTokenUsed(record.id),
  );

  logger.info({ userId: record.userId }, "Password reset completed");
};
