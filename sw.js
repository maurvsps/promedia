const CACHE_NAME = 'promedia-v52';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/cachimbo_events.js'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(e.request, response.clone());
        return response;
      });
    }).catch(() => {
      return caches.match(e.request);
    })
  );
});
