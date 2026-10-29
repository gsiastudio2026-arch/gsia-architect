const CACHE_NAME = 'gsia-v25-final';
const urlsToCache = [
  './?v=25',
  './manifest.json'
];

self.addEventListener('install', e => {
  self.skipWaiting(); // Force nouvelle version direct
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(k => {
        if(k !== CACHE_NAME) return caches.delete(k); // Supprime V22
      }))
    ).then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).then(res => {
      return res;
    }).catch(()=> caches.match(e.request))
  );
});
