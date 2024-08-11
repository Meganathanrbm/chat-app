import express from "express";
import {
  getLastMessage,
  getMessage,
  seenMessage,
  sendMessage,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const messageRouter = express.Router();

messageRouter.get("/:id", protectRoute, getMessage);
messageRouter.get("/last/:id", protectRoute, getLastMessage);
messageRouter.get("/lastSeen/:id", protectRoute, seenMessage);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;
