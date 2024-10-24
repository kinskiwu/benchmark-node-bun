const { serve } = require('bun');
const db = new Map();

serve({
  port: 3001,

  fetch(req) {
    const url = new URL(req.url);

    if (req.method === 'GET' && url.pathname === '/tasks') {
      return new Response(JSON.stringify([...db.values()]));
    }

    if (req.method === 'POST' && url.pathname === '/tasks') {
      const id = db.size + 1;
      db.set(id, { id, name: 'Task ' + id });
      return new Response(JSON.stringify({ id }), { status: 201 });
    }

    return new Response('Not found', { status: 404 });
  },
});

console.log('Bun API running on http://localhost:3001');
