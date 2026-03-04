const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    source: { type: String, enum: ['contact', 'vendre', 'location'], required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    // Contact-specific
    subject: { type: String, default: '' },
    message: { type: String, default: '' },
    // Sell / list-for-rent specific
    propertyType: { type: String, default: '' },
    city: { type: String, default: '' },
    area: { type: Number, default: null },
    // Admin
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
