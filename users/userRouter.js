const express = "express";
const db = require("../data/db");
const postDb = require("../chores/choreDb");
const router = require("express").Router();

router.post("/", validateChore, (req, res) => {
  db.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "Error adding user" });
    });
});

router.post("/:id/chores", validateUserId, validateChore, (req, res) => {
  req.body.user_id = req.params.id;
  choreDb
    .insert(req.body)
    .then(chore => {
      res.status(201).json(chore);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error posting to the database"
      });
    });
});

router.get("/", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving user" });
    });
});

router.get("/:id/chores", validateUserId, (req, res) => {
  db.getUserChores(req.params.id)
    .then(chores => {
      res.status(200).json(chores);
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving user chores" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "Error removing user" });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
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

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  db.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error accessing that user from the database"
      });
    });
}

function validateUser(req, res, next) {
  const body = req.body;
  const name = req.body.name;
  if (!body) {
    res.status(400).json({ message: "User data is missing" });
  } else if (!name) {
    res.status(400).json({ message: "Required name field is missing" });
  } else {
    next();
  }
}

function validateChore(req, res, next) {
  const body = req.body;
  const text = req.body.text;
  if (!body) {
    res.status(400).json({ message: "User chore is missing" });
  } else if (!text) {
    res.status(400).json({ message: "Required text field is missing" });
  } else {
    next();
  }
}

module.exports = router;
