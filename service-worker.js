var cacheName = 'weatherPWA-step-6-1';
var manifestCache = 'manifest';
var filesToCache = [
    '/cleverboyBlog',
    '/cleverboyBlog/index.html',
    '/cleverboyBlog/scripts/app.js',
    '/cleverboyBlog/static/img/lion.a2175aa.jpeg',
    '/cleverboyBlog/static/css/app.fd2accbaadc35ee245741a7c7b7503c7.css',
    '/cleverboyBlog/static/css/app.fd2accbaadc35ee245741a7c7b7503c7.css.map',
    '/cleverboyBlog/static/js/manifest.de7511c80ffd9e93b289.js',
    '/cleverboyBlog/static/js/vendor.fd1e11be2ac7834ed577.js',
    '/cleverboyBlog/static/js/app.e1fafb0ba261ff16cad4.js',
    '/cleverboyBlog/static/js/manifest.de7511c80ffd9e93b289.js.map',
    '/cleverboyBlog/static/js/vendor.fd1e11be2ac7834ed577.js.map',
    '/cleverboyBlog/static/js/app.e1fafb0ba261ff16cad4.js.map'
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
                if (key !== cacheName && key !== manifestCache) {
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    var dataUrl = 'https://cleverboy32.github.io/cleverboyBlog/manifest.json';
    if (e.request.url.indexOf('manifest.json') > -1) {
        e.respondWith(
            caches.open(manifestCache).then(function (cache) {
                return fetch(e.request).then(function (response) {
                    cache.put(dataUrl, response.clone());
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
