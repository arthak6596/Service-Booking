const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const ServiceRequest = require('../models/serviceRequest');
const authMiddleware = require('../middlewares/authMiddleware');

// Add a new service (admin only)
router.post('/add', async (req, res) => {
  try {
    const { name, description, image, price, rating } = req.body;
    const service = new Service({ name, description, image, price, rating });
    await service.save();
    res.status(201).json({ message: 'Service added', service });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all services (for search / listing)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = { name: { $regex: search, $options: 'i' } }; // Case-insensitive search
    }
    const services = await Service.find(query);
    res.status(200).json({ services });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// User requests a service
router.post('/request/:serviceId', authMiddleware, async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { address,scheduledDate,scheduledTime, notes } = req.body;
    const request = new ServiceRequest({
      userId: req.user.id,
      serviceId,
      scheduledDate,
      scheduledTime,
      address,
      notes,
    });
    await request.save();
    res.status(201).json({ message: 'Service requested', request });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user requests (for profile)
router.get('/requests', authMiddleware, async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ userId: req.user.id })
      .populate('serviceId', 'name description price image rating')
      .sort({ requestedAt: -1 });
    res.status(200).json({ requests });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
