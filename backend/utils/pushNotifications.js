const webpush = require('web-push');

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
  'mailto:admin@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const sendNotification = (subscription, dataToSend) => {
  return webpush.sendNotification(subscription, JSON.stringify(dataToSend));
};

module.exports = {
  sendNotification,
};
