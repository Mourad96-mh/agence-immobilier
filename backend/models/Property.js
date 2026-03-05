const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: {
      fr: { type: String, required: true },
      ar: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    description: {
      fr: { type: String, default: '' },
      ar: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    category: {
      type: String,
      enum: ['apartment', 'villa', 'office', 'land', 'commercial', 'maison', 'ferme'],
      required: true,
    },
    transactionType: {
      type: String,
      enum: ['sale', 'rent'],
      required: true,
    },
    city: { type: String, required: true },
    price: { type: Number, required: true },
    area: { type: Number, default: null },
    rooms: { type: Number, default: null },
    bathrooms: { type: Number, default: null },
    images: [{ type: String }],
    address: { type: String, default: '' },
    isAvailable: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

propertySchema.index({
  'title.fr': 'text',
  'title.ar': 'text',
  'title.en': 'text',
  city: 'text',
});

module.exports = mongoose.model('Property', propertySchema);
