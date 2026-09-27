import argon2 from "argon2";

export const hashPassword = async (password: string): Promise<string> =>
  argon2.hash(password, { type: argon2.argon2id });

export const verifyPassword = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  try {
    return await argon2.verify(passwordHash, password);
  } catch {
    return false;
  }
};
