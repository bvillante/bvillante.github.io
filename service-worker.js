const cacheHW4 = 'CachePWA';
const assetsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/serviceworker.js',
    '/manifest.json',
    'icon32_maskable.png',
    'icon180_maskable.png',
    'icon192_maskable.png',
    'icon512_maskable.png',
    'icon32_rounded.png',
    'icon180_rounded.png',
    'icon192_rounded.png',
    'icon512_rounded.png',
    'lightblue.jpg',
    'lightgold.jpg'
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