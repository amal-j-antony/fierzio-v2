import type { PublicUser } from "../auth/user-mapper.js";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        user: PublicUser;
      };
      requestId?: string;
    }
  }
}

export {};
