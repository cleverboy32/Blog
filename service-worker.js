var cacheName = 'weatherPWA-step-6-1';
var mainefestCache = 'manifest';
var filesToCache = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/static/img/lion.a2175aa.jpeg',
    '/static/css/app.fd2accbaadc35ee245741a7c7b7503c7.css',
    '/static/css/app.fd2accbaadc35ee245741a7c7b7503c7.css.map',
    '/static/js/manifest.de7511c80ffd9e93b289.js',
    '/static/js/vendor.fd1e11be2ac7834ed577.js',
    '/static/js/app.e1fafb0ba261ff16cad4.js',
    '/static/js/manifest.de7511c80ffd9e93b289.js.map',
    '/static/js/vendor.fd1e11be2ac7834ed577.js.map',
    '/static/js/app.e1fafb0ba261ff16cad4.js.map'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== mainefestCache) {
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    if (e.request.url.indexOf('mainfest.json') > -1) {
        e.respondWith(
            caches.open(mainefestCache).then(function (cache) {
                return fetch(e.request).then(function (response) {
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        /*
         * The app is asking for app shell files. In this scenario the app uses the
         * "Cache, falling back to the network" offline strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
         */
        e.respondWith(
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
    }
});

self.addEventListener('push', function (event) {
    var title = 'Yay a message.';
    var body = 'We have received a push message.';
    var icon = '/images/smiley.svg';
    var tag = 'simple-push-example-tag';
    event.waitUntil(
      self.registration.showNotification(title, {
          body: body,
          icon: icon,
          tag: tag
      })
    );
});
