import type { User } from "../db/schema.js";

export type PublicUser = {
  id: string;
  email: string;
  globalRole: User["globalRole"];
};

export const toPublicUser = (user: User): PublicUser => ({
  id: user.id,
  email: user.email,
  globalRole: user.globalRole,
});
