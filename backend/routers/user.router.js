import express from "express";
import {
  getAllUser,
  getUserForSidePanel,
  updateProfileAbout,
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const userRouter = express.Router();

userRouter.get("/", protectRoute, getUserForSidePanel);
userRouter.get("/allUsers", protectRoute, getAllUser);
userRouter.post("/update/about", protectRoute, updateProfileAbout);

export default userRouter;
