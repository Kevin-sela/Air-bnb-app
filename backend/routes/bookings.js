const express = require('express');
const Booking = require('../models/Booking');
const { sendNotification } = require('../utils/pushNotifications');
const getSubscriptions = require('./pushSubscriptions').getSubscriptions;

module.exports = (io) => {
  const router = express.Router();

  // POST new booking
  router.post('/', async (req, res) => {
    try {
      const booking = new Booking(req.body);
      const savedBooking = await booking.save();

      // Emit to all connected clients
      io.emit('new-booking', savedBooking);

      // Prepare push notification
      const notificationPayload = {
        title: 'New Booking 📩',
        body: `Booking from ${savedBooking.name} for ${savedBooking.roomType}`,
        data: {
          name: savedBooking.name,
          date: savedBooking.date,
          roomType: savedBooking.roomType,
        },
      };

      // Get subscriptions (mocked or real DB)
      const subscriptions = getSubscriptions();

      // Send push notifications
      for (const sub of subscriptions) {
        try {
          await sendNotification(sub, notificationPayload);
        } catch (err) {
          console.error('❌ Failed to send push notification', err);
        }
      }

      res.status(201).json({ success: true, booking: savedBooking });
    } catch (error) {
      console.error('❌ Booking Error:', error.message);
      res.status(400).json({ success: false, error: error.message });
    }
  });

  // GET all bookings (Admin access)
  router.get('/', async (req, res) => {
    try {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      res.json(bookings);
    } catch (error) {
      console.error('❌ Fetch Error:', error.message);
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
