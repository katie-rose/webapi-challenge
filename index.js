const express = require("express");
const server = express();
server.use(express.json());

const userDb = require("./data/userDb");
const choreDb = require("./data/choreDb");

server.get("/", (req, res) => {
  res.status(200).json(userDb);
});

server.get("/chores", (req, res) => {
  const chores = choreDb.getChores();
  const emptyArr = [];

  if (chores.length === 0) {
    res.status(404).json({ error: "Empty array" });
  } else if (!req.query.completed) {
    res.status(200).json(chores);
  } else if (req.query.completed === "false") {
    for (let i = 0; i < chores.length; i++) {
      if (chores[i].completed === false) {
        emptyArr.push(chores[i]);
      }
    }
    res.status(200).json(emptyArr);
  } else if (req.query.completed === "true") {
    for (let i = 0; i < chores.length; i++) {
      if (chores[i].completed === true) {
        emptyArr.push(chores[i]);
      }
    }
    res.status(200).json(emptyArr);
  } else {
    res.status(500).json({ error: "Unable to reach database" });
  }
});

// find chore
// server.get("/chores/:choreId", (req, res) => {
//   const choreId = req.params.choreId;
//   let [currentChore] = choreDb.filter(chore => chore.choreId == choreId);
//   if (currentChore) {
//     res.status(200).json(currentChore);
//   } else {
//     res.status(404).json({ message: "nope" });
//   }
// });

server.listen(8000, () => {
  console.log("server running on 8000");
});
