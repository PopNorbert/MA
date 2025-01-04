const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./myDatabase.db');

app.use(cors());
app.use(bodyParser.json());

// Create a table
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)');
});

// API endpoint to get users
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(rows);
    }
  });
});

// API endpoint to add a user
app.post('/users', (req, res) => {
  const { name, age } = req.body;
  db.run('INSERT INTO users (name, age) VALUES (?, ?)', [name, age], function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json({ id: this.lastID, name, age });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
