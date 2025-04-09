import { Router } from "express";

import userRoutes from "./user";
import postRoutes from "./post";
import authRouter from "./auth";

const mainRouter: Router = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRoutes);
mainRouter.use("/posts", postRoutes);

export default mainRouter;
