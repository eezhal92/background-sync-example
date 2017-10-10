const version = 'v1';
const cacheName = `background-sync-demo-${version}`;

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

  self.skipWaiting();
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
            console.log('[ServiceWorker] Fetching failed ', err);
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
