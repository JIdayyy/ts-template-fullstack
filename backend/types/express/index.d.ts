import { JwtPayload } from "jsonwebtoken";
/* eslint-disable @typescript-eslint/no-empty-interface */
import { User } from "@prisma/client";

type UserWithoutPassword = Omit<User, "password">;

declare global {
  namespace Express {
    // extends the User interface created by PassportJS
    export interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
