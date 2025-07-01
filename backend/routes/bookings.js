const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

const io = require('../server').io; // Import io from server.js
const { sendNotification } = require('../utils/pushNotifications');
const pushSubscriptionsRoute = require('./pushSubscriptions');

const subscriptions = pushSubscriptionsRoute.subscriptions || [];

// POST new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // Emit booking event to all connected clients
    io.emit('newBooking', booking);

    // Send push notifications to all subscriptions
    const notificationPayload = {
      title: 'New Booking',
      body: `New booking from ${booking.name} for ${booking.roomType}`,
    };

    subscriptions.forEach(subscription => {
      sendNotification(subscription, notificationPayload).catch(err => {
        console.error('Error sending notification', err);
      });
    });

    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET all bookings (admin use)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
