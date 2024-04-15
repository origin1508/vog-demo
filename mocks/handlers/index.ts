import { handler as AuthHandler } from "./auth";
import { handler as UserHandelr } from "./user";

export const handlers = [...AuthHandler, ...UserHandelr];
