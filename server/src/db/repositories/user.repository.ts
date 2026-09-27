import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { type GlobalRole, users } from "../schema.js";

export const findUserByEmail = async (email: string) => {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return user ?? null;
};

export const findUserById = async (id: string) => {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user ?? null;
};

export const createUser = async (input: {
  email: string;
  passwordHash: string;
  globalRole?: GlobalRole;
}) => {
  const [user] = await db
    .insert(users)
    .values({
      email: input.email,
      passwordHash: input.passwordHash,
      globalRole: input.globalRole ?? "USER",
    })
    .returning();
  return user;
};

export const updateUserPassword = async (userId: string, passwordHash: string) => {
  const [user] = await db
    .update(users)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();
  return user ?? null;
};

export const listUsers = async () => db.select().from(users);
