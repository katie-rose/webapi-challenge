const express = require("express");
const server = express();
server.use(express.json());

const choreDb = require("./data/choreDb");
const userDb = require("./data/userDb");

server.get("/", (req, res) => {
  res.status(200).json(userDb);
});

server.get("/chores", (req, res) => {
  const completedChores = choreDb.filter(chore => {
    return chore.completed.toString() === req.query.completed;
  });
  res.status(200).json(completedChores);
});

server.get("/chores/:id", (req, res) => {
const id = req.params.id;
let (currentChore) = choreDb.filter(chore => chore.assignedTo == id);
if (currentChore) {
    res.status(200).json(currentChore);
} else {
    res.status(404).json([]);
}
})

const port = 8000;
server.listen(port, () => console.log("server is running"));
