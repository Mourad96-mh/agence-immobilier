const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection — supports MONGODB_URI or DATABASE + DATABASE_PASSWORD
let MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI && process.env.DATABASE) {
  MONGODB_URI = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD || '');
}
MONGODB_URI = MONGODB_URI || 'mongodb://localhost:27017/immobilier';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// API routes
app.use('/api/properties', require('./routes/properties'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/upload', require('./routes/upload'));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
