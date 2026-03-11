const CACHE_NAME = "quilla-cache-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./quilla.js",
  "./particles.js",
  "./manifest.json",
  "./logo de streaming Quilla.jpeg",
  "./logo de netflix.png",
  "./logo de disney+.png",
  "./logo de hbomax.png",
  "./logo de prime video.png",
  "./logo de crunchyroll.png",
  "./logo Paramount.png",
  "./youtube.png",
  "./Apple_TV+_logo.png",
  "./vix.png",
  "./plex.png",
  "./logo chatgpt.png",
  "./canva.png",
  "./logo de deezer.png",
  "./picsart.png",
  "./logo de spotify.png",
  "./win play.png",
  "./icons8-whatsapp-50.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Archivos cacheados");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
