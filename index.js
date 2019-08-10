const express = require("express");
const server = express();
server.use(express.json());

let choreDb = require("./data/choreDb");

server.get("/", (req, res) => {
  res.status(200).json(choreDb);
});

server.get("/chores", (req, res) => {
  const completedChores = choreDb.filter(chore => {
    return chore.completed.toString() === req.query.completed;
  });
  res.status(200).json(completedChores);
});

server.get("/chores/:id", (req, res) => {
  const id = req.params.id;
  let [currentChore] = choreDb.filter(chore => chore.assignedTo == id);
  if (currentChore) {
    res.status(200).json(currentChore);
  } else {
    res.status(404).json([]);
  }
});

server.post("/chores", (req, res) => {
  const newChore = req.body;

  choreDb.push(newChore);
  res.status(200).json(choreDb);
});

server.put("/chores/:id", (req, res) => {
  const id = req.params.id;
  const updatedChore = req.body;

  choreDb = choreDb.map(chore => {
    return chore.id == req.params.id ? (chore = updatedChore) : chore;
  });
  res.status(200).json(choreDb);
});

server.delete("/chores/:id", (req, res) => {
    choreDb = choreDb.filter(({ id }) => {
        return id !== Number(req.params.id);
    })
    res.status(200).json(choreDb);
})

const port = 8000;
server.listen(port, () => console.log("server is running"));
