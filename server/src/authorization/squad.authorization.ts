import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { squadMembers } from "../db/schema.js";

export const getSquadMembership = async (userId: string, squadId: string) => {
  const [membership] = await db
    .select()
    .from(squadMembers)
    .where(and(eq(squadMembers.userId, userId), eq(squadMembers.squadId, squadId)))
    .limit(1);
  return membership ?? null;
};

export const canManageSquad = async (
  userId: string,
  squadId: string,
): Promise<boolean> => {
  const membership = await getSquadMembership(userId, squadId);
  return membership?.role === "LEADER";
};
