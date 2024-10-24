const { serve } = require("bun");
const db = new Map();

// Handle different HTTP methods for /tasks
function handleTaskRequest(method, url) {
  // Handle invalid routes
  if (url.pathname !== "/tasks") {
    return new Response("Not found", { status: 404 });
  }

  // GET /tasks: Retrieve all tasks
  if (method === "GET") {
    return new Response(JSON.stringify([...db.values()]), { status: 200 });
  }

  // POST /tasks: Add a new task
  if (method === "POST") {
    const newId = db.size + 1;
    db.set(newId, { id: newId, name: `Task ${newId}` });
    return new Response(JSON.stringify({ id: newId }), { status: 201 });
  }

  // PATCH /tasks/:id: Update an existing task
  if (method === "PATCH" && id) {
    if (!db.has(Number(id))) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      });
    }
    const { name } = JSON.parse(req.text());
    db.set(Number(id), { id: Number(id), name });
    return new Response(JSON.stringify({ id: Number(id) }), { status: 200 });
  }

  // DELETE /tasks/:id: Delete a task
  if (method === "DELETE" && id) {
    if (!db.delete(Number(id))) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      });
    }
    return new Response(null, { status: 204 });
  }

  return new Response("Not allowed", { status: 405 });
}

serve({
  port: 3001,
  fetch(req) {
    const url = new URL(req.url);
    return handleTaskRequest(req.method, url);
  },
});

console.log("Bun API running on http://localhost:3001");
