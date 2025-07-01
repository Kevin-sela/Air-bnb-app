require('dotenv').config();

console.log('VAPID_PUBLIC_KEY:', process.env.VAPID_PUBLIC_KEY);
console.log('Decoded VAPID_PUBLIC_KEY length:', Buffer.from(process.env.VAPID_PUBLIC_KEY || '', 'base64').length);
console.log('VAPID_PRIVATE_KEY:', process.env.VAPID_PRIVATE_KEY);
