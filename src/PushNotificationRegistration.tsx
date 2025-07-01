import React, { useEffect } from 'react';

const SERVER_URL = import.meta.env.VITE_BACKEND_URL || 'https://your-vercel-backend-url.vercel.app';
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || 'BP-gJitB9nKv2e22xy7VjrvPP3MmJXsQ1VY78MkLKbdhsgpiYIchnF_hLkNqtR9073RpYxT2MhHoXXftRRkzEFk';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const PushNotificationRegistration: React.FC = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);

          return registration.pushManager.getSubscription()
            .then(async (subscription) => {
              if (subscription) {
                return subscription;
              }

              const convertedVapidKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
              return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey,
              });
            });
        })
        .then((subscription) => {
          console.log('Push Subscription:', subscription);

          // Send subscription to backend
          fetch(`${SERVER_URL}/api/push-subscriptions/admin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscription),
          }).then(response => {
            if (!response.ok) {
              throw new Error('Failed to store subscription on server');
            }
            console.log('Subscription sent to server successfully');
          }).catch(error => {
            console.error('Error sending subscription to server:', error);
          });
        })
        .catch((error) => {
          console.error('Service Worker registration or push subscription failed:', error);
        });
    } else {
      console.warn('Push messaging is not supported');
    }
  }, []);

  return null;
};

export default PushNotificationRegistration;
