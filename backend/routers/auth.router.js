import express from "express";
import {
  forgetPassword,
  generateOTP,
  login,
  logout,
  resetPassword,
  signup,
  verifyOTP,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgetPassword", forgetPassword);
authRouter.post("/resetPassword", resetPassword);
authRouter.post("/generateOTP", generateOTP);
authRouter.post("/verifyOTP", verifyOTP);

export default authRouter;
