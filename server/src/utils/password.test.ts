import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password.js";

describe("password hashing", () => {
  it("hashes and verifies passwords with Argon2id", async () => {
    const hash = await hashPassword("secure-password-1");
    expect(hash).not.toContain("secure-password-1");
    await expect(verifyPassword("secure-password-1", hash)).resolves.toBe(true);
    await expect(verifyPassword("wrong-password", hash)).resolves.toBe(false);
  });
});
