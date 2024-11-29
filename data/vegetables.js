// Right now, we don't have a database, so we are mocking it up
// by using an array
// soon, we will learn how to access a database to store our data structures
const vegetables = [
  {
    name: "carrot",
    color: "orange",
    readyToEat: true,
  },
  {
    name: "spinach",
    color: "green",
    readyToEat: true,
  },
  {
    name: "broccoli",
    color: "green",
    readyToEat: false,
  },
  {
    name: "potato",
    color: "brown",
    readyToEat: false,
  },
];

module.exports = vegetables;
