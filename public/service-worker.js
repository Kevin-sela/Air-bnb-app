self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  const title = data.title || 'Notification';
  const options = {
    body: data.body || 'You have a new notification.',
    icon: '/icon.png',
    badge: '/badge.png',
    data: data.data || {},
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
