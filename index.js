// first bring in express, which we already installed
const express = require("express");
// create your application
const app = express();
// Import the body-parser package
const bodyParser = require("body-parser");
// you have to have a port defined so that the application has somewhere to listen
const PORT = 3000;

// import the data from the fake database files
const fruits = require("./data/fruits");
const vegetables = require("./data/vegetables"); // Import vegetables

// ========== MIDDLEWARE ==========
// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ========== ROUTES ==========

// General home route
app.get("/", (req, res) => {
  res.send("<div>This is my home</div>");
});

app.get("/index", (req, res) => {
  res.send("<h1>This is an index</h1>");
});

// Fruits Routes
app.get("/api/fruits", (req, res) => {
  // Return the list of all fruits
  res.json(fruits);
});

app.get("/api/fruits/:id", (req, res) => {
  const fruit = fruits[req.params.id];
  if (fruit) {
    res.json(fruit); // Return a specific fruit
  } else {
    res.status(404).json({ error: "Fruit not found" });
  }
});

app.post("/api/fruits", (req, res) => {
  // Ensure that we have the required data
  const { name, color, readyToEat } = req.body;
  if (!name || !color || readyToEat === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Add new fruit to the array
  const newFruit = { name, color, readyToEat };
  fruits.push(newFruit);

  // Respond with the newly added fruit
  res.status(201).json(newFruit);
});

app.put("/api/fruits/:id", (req, res) => {
  const fruitIndex = req.params.id;
  if (fruitIndex >= 0 && fruitIndex < fruits.length) {
    // Update the entire fruit
    fruits[fruitIndex] = req.body;
    res.json(fruits[fruitIndex]);
  } else {
    res.status(404).json({ error: "Fruit not found" });
  }
});

app.patch("/api/fruits/:id", (req, res) => {
  const fruitIndex = req.params.id;
  if (fruitIndex >= 0 && fruitIndex < fruits.length) {
    // Only update the fields that were provided in the request
    const updatedFruit = { ...fruits[fruitIndex], ...req.body };
    fruits[fruitIndex] = updatedFruit;
    res.json(updatedFruit);
  } else {
    res.status(404).json({ error: "Fruit not found" });
  }
});

app.delete("/api/fruits/:id", (req, res) => {
  const fruitIndex = req.params.id;
  if (fruitIndex >= 0 && fruitIndex < fruits.length) {
    // Remove the fruit from the array
    const deletedFruit = fruits.splice(fruitIndex, 1);
    res.json({ message: "Fruit deleted", deletedFruit });
  } else {
    res.status(404).json({ error: "Fruit not found" });
  }
});

// Vegetables Routes
app.get("/api/vegetables", (req, res) => {
  // Return the list of all vegetables
  res.json(vegetables);
});

app.get("/api/vegetables/:id", (req, res) => {
  const vegetable = vegetables[req.params.id];
  if (vegetable) {
    res.json(vegetable); // Return a specific vegetable
  } else {
    res.status(404).json({ error: "Vegetable not found" });
  }
});

app.post("/api/vegetables", (req, res) => {
  const { name, color, readyToEat } = req.body;
  if (!name || !color || readyToEat === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newVegetable = { name, color, readyToEat };
  vegetables.push(newVegetable);

  // Return the newly added vegetable
  res.status(201).json(newVegetable);
});

app.put("/api/vegetables/:id", (req, res) => {
  const vegetableIndex = req.params.id;
  if (vegetableIndex >= 0 && vegetableIndex < vegetables.length) {
    // Update the entire vegetable
    vegetables[vegetableIndex] = req.body;
    res.json(vegetables[vegetableIndex]);
  } else {
    res.status(404).json({ error: "Vegetable not found" });
  }
});

app.patch("/api/vegetables/:id", (req, res) => {
  const vegetableIndex = req.params.id;
  if (vegetableIndex >= 0 && vegetableIndex < vegetables.length) {
    // Only update the fields that were provided in the request
    const updatedVegetable = { ...vegetables[vegetableIndex], ...req.body };
    vegetables[vegetableIndex] = updatedVegetable;
    res.json(updatedVegetable);
  } else {
    res.status(404).json({ error: "Vegetable not found" });
  }
});

app.delete("/api/vegetables/:id", (req, res) => {
  const vegetableIndex = req.params.id;
  if (vegetableIndex >= 0 && vegetableIndex < vegetables.length) {
    // Remove the vegetable from the array
    const deletedVegetable = vegetables.splice(vegetableIndex, 1);
    res.json({ message: "Vegetable deleted", deletedVegetable });
  } else {
    res.status(404).json({ error: "Vegetable not found" });
  }
});

// Custom 404 (not found) middleware
app.use((req, res) => {
  res.status(404).json({ error: "Resource not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
