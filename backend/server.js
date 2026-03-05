const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(express.json());

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const Admin = require('./models/Admin');

mongoose
  .connect(DB)
  .then(async () => {
    console.log('✅ MongoDB connected');
    const existing = await Admin.findOne();
    if (!existing) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      });
      console.log('✅ Admin account initialized from env vars');
    }
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// API routes
app.use('/api/properties', require('./routes/properties'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/upload', require('./routes/upload'));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Redirect onrender.com to canonical domain
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.hostname.includes("onrender.com")) {
      return res.redirect(301, "https://www.mecalus.org" + req.originalUrl);
    }
    next();
  });
}

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
