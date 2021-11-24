self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('scanwalk-store').then((cache) => cache.addAll([
      'https://fonts.googleapis.com/css?family=Poppins:regular,700',

      'icons/maskable_icon_x72.png',
      'style.css',

      'index.html',
      'index.js',

      'generator.html',
      'generator.js',

      'communications.js',
      'theme.js',
      'user.js'
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});