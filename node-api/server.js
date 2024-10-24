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

// PATCH /tasks/:id: Update an existing task
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!tasks.has(Number(id))) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks.set(Number(id), { id: Number(id), name });
  res.status(200).json({ id: Number(id) });
});

// DELETE /tasks/:id: Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  if (!tasks.delete(Number(id))) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(204).send();
});

// Handle invalid routes
app.use((req, res) => res.status(404).send("Not found"));

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Node.js API running on http://localhost:${PORT}`)
);
