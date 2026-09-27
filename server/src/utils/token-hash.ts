import { createHash, randomBytes } from "node:crypto";

export const hashToken = (token: string): string =>
  createHash("sha256").update(token).digest("hex");

export const generateOpaqueToken = (): string =>
  randomBytes(32).toString("base64url");
