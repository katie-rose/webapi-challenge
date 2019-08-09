const router = require("express").Router();

const usersArr = [
  {
    id: 1,
    name: "Ione Willoughby",
    chore: "Clean house",
    notes: "Notes about the chore",
    completed: false
  },
  {
    id: 2,
    name: "Alan Corliss",
    chore: "Give Kilo a bath",
    notes: "Notes about the chore",
    completed: false
  },
  {
    id: 3,
    name: "Marleen Jacques",
    chore: "Wash car",
    notes: "Notes about the chore",
    completed: false
  },
  {
    id: 4,
    name: "Ethan Ridlon",
    chore: "Pickup trash",
    notes: "Notes about the chore",
    completed: false
  },
  {
    id: 5,
    name: "Jayne Holdeman",
    chore: "Go shopping",
    notes: "Notes about the chore",
    completed: false
  }
];

router.get("/", (req, res) => {
  res.status(200).json(usersArr);
});

router.get("/:id/chores", (req, res) => {
  db.getUserChores(req.params.id)
    .then(chores => {
      res.status(200).json(usersArr);
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving user chores" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "Error removing user" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(err => {
      res.status(500).json({ error: "Error updating user" });
    });
});

module.exports = router;
