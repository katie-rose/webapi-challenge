const chores = [
  {
    id: 1,
    description: "Take Kilo outside",
    notes: "Fat boy",
    assignedTo: 1,
    completed: false
  },
  {
    id: 2,
    description: "Do the dishes",
    notes: "It's a mess",
    assignedTo: 1,
    completed: true
  },
  {
    id: 3,
    description: "Go to the gym",
    notes: "Get huge",
    assignedTo: 2,
    completed: false
  }
];

const getChores = () => {
  return chores;
};

module.exports = { getChores };
