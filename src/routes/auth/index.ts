import { Router } from "express";

import { authenticateToken } from "../../middleware/auth";
import {
  handleCurrentUser,
  handleLogin,
  handleRegister,
  handleUpdate,
} from "../../controller/auth";

const authRouter = Router();

authRouter.get("/", authenticateToken, handleCurrentUser);

authRouter.post("/register", handleRegister);
authRouter.put("/", handleUpdate);
authRouter.post("/login", handleLogin);

export default authRouter;
