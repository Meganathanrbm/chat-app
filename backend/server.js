import express from "express";
import dotenv from "dotenv";

import connectToDB from "./db/connectToDB.js";
import cookieParser from "cookie-parser";
import apiRouter from "./routers/index.js";
import { app, server } from "./socket/socket.js";
import { fetchUsers, userList } from "./utils/userList.js";
import User from "./db/models/user.model.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is Live⚡");
});
app.use("/api", apiRouter);

server.listen(PORT, () => {
  connectToDB().then(async () => {
    const users = await User.find({});
    fetchUsers(users);
  });
  console.log(
    `Server is hosting in ${PORT} 🔥 - ${new Date().toDateString()} / ${new Date().toLocaleTimeString()}`
  );
});
