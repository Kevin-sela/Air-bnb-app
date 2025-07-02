const express = require('express');
const Booking = require('../models/Booking');
const Subscription = require('../models/Subscription');
const { sendNotification } = require('../utils/pushNotifications');

module.exports = (io) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    try {
      const booking = new Booking(req.body);
      await booking.save();

      // Emit real-time booking event
      io.emit('new-booking', booking);

      // Fetch all subscriptions from DB
      const subscriptions = await Subscription.find();

      // Push notification payload
      const payload = {
        title: 'New Booking',
        body: `Booking from ${booking.name} for ${booking.roomType}`,
      };

      // Send push notifications to all subscriptions
      subscriptions.forEach(sub => {
        sendNotification(sub.subscription, payload).catch(console.error);
      });

      res.status(201).json({ success: true, booking });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      res.json(bookings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
