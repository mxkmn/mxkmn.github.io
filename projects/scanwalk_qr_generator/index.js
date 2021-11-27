// очистка кеша PWA
caches.keys().then(function(names) {
    for (let name of names)
        caches.delete(name);
});
// очистка данных сайта
localStorage.clear();
// получение токена
communications.getTokens();