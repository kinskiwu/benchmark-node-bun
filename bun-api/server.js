const { serve } = require("bun");
const db = new Map();

// Handle task operations
async function handleTaskRequest(method, id, req) {
  try {
    switch (method) {
      // Handle GET request to retrieve all tasks
      case "GET":
        return new Response(JSON.stringify([...db.values()]), { status: 200 });
      // Handle POST request to add a new task
      case "POST":
        const newId = db.size + 1;
        db.set(newId, { id: newId, name: `Task ${newId}` });
        return new Response(JSON.stringify({ id: newId }), { status: 201 });
      // Handle PATCH request to update an existing task
      case "PATCH":
        if (!db.has(Number(id))) {
          return new Response(JSON.stringify({ error: "Task not found" }), {
            status: 404,
          });
        }
        const { name } = await req.json();
        db.set(Number(id), { id: Number(id), name });
        return new Response(JSON.stringify({ id: Number(id) }), {
          status: 200,
        });
      // Handle DELETE request to remove a task
      case "DELETE":
        if (!db.delete(Number(id))) {
          return new Response(JSON.stringify({ error: "Task not found" }), {
            status: 404,
          });
        }
        return new Response(null, { status: 204 });

      // Handle unsupported HTTP methods
      default:
        return new Response("Method Not Allowed", { status: 405 });
    }
  } catch (error) {
    // Handle unexpected errors
    return new Response(JSON.stringify({ error: "Invalid Request" }), {
      status: 400,
    });
  }
}

const PORT = 3001;

serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const id = url.pathname.split("/")[2];
    return handleTaskRequest(req.method, id, req);
  },
});

console.log(`Bun API running on http://localhost:${PORT}`);
