const CACHE_NAME = "streamlist-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/main.js", // Update this path according to your build structure
  "/static/css/main.css" // Update this path according to your build structure
];

// Installer for caching resources for offline use
self.addEventListener("install", (event) => { 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch for cached content first then network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate for cleaning up old caches when new service worker is activated
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
