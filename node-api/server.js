const http = require("http");
const tasks = new Map(); // In-memory storage
const { fibonacci } = require("../utils/fibonacci");

// Main API route handler
async function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`); // Parse the request URL
  const id = Number(url.pathname.split("/")[2]) || null; // Extract task or Fibonacci ID, if available

  try {
    switch (req.method) {
      case "GET":
        // Handle fetching all tasks
        if (url.pathname === "/tasks") {
          console.log("Fetching all tasks");
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify([...tasks.values()]));
        }

        // Handle fetching a specific task by ID
        if (url.pathname.startsWith("/tasks/")) {
          const taskId = Number(id);
          if (isNaN(taskId)) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Invalid Task ID" }));
          }

          const task = tasks.get(taskId);
          if (!task) {
            res.writeHead(404, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Task not found" }));
          }

          console.log(`Fetching task with ID: ${taskId}`);
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(task));
        }

        // Handle Fibonacci calculation
        if (url.pathname.startsWith("/fibonacci/")) {
          try {
            const n = Number(url.pathname.split("/")[2]); // Extract 'n' from path
            const result = fibonacci(n);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ result }));
          } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Invalid Fibonacci request" }));
          }
        }

        // Handle unknown routes
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Route not found" }));

      case "POST":
        // Task creation logic
        let body = "";
        for await (const chunk of req) {
          body += chunk;
        }
        const { name } = JSON.parse(body);
        const newId = tasks.size + 1;
        tasks.set(newId, { id: newId, name });
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ id: newId }));

      case "PATCH":
        // Task update logic
        if (!tasks.has(id)) {
          res.writeHead(404, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Task not found" }));
        }
        let updateBody = "";
        for await (const chunk of req) {
          updateBody += chunk;
        }
        const { name: updatedName } = JSON.parse(updateBody); // Parse updated name
        tasks.set(id, { id, name: updatedName }); // Update task
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ id }));

      case "DELETE":
        // Task deletion logic
        if (!tasks.delete(id)) {
          res.writeHead(404, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Task not found" }));
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: `Task ${id} deleted successfully` }));

      default:
        // Handle unsupported methods
        res.writeHead(405, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Method Not Allowed" }));
    }

  } catch (error) {
    // Handle unexpected errors
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Invalid Request" }));
  }
}

const server = http.createServer(handleRequest);
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Node.js API running on http://localhost:${PORT}`);
});
