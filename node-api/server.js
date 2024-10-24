const express = require("express");

const app = express();
const tasks = new Map();

app.use(express.json());

// GET /tasks: Retrieve all tasks
app.get("/tasks", (req, res) => {
  res.json([...tasks.values()]);
});

// POST /tasks: Add a new task
app.post("/tasks", (req, res) => {
  const { name } = req.body;
  const id = tasks.size + 1;
  tasks.set(id, { id, name });
  res.status(201).json({ id });
});

// Handle invalid routes
app.use((req, res) => res.status(404).send("Not found"));

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Node.js API running on http://localhost:${PORT}`)
);
