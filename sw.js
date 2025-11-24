self.addEventListener("install", e => {
    console.log("Service Worker instalado");
    self.skipWaiting();
});

self.addEventListener("activate", () => {
    console.log("Service Worker activo");
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
