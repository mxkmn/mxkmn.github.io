self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('scanwalk-store').then((cache) => cache.addAll([
      'resources/website_icon.png',
      'style.css',

      'generator.html',
      'generator.js',

      'communications.js',
      'theme.js',
      'user.js',

      'index.html'
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});