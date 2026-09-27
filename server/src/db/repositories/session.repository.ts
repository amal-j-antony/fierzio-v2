import { and, eq, isNull } from "drizzle-orm";
import { db } from "../index.js";
import { refreshSessions } from "../schema.js";

export const createRefreshSession = async (input: {
  id: string;
  userId: string;
  tokenHash: string;
  familyId: string;
  expiresAt: Date;
}) => {
  const [session] = await db
    .insert(refreshSessions)
    .values({
      id: input.id,
      userId: input.userId,
      tokenHash: input.tokenHash,
      familyId: input.familyId,
      expiresAt: input.expiresAt,
    })
    .returning();
  return session;
};

export const findRefreshSessionById = async (sessionId: string) => {
  const [session] = await db
    .select()
    .from(refreshSessions)
    .where(eq(refreshSessions.id, sessionId))
    .limit(1);
  return session ?? null;
};

export const revokeRefreshSession = async (sessionId: string) => {
  await db
    .update(refreshSessions)
    .set({ revokedAt: new Date() })
    .where(and(eq(refreshSessions.id, sessionId), isNull(refreshSessions.revokedAt)));
};

export const revokeRefreshSessionFamily = async (familyId: string) => {
  await db
    .update(refreshSessions)
    .set({ revokedAt: new Date() })
    .where(and(eq(refreshSessions.familyId, familyId), isNull(refreshSessions.revokedAt)));
};

export const updateRefreshSessionToken = async (
  sessionId: string,
  tokenHash: string,
  expiresAt: Date,
) => {
  const [session] = await db
    .update(refreshSessions)
    .set({ tokenHash, expiresAt })
    .where(eq(refreshSessions.id, sessionId))
    .returning();
  return session ?? null;
};
