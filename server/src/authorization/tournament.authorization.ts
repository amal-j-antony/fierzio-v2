import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { tournamentMembers } from "../db/schema.js";

export const getTournamentMembership = async (
  userId: string,
  tournamentId: string,
) => {
  const [membership] = await db
    .select()
    .from(tournamentMembers)
    .where(
      and(
        eq(tournamentMembers.userId, userId),
        eq(tournamentMembers.tournamentId, tournamentId),
      ),
    )
    .limit(1);
  return membership ?? null;
};

export const canOrganizeTournament = async (
  userId: string,
  tournamentId: string,
): Promise<boolean> => {
  const membership = await getTournamentMembership(userId, tournamentId);
  return membership?.role === "ORGANIZER";
};

export const canParticipateInTournament = async (
  userId: string,
  tournamentId: string,
): Promise<boolean> => {
  const membership = await getTournamentMembership(userId, tournamentId);
  return membership !== null;
};
