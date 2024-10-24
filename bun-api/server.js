const { serve } = require("bun");
const db = new Map();
const { fibonacci } = require("../utils/fibonacci");

// Helper function to normalize path (removes trailing slashes)
function normalizePath(path) {
  return path.replace(/\/+$/, "");
}

// Handle task operations in Bun
async function handleTaskRequest(method, pathname, id, req) {
  try {
    switch (method) {
      case "GET":
        // Handle fetching all tasks
        if (pathname === "/tasks") {
          console.log("Fetching all tasks");
          return new Response(JSON.stringify([...db.values()]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Handle fetching a specific task by ID
        if (pathname.startsWith("/tasks/")) {
          const taskId = Number(id);
          if (isNaN(taskId)) {
            return new Response(JSON.stringify({ error: "Invalid Task ID" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const task = db.get(taskId);
          if (!task) {
            return new Response(JSON.stringify({ error: "Task not found" }), {
              status: 404,
              headers: { "Content-Type": "application/json" },
            });
          }

          console.log(`Fetching task with ID: ${taskId}`);
          return new Response(JSON.stringify(task), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Handle Fibonacci calculation
        if (pathname.startsWith("/fibonacci/")) {
          const n = Number(id);
          const result = fibonacci(n);
          return new Response(JSON.stringify({ result }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Handle unknown routes
        return new Response(JSON.stringify({ error: "Route not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });

      case "POST":
        const newId = db.size + 1;
        db.set(newId, { id: newId, name: `Task ${newId}` });
        return new Response(JSON.stringify({ id: newId }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });

      case "PATCH":
        const taskId = Number(id);
        if (isNaN(taskId) || !db.has(taskId)) {
          return new Response(JSON.stringify({ error: "Task not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }
        const { name } = await req.json();
        db.set(taskId, { id: taskId, name });
        return new Response(JSON.stringify({ id: taskId }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });

      case "DELETE":
        if (!db.delete(Number(id))) {
          return new Response(JSON.stringify({ error: "Task not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response(
          JSON.stringify({ message: `Task ${id} deleted successfully` }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );

      default:
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
          status: 405,
          headers: { "Content-Type": "application/json" },
        });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid Request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

const PORT = 3001;

serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const pathname = normalizePath(url.pathname); // Normalize URL path
    const id = pathname.split("/")[2] || null; // Extract ID if available

    return handleTaskRequest(req.method, pathname, id, req);
  },
});

console.log(`Bun API running on http://localhost:${PORT}`);
