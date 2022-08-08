const staticCache = 'site-static';
const dynamicCache = 'site-dynamic';
const assets = [
    '/',
    '/index.html',
    '/css/materialize.min.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/materialize.min.js',
    '/js/ui.js',
    //'/img/content.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v135/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

// Install Event
self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(staticCache).then(cache => {
            cache.addAll(assets);
        })
    );
});
// Activate Event
self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCache)
                .map(key => caches.delete(key))
            )
        })
    );
});
// Fetch Event
self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    );
});
