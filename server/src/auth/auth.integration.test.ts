import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../app.js";

const runIntegration = process.env.INTEGRATION_TEST === "true";

describe.skipIf(!runIntegration)("auth integration", () => {
  const app = createApp();
  const email = `user-${Date.now()}@example.com`;
  const password = "password123";
  let agent: ReturnType<typeof request.agent>;

  beforeAll(() => {
    agent = request.agent(app);
  });

  afterAll(async () => {
    // Sessions and users remain in test DB; use isolated DB in CI.
  });

  it("registers, returns me, and logs out", async () => {
    const registerResponse = await agent
      .post("/auth/register")
      .send({
        email,
        password,
        passwordConfirmation: password,
      })
      .expect(201);

    expect(registerResponse.body.user.email).toBe(email);
    expect(registerResponse.body.user.passwordHash).toBeUndefined();

    const meResponse = await agent.get("/auth/me").expect(200);
    expect(meResponse.body.user.email).toBe(email);

    await agent.post("/auth/logout").expect(200);
    await agent.get("/auth/me").expect(401);
  });

  it("rejects invalid login credentials generically", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({ email, password: "wrong-password" })
      .expect(401);

    expect(response.body.error.message).toBe("Invalid email or password.");
  });
});
