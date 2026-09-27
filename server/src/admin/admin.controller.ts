import type { Request, Response } from "express";
import { listUsers } from "../db/repositories/user.repository.js";
import { withDbOperation } from "../db/with-db-operation.js";
import { toPublicUser } from "../auth/user-mapper.js";

export const listUsersHandler = async (req: Request, res: Response): Promise<void> => {
  const users = await withDbOperation(
    "listUsers",
    { actorId: req.auth?.user.id },
    () => listUsers(),
  );
  res.status(200).json({
    users: users.map(toPublicUser),
  });
};
