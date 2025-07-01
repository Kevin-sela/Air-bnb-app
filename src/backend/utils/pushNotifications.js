

const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:kofori787@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

exports.sendNotification = (subscription, payload) => {
  return webpush.sendNotification(subscription, JSON.stringify(payload));
};
