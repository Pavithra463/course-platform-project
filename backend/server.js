const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// REGISTER route - creates a new user
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating user', error: err.message });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// LOGIN route - checks credentials against the database
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (results.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', username: user.username });
  });
});
// SAVE SCORE route - saves a quiz score linked to a username
app.post('/save-score', (req, res) => {
  const { username, testName, score } = req.body;

  if (!username || !testName || score === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // First, find the user's id using their username
  const findUserQuery = 'SELECT id FROM users WHERE username = ?';
  db.query(findUserQuery, [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error finding user' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const userId = results[0].id;

    const insertScoreQuery = 'INSERT INTO scores (user_id, test_name, score) VALUES (?, ?, ?)';
    db.query(insertScoreQuery, [userId, testName, score], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error saving score', error: err.message });
      res.status(201).json({ message: 'Score saved successfully' });
    });
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});