import express from "express";
import { getUserForSidePanel } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const userRouter = express.Router();

userRouter.get("/",protectRoute,getUserForSidePanel)

export default userRouter