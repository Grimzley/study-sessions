// Install Event
self.addEventListener('install', (evt) => {
    console.log('service worker installed');
});
// Activate Event
self.addEventListener('activate', (evt) => {
    console.log('service worker activated');
});
// Fetch Event
self.addEventListener('fetch', (evt) => {
    console.log('fetch event: ', evt);
});
