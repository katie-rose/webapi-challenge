const express = "express";
const db = require("../data/db");

const router = require("express").Router();

router.get("/", (req, res) => {
  db.get()
    .then(chores => {
      res.status(200).json(chores);
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving chores" });
    });
});

router.get("/:id", validateChoreId, (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving chore" });
    });
});

router.delete("/:id", validateChoreId, (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: "Error removing chore" });
    });
});

router.put("/:id", validateChoreId, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
    .then(post => {
      res.status(201).json({ chore: `${id} successfully updated` });
    })
    .catch(err => {
      res.status(500).json({ error: "Error updating chore" });
    });
});

// custom middleware

function validateChoreId(req, res, next) {
  const id = req.params.pid;
  db.getById(id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "Invalid chore ID" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error accessing that chore from the database"
      });
    });
}

module.exports = router;
