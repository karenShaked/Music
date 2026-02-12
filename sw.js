const CACHE_NAME = 'music-player-v2';
const ASSETS = [
  './index.html',
  './manifest.json',
  './songs/Mark Ronson - Uptown Funk Official Video ft Bruno Mars.mp3',
  './songs/Pharrell Williams - Happy from Despicable Me 2 Ballroom Version.mp3',
  './songs/Sixpence None the Richer - Kiss Me Official Video.mp3',
  './songs/Toploader - Dancing in the Moonlight Official Video.mp3',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
