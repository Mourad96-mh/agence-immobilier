const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const ENV_PATH = path.join(__dirname, '../config.env');

const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  try {
    jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// PUT /api/auth/credentials
router.put('/credentials', verifyToken, (req, res) => {
  const { currentPassword, newEmail, newPassword } = req.body;

  if (currentPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
  }
  if (!newEmail && !newPassword) {
    return res.status(400).json({ message: 'Aucune modification fournie' });
  }

  let env = fs.readFileSync(ENV_PATH, 'utf8');

  if (newEmail) {
    env = env.replace(/^ADMIN_EMAIL=.*/m, `ADMIN_EMAIL=${newEmail}`);
    process.env.ADMIN_EMAIL = newEmail;
  }
  if (newPassword) {
    env = env.replace(/^ADMIN_PASSWORD=.*/m, `ADMIN_PASSWORD=${newPassword}`);
    process.env.ADMIN_PASSWORD = newPassword;
  }

  fs.writeFileSync(ENV_PATH, env);

  const email = newEmail || process.env.ADMIN_EMAIL;
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

module.exports = router;
