import { Router } from "express";

import { authenticateToken } from "../../middleware/auth";
import {
  handleExplore,
  handleFollowUser,
  handleProfile,
  handleUnfollowUser,
} from "../../controller/user";

const userRouter = Router();

userRouter.get("/profile", authenticateToken, handleProfile);
userRouter.get("/", authenticateToken, handleExplore);

userRouter.post("/:id/follow", authenticateToken, handleFollowUser);
userRouter.post("/:id/unfollow", authenticateToken, handleUnfollowUser);

export default userRouter;
