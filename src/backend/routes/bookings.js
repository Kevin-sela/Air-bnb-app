const express = require('express');
const { Router } = require('express');

module.exports = (io) => {
  const router = Router();

  router.post('/', (req, res) => {
    try {
      const booking = req.body;

      // Emit real-time booking event
      io.emit('new-booking', booking);

      // Since no DB, just respond success with booking data
      res.status(201).json({ success: true, booking });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  router.get('/', (req, res) => {
    // No DB, so return empty array or in-memory bookings if implemented
    res.json([]);
  });

  return router;
};
