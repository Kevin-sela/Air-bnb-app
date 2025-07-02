const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const bookingsRoute = require('./routes/bookings');
const pushSubscriptionsRoute = require('./routes/pushSubscriptions');

const app = express();
const server = http.createServer(app);

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

// Start server directly without MongoDB connection
server.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
