const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Admin = require('../models/Admin');

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
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne();
    if (!admin || email !== admin.email || password !== admin.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/auth/credentials
router.put('/credentials', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newEmail, newPassword } = req.body;
    const admin = await Admin.findOne();
    if (!admin || currentPassword !== admin.password) {
      return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
    }
    if (!newEmail && !newPassword) {
      return res.status(400).json({ message: 'Aucune modification fournie' });
    }
    if (newEmail) admin.email = newEmail;
    if (newPassword) admin.password = newPassword;
    await admin.save();
    const email = admin.email;
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
