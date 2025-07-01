const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:you@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

exports.sendNotification = (subscription, payload) => {
  return webpush.sendNotification(subscription, JSON.stringify(payload));
};
