const db = require("../data/db");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
};

function get() {
  return db("chores");
}

function getById(id) {
  return db("chores")
    .where({ id })
    .first();
}

function insert(chore) {
  return db("chores")
    .insert(chore)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db("chores")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("chores")
    .where("id", id)
    .del();
}
