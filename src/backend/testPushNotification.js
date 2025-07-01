const webpush = require('web-push');
require('dotenv').config();

const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/your-subscription-id',
  keys: {
    p256dh: 'your-p256dh-key',
    auth: 'your-auth-key'
  }
};

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const payload = JSON.stringify({ title: 'Test Push Notification' });

webpush.sendNotification(pushSubscription, payload)
  .then(response => {
    console.log('Push Notification sent successfully:', response);
  })
  .catch(error => {
    console.error('Error sending push notification:', error);
  });
