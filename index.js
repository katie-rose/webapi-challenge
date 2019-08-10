const express = require("express");
const server = express();
server.use(express.json());

const choreDb = require("./data/choreDb");
const userDb = require("./data/userDb");

server.get("/", (req, res) => {
  res.status(200).json(userDb);
});

server.get("/chores", (req, res) => {
  const filteredArr = choreDb.filter(chore => {
    return chore.completed.toString() === req.query.completed;
  });
  res.status(200).json(filteredArr);
});

const port = 8000;
server.listen(port, () => console.log("server is running"));
