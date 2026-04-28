const cacheHW4 = 'CachePWA';
const assetsToCache = [
    '/',
    '/hw4pwa',
    '/hw4pwa/index.html',
    '/hw4pwa/style.css',
    '/hw4pwa/service-worker.js',
    '/hw4pwa/manifest.json',
    '/hw4pwa/icon32_maskable.png',
    '/hw4pwa/icon180_maskable.png',
    '/hw4pwa/icon192_maskable.png',
    '/hw4pwa/icon512_maskable.png',
    '/hw4pwa/icon32_rounded.png',
    '/hw4pwa/icon180_rounded.png',
    '/hw4pwa/icon192_rounded.png',
    '/hw4pwa/icon512_rounded.png',
    '/hw4pwa/lightblue.jpg',
    '/hw4pwa/lightgold.jpg'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheHW4)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(assetsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                // No cache hit - fetch from network
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [cacheHW4];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(CACHE_Name => {
                    if (cacheWhitelist.indexOf(CACHE_Name) === -1) {
                        return caches.delete(CACHE_Name);
                    }
                })
            );
        })
    );
});