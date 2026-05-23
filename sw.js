const CACHE = 'migamelon-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './images/1.jpg','./images/2.jpg','./images/3.jpg',
  './images/4.jpg','./images/5.jpg','./images/6.jpg',
  './images/7.jpg','./images/8.jpg','./images/9.jpg',
  './images/10.jpg','./images/11.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
