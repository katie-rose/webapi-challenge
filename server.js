const express = require("express");
const userRoutes = require("./users/userRouter.js");

const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>It's working, IT'S WORKING</h2>`);
});

server.use("/users", userRoutes);

module.exports = server;
