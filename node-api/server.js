const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database(':memory:');

db.run('CREATE TABLE tasks (id INTEGER PRIMARY KEY, name TEXT)');

app.use(express.json());

app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/tasks', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO tasks (name) VALUES (?)', [name], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

app.listen(3000, () => console.log('Node.js API running on http://localhost:3000'));
