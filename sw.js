const CACHE_NAME = 'promedia-v53';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/mallas.js',
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
  // Only cache GET requests
  if (e.request.method !== 'GET') return;
  
  // Do not cache API routes or Firebase endpoints in service worker
  const url = new URL(e.request.url);
  if (url.pathname.startsWith('/api/') || url.hostname.includes('firebase') || url.hostname.includes('googleapis')) {
    return;
  }

  e.respondWith(
    fetch(e.request).then((response) => {
      if (response.status === 200) {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, responseClone);
        });
      }
      return response;
    }).catch(() => {
      return caches.match(e.request);
    })
  );
});
