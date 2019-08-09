const express = require("express");

const server = express();
const choreRouter = require("./chores/choreRouter");
const userRouter = require("./users/userRouter");
const serverRouter = require("./server");

server.use(express.json());

server.use("/", serverRouter);
server.use("/api/users", userRouter);
server.use("/api/chores", choreRouter);

server.listen(8000, () => {
  console.log("server running on 8000");
});
