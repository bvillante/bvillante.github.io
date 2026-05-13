const cacheST = 'CachePWA';
const assetsToCache = [
    '/',
    '/short-task',
    '/short-task/indexhybrid.html',
    '/short-task/style.css',
    '/short-task/service-worker.js',
    '/short-task/manifest.json',
    '/short-task/flutter.png',
    '/short-task/ionic.png',
    '/short-task/reactnative.png'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheST)
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
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [cacheST];
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