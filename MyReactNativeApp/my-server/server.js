const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require('http');  // Import http module to combine with Express
const app = express();
const db = new sqlite3.Database('./contestDatabase.db');

// Create HTTP server
const server = http.createServer(app);

// Middleware to log HTTP requests
app.use((req, res, next) => {
  const method = req.method;
  const url = req.url;
  console.log(`${method} ${url}`);  // Log the HTTP request
  next();  // Proceed to the next middleware or route handler
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create the contests table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS contest (
    id INTEGER PRIMARY KEY,
    name TEXT,
    category TEXT,
    location TEXT,
    date TEXT,
    maxplayers INTEGER
  )`);
});

// Get all contests
app.get('/api/contests', (req, res) => {
  db.all('SELECT * FROM contest', (err, rows) => {
    if (err) {
      console.error('Error fetching contests:', err.message);
      return res.status(500).send({ message: 'Failed to fetch contests' });
    }
    console.log('Fetched contests:', rows.length);
    res.json(rows);
  });
});

// Add a contest
app.post('/api/contests', (req, res) => {
  const {id, name, category, location, date, maxplayers } = req.body;
  db.run(
    'INSERT INTO contest (id, name, category, location, date, maxplayers) VALUES (?, ?, ?, ?, ?, ?)',
    [id, name, category, location, date, maxplayers],
    function (err) {
      if (err) {
        console.error('Error adding contest:', err.message);
        return res.status(500).send({ message: 'Failed to add contest' });
      }
      console.log(`Added contest: ${name} (ID: ${id})`);
      res.status(201).json({ id, name, category, location, date, maxplayers });
    }
  );
});
app.post('/api/contests/sync', (req,res)=>{
    const contests = req.body;
    db.run('DELETE FROM contest', function(err) {
        if (err) {
          console.error('Error deleting contests:', err.message);
          return res.status(500).send({ message: 'Failed to delete contests' });
        }
    
        const insertStmt = db.prepare('INSERT INTO contest (id, name, category, location, date, maxplayers) VALUES (?, ?, ?, ?, ?, ?)');
    
        contests.forEach((contest) => {
          insertStmt.run(contest.id, contest.name, contest.category, contest.location, contest.date, contest.maxplayers, function(err) {
            if (err) {
              console.error('Error inserting contest:', err.message);
              return res.status(500).send({ message: 'Failed to insert contest' });
            }
          });
        });
        insertStmt.finalize();
    
        console.log('Contests synchronized');
        res.status(200).send({ message: 'Contests successfully synchronized' });
      });
});

app.put('/api/contests/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, location, date, maxplayers } = req.body;
  db.run(
    'UPDATE contest SET name = ?, category = ?, location = ?, date = ?, maxplayers = ? WHERE id = ?',
    [name, category, location, date, maxplayers, id],
    function (err) {
      if (err) {
        console.error('Error updating contest:', err.message);
        return res.status(500).send({ message: 'Failed to update contest' });
      }
      console.log(`Updated contest: ${name} (ID: ${id})`);
      res.json({ id, name, category, location, date, maxplayers });
    }
  );
});

// Delete a contest
app.delete('/api/contests/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM contest WHERE id = ?', id, function (err) {
    if (err) {
      console.error('Error deleting contest:', err.message);
      return res.status(500).send({ message: 'Failed to delete contest' });
    }
    console.log(`Deleted contest (ID: ${id})`);
    res.status(204).send();
  });
});

// Set up WebSocket server on the same HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
});

// Start the server on the same port
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://192.168.1.199:${PORT}`);
});
