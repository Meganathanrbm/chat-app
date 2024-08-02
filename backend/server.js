import express from "express";
import dotenv from "dotenv";

import connectToDB from "./db/connectToDB.js";
import cookieParser from "cookie-parser";
import apiRouter from "./routers/index.js";
import { app, server } from "./socket/socket.js";
import { fetchUsers, userList } from "./utils/userList.js";
import User from "./db/models/user.model.js";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is Live⚡");
});
app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));  
});

server.listen(PORT, () => {
  connectToDB().then(async () => {
    const users = await User.find({});
    fetchUsers(users);
  });
  console.log(
    `Server is hosting in ${PORT} 🔥 - ${new Date().toDateString()} / ${new Date().toLocaleTimeString()}`
  );
});
