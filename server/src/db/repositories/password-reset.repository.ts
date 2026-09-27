import { and, eq, gt, isNull } from "drizzle-orm";
import { db } from "../index.js";
import { passwordResetTokens } from "../schema.js";

export const createPasswordResetToken = async (input: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}) => {
  const [record] = await db
    .insert(passwordResetTokens)
    .values({
      userId: input.userId,
      tokenHash: input.tokenHash,
      expiresAt: input.expiresAt,
    })
    .returning();
  return record;
};

export const findValidPasswordResetToken = async (tokenHash: string) => {
  const now = new Date();
  const [record] = await db
    .select()
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.tokenHash, tokenHash),
        isNull(passwordResetTokens.usedAt),
        gt(passwordResetTokens.expiresAt, now),
      ),
    )
    .limit(1);
  return record ?? null;
};

export const markPasswordResetTokenUsed = async (id: string) => {
  await db
    .update(passwordResetTokens)
    .set({ usedAt: new Date() })
    .where(eq(passwordResetTokens.id, id));
};
