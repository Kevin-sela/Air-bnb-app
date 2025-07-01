

const webpush = require('web-push');

console.log('Decoded VAPID_PUBLIC_KEY length:', Buffer.from(process.env.VAPID_PUBLIC_KEY, 'base64').length);

webpush.setVapidDetails(
  'mailto:kofori787@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

exports.sendNotification = (subscription, payload) => {
  return webpush.sendNotification(subscription, JSON.stringify(payload));
};
