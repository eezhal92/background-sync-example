import storage from 'localforage';
import { getRecipeAndCache } from './lib/request';

const version = 'v1';
export const cacheName = `background-sync-demo-${version}`;

const filesToCache = [
  '/',
  '/index.html',
  '/detail.html',
  '/css/app.css',
  '/css/bootstrap.min.css',
  '/index.js',
  '/detail.js',
  '/js/bootstrap.min.js',
  'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open((cacheName))
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((res) => {
        if (res) return res;

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            if (!response || response.status !== 200) {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(cacheName).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return response;
          })
          .catch(err => {
            console.log('[ServiceWorker] Fetching failed', err);
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((name) => name !== cacheName)
        .map((name) => {
          caches.delete(name);
        })
    ))
  );
});

const handleLoadRecipeSync = (event) => {
  const getAllItems = (payloads) => {
    const promises = payloads.map(async (payload) => {
      const data = await getRecipeAndCache(payload.recipeId);

      registration.showNotification(`${data.title} is ready!`, {
        body: 'View recipe article',
        data: { recipeId: data.id },
      });
    });

    return Promise.all(promises);
  };

  const clearStorage = () => {
    storage.setItem('load-recipe-queue', []);
  };

  event.waitUntil(storage.getItem('load-recipe-queue')
    .then(getAllItems)
    .then(clearStorage)
  );
};

self.addEventListener('sync', (event) => {
  console.info('[ServiceWorker] background sync event fired!', event.tag);

  if (event.tag === 'load-recipe') {
    handleLoadRecipeSync(event);
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  clients.openWindow(`${location.origin}/detail.html#recipe_id=${event.notification.data.recipeId}`);
});

self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
