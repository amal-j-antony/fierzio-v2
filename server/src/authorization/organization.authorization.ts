import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { organizationMembers } from "../db/schema.js";

export const getOrganizationMembership = async (
  userId: string,
  organizationId: string,
) => {
  const [membership] = await db
    .select()
    .from(organizationMembers)
    .where(
      and(
        eq(organizationMembers.userId, userId),
        eq(organizationMembers.organizationId, organizationId),
      ),
    )
    .limit(1);
  return membership ?? null;
};

export const canManageOrganization = async (
  userId: string,
  organizationId: string,
): Promise<boolean> => {
  const membership = await getOrganizationMembership(userId, organizationId);
  return membership?.role === "LEADER";
};
