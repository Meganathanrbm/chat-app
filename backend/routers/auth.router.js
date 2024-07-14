import express from "express";
import {
  forgetPassword,
  login,
  logout,
  resetPassword,
  signup,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgetPassword", forgetPassword);
authRouter.post("/resetPassword", resetPassword);

export default authRouter;
