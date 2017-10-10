import storage from 'localforage';

export async function queue(name, payload) {
  const items = await storage.getItem(name);
  const queues = items || [];

  queues.push(payload);

  return storage.setItem(name, queues);
}

export function askNotificationPermission() {
  return new Promise((resolve, reject) => {
    Notification.requestPermission((result) => {
      if (result !== 'granted') {
        return reject(Error('Denied notification permission'));
      }

      resolve(true);
    });
  });
}
