self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('scanwalk-store').then((cache) => cache.addAll([
      'logo.png',
      'style.css',
      'index.html',
      'generator.html',

      'main.js',
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