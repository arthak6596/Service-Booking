const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  price: { type: String },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Service', serviceSchema);