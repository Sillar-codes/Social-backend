import { Router } from "express";

import { authenticateToken } from "../../middleware/auth";
import {
  handleGetAllPosts,
  handleLikePost,
  handlePost,
  handlePostComment,
  handleUnlikePost,
} from "../../controller/post";

const postRouter: Router = Router();

postRouter.get("/", handleGetAllPosts);

postRouter.post("/", authenticateToken, handlePost);
postRouter.post("/:id/like", authenticateToken, handleLikePost);
postRouter.post("/:id/unlike", authenticateToken, handleUnlikePost);
postRouter.post("/:id/comment", authenticateToken, handlePostComment);

export default postRouter;
