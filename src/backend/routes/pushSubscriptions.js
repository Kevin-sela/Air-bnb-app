const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// Register a new push subscription for admin
router.post('/admin', async (req, res) => {
  const subscription = req.body;

  try {
    // Check if admin subscription already exists
    let existing = await Subscription.findOne({ isAdmin: true });
    if (!existing) {
      existing = new Subscription({
        subscription,
        isAdmin: true,
      });
      await existing.save();
    } else {
      // Update existing admin subscription
      existing.subscription = subscription;
      await existing.save();
    }
    res.status(201).json({ message: 'Admin subscription added/updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save admin subscription' });
  }
});

// Get admin subscription (for testing)
router.get('/admin', async (req, res) => {
  const adminSubscription = await Subscription.findOne({ isAdmin: true });
  if (!adminSubscription) {
    return res.status(404).json({ error: 'Admin subscription not found' });
  }
  res.json(adminSubscription);
});

module.exports = router;
