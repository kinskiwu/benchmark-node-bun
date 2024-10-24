const http = require("http");
const tasks = new Map();

// API route handler function
async function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = Number(url.pathname.split("/")[2]);

  try {
    switch (req.method) {
      // Handle GET request to retrieve all tasks
      case "GET": {
        const allTasks = [...tasks.values()];
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(allTasks));
      }
      // Handle POST request to add a new task
      case "POST": {
        let body = "";
        for await (const chunk of req) {
          body += chunk;
        }
        const { name } = JSON.parse(body);

        const id = tasks.size + 1;
        const newTask = { id, name };
        tasks.set(id, newTask);

        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ id }));
      }

      // Handle PATCH request to update an existing task
      case "PATCH": {
        if (!tasks.has(id)) {
          res.writeHead(404, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Task not found" }));
        }

        let body = "";
        for await (const chunk of req) {
          body += chunk;
        }
        const { name } = JSON.parse(body);

        tasks.set(id, { id, name });
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ id }));
      }
      // Handle DELETE request to remove a task
      case "DELETE": {
        if (!tasks.delete(id)) {
          res.writeHead(404, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Task not found" }));
        }
        res.writeHead(204);
        return res.end();
      }

      // Handle unsupported HTTP methods
      default:
        res.writeHead(405, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Method Not Allowed" }));
    }
  } catch (error) {
    // Handle unexpected errors
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid Request" }));
  }
}

const server = http.createServer(handleRequest);
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Node.js API running on http://localhost:${PORT}`);
});
