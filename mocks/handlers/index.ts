import { handler as authHandler } from "./auth";
import { handler as userHandler } from "./user";
import { handler as communityHandler } from "./community";
import { handler as likeHandler } from "./like";
import { handler as commentHandler } from "./comments";

export const handlers = [
  ...authHandler,
  ...userHandler,
  ...communityHandler,
  ...likeHandler,
  ...commentHandler,
];
