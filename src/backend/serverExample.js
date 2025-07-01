const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const bookingsRoute = require('./routes/bookings');
const pushSubscriptionsRoute = require('./routes/pushSubscriptions');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Error: MONGO_URI environment variable is not set.');
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');

  // Allow only your frontend origin
  const io = new Server(server, {
    cors: {
      origin: 'https://air-bnb-app-gamma.vercel.app',
      methods: ['GET', 'POST']
    }
  });

  // Middleware
  app.use(cors({ origin: 'https://air-bnb-app-gamma.vercel.app' }));
  app.use(express.json());

  // Routes
  app.use('/api/bookings', bookingsRoute(io)); // pass io to route
  app.use('/api/push-subscriptions', pushSubscriptionsRoute);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});
