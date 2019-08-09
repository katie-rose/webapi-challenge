const express = require("express");
const server = express();

const userDb = require("./data/userDb");
const choreDb = require("./data/choresDb");

router.get("/", (req, res) => {
  res.status(200).json(userDb);
});

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  let [currentPerson] = userDb.filter(person => person.userId == userId);
  if (currentPerson) {
    res.status(200).json(currentPerson);
  } else {
    res.status(404).json({ message: "Unable to find that user" });
  }
});

router.get("/:userId/chores/:choresId", (req, res) => {
  const choresId = req.params.choresId;
  const completed = req.query.completed;

  let [currentChore] = choreDb.filter(chores => chores.choresId == choresId);

  if (currentChore) {
    if (completed === "true") {
      res.status(200).json({ message: "This user has completed their task" });
    }
  } else {
    res.status(400).json({ message: "This user is lazy" });
  }
});

server.listen(8000, () => {
  console.log("server running on 8000");
});
