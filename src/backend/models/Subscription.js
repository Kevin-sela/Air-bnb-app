const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subscription: { type: Object, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
