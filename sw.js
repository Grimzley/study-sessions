const staticCache = 'site-static';
const dynamicCache = 'site-dynamic';
const dynamicCacheSize = 15;
const assets = [
    '/',
    '/index.html',
    '/pages/fallback.html',
    '/css/materialize.min.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/materialize.min.js',
    '/js/ui.js',
    '/img/content.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v135/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

// Cache Size Limit
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
}
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
                .filter(key => key !== staticCache && key !== dynamicCache)
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
                    limitCacheSize(dynamicCache, dynamicCacheSize);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (evt.request.url.indexOf('.html') > -1) { 
                return caches.match('/pages/fallback.html');
            }
        })
    );
});
