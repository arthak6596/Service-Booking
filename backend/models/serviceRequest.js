const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  scheduledTime: { type: String },
  requestedAt: { type: Date, default: Date.now },
  scheduledDate: { type: Date },
  notes: { type: String },
  address: { type: String, required: true },
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
