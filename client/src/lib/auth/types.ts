export type GlobalRole = "ADMIN" | "USER";

export type PublicUser = {
  id: string;
  email: string;
  globalRole: GlobalRole;
};

export type AuthUserResponse = {
  user: PublicUser;
};
