const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const bookingsRoute = require('./routes/bookings');
const pushSubscriptionsRoute = require('./routes/pushSubscriptions');
const { router: authRouter } = require('./routes/auth');
// const admin = require('firebase-admin'); // Uncomment if using FCM

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Optional: Setup Firebase Admin SDK
// const serviceAccount = require('./firebase-service-account.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingsRoute(io)); // pass io to access in routes
app.use('/api/push-subscriptions', pushSubscriptionsRoute);

// Basic endpoint
app.get('/', (req, res) => res.send('🏡 Hebron Hostel Backend Running...'));

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('📡 A client connected');

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected');
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
  server.listen(process.env.PORT || 5000, () =>
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
  );
}).catch((err) => console.error('❌ MongoDB connection error:', err));
