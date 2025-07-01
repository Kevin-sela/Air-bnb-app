const express = require('express');
const router = express.Router();

let subscriptions = [];

// Register a new push subscription
router.post('/', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Subscription added successfully.' });
});

// Get all subscriptions (for testing)
router.get('/', (req, res) => {
  res.json(subscriptions);
});

// Export subscriptions array for use in other modules
router.subscriptions = subscriptions;

module.exports = router;
