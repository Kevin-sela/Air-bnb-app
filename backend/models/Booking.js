const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  roomType: String,
  date: String,
  message: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
