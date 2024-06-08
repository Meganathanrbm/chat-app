import express from "express";
import authRouter from "./auth.router.js";
import messageRouter from "./message.router.js";
import userRouter from "./user.router.js";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/message", messageRouter);
apiRouter.use("/user",userRouter)

export default apiRouter;
