self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('istu-store').then((cache) => cache.addAll([
      'logo.png',
      'style.css',
      'index.html',
      'default.js',

      'projects.html', 'projects.js',
      'add_project.html', 'add_project.js',

      'user_register.html', 'organisation_register.html', 'register.js',
      'login.html', 'login.js',
      'deauth.html',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
